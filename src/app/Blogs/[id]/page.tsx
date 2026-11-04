"use client";
import { useParams } from "next/navigation";
import { useSingleBlogQuery } from "../../../Redux/Services/blogApi"; 
import { ContextTheme } from "../../../Context/DarkTheme";
import { useContext, useState, useEffect } from "react";
import LoadingPage from  '../../../components/layout/LoadingPage';
import ErrorPage from "../_component/error";
import BlogNotFound from "../_component/notFound";
import Image from "next/image";
import dynamic from "next/dynamic";

const BlogTags = dynamic(() => import("../_component/blogTags"), { ssr: false });
const ActionRow = dynamic(() => import("../_component/ActionRow"), { ssr: false });
const AuthorInfo = dynamic(() => import("../_component/AuthorInfo"), { ssr: false });
const RelatedBlogs = dynamic(() => import("./_component/RelatedBlogs"), { ssr: false });
const BlogChat = dynamic(() => import("./_component/BlogChat"), { ssr: false });


export default function BlogDetail() {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const { data, isLoading, isFetching, error } = useSingleBlogQuery(id ?? "", { skip: !id });
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<{ section: string; index: number | null }>({
    section: "",
    index: null,
  });
  const blog = data?.blog




  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel(); 
    };
  }, []);

  
  if (!id || (isLoading && !blog) || (isFetching && !blog)) return <LoadingPage />;
  if (!blog && error) return <ErrorPage className={`${themeValue ? light : dark}`} />;
  if (!blog) return <BlogNotFound className={`${themeValue ? light : `text-gray-300 ${dark}`}`} />;


  const words = blog.blogTitle?.split(" ") || [];
  const shortTitle = words.slice(0, 4).join(" ");
  const contentWords = blog.blogContent?.split(" ") || [];
  const summaryWords = blog.blogSummary?.split(" ") || [];
  
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",});

  return (
    <div className="w-full px-4 py-10 sm:px-6 md:py-16">
      <article className="mx-auto w-full max-w-[760px]">

        {/* Blog Image */}
        <div className="mb-8 w-full">
          <Image
            src={blog.blogImage}
            alt={blog.blogTitle}
            width={800}
            height={400}
            priority
            sizes="(max-width: 760px) 100vw, 760px"
            className="h-[240px] w-full rounded-[var(--r-card)] border-[3px] border-[var(--ink)] object-cover shadow-[var(--sh-card)] sm:h-[360px]"
          />
        </div>

        {/* Blog Title */}
        <h1 className="mb-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] text-[var(--ink)] sm:text-6xl">
          {blog.blogTitle}
        </h1>

        {/* Author Line */}
        <p className="mb-8 border-b-[3px] border-[var(--ink)] pb-6 text-sm font-medium text-[var(--muted)] sm:text-base">
          By <span className="font-extrabold text-[var(--ink)]">{blog.userId?.name || "Unknown Author"}</span>
          {" "} · {formattedDate} · <span className="font-extrabold text-[var(--ink)]">{shortTitle}</span>
        </p>

        {/* Blog Content */}
        <div className="mb-12">
          <h2 className={`mb-4 text-3xl font-black tracking-[-0.04em] text-[var(--ink)] ${currentIndex.section === "content-heading" ? "rounded bg-[var(--yellow)] px-2" : ""}`}>
            Content
          </h2>
          <p className="flex flex-wrap gap-1 text-justify text-lg leading-[1.7] text-[var(--muted)]">
            {contentWords.map((word:string, i:number) => (
              <span
                key={i}
                className={
                  currentIndex.section === "content" && i === currentIndex.index
                    ? "rounded bg-[var(--yellow)] px-1 text-[var(--ink)]"
                    : ""
                }
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Blog Summary */}
        {blog.blogSummary && (
          <div className="mb-12 rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] p-5 shadow-[var(--sh-card)]">
            <h2 className={`mb-4 text-3xl font-black tracking-[-0.04em] text-[var(--ink)] ${currentIndex.section === "summary-heading" ? "rounded bg-[var(--paper)] px-2" : ""}`}>
              AI Summary
            </h2>
            <p className="flex flex-wrap gap-1 text-justify text-lg leading-[1.7] text-[var(--muted)]">
              {summaryWords.map((word:string, i:number) => (
                <span
                  key={i}
                  className={
                    currentIndex.section === "summary" && i === currentIndex.index
                      ? "rounded bg-[var(--paper)] px-1 text-[var(--ink)]"
                      : ""}>
                  {word}
                </span>
              ))}
            </p>
          </div>
        )}

        {/* Tags */}
        <BlogTags blog={blog} />

        {/* Actions Row */}
          <ActionRow 
          blogId={blog._id}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentIndex={setCurrentIndex}
          themeValue={themeValue}
          />

        {/* Author Info Bottom */}
        <AuthorInfo 
          blog={blog}
          themeValue={themeValue}
          lightText={lightText}
          DarkText={DarkText}
        />
        <RelatedBlogs blogId={blog._id} />
      </article>
      <BlogChat blogId={blog._id} />
    </div>
  );
}
