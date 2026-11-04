"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent, RefObject } from "react";

const DEBOUNCE_MS = 400;
const ACCEPT_RETRY_MS = 250;
const CACHE_LIMIT = 30;
const SUGGESTION_LIMITS_VERSION = "v2";
const DEFAULT_SUGGESTION_MAX_LENGTH = 320;
const DEFAULT_SUGGESTION_MAX_WORDS = 45;
const cache = new Map<string, string>();

type Options = {
  title: string;
  content: string;
  enabled: boolean;
  loggedIn: boolean;
  fieldRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  showAlert: (type: "error", message: string) => void;
  minimumLength?: number;
  hintId?: string;
  maxLength?: number;
  suggestionMaxLength?: number;
  suggestionMaxWords?: number;
};

function hasRtl(value: string) {
  return /[\u0590-\u08ff]/.test(value.slice(-800));
}

export function useInlineSuggestion({
  title,
  content,
  enabled,
  loggedIn,
  fieldRef,
  onChange,
  showAlert,
  minimumLength = 20,
  hintId = "content-ai-assist-hint",
  maxLength,
  suggestionMaxLength = DEFAULT_SUGGESTION_MAX_LENGTH,
  suggestionMaxWords = DEFAULT_SUGGESTION_MAX_WORDS,
}: Options) {
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);
  const suggestionRef = useRef("");
  const beforeRef = useRef("");
  const cooldownRef = useRef(0);
  const lastToastRef = useRef(0);
  const composingRef = useRef(false);
  const retryRef = useRef(false);
  const sessionDisabledRef = useRef(false);

  useEffect(() => {
    suggestionRef.current = suggestion;
  }, [suggestion]);

  const clear = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    suggestionRef.current = "";
    setSuggestion("");
    setIsLoading(false);
  }, []);

  const canRequest = useCallback(() => {
    const field = fieldRef.current;
    return Boolean(
      enabled &&
      loggedIn &&
      !sessionDisabledRef.current &&
      focused &&
      field &&
      !document.hidden &&
      !composingRef.current &&
      field.selectionStart === field.selectionEnd &&
      field.selectionEnd === field.value.length &&
      field.value.trim().length >= minimumLength &&
      (maxLength === undefined || field.value.length < maxLength) &&
      !hasRtl(field.value)
    );
  }, [enabled, fieldRef, focused, loggedIn, maxLength, minimumLength]);

  const request = useCallback(async () => {
    const textarea = fieldRef.current;
    if (!canRequest() || !textarea) {
      setIsLoading(false);
      return;
    }
    if (Date.now() < cooldownRef.current) return;

    const before = textarea.value;
    const key = `${SUGGESTION_LIMITS_VERSION}|${title}|${before.slice(-300)}`;
    const cached = cache.get(key);
    if (cached !== undefined) {
      beforeRef.current = before;
      suggestionRef.current = cached;
      setSuggestion(cached);
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setIsLoading(true);
    const requestId = ++requestIdRef.current;
    beforeRef.current = before;

    try {
      const response = await fetch("/api/ai-assist/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, before, after: "" }),
        signal: controller.signal,
      });
      if (!response.ok) {
        if (response.status === 401) {
          sessionDisabledRef.current = true;
          clear();
          if (Date.now() - lastToastRef.current > 30_000) {
            lastToastRef.current = Date.now();
            showAlert("error", "AI-Assistant failed");
          }
          return;
        }
        if (response.status === 503) cooldownRef.current = Date.now() + 60_000;
        if (response.status === 429) cooldownRef.current = Date.now() + 60_000;
        else cooldownRef.current = Date.now() + 15_000;
        if (response.status !== 503 && Date.now() - lastToastRef.current > 30_000) {
          lastToastRef.current = Date.now();
          showAlert("error", "AI-Assistant failed");
        }
        return;
      }
      const data = (await response.json()) as { suggestion?: unknown };
      if (requestId !== requestIdRef.current || textarea.value !== before) return;
      let next = typeof data.suggestion === "string" ? data.suggestion : "";
      next = next.replace(/\s+/g, " ").trim();
      if (next.length > suggestionMaxLength || next.split(/\s+/).length > suggestionMaxWords) {
        const candidate = next.split(/\s+/).slice(0, suggestionMaxWords).join(" ").slice(0, suggestionMaxLength).trim();
        const sentenceEnd = [...candidate].reduce((last, character, index) => (
          /[.!?۔]/.test(character) ? index + 1 : last
        ), -1);
        next = sentenceEnd > 0 ? candidate.slice(0, sentenceEnd).trim() : candidate.replace(/\s+\S*$/, "").trim();
      }
      if (next) {
        cache.set(key, next);
        if (cache.size > CACHE_LIMIT) cache.delete(cache.keys().next().value as string);
      }
      suggestionRef.current = next;
      setSuggestion(next);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      cooldownRef.current = Date.now() + 15_000;
      if (Date.now() - lastToastRef.current > 30_000) {
        lastToastRef.current = Date.now();
        showAlert("error", "AI-Assistant failed");
      }
    } finally {
      if (controllerRef.current === controller) controllerRef.current = null;
      setIsLoading(false);
    }
  }, [canRequest, fieldRef, showAlert, suggestionMaxLength, suggestionMaxWords, title]);

  useEffect(() => {
    if (!enabled || !loggedIn || !focused || retryRef.current) {
      retryRef.current = false;
      return;
    }
    clear();
    if (canRequest()) setIsLoading(true);
    const timer = window.setTimeout(request, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [canRequest, clear, content, enabled, focused, loggedIn, request, title]);

  useEffect(() => {
    if (!enabled) clear();
    const onVisibilityChange = () => {
      if (document.hidden) clear();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [clear, enabled]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;
      const previous = beforeRef.current;
      const current = suggestionRef.current;
      const typed = nextValue.startsWith(previous) ? nextValue.slice(previous.length) : "";
      if (current && typed.length === 1 && current.startsWith(typed)) {
        const remaining = current.slice(typed.length);
        suggestionRef.current = remaining;
        setSuggestion(remaining);
      } else {
        clear();
      }
      onChange(event);
    },
    [clear, onChange]
  );

  const accept = useCallback(
    (wordOnly = false) => {
      const textarea = fieldRef.current;
      const current = suggestionRef.current;
      if (!textarea || !current || textarea.selectionStart !== textarea.selectionEnd) return;
      const text = wordOnly ? current.match(/^\s*\S+\s*/)?.[0] || current : current;
      const start = textarea.selectionStart ?? 0;
      textarea.setRangeText(text, start, start, "end");
      onChange({
        target: textarea,
        currentTarget: textarea,
      } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
      beforeRef.current = textarea.value;
      clear();
      retryRef.current = true;
      window.setTimeout(request, ACCEPT_RETRY_MS);
    },
    [clear, fieldRef, onChange, request]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === "Tab" && suggestionRef.current) {
        event.preventDefault();
        accept();
      } else if (event.key === "ArrowRight" && (event.ctrlKey || event.metaKey) && suggestionRef.current) {
        event.preventDefault();
        accept(true);
      } else if (event.key === "Escape") {
        clear();
      }
    },
    [accept, clear]
  );

  return {
    suggestion,
    isLoading,
    focused,
    setFocused,
    handleChange,
    handleKeyDown,
    accept,
    onCompositionStart: () => {
      composingRef.current = true;
      clear();
    },
    onCompositionEnd: () => {
      composingRef.current = false;
    },
    hintId,
  };
}
