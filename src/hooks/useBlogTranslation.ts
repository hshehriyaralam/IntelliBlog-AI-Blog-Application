"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BlogLanguage } from "../lib/blogLanguage";

export type Translation = {
  lang: BlogLanguage;
  sourceLang: BlogLanguage;
  title: string;
  summary: string;
  content: string;
  cached: boolean;
  provider: string;
};

const cache = new Map<string, Translation>();
const CACHE_LIMIT = 60;

export function useBlogTranslation(blogId: string, enabled: boolean) {
  const [activeLang, setActiveLang] = useState<BlogLanguage | null>(null);
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const controllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    requestIdRef.current += 1;
    setActiveLang(null);
    setTranslation(null);
    setLoading(false);
    setError("");
  }, [blogId]);

  const selectLanguage = useCallback(async (lang: BlogLanguage) => {
    if (!enabled) return;
    const cached = cache.get(`${blogId}:${lang}`);
    if (cached) {
      setTranslation(cached);
      setActiveLang(lang);
      setError("");
      return;
    }
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError("");
    const timeout = window.setTimeout(() => controller.abort(), 35_000);
    try {
      const response = await fetch("/api/blog-translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, lang }),
        signal: controller.signal,
      });
      const data = (await response.json()) as Translation & { code?: string };
      if (!response.ok || !data.title || requestId !== requestIdRef.current) {
        if (response.status === 413 || data.code === "TOO_LONG") throw new Error("TOO_LONG");
        if (response.status === 429 || data.code === "RATE_LIMITED" || data.code === "BUSY") throw new Error("RATE_LIMITED");
        throw new Error("TRANSLATE_FAILED");
      }
      cache.set(`${blogId}:${lang}`, data);
      if (cache.size > CACHE_LIMIT) cache.delete(cache.keys().next().value as string);
      setTranslation(data);
      setActiveLang(lang);
    } catch (reason) {
      if (reason instanceof DOMException && reason.name === "AbortError") return;
      setError(reason instanceof Error && reason.message === "TOO_LONG"
        ? "This blog is too long to translate right now."
        : reason instanceof Error && reason.message === "RATE_LIMITED"
          ? "Too many requests. Please wait a minute."
          : "Sorry, translation isn't available right now. Please try again.");
    } finally {
      window.clearTimeout(timeout);
      if (controllerRef.current === controller) controllerRef.current = null;
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, [blogId, enabled, loading]);

  const showOriginal = useCallback(() => {
    controllerRef.current?.abort();
    setActiveLang(null);
    setTranslation(null);
    setError("");
  }, []);

  return { activeLang, translation, loading, error, selectLanguage, showOriginal };
}
