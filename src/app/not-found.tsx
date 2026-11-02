import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-[var(--paper)] px-4 py-16">
      <section className="w-full max-w-xl rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--rose)] p-8 text-center shadow-[var(--sh-card)]">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--muted)]">Lost page</p>
        <h1 className="mt-3 text-7xl font-black tracking-[-0.06em] text-[var(--ink)]">404</h1>
        <p className="mt-3 text-lg font-medium text-[var(--ink)]">This page wandered off.</p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-11 items-center rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-6 font-extrabold text-[var(--ink)] shadow-[var(--sh-btn)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]"
        >
          Back home
        </Link>
      </section>
    </main>
  );
}
