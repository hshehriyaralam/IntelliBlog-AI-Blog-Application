"use client";

import { useParams } from "next/navigation";
import { useSingleBlogQuery } from "../../../Redux/Services/blogApi";
import { ContextTheme } from "../../../Context/DarkTheme";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import LoadingPage from "../../../components/layout/LoadingPage";
import ErrorPage from "../_component/error";
import BlogNotFound from "../_component/notFound";
import { useLoggedInUser } from "../../../hooks/LoggedInUser";
import { detectLang, type BlogLanguage } from "../../../lib/blogLanguage";
import { useBlogTranslation } from "../../../hooks/useBlogTranslation";
import BlogTranslateBar from "../../../components/blog/BlogTranslateBar";

const BlogTags = dynamic(() => import("../_component/blogTags"), { ssr: false });
const ActionRow = dynamic(() => import("../_component/ActionRow"), { ssr: false });
const AuthorInfo = dynamic(() => import("../_component/AuthorInfo"), { ssr: false });
const RelatedBlogs = dynamic(() => import("./_component/RelatedBlogs"), { ssr: false });
const BlogChat = dynamic(() => import("./_component/BlogChat"), { ssr: false });
const BlogReaderIntroModal = dynamic(() => import("../../../components/blog/BlogReaderIntroModal"), { ssr: false });

export default function BlogDetailClient({ translateEnabled }: { translateEnabled: boolean }) {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const { data, isLoading, isFetching, error } = useSingleBlogQuery(id ?? "", { skip: !id });
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);
  const { loggedInUserId } = useLoggedInUser();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<{ section: string; index: number | null }>({ section: "", index: null });
  const [showIntro, setShowIntro] = useState(false);
  const [introKey, setIntroKey] = useState("");
  const blog = data?.blog;
  const translation = useBlogTranslation(id || "", translateEnabled);

  useEffect(() => () => { window.speechSynthesis.cancel(); }, []);

  useEffect(() => {
    if (!loggedInUserId || !blog) return;
    const key = `intelliblog.aiReaderIntro.v1.${loggedInUserId}`;
    setIntroKey(key);
    let seen = false;
    let sessionShown = false;
    try {
      seen = localStorage.getItem(key) === "seen";
      sessionShown = sessionStorage.getItem("intelliblog.aiPopupShownThisSession") === "true";
    } catch {
      seen = false;
      sessionShown = false;
    }
    if (seen || sessionShown) return;
    let idleId: number | undefined;
    const showReaderIntro = () => {
      try {
        if (sessionStorage.getItem("intelliblog.aiPopupShownThisSession") === "true") return;
        sessionStorage.setItem("intelliblog.aiPopupShownThisSession", "true");
        localStorage.setItem("intelliblog.aiTranslateHint.v1", "seen");
      } catch {
        // The session state is best effort when storage is unavailable.
      }
      setShowIntro(true);
    };
    const timer = window.setTimeout(showReaderIntro, 800);
    if (typeof window.requestIdleCallback === "function") {
      window.clearTimeout(timer);
      idleId = window.requestIdleCallback(showReaderIntro, { timeout: 800 });
    }
    return () => {
      window.clearTimeout(timer);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
    };
  }, [blog, loggedInUserId]);

  const markIntroSeen = () => {
    if (introKey) {
      try { localStorage.setItem(introKey, "seen"); } catch { /* dismiss remains available */ }
    }
    setShowIntro(false);
  };

  const remindLater = () => {
    if (introKey) {
      try {
        const key = `${introKey}.reminders`;
        const count = Number(localStorage.getItem(key) || "0") + 1;
        if (count >= 2) localStorage.setItem(introKey, "seen");
        localStorage.setItem(key, String(count));
      } catch { /* dismiss remains available */ }
    }
    setShowIntro(false);
  };

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
  const translated = Boolean(translation.translation && translation.activeLang);
  const textLang = translation.activeLang || "en";
  const isUrdu = textLang === "ur";
  const contentWords = content.split(" ");
  const summaryWords = summary.split(" ");
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
          <div className="mb-12">
            <h2 className={`mb-4 text-3xl font-black tracking-[-0.04em] text-[var(--ink)] ${currentIndex.section === "content-heading" ? "rounded bg-[var(--yellow)] px-2" : ""}`}>Content</h2>
            <p lang={isUrdu ? "ur" : "en"} dir={isUrdu ? "rtl" : "ltr"} className={`flex flex-wrap gap-1 text-justify text-lg leading-[1.7] text-[var(--muted)] ${isUrdu ? "font-[var(--font-noto-arabic)] text-right text-xl leading-[2]" : ""}`}>{contentWords.map((word: string, index: number) => <span key={index} className={currentIndex.section === "content" && index === currentIndex.index ? "rounded bg-[var(--yellow)] px-1 text-[var(--ink)]" : ""}>{word}</span>)}</p>
          </div>
          {summary && <div className="mb-12 rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] p-5 shadow-[var(--sh-card)]"><h2 className={`mb-4 text-3xl font-black tracking-[-0.04em] text-[var(--ink)] ${currentIndex.section === "summary-heading" ? "rounded bg-[var(--paper)] px-2" : ""}`}>AI Summary</h2><p lang={isUrdu ? "ur" : "en"} dir={isUrdu ? "rtl" : "ltr"} className={`flex flex-wrap gap-1 text-justify text-lg leading-[1.7] text-[var(--muted)] ${isUrdu ? "font-[var(--font-noto-arabic)] text-right text-xl leading-[2]" : ""}`}>{summaryWords.map((word: string, index: number) => <span key={index} className={currentIndex.section === "summary" && index === currentIndex.index ? "rounded bg-[var(--paper)] px-1 text-[var(--ink)]" : ""}>{word}</span>)}</p></div>}
        </div>
        <BlogTags blog={blog} />
        <ActionRow blogId={blog._id} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setCurrentIndex={setCurrentIndex} themeValue={themeValue} />
        <AuthorInfo blog={blog} themeValue={themeValue} lightText={lightText} DarkText={DarkText} />
        <RelatedBlogs blogId={blog._id} />
      </article>
      <BlogChat blogId={blog._id} />
      {showIntro && <BlogReaderIntroModal onSeen={markIntroSeen} onLater={remindLater} />}
    </div>
  );
}
