"use client";

import { useParams } from "next/navigation";
import { useSingleBlogQuery } from "../../../Redux/Services/blogApi";
import { ContextTheme } from "../../../Context/DarkTheme";
import { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import LoadingPage from "../../../components/layout/LoadingPage";
import ErrorPage from "../_component/error";
import BlogNotFound from "../_component/notFound";
import { detectLang, type BlogLanguage } from "../../../lib/blogLanguage";
import { useBlogTranslation } from "../../../hooks/useBlogTranslation";
import BlogTranslateBar from "../../../components/blog/BlogTranslateBar";

const BlogTags = dynamic(() => import("../_component/blogTags"), { ssr: false });
const ActionRow = dynamic(() => import("../_component/ActionRow"), { ssr: false });
const AuthorInfo = dynamic(() => import("../_component/AuthorInfo"), { ssr: false });
const RelatedBlogs = dynamic(() => import("./_component/RelatedBlogs"), { ssr: false });
const BlogChat = dynamic(() => import("./_component/BlogChat"), { ssr: false });
const AIFeaturePopup = dynamic(() => import("../../../components/blog/AIFeaturePopup"), { ssr: false });

type CurrentIndex = { section: string; index: number | null };

const HighlightedWord = memo(function HighlightedWord({
  word,
  active,
  highlightClassName,
}: {
  word: string;
  active: boolean;
  highlightClassName: string;
}) {
  return <span className={active ? highlightClassName : ""}>{word}</span>;
});

function BlogReadingSection({
  content,
  summary,
  isUrdu,
  blogId,
  themeValue,
}: {
  content: string;
  summary: string;
  isUrdu: boolean;
  blogId: string;
  themeValue: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<CurrentIndex>({ section: "", index: null });
  const contentWords = useMemo(() => content.split(" "), [content]);
  const summaryWords = useMemo(() => summary.split(" "), [summary]);
  const updateCurrentIndex = useCallback((next: CurrentIndex) => {
    setCurrentIndex((current) => (
      current.section === next.section && current.index === next.index ? current : next
    ));
  }, []);

  return (
    <>
      <div className="mb-12">
        <h2 className={`mb-4 text-3xl font-black tracking-[-0.04em] text-[var(--ink)] ${currentIndex.section === "content-heading" ? "rounded bg-[var(--yellow)] px-2" : ""}`}>Content</h2>
        <p lang={isUrdu ? "ur" : "en"} dir={isUrdu ? "rtl" : "ltr"} className={`flex flex-wrap gap-1 text-justify text-lg leading-[1.7] text-[var(--muted)] ${isUrdu ? "font-[var(--font-noto-arabic)] text-right text-xl leading-[2]" : ""}`}>{contentWords.map((word, index) => <HighlightedWord key={index} word={word} active={currentIndex.section === "content" && index === currentIndex.index} highlightClassName="rounded bg-[var(--yellow)] px-1 text-[var(--ink)]" />)}</p>
      </div>
      {summary && (
        <div className="mb-12 rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] p-5 shadow-[var(--sh-card)]">
          <h2 className={`mb-4 text-3xl font-black tracking-[-0.04em] text-[var(--ink)] ${currentIndex.section === "summary-heading" ? "rounded bg-[var(--paper)] px-2" : ""}`}>AI Summary</h2>
          <p lang={isUrdu ? "ur" : "en"} dir={isUrdu ? "rtl" : "ltr"} className={`flex flex-wrap gap-1 text-justify text-lg leading-[1.7] text-[var(--muted)] ${isUrdu ? "font-[var(--font-noto-arabic)] text-right text-xl leading-[2]" : ""}`}>{summaryWords.map((word, index) => <HighlightedWord key={index} word={word} active={currentIndex.section === "summary" && index === currentIndex.index} highlightClassName="rounded bg-[var(--paper)] px-1 text-[var(--ink)]" />)}</p>
        </div>
      )}
      <ActionRow blogId={blogId} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setCurrentIndex={updateCurrentIndex} themeValue={themeValue} />
    </>
  );
}

export default function BlogDetailClient({ translateEnabled }: { translateEnabled: boolean }) {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const { data, isLoading, isFetching, error } = useSingleBlogQuery(id ?? "", { skip: !id });
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);
  const blog = data?.blog;
  const translation = useBlogTranslation(id || "", translateEnabled);

  useEffect(() => () => { window.speechSynthesis.cancel(); }, []);

  if (!id || (isLoading && !blog) || (isFetching && !blog)) return <LoadingPage />;
  if (!blog && error) return <ErrorPage className={`${themeValue ? light : dark}`} />;
  if (!blog) return <BlogNotFound className={`${themeValue ? light : `text-gray-300 ${dark}`}`} />;

  const originalTitle = blog.blogTitle || "";
  const originalSummary = blog.blogSummary || "";
  const originalContent = blog.blogContent || "";
  const sourceLang: BlogLanguage = detectLang(`${originalTitle}\n${originalSummary}\n${originalContent}`);
  const title = translation.translation?.title || originalTitle;
  const summary = translation.translation?.summary || originalSummary;
  const content = translation.translation?.content || originalContent;
  const textLang = translation.activeLang || "en";
  const isUrdu = textLang === "ur";
  const shortTitle = originalTitle.split(" ").slice(0, 4).join(" ");
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="w-full px-4 py-10 sm:px-6 md:py-16">
      <article className="mx-auto w-full max-w-[760px]" aria-busy={translation.loading}>
        <div className="mb-8 w-full"><Image src={blog.blogImage} alt={originalTitle} width={800} height={400} priority sizes="(max-width: 760px) 100vw, 760px" className="h-[240px] w-full rounded-[var(--r-card)] border-[3px] border-[var(--ink)] object-cover shadow-[var(--sh-card)] sm:h-[360px]" /></div>
        <div className={translation.loading ? "opacity-50" : "opacity-100"}>
          <h1 lang={isUrdu ? "ur" : "en"} dir={isUrdu ? "rtl" : "ltr"} className={`mb-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] text-[var(--ink)] sm:text-6xl ${isUrdu ? "font-[var(--font-noto-arabic)] text-right leading-[1.2]" : ""}`}>{title}</h1>
          <p className="mb-8 border-b-[3px] border-[var(--ink)] pb-6 text-sm font-medium text-[var(--muted)] sm:text-base">By <span className="font-extrabold text-[var(--ink)]">{blog.userId?.name || "Unknown Author"}</span>{" "} · {formattedDate} · <span className="font-extrabold text-[var(--ink)]">{shortTitle}</span></p>
          <BlogTranslateBar sourceLang={sourceLang} activeLang={translation.activeLang} loading={translation.loading} error={translation.error} enabled={translateEnabled} onSelect={translation.selectLanguage} onOriginal={translation.showOriginal} />
        </div>
        <BlogTags blog={blog} />
        <BlogReadingSection content={content} summary={summary} isUrdu={isUrdu} blogId={blog._id} themeValue={themeValue} />
        <AuthorInfo blog={blog} themeValue={themeValue} lightText={lightText} DarkText={DarkText} />
        <RelatedBlogs blogId={blog._id} />
      </article>
      <BlogChat blogId={blog._id} />
      <AIFeaturePopup key={blog._id} page="blog" />
    </div>
  );
}
