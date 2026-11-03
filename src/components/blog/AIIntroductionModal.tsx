"use client";

import { useEffect } from "react";

type Props = { onSeen: () => void; onLater: () => void };

export default function AIIntroductionModal({ onSeen, onLater }: Props) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onLater();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onLater]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(42,42,42,.55)] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-intro-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onLater();
      }}
    >
      <section className="relative w-full max-w-[560px] rounded-[var(--r-card)] border-[4px] border-[var(--ink)] bg-[var(--paper)] p-5 shadow-[var(--sh-card)] md:p-7">
        <span className="absolute -right-2 -top-4 rotate-6 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-3 py-1 text-sm font-black shadow-[var(--sh-chip)]">
          NEW
        </span>
        <button
          type="button"
          onClick={onLater}
          aria-label="Close introduction"
          className="absolute right-3 top-3 min-h-11 min-w-11 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] text-xl font-black"
        >
          ×
        </button>
        <p className="mb-2 text-3xl" aria-hidden="true">✦</p>
        <h2 id="ai-intro-title" className="pr-10 text-3xl font-black tracking-[-0.04em] md:text-5xl">
          Meet your AI helpers
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--mint)] p-4">
            <h3 className="text-xl font-black">AI-Summary</h3>
            <p className="mt-2 text-sm font-medium leading-6">Generate a polished summary and useful tags from your article.</p>
          </div>
          <div className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--rose)] p-4">
            <h3 className="text-xl font-black">AI-Assistant</h3>
            <p className="mt-2 text-sm font-medium leading-6">Get short writing suggestions while you draft. Press Tab to accept.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button type="button" onClick={onLater} className="min-h-11 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--paper)] px-4 font-extrabold">
            Remind me later
          </button>
          <button type="button" onClick={onSeen} className="min-h-11 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-5 font-extrabold shadow-[var(--sh-btn)]">
            Got it, let&apos;s write
          </button>
        </div>
      </section>
    </div>
  );
}
