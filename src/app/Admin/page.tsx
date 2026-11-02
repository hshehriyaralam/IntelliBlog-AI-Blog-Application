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


const QuickActions = dynamic(() => import("../../components/DashboardComponent/QuickActions"), {
  ssr: false,
  loading : () => <LoadingPage />
});








export default function AdminDashboard() {
    const { themeValue, light, dark } = useContext(ContextTheme);
  return (
    <PageFrame className="min-h-0 gap-8 p-4 md:p-8 lg:p-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <SectionHeading eyebrow="Admin Control">Manage your platform</SectionHeading>
              <p className="mt-3 max-w-xl text-[var(--muted)]">Welcome back! Here's your blog performance summary.</p>
            </div>
            </div>
        </div>

        <Stats   themeValue={themeValue} light={light} dark={dark}  />
        {/* Content Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Blogs */}
        <RecenetBlog    themeValue={themeValue} light={light} dark={dark}/>

          {/* Top Authors & Quick Actions */}
          <div className="space-y-6">
            {/* Top Authors */}
            <TopAuthors   navigate={"/Admin/allUsers"}  themeValue={themeValue} />

            {/* Quick Actions */}
            <QuickActions    themeValue={themeValue} light={light} dark={dark}/>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}