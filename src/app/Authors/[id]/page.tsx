"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSingleUserQuery } from "../../../Redux/Services/userApi";
import { liveRefetchOptions } from "../../../hooks/rtkOptions";
import { ContextTheme } from "../../../Context/DarkTheme";
import { useContext } from "react";
import { BookOpen } from "lucide-react";
import LoadingPage from "../../../components/layout/LoadingPage";
import AuthorsProfileSection from "../_component/ProfileSection";
import dynamic from "next/dynamic";
import { PageFrame } from "@/components/ui/page-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";

const ErrorPage = dynamic(
  () => import("../../../components/common/ErrorPage"),
  {
    loading: () => <LoadingPage />,
    ssr: false,
  }
);

const AuthorsBlogs = dynamic(() => import("../_component/AuthorsBlogs"), {
  loading: () => <LoadingPage />,
});

export default function AuthorsDetail() {
  const params = useParams();
  const id = params?.id as string;
  const {
    data: SingleUser,
    isLoading,
    error,
  } = useSingleUserQuery(id, liveRefetchOptions);

  const { themeValue, light, dark } = useContext(ContextTheme);
  const user = SingleUser?.data?.user || [];
  const blogs = SingleUser?.data?.blogs || [];

  if (isLoading) return <LoadingPage />;
  if (error)
    return <ErrorPage themeValue={themeValue} light={light} dark={dark} />;

  if (!user)
    return (
      <PageFrame className="min-h-0 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-2xl font-black text-[var(--ink)]">
            Author not found
          </div>
          <p className="text-[var(--muted)]">
            The author you're looking for doesn't exist
          </p>
        </div>
      </PageFrame>
    );

  return (
    <PageFrame className="min-h-0 gap-8 py-6 md:py-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Profile Section */}
        <AuthorsProfileSection
          themeValue={themeValue}
          light={light}
          dark={dark}
          user={user}
          blogs={blogs}
        />

        {/* Blogs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <SectionHeading eyebrow="Fresh from this writer">Articles by {user.name}</SectionHeading>
            <span
              className="text-sm text-[var(--muted)]"
            >
              {blogs.length} articles published
            </span>
          </div>

          {blogs.length === 0 ? (
            <EmptyState title="No articles yet" description={`${user.name} hasn't published any articles yet.`}>
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            </EmptyState>
          ) : (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {blogs?.map((blog: any, index: number) => {
                return (
                  <Link key={blog._id} href={`/Blogs/${blog._id}`}>
                    <AuthorsBlogs
                      blog={blog}
                      themeValue={themeValue}
                      light={light}
                      dark={dark}
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PageFrame>
  );
}
