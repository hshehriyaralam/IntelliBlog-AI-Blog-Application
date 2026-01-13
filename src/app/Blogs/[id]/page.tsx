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


export default function BlogDetail() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useSingleBlogQuery(id);
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

  
  if (isLoading) return <LoadingPage  />
  if (error) return <ErrorPage  className={`${themeValue ? light : dark}`} />
  if (!blog) return <BlogNotFound className={`${themeValue ? light : `text-gray-300 ${dark}`}`} />;


  const shortId = blog.userId?._id ? blog.userId._id.slice(-4) : null;
  const words = blog.blogTitle?.split(" ") || [];
  const shortTitle = words.slice(0, 4).join(" ");
  const contentWords = blog.blogContent?.split(" ") || [];
  const summaryWords = blog.blogSummary?.split(" ") || [];
  
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",});

  return (
    <div className={`w-full min-h-screen px-4 sm:px-6 py-10 ${themeValue ? light : dark}`}>
      <div className="max-w-full sm:max-w-4xl md:max-w-5xl mx-auto">

        {/* Blog Image */}
        <div className="w-full flex justify-center mb-6">
          <Image
            src={blog.blogImage}
            alt={blog.blogTitle}
            width={800}
            height={400}
            loading="lazy"
            className="w-[85%] sm:w-[80%] md:w-[95%] h-[280px] sm:h-[320px] md:h-[380px] rounded-lg shadow-lg object-cover hover:scale-[1.01] transition-transform duration-300"
          />
        </div>

        {/* Blog Title */}
        <h2 className={`text-3xl sm:text-4xl md:text-4xl font-bold mb-4 text-center tracking-wide ${themeValue ? lightText : DarkText}`}>
          {blog.blogTitle}
        </h2>

        {/* Author Line */}
        <p className={`text-center mb-10 italic font-medium ${themeValue ?"text-indigo-600":"text-indigo-400"}`}>
          By <span className="font-semibold">{blog.userId?.name || "Unknown Author"}</span> 
          {" "} · {formattedDate} · <span className="font-semibold">{shortTitle}{shortId}</span>
        </p>

        {/* Blog Content */}
        <div className="mb-12 px-2 sm:px-6">
          <h3 className={`text-2xl font-semibold mb-4 ${themeValue ? lightText : DarkText} ${currentIndex.section === "content-heading" ? "bg-yellow-300 px-2 rounded text-gray-700" : ""}`}>
            Content
          </h3>
          <p className={`leading-8 text-justify text-lg flex flex-wrap gap-1 ${ themeValue ? lightText : "text-gray-300"}`}>
            {contentWords.map((word:string, i:number) => (
              <span
                key={i}
                className={
                  currentIndex.section === "content" && i === currentIndex.index
                    ? "bg-yellow-300 px-1 rounded text-gray-700"
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
          <div className="mb-12 px-2 sm:px-6">
            <h3 className={`text-2xl font-semibold mb-4 ${themeValue ? lightText : DarkText} ${currentIndex.section === "summary-heading" ? "bg-yellow-300 px-2 rounded text-gray-700" : ""}`}>
              AI Summary
            </h3>
            <p className={`leading-8 text-justify text-lg flex flex-wrap gap-1 ${ themeValue ? lightText : "text-gray-300"}`}>
              {summaryWords.map((word:string, i:number) => (
                <span
                  key={i}
                  className={
                    currentIndex.section === "summary" && i === currentIndex.index
                      ? "bg-yellow-300 px-1 rounded text-gray-700"
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
      </div>
    </div>
  );
}
