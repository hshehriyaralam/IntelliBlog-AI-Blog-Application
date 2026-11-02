"use client";

import {
  useAllBlogAdminQuery,
  useAllUserAdminQuery,
  useAllbookmarksAdminQuery,
  useAllLikesAdminQuery,
} from "../../Redux/Services/adminApi";
import Link from "next/link";
import { useMemo } from "react";
import { Bookmark, FileText, ThumbsUp, Users as UsersIcon } from "lucide-react";
import React from "react";

const Stats = React.memo(() => {
  const { data: AllBlogs } = useAllBlogAdminQuery(undefined);
  const { data: Users } = useAllUserAdminQuery(undefined);
  const { data: bookmarks } = useAllbookmarksAdminQuery(undefined);
  const { data: likesData } = useAllLikesAdminQuery(undefined);

  const stats = useMemo(
    () => [
      {
        label: "Total Blogs",
        value: AllBlogs?.data?.length || 0,
        description: "Published content",
        href: "/Admin/allBlogs",
        icon: FileText,
        color: "bg-[var(--blue)]",
      },
      {
        label: "Total Users",
        value: Users?.data?.length || 0,
        description: "Registered users",
        href: "/Admin/allUsers",
        icon: UsersIcon,
        color: "bg-[var(--mint)]",
      },
      {
        label: "Total Bookmarks",
        value: bookmarks?.totalBookmarks || 0,
        description: "Saved by users",
        href: "/Admin/userBookmarks",
        icon: Bookmark,
        color: "bg-[var(--rose)]",
      },
      {
        label: "Total Likes",
        value: likesData?.totalLikes || 0,
        description: "User engagement",
        href: "/Admin/userLikes",
        icon: ThumbsUp,
        color: "bg-[var(--yellow)]",
      },
    ],
    [AllBlogs?.data?.length, Users?.data?.length, bookmarks?.totalBookmarks, likesData?.totalLikes]
  );

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href}
          className="group rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--paper)] p-4 shadow-[var(--sh-card)] transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-[var(--muted)]">{stat.label}</p>
              <p className="mt-2 text-4xl font-black leading-none tracking-[-0.05em] text-[var(--ink)]">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium text-[var(--muted)]">{stat.description}</p>
            </div>
            <span className={`flex size-11 shrink-0 items-center justify-center rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] ${stat.color} shadow-[3px_3px_0_var(--ink)]`}>
              <stat.icon className="size-5 text-[var(--ink)]" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
});

export default Stats;
