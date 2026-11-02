"use client";

import { FileText, User, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
import { useAllBlogAdminQuery } from "../../Redux/Services/adminApi";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/layout/LoadingPage";
import Image from "next/image";

const RecentBlog = React.memo(() => {
  const { data: AllBlogs, isLoading } = useAllBlogAdminQuery(undefined);
  const router = useRouter();

  const recentBlogs = useMemo(() => {
    if (!AllBlogs?.data) return [];
    return [...AllBlogs.data]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  }, [AllBlogs?.data]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (isLoading) {
    return (
      <section className="xl:col-span-2 overflow-hidden rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--paper)] shadow-[var(--sh-card)]">
        <DashboardSectionHeader />
        <div className="flex min-h-52 items-center justify-center p-6"><LoadingPage /></div>
      </section>
    );
  }

  return (
    <section className="xl:col-span-2 overflow-hidden rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--paper)] shadow-[var(--sh-card)]">
      <DashboardSectionHeader />
      <div className="divide-y-2 divide-dashed divide-[var(--ink)]">
        {recentBlogs.length === 0 ? (
          <div className="p-10 text-center">
            <FileText className="mx-auto mb-3 size-10 text-[var(--muted)]" />
            <p className="font-bold text-[var(--muted)]">No blogs found</p>
          </div>
        ) : (
          recentBlogs.map((blog: any) => (
            <button
              key={blog._id || blog.id}
              type="button"
              onClick={() => router.push(`/Blogs/${blog._id || blog.id}`)}
              className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-4 text-left transition-colors hover:bg-[var(--white)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[-3px] sm:grid-cols-[auto_minmax(0,1fr)_auto]"
            >
              {blog?.blogImage ? (
                <Image
                  width={56}
                  height={56}
                  loading="lazy"
                  src={blog.blogImage}
                  alt={blog.blogTitle}
                  className="size-14 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] object-cover"
                />
              ) : (
                <span className="flex size-14 items-center justify-center rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--blue)]">
                  <FileText className="size-5" />
                </span>
              )}
              <span className="min-w-0">
                <strong className="block truncate text-sm font-black text-[var(--ink)] sm:text-base">
                  {blog.blogTitle || blog.title}
                </strong>
                <span className="mt-1 block truncate text-xs text-[var(--muted)]">
                  {blog.blogContent?.replace(/<[^>]*>/g, "").substring(0, 100)}...
                </span>
                <span className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[var(--muted)]">
                  <Calendar className="size-3" /> {formatDate(blog.createdAt || blog.date)}
                </span>
              </span>
              <span className="hidden items-center gap-2 sm:flex">
                <span className="max-w-24 truncate text-xs font-extrabold text-[var(--muted)]">
                  {blog.userId?.name || blog.author || "Unknown Author"}
                </span>
                <span className="rounded-full border-2 border-[var(--ink)] bg-[var(--mint)] px-2 py-1 text-[11px] font-extrabold text-[var(--ink)]">
                  {blog.status?.charAt(0).toUpperCase() + blog.status?.slice(1) || "Published"}
                </span>
              </span>
            </button>
          ))
        )}
      </div>
      {recentBlogs.length > 0 && (
        <div className="flex items-center justify-between border-t-[3px] border-[var(--ink)] px-4 py-3 text-xs font-bold text-[var(--muted)]">
          <span>Showing {recentBlogs.length} of {AllBlogs?.data?.length || 0} blogs</span>
          <span>Latest first</span>
        </div>
      )}
    </section>
  );
});

function DashboardSectionHeader() {
  return (
    <div className="flex items-center justify-between border-b-[3px] border-[var(--ink)] bg-[var(--yellow)] px-4 py-3">
      <h2 className="text-xl font-black tracking-[-0.04em] text-[var(--ink)]">Recent Blogs</h2>
      <Link href="/Admin/allBlogs" className="flex min-h-10 items-center gap-1 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--purple)] px-3 text-xs font-extrabold text-white shadow-[var(--sh-btn)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]">
        View All <ExternalLink className="size-4" />
      </Link>
    </div>
  );
}

export default RecentBlog;
