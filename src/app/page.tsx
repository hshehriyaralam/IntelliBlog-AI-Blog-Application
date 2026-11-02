"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Database, PlusCircle, Target, BookmarkCircle } from "../components/ui/stickers";
import LoadingPage from "@/components/layout/LoadingPage";
import HeroTopCard from "../components/HomeComponets/HeroTopCard";

const Blogs = dynamic(() => import("../components/layout/HomeBlogs"), {
  loading: () => <LoadingPage />,
});

const TopAuthors = dynamic(() => import("../components/common/Authors"), {
  loading: () => <LoadingPage />,
});

const Tags = dynamic(() => import("../components/HomeComponets/Tags"), {
  loading: () => <LoadingPage />,
});

const features = [
  {
    title: "Create with AI",
    description: "Write your post, hit Generate Summary & Tags and let AI handle the boring bits.",
    icon: <PlusCircle className="w-14" />,
  },
  {
    title: "Discover Blogs",
    description: "Search by title, content or author, then filter down by the tags that matter to you.",
    icon: <Target className="w-14" />,
  },
  {
    title: "Build a Collection",
    description: "Bookmark what you love and keep it all in one place to come back to anytime.",
    icon: <BookmarkCircle className="w-14" />,
  },
];

export default function Home() {
  return (
    <div className="w-full space-y-20 pb-8">
      <HeroTopCard />

      <div className="-mx-4 overflow-hidden rotate-[-1.4deg] border-y-[4px] border-[var(--ink)] bg-[var(--yellow)] px-4 py-4 shadow-[0_5px_0_var(--ink)] md:-mx-12 lg:-mx-24">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-lg font-black uppercase tracking-[-0.04em] sm:min-w-max sm:flex-nowrap sm:gap-14 sm:text-2xl">
          <span>Write</span><b>✦</b><span>Read</span><b>✦</b><span>Share</span><b>✦</b><span>Save</span><b>✦</b><span>Write</span>
        </div>
      </div>

      <section>
        <div className="mb-8 text-center">
          <p className="text-base font-medium text-[var(--muted)]">Passion led us here</p>
          <h2 className="mt-2 text-[clamp(2rem,5vw,3.625rem)] font-black leading-[0.95] tracking-[-0.045em]">What you can do here</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--white)] p-6 shadow-[var(--sh-card)]">
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-black tracking-[-0.04em]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-8 text-center">
          <p className="text-base font-medium text-[var(--muted)]">Fresh off the press</p>
          <h2 className="mt-2 text-[clamp(2rem,5vw,3.625rem)] font-black leading-[0.95] tracking-[-0.045em]">Latest from writers</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.85fr)]">
          <div className="contents">
            <Blogs />
          </div>
          <Link href="/Create" className="flex min-h-[300px] flex-col items-center justify-center rounded-[var(--r-card)] border-[3px] border-dashed border-[var(--ink)] bg-[var(--paper)] p-6 text-center transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]">
            <Database className="w-16" />
            <span className="mt-4 text-2xl font-black leading-none tracking-[-0.04em]">Your story<br />goes here.</span>
            <span className="mt-5 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--purple)] px-4 py-2 text-sm font-extrabold text-white shadow-[var(--sh-btn)]">Create blog</span>
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Tags />
        <TopAuthors navigate="/Authors" />
      </section>
    </div>
  );
}
