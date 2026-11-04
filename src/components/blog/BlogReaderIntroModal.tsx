"use client";

import { useEffect, useRef } from "react";

type Props = { onSeen: () => void; onLater: () => void };

export default function BlogReaderIntroModal({ onSeen, onLater }: Props) {
  const firstRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onLater();
      if (event.key === "Tab") {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-reader-intro-button]"));
        if (!buttons.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKeyDown); };
  }, [onLater]);
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(42,42,42,.55)] p-4" role="dialog" aria-modal="true" aria-labelledby="reader-intro-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onLater(); }}>
      <section className="relative max-h-[85dvh] w-full max-w-[560px] overflow-y-auto rounded-[var(--r-card)] border-[4px] border-[var(--ink)] bg-[var(--paper)] p-5 shadow-[var(--sh-card)] md:p-7">
        <span className="absolute -right-2 -top-4 rotate-6 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-3 py-1 text-sm font-black shadow-[var(--sh-chip)]">NEW</span>
        <button type="button" data-reader-intro-button onClick={onLater} aria-label="Close introduction" className="absolute right-3 top-3 min-h-11 min-w-11 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] text-xl font-black">×</button>
        <p className="mb-2 text-3xl" aria-hidden="true">✦</p>
        <h2 id="reader-intro-title" className="pr-10 text-3xl font-black tracking-[-0.04em] md:text-5xl">Read and chat with AI</h2>
        <p className="mt-2 text-sm font-medium leading-6 text-[var(--muted)]">Two smart tools on every blog.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--mint)] p-4"><span className="mb-2 inline-block rounded-[var(--r-btn)] border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 py-1 text-[10px] font-black">NEW</span><h3 className="text-xl font-black">AI-Translate</h3><p className="mt-2 text-sm font-medium leading-6">Read any blog in English, Urdu or Roman Urdu. Use the Read in buttons and go back to the original anytime.</p></div>
          <div className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--rose)] p-4"><span className="mb-2 inline-block rounded-[var(--r-btn)] border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 py-1 text-[10px] font-black">NEW</span><h3 className="text-xl font-black">AI-Chat</h3><p className="mt-2 text-sm font-medium leading-6">Ask questions about the blog. AI answers only from this blog and says “I don&apos;t know” when it is not there.</p></div>
        </div>
        <p className="mt-4 text-xs font-medium leading-5 text-[var(--muted)]">Translations and chat answers are made by AI, so they may have small mistakes.</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" data-reader-intro-button onClick={onLater} className="min-h-11 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--paper)] px-4 font-extrabold">Remind me later</button><button type="button" data-reader-intro-button ref={firstRef} onClick={onSeen} className="min-h-11 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-5 font-extrabold shadow-[var(--sh-btn)]">Got it, let&apos;s read</button></div>
      </section>
    </div>
  );
}
