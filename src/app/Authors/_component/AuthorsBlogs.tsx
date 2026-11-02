'use client'
import React, { useState,memo } from "react";
import { User  } from "lucide-react";
import Image from "next/image";




const  AuthorsBlog = React.memo(({blog, themeValue, light, dark}:any) =>  {
    const [imgError, setImgError] = useState(false);
    const hasImage = blog?.userId?.profilePic && blog?.userId?.profilePic.trim() !== "" && !imgError;


    return(
        <div
          className="overflow-hidden rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--white)] shadow-[var(--sh-card)] transition-transform hover:-translate-y-1"
        >
          {/* Image with Gradient */}
          <div className="relative h-48 overflow-hidden border-b-[3px] border-[var(--ink)] bg-[var(--blue)]">
            <Image
              width={400}
              height={400}
              loading="lazy"
              src={blog.blogImage}
              alt={blog.blogTitle}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Tags */}
            {blog.blogTags.length > 0 && (
              <div className="absolute bottom-2 left-3 flex flex-wrap gap-2">
                {blog.blogTags.slice(0, 2).map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex rounded-full border-2 border-[var(--ink)] bg-[var(--mint)] px-3 py-1 text-xs font-extrabold text-[var(--ink)] shadow-[var(--sh-chip)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3
              className="mb-2 text-lg font-black text-[var(--ink)]"
            >
              {blog.blogTitle}
            </h3>

            <p
              className="mb-3 line-clamp-2 text-sm leading-6 text-[var(--muted)]"
            >
              {blog.blogSummary}
            </p>

            {/* Author + Date */}
            <div className="flex items-center justify-between border-t-2 border-dashed border-[var(--ink)] pt-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full border-[3px] border-[var(--ink)] bg-[var(--blue)] p-0.5">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {hasImage ? (
                      <Image
                        width={36}
                        height={36}
                        loading="lazy"
                        src={blog.userId.profilePic}
                        alt={blog.userId?.name || "Author"}
                        className="w-9 h-9 rounded-full object-cover"
                        onError={() => setImgError(true)}
                        
                        />
                    ) : (
                      <User className="w-5 h-5 text-[var(--purple)]" />
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      themeValue ? "text-gray-800" : "text-white"
                    }`}
                  >
                    {blog.userId?.name || "Unknown Author"}
                  </p>
                  <p className="text-xs text-gray-500 ">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
})


export default AuthorsBlog;