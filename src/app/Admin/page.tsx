'use client'
import {  useContext } from "react";
import { ContextTheme } from "../../Context/DarkTheme";
import Stats from "../../components/DashboardComponent/Stats";
import RecenetBlog from "../../components/DashboardComponent/RecentBlog";
import QuickActions from "../../components/DashboardComponent/QuickActions";
import TopAuthors from "@/components/common/Authors";





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

        <Stats />
        {/* Content Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Blogs */}
        <RecenetBlog />

          {/* Top Authors & Quick Actions */}
          <div className="space-y-6">
            {/* Top Authors */}
            <TopAuthors   navigate={"/Admin/allUsers"}/>

            {/* Quick Actions */}
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}