"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 py-16">
      <section className="w-full max-w-xl rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--pink)] p-8 text-center shadow-[var(--sh-card)]">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--muted)]">Something went wrong</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[var(--ink)]">We hit a wobble.</h1>
        <p className="mt-3 font-medium text-[var(--ink)]">Try loading this page again.</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-7 inline-flex min-h-11 items-center rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-6 font-extrabold text-[var(--ink)] shadow-[var(--sh-btn)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
