'use client'
import { useContext } from "react";
import { ContextTheme } from "../../Context/DarkTheme";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/layout/LoadingPage";


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
    <div className={`min-h-screen  lg:p-6 p-0   ${themeValue ? light : dark} `}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent  lg:text-left text-center lg:mt-0 mt-4">Dashboard Overview</h1>
              <p className={`${themeValue ? "text-gray-600" : "text-gray-300"}  mt-2  text-md lg:max-w-[600px] max-w-[300px]  lg:text-left text-center   mx-auto `}>Welcome back! Here's your blog performance summary.</p>
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
    </div>
  );
}