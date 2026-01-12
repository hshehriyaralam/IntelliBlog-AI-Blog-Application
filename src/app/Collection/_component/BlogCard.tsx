"use client";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CollectionsBlogCard({
  bookmark,
  themeValue,
  light,
  dark,
}: any) {
    const [imgError, setImgError] = useState(false);
   const blog = bookmark.blogId;
   const hasImage = blog?.userId?.profilePic && blog.userId.profilePic.trim() !== "" && !imgError;  
  return (
    <Link href={`/Blogs/${blog._id}`}>
      <div
        className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer
          ${themeValue ? `${light} border border-gray-200` : `${dark} border border-gray-700`}
        `}
        key={bookmark._id}
      >
        {/* Image with Gradient */}
        <div className="relative h-48 overflow-hidden">
          <Image
          width={400}
          height={300}
          loading="lazy"
            src={blog.blogImage}
            alt={blog.blogTitle}
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          {/* Tags */}
          {blog.blogTags.length > 0 && (
            <div className="absolute bottom-2 left-3 flex flex-wrap gap-2">
              {blog.blogTags.slice(0, 2).map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
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
            className={`font-semibold mb-2 text-lg ${
              themeValue ? "text-gray-800" : "text-white"
            }`}
          >
            {blog.blogTitle}
          </h3>

          <p
            className={`text-sm mb-3 line-clamp-2 ${
              themeValue ? "text-gray-600" : "text-gray-300"
            }`}
          >
            {blog.blogSummary}
          </p>

          {/* Author + Date */}
          <div
            className={`flex items-center justify-between pt-3 
              ${
                themeValue
                  ? "border-t border-gray-200"
                  : "border-t border-gray-700"
              }
            `}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 p-0.5">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {hasImage ? (
                    <Image
                  
                    width={20}
                    height={20} 
                      src={blog.userId.profilePic}
                      alt={blog.userId?.name || "Author"}
                      className="w-9 h-9 rounded-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                     <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
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
    </Link>
  );
}
  