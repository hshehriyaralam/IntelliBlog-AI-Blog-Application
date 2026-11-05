import React from "react";
import HeroTopButtons from "./heroTopButtons";
import { AIBubble, HeartCircle } from "../ui/stickers";

function ArticleIllustration({ articleCount }: { articleCount: number }) {
  return (
    <div className="relative mx-auto h-[310px] w-full max-w-[390px] sm:h-[360px]">
      <div className="absolute bottom-3 left-[16%] h-56 w-[66%] rotate-[-5deg] rounded-[26px] border-[5px] border-[var(--ink)] bg-[var(--rose)] shadow-[7px_7px_0_var(--ink)] sm:h-64">
        <div className="absolute -top-8 left-[12%] h-56 w-[78%] rotate-[7deg] rounded-[18px] border-[5px] border-[var(--ink)] bg-[var(--paper)] shadow-[7px_7px_0_var(--ink)] sm:-top-10 sm:h-64">
          <div className="flex h-8 items-center gap-2 border-b-[4px] border-[var(--ink)] bg-[var(--yellow)] px-3">
            <i className="size-3 rounded-full border-2 border-[var(--ink)] bg-[var(--pink)]" />
            <i className="size-3 rounded-full border-2 border-[var(--ink)] bg-[var(--blue)]" />
            <i className="size-3 rounded-full border-2 border-[var(--ink)] bg-[var(--mint)]" />
          </div>
          <div className="space-y-3 p-4">
            <div className="h-3 w-4/5 rounded-full bg-[var(--ink)]" />
            <div className="h-3 w-3/5 rounded-full bg-[var(--ink)]" />
            <div className="h-24 rounded-lg border-[3px] border-[var(--ink)] bg-[var(--blue)]">
              <div className="mt-12 h-12 border-t-[4px] border-[var(--ink)] bg-[var(--teal)] [clip-path:polygon(0_100%,25%_30%,50%_70%,70%_35%,100%_100%)]" />
            </div>
            <div className="flex gap-2">
              <span className="h-4 w-14 rounded-full border-2 border-[var(--ink)] bg-[var(--mint)]" />
              <span className="h-4 w-12 rounded-full border-2 border-[var(--ink)] bg-[var(--rose)]" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-7 right-[-12%] h-28 w-7 rotate-[42deg] border-[5px] border-[var(--ink)] bg-[var(--teal)] shadow-[5px_5px_0_var(--ink)]" />
      </div>
      <AIBubble className="absolute left-0 top-12 w-24 sm:left-2 sm:w-28" />
      <HeartCircle className="absolute bottom-7 right-[4%] w-20 sm:right-0 sm:w-24" />
      <span className="absolute bottom-0 right-[14%] rounded-full border-[3px] border-[var(--ink)] bg-[var(--mint)] px-3 py-1 text-xs font-extrabold shadow-[3px_3px_0_var(--ink)]">
        ✓ {articleCount} articles live
      </span>
    </div>
  );
}

const aiHighlights = [
  "AI title & summary",
  "AI image generation",
  "Inline suggestions",
  "Blog Q&A chat",
  "Urdu / Roman Urdu translation",
];

function HeroTopCard({ articleCount }: { articleCount: number }) {
  return (
    <section className="relative grid min-h-[610px] w-full grid-cols-1 items-center gap-8 overflow-hidden rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--paper)] px-6 py-10 shadow-[var(--sh-card)] md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-16">
      <div className="relative z-10 max-w-2xl">
        <p className="mb-5 text-base font-medium text-[var(--muted)]">Hi, welcome to IntelliBlog.</p>
        <h1 className="font-black uppercase leading-[0.86] tracking-[-0.06em] text-[clamp(3.75rem,8vw,7rem)] text-[var(--ink)]">
          <span className="block">Blog with</span>
          <span className="mt-4 inline-block -rotate-[1.6deg] rounded-[20px] border-[4px] border-[var(--ink)] bg-[var(--rose)] px-3 py-2 shadow-[7px_7px_0_var(--ink)]">
            a brain.
          </span>
        </h1>
        <p className="mt-10 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
          IntelliBlog brings AI into every step of your writing workflow — from generating a title and summary to creating blog visuals, suggesting better content, answering blog questions, and translating into Urdu or Roman Urdu.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {aiHighlights.map((feature) => (
            <span
              key={feature}
              className="rounded-full border-[2.5px] border-[var(--ink)] bg-[var(--yellow)] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[-0.04em] text-[var(--ink)] shadow-[3px_3px_0_var(--ink)]"
            >
              {feature}
            </span>
          ))}
        </div>
        <HeroTopButtons />
      </div>
      <ArticleIllustration articleCount={articleCount} />
    </section>
  );
}

export default React.memo(HeroTopCard);
