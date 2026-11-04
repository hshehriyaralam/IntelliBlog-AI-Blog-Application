"use client";

import type { BlogLanguage } from "../../lib/blogLanguage";

type Props = {
  sourceLang: BlogLanguage;
  activeLang: BlogLanguage | null;
  loading: boolean;
  error: string;
  enabled: boolean;
  onSelect: (lang: BlogLanguage) => void;
  onOriginal: () => void;
};

const labels: Record<BlogLanguage, string> = { en: "English", ur: "Urdu", ro: "Roman Urdu" };

export default function BlogTranslateBar({ sourceLang, activeLang, loading, error, enabled, onSelect, onOriginal }: Props) {
  if (!enabled) return null;
  const targets = (["en", "ur", "ro"] as BlogLanguage[]).filter((lang) => lang !== sourceLang);
  return (
    <div className="mb-8 rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--paper)] p-3 shadow-[var(--sh-chip)]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="relative mr-1 text-sm font-black">
          Read in
          {!activeLang && (
            <span className="ml-2 inline-block -rotate-2 rounded-[var(--r-btn)] border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 py-0.5 text-[10px] font-black">NEW</span>
          )}
        </span>
        <button type="button" onClick={onOriginal} disabled={loading || !activeLang} className="min-h-11 rounded-[var(--r-chip)] border-2 border-[var(--ink)] bg-[var(--white)] px-3 text-sm font-extrabold disabled:opacity-50">
          Original
        </button>
        {targets.map((lang) => (
          <button type="button" key={lang} onClick={() => onSelect(lang)} disabled={loading} className={`min-h-11 rounded-[var(--r-chip)] border-2 border-[var(--ink)] px-3 text-sm font-extrabold shadow-[var(--sh-chip)] ${activeLang === lang ? "bg-[var(--mint)]" : "bg-[var(--yellow)]"} disabled:cursor-not-allowed disabled:opacity-50`}>
            {loading && activeLang !== lang ? labels[lang] : labels[lang]}
          </button>
        ))}
        {loading && <span className="rounded-[var(--r-chip)] border-2 border-[var(--ink)] bg-[var(--blue)] px-3 py-2 text-xs font-extrabold">Translating...</span>}
      </div>
      {activeLang && !loading && <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-[var(--r-btn)] border-2 border-[var(--ink)] bg-[var(--yellow)] px-3 py-2 text-xs font-extrabold"><span>Translated by AI. It may have small mistakes.</span><button type="button" onClick={onOriginal} className="min-h-9 rounded-[var(--r-btn)] border-2 border-[var(--ink)] bg-[var(--white)] px-2">Show original</button></div>}
      {error && <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm font-extrabold text-[var(--pink)]"><span>{error}</span><button type="button" onClick={() => onSelect(activeLang || targets[0])} className="min-h-10 rounded-[var(--r-btn)] border-2 border-[var(--ink)] bg-[var(--white)] px-3 text-[var(--ink)]">Retry</button></div>}
    </div>
  );
}
