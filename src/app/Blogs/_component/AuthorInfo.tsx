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
    <div className="mt-12 flex items-center gap-3 border-t-[3px] border-[var(--ink)] pt-6">
      {hasImage ? (
        <Link href={href}>
        <Image
          width={48}
          height={48} 
          src={displayPic}
          alt={displayName}
          loading="lazy"
          className="size-12 rounded-full border-[3px] border-[var(--ink)] object-cover"
          onError={() => setImgError(true)} />
          </Link>
      ) : (
        <div className="flex size-12 items-center justify-center rounded-full border-[3px] border-[var(--ink)] bg-[var(--blue)]">
          <User className="size-6 text-[var(--ink)]" />
        </div>
      )}
      <div>
        <Link href={href}>
          <p className="cursor-pointer font-extrabold text-[var(--ink)]">
            {displayName}
          </p>
        </Link>

        <p className="text-xs text-[var(--muted)]">
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
