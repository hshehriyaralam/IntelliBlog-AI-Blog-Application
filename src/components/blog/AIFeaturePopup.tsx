"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type AIFeaturePopupProps = {
  page: "home" | "create" | "blog";
};

const HOME_SEEN_KEY = "intelliblog.aiHomeIntro.v1.seen";

const content = {
  home: {
    eyebrow: "Meet IntelliBlog AI",
    title: "Your ideas, with AI.",
    features: [
      "AI-generated summaries",
      "AI inline writing suggestions",
      "AI blog image generation",
      "AI translation to Urdu & Roman Urdu",
      "AI chat to ask questions about blogs",
    ],
    action: "Try AI writing",
    href: "/Create",
  },
  create: {
    eyebrow: "AI writing tools",
    title: "Create with a little help.",
    features: [
      "Generate a blog summary and tags",
      "Get inline writing suggestions",
      "Generate an image for your blog",
    ],
    action: "Got it, let's write",
    href: null,
  },
  blog: {
    eyebrow: "AI reading tools",
    title: "Get more from this blog.",
    features: [
      "Chat with AI about this blog",
      "Translate it into Urdu or Roman Urdu",
    ],
    action: "Got it, let's read",
    href: null,
  },
} as const;

export default function AIFeaturePopup({ page }: AIFeaturePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const details = content[page];

  useEffect(() => {
    if (page === "home") {
      try {
        if (window.localStorage.getItem(HOME_SEEN_KEY) === "true") return;
      } catch {
        // Show the introduction when browser storage is unavailable.
      }
    }

    setIsOpen(true);
    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [page]);

  const dismiss = () => {
    if (page === "home") {
      try {
        window.localStorage.setItem(HOME_SEEN_KEY, "true");
      } catch {
        // Dismissal still applies for the current page when storage is unavailable.
      }
    }
    setIsVisible(false);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label={details.eyebrow}
      className={`fixed bottom-3 right-3 z-[90] w-[calc(100vw-1.5rem)] max-w-[350px] rounded-[22px] border-[3px] border-[var(--ink)] bg-[var(--paper)] p-4 shadow-[6px_6px_0_var(--ink)] transition-[transform,opacity] duration-150 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none sm:bottom-6 sm:right-6 sm:p-5 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      {page !== "home" && (
        <button
          type="button"
          aria-label="Close AI feature popup"
          onClick={dismiss}
          className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-[10px] border-[2px] border-[var(--ink)] bg-[var(--white)] text-xl font-black text-[var(--ink)] shadow-[2px_2px_0_var(--ink)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]"
        >
          ×
        </button>
      )}

      <p className="mb-1 pr-12 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--muted)]">
        {details.eyebrow}
      </p>
      <h2 className="pr-10 text-xl font-black leading-tight tracking-[-0.045em] text-[var(--ink)] sm:text-2xl">
        {details.title}
      </h2>
      <ul className="mt-3 grid gap-1.5">
        {details.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-[13px] font-semibold leading-5 text-[var(--ink)]"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--mint)] text-[10px] font-black leading-none"
            >
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {page === "home" ? (
        <button
          type="button"
          onClick={dismiss}
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-[12px] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-4 py-2 text-sm font-extrabold text-[var(--ink)] shadow-[3px_3px_0_var(--ink)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]"
        >
          Cancel
        </button>
      ) : details.href ? (
        <Link
          href={details.href}
          onClick={dismiss}
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-[12px] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-4 py-2 text-sm font-extrabold text-[var(--ink)] shadow-[3px_3px_0_var(--ink)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]"
        >
          {details.action}
        </Link>
      ) : (
        <button
          type="button"
          onClick={dismiss}
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-[12px] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-4 py-2 text-sm font-extrabold text-[var(--ink)] shadow-[3px_3px_0_var(--ink)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]"
        >
          {details.action}
        </button>
      )}
    </aside>
  );
}
