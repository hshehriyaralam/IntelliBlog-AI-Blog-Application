'use client'
import { useContext } from "react";
import { ContextTheme } from "../../Context/DarkTheme";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/layout/LoadingPage";
import { PageFrame } from "@/components/ui/page-frame";
import { SectionHeading } from "@/components/ui/section-heading";


const Stats = dynamic(() => import("../../components/DashboardComponent/Stats"), {
  ssr: false,
  loading : () => <LoadingPage />
});


const RecenetBlog = dynamic(() => import("../../components/DashboardComponent/RecentBlog"), {
  ssr: false,
  loading : () => <LoadingPage />
});


const TopAuthors = dynamic(() => import("@/components/common/Authors"), {
  ssr: false,
  loading : () => <LoadingPage />
});


export default function AdminDashboard() {
  return (
    <PageFrame className="min-h-0 gap-6 p-2 md:p-3 lg:p-4">
      <div className="mx-auto w-full max-w-[1480px]">
        {/* Header with Stats */}
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <SectionHeading eyebrow="Admin Control">Manage your platform</SectionHeading>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">Welcome back! Here&apos;s your blog performance summary.</p>
            </div>
            </div>
        </div>

        <Stats />
        {/* Content Section */}
        <div className="grid grid-cols-1 gap-5">
          {/* Recent Blogs */}
        <RecenetBlog />

          <TopAuthors navigate={"/Admin/allUsers"} />
        </div>
      </div>
    </PageFrame>
  );
}