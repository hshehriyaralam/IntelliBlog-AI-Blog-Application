"use client";
import { User } from "lucide-react";
import Loader from "./Loader";
import { useCallback, useState } from "react";
import { useAuthNavigate } from "@/hooks/useAuthNavigate";
import Image from "next/image";
import React from "react";
import LikeButton from "@/app/Blogs/_component/LikeButton";
import BookmarkButton from "@/app/Blogs/_component/BookmarkButton";

const BlogCard = React.memo(({ blog, isFeatured, themeValue, isLoading, accentIndex = 0 }: any) => {
  const { authNavigate } = useAuthNavigate();
  const [imgError, setImgError] = useState(false);
  const hasImage = blog.userId.profilePic && blog.userId.profilePic.trim() !== "" && !imgError;
  const imageSrc = blog.blogImage && blog.blogImage.trim() !== "" ? blog.blogImage : "/HeroImage.jpg";

  const handleNavigate = useCallback(() => {
    authNavigate(`/Blogs/${blog._id}`);
  }, [authNavigate, blog._id]);

  if (isLoading) return <Loader />;

  const accents = ["bg-[var(--blue)]", "bg-[var(--rose)]", "bg-[var(--mint)]", "bg-[var(--yellow)]"];

  return (
    <article onClick={handleNavigate} className="group cursor-pointer overflow-hidden rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--white)] shadow-[var(--sh-card)] transition-transform hover:-translate-y-1">
      <div className={`relative h-48 overflow-hidden border-b-[3px] border-[var(--ink)] ${accents[accentIndex % accents.length]}`}>
        <Image
          src={imageSrc}
          width={isFeatured ? 800 : 384}
          height={isFeatured ? 256 : 192}
          alt={blog.blogTitle}
          priority={isFeatured}
          loading={!isFeatured ? "lazy" : undefined}
          className="h-full w-full object-cover transition-transform duration-150 group-hover:scale-105"
        />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {blog.blogTags.slice(0, 2).map((tag: string, tagIndex: number) => (
            <span key={tagIndex} className="rounded-full border-2 border-[var(--ink)] bg-[var(--mint)] px-2 py-1 text-[10px] font-extrabold text-[var(--ink)] shadow-[2px_2px_0_var(--ink)]">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <h2 className="mb-3 line-clamp-2 text-xl font-black leading-[1] tracking-[-0.04em] text-[var(--ink)]">{blog.blogTitle}</h2>
        <p className="mb-4 line-clamp-3 text-sm leading-5 text-[var(--muted)]">{blog.blogSummary}</p>
        <div className="flex items-center justify-between border-t-2 border-dashed border-[var(--ink)] pt-3">
          <div className="flex size-9 items-center justify-center overflow-hidden rounded-full border-[3px] border-[var(--ink)] bg-[var(--yellow)]">
            {hasImage ? (
              <Image src={blog.userId.profilePic || "/default-avatar.png"} alt={`${blog.userId?.name || "Author"}-pic`} width={36} height={36} className="size-full object-cover" onError={() => setImgError(true)} loading="lazy" />
            ) : (
              <User className="size-5 text-[var(--ink)]" />
            )}
          </div>
          <div className="ml-3">
            <p className="text-xs font-extrabold text-[var(--ink)]">{blog.userId?.name || "Unknown Author"}</p>
            <p className="text-[11px] text-[var(--muted)]">
              {new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
            <LikeButton blogId={blog._id} />
            <BookmarkButton blogId={blog._id} />
          </div>
        </div>
      </div>
    </article>
  );
});

export default BlogCard;
