'use client'
import Link from "next/link";
import { User } from "lucide-react";
// import { useState } from "react";
import React, {useState} from "react";
import Image from "next/image";

const  AuthorInfo = React.memo(({ blog, themeValue, lightText, DarkText }: any) =>   {
  const [imgError, setImgError] = useState(false);

  if (!blog) return null; 
  const rawUser = blog.userId;

  let authorId: string | undefined;
  let authorName: string | undefined;
  let authorPic: string | undefined;
  if (!rawUser) {
  } else if (typeof rawUser === "string") {
    authorId = rawUser;
  } else if (typeof rawUser === "object") {
    authorId =
      rawUser._id?.toString?.() ??
      rawUser.id?.toString?.() ??
      (rawUser.toString ? rawUser.toString() : undefined);

    authorName = rawUser.name ?? rawUser.username ?? undefined;
    authorPic = rawUser.profilePic ?? rawUser.avatar ?? undefined;
  }


  const displayName = authorName || blog.authorName || "Unknown Author";
  const displayPic = authorPic || blog.authorPic || "";
  const hasImage = !!(displayPic && displayPic.trim() !== "" && !imgError);

  const href = authorId ? `/Authors/${encodeURIComponent(authorId)}` : `/Authors`;

  return (
    <div className={`flex items-center gap-3 mt-12 border-t ${themeValue ? "border-gray-400" : "border-gray-700"} pt-6`}>
      {hasImage ? (
        <Link href={href}>
        <Image
          width={48}
          height={48} 
          src={displayPic}
          alt={displayName}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover border"
          onError={() => setImgError(true)} />
          </Link>
      ) : (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300">
          <User className="w-6 h-6 text-gray-600" />
        </div>
      )}
      <div>
        <Link href={href}>
          <p className={`font-semibold cursor-pointer ${themeValue ? lightText : DarkText}`}>
            {displayName}
          </p>
        </Link>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          {blog.createdAt
            ? new Date(blog.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </p>
      </div>
    </div>
  );
})

export default AuthorInfo;
