"use client";
import { useMemo } from "react";
import { useFetchBlogQuery } from "../../Redux/Services/blogApi";
import { useRouter } from "next/navigation";
import { Chip } from "../ui/chip";
import { Hash } from "lucide-react";

export default function Tags() {
  const router = useRouter();
  const { data, isLoading, isError } = useFetchBlogQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
  const allTags = data?.blogs?.map((blog: { blogTags: string[] }) => blog.blogTags).flat() || [];
  const uniqueTags = useMemo(() => [...new Set(allTags)] as string[], [allTags]);

  return (
    <section className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--white)] p-6 shadow-[var(--sh-card)]">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg border-[3px] border-[var(--ink)] bg-[var(--yellow)]"><Hash className="size-5" /></span>
        <h3 className="text-xl font-black tracking-[-0.04em]">Popular Tags</h3>
      </div>
      {isLoading ? <p className="text-sm font-bold text-[var(--muted)]">Loading tags...</p> : null}
      {isError ? <p className="text-sm font-bold text-[var(--pink)]">Failed to load tags.</p> : null}
      {!isLoading && !isError ? (
        <div className="flex flex-wrap gap-3">
          {uniqueTags.slice(0, 8).map((tag: string, index: number) => (
            <button type="button" key={tag} onClick={() => router.push("/Blogs")} className="focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]">
              <Chip color={(["mint", "rose", "yellow", "blue"] as const)[index % 4]}>#{tag}</Chip>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
