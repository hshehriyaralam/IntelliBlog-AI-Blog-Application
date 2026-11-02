"use client";
import { useMemo, useState } from "react";
import { useAllUserQuery } from "../../Redux/Services/userApi";
import Link from "next/link";
import ViewAllAuthors from "../HomeComponets/viewAllAuthors";
import { Avatar } from "../ui/avatar";
import { TrendingUp } from "lucide-react";

function AuthorItem({ user }: any) {
  const [imgError, setImgError] = useState(false);
  return (
    <Link href={`/Authors/${user.id}`} className="flex items-center gap-3 border-b-2 border-dashed border-[var(--ink)] py-3 last:border-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]">
      <Avatar src={!imgError ? user.profilePic : null} alt={`${user.name || "Author"}-pic`} fallback={user.name} onError={() => setImgError(true)} />
      <span className="min-w-0 flex-1">
        <strong className="block truncate text-sm font-extrabold">{user.name}</strong>
        <small className="flex items-center gap-1 text-xs font-medium text-[var(--muted)]"><TrendingUp className="size-3" />{user.blogCount} articles</small>
      </span>
      <strong className="text-2xl font-black">{user.blogCount}</strong>
    </Link>
  );
}

export default function TopAuthors({ navigate, themeValue }: any) {
  const { data, isLoading, isError } = useAllUserQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
  const authors = data?.data?.map((user: any) => ({ name: user.name, blogCount: user.blogCount, profilePic: user.profilePic, id: user.id }));
  const topAuthors = useMemo(() => (authors ? [...authors].sort((a, b) => b.blogCount - a.blogCount).slice(0, 5) : []), [authors]);

  return (
    <section className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--mint)] p-6 shadow-[var(--sh-card)]">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg border-[3px] border-[var(--ink)] bg-[var(--pink)]"><TrendingUp className="size-5" /></span>
        <h3 className="text-xl font-black tracking-[-0.04em]">Top Authors</h3>
      </div>
      {isLoading ? <p className="text-sm font-bold">Loading authors...</p> : null}
      {isError ? <p className="text-sm font-bold">Failed to load authors.</p> : null}
      {!isLoading && !isError ? <ul>{topAuthors.slice(0, 3).map((user: any, index: number) => <li key={user.id || index}><AuthorItem user={user} /></li>)}</ul> : null}
      {authors?.length > 6 ? <ViewAllAuthors navigate={navigate} /> : null}
    </section>
  );
}
