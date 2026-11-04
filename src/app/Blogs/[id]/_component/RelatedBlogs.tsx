"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type RelatedBlog = {
  _id: string;
  blogTitle: string;
  blogSummary: string;
  blogTags: string[];
  blogImage?: string;
  createdAt: string;
  userId?: { name?: string; profilePic?: string | null };
};

export default function RelatedBlogs({ blogId }: { blogId: string }) {
  const [blogs, setBlogs] = useState<RelatedBlog[]>([]);

  useEffect(() => {
    let active = true;
    fetch(`/api/blogs/${blogId}/related`)
      .then((response) => (response.ok ? response.json() : { blogs: [] }))
      .then((data: { blogs?: RelatedBlog[] }) => {
        if (active) setBlogs(data.blogs || []);
      })
      .catch(() => {
        if (active) setBlogs([]);
      });
    return () => {
      active = false;
    };
  }, [blogId]);

  if (!blogs.length) return null;

  return (
    <section className="mt-14" aria-labelledby="related-blogs-title">
      <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--muted)]">Keep reading</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h2 id="related-blogs-title" className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">You might also like</h2>
        <Link href="/Blogs" className="rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-4 py-2 text-sm font-extrabold shadow-[var(--sh-btn)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)]">
          View all blogs
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.slice(0, 3).map((blog, index) => (
          <Link
            key={blog._id}
            href={`/Blogs/${blog._id}`}
            className="group min-w-0 overflow-hidden rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--white)] shadow-[var(--sh-card)] transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]"
          >
            <div className={`relative aspect-[16/10] overflow-hidden border-b-[3px] border-[var(--ink)] ${["bg-[var(--blue)]", "bg-[var(--rose)]", "bg-[var(--mint)]", "bg-[var(--yellow)]"][index % 4]}`}>
              <Image
                src={blog.blogImage || "/HeroImage.jpg"}
                alt={blog.blogTitle}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-150 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="mb-2 flex flex-wrap gap-1">
                {(blog.blogTags || []).slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full border-2 border-[var(--ink)] bg-[var(--mint)] px-2 py-0.5 text-[10px] font-extrabold">#{tag}</span>
                ))}
              </div>
              <h3 className="line-clamp-2 text-lg font-black leading-tight tracking-[-0.03em]">{blog.blogTitle}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-5 text-[var(--muted)]">{blog.blogSummary}</p>
              <p className="mt-3 border-t-2 border-dashed border-[var(--ink)] pt-2 text-xs font-extrabold text-[var(--muted)]">
                {blog.userId?.name || "Unknown Author"} · {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
