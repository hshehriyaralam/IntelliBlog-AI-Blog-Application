"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function BlogChat({ blogId }: { blogId: string }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading) return;
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/blog-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, messages: nextMessages.slice(-8) }),
      });
      const data = (await response.json().catch(() => ({}))) as { answer?: string; code?: string };
      if (!response.ok || !data.answer) {
        const message = response.status === 401 || data.code === "UNAUTHORIZED"
          ? "Please sign in to use AI chat."
          : response.status === 429
            ? "AI chat is busy right now. Please try again in a minute."
            : data.code === "AI_CHAT_NOT_CONFIGURED"
              ? "AI chat is not configured right now."
              : response.status === 504
                ? "AI chat took too long to respond. Please try again."
                : "AI chat is temporarily unavailable. Please try again.";
        throw new Error(message);
      }
      setMessages((current) => [...current, { role: "assistant", content: data.answer! }]);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "AI chat is temporarily unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-[rgba(42,42,42,.35)] md:pointer-events-none md:bg-transparent" onClick={() => setOpen(false)}>
          <aside
            className="pointer-events-auto fixed inset-x-2 bottom-2 z-50 flex h-[min(78dvh,640px)] max-h-[calc(100dvh-1rem)] min-w-0 flex-col overflow-hidden rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--paper)] shadow-[var(--sh-card)] sm:inset-x-auto sm:left-1/2 sm:w-[min(520px,calc(100vw-2rem))] sm:-translate-x-1/2 md:bottom-6 md:left-auto md:right-6 md:h-[min(680px,calc(100dvh-3rem))] md:w-[min(420px,calc(100vw-3rem))] md:translate-x-0"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-chat-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-[3px] border-[var(--ink)] bg-[var(--mint)] p-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--muted)]">Ask AI</p>
                <h2 id="blog-chat-title" className="text-xl font-black">About this blog</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="min-h-11 min-w-11 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] text-xl font-black">×</button>
            </div>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
              {!messages.length && <p className="rounded-[var(--r-btn)] border-2 border-dashed border-[var(--ink)] p-3 text-sm text-[var(--muted)]">Ask a question about this blog. The assistant will only use this article.</p>}
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`max-w-[90%] whitespace-pre-wrap rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] p-3 text-sm leading-5 ${message.role === "user" ? "ml-auto bg-[var(--yellow)]" : "bg-[var(--white)]"}`}>
                  {message.content}
                </div>
              ))}
              {loading && <div className="w-fit rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] px-3 py-2 text-sm font-extrabold">Thinking...</div>}
              {error && <p className="text-sm font-extrabold text-[var(--pink)]">{error}</p>}
              <div ref={endRef} />
            </div>
            <form onSubmit={submit} className="flex shrink-0 gap-2 border-t-[3px] border-[var(--ink)] p-3">
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about this blog..." aria-label="Ask about this blog" className="min-w-0 flex-1 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] px-3 text-base outline-none focus:shadow-[4px_4px_0_var(--purple)]" />
              <button type="submit" disabled={loading || !input.trim()} className="min-h-11 min-w-11 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--purple)] px-3 font-black text-white shadow-[var(--sh-btn)] disabled:opacity-60">Send</button>
            </form>
          </aside>
        </div>
      )}
      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-20 right-4 z-30 min-h-12 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-4 font-black shadow-[var(--sh-btn)] md:bottom-5 md:right-8" aria-label="Ask AI about this blog">
        ✦ Ask AI
      </button>
    </>
  );
}
