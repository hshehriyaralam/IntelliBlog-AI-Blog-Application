"use client";
import { FileText, User, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import React, {  useMemo } from "react";
import { useAllBlogAdminQuery } from "../../Redux/Services/adminApi";
// import {liveRefetchOptions}   from "../../hooks/rtkOptions"

import { useRouter } from "next/navigation";
import LoadingPage from "@/components/layout/LoadingPage";
import Image from "next/image";


const  RecentBlog  = React.memo(({themeValue, light, dark}:any) => {
  const { data: AllBlogs, isLoading } = useAllBlogAdminQuery(undefined );
 
  const router = useRouter();

  // Exact same sequence as All Blogs - latest blogs first
  const recentBlogs = useMemo(() => {
    if (!AllBlogs?.data) return [];

    // Create a copy of the array to avoid mutation
    const blogs = [...AllBlogs.data];

    // Sort by creation date (newest first) - same as All Blogs
    return blogs
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 6); // Take only first 6
  }, [AllBlogs?.data]);

  const formatDate =  useMemo(() =>   (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  const getStatusStyles = useMemo(() => (status: string) => {
    if (themeValue) {
      // Light theme
      return status === "published"
        ? "bg-green-100 text-green-800 border-green-200"
        : "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else {
      // Dark theme
      return status === "published"
        ? "bg-green-900/30 text-green-400 border-green-700"
        : "bg-yellow-900/30 text-yellow-400 border-yellow-700";
    }
  }, [themeValue]);

  const handleBlogClick = (blogId: string) => {
    router.push(`/Blogs/${blogId}`);
  };

  // Loading state ko yahan handle karo - main container ke bahar
  if (isLoading) {
    return (
      <div className={`xl:col-span-2 rounded-2xl shadow-xl overflow-hidden ${
        themeValue ? `${light}` : `${dark} border border-gray-900`
      }`}>
        {/* Header - Loading state me bhi show karo */}
        <div className={`p-6 border-b ${
          themeValue ? "border-gray-200" : "border-gray-700"
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-semibold ${
              themeValue ? "text-gray-900" : "text-white"
            }`}>
              Recent Blogs
            </h2>
            {/* <div className="text-indigo-600 dark:text-indigo-400 text-sm font-medium flex items-center">
              View all <ExternalLink size={16} className="ml-1" />
            </div> */}
             <Link href={`/Admin/allBlogs`}>
                    <button
                      className={`rounded-lg  flex items-center gap-x-1  text-sm transition-all duration-200  px-2  py-1   cursor-pointer  ${
                        themeValue
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md"
                      } group/tooltip relative`}
                    >
                      <ExternalLink size={16} /> 
                      <span>View All </span>
                    </button>
                  </Link>
          </div>
        </div>
        
        {/* Loading Content */}
        <div className="p-12 flex items-center justify-center min-h-[200px]">
          <LoadingPage />
        </div>
      </div>
    );
  }



  return (
    <div
      className={`xl:col-span-2 rounded-2xl shadow-xl overflow-hidden ${
        themeValue ? `${light}` : `${dark} border border-gray-900`
      }`}
    >
      {/* Header - Same as All Blogs */}
      <div
        className={`p-6 border-b ${
          themeValue ? "border-gray-200" : "border-gray-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`text-xl font-semibold ${
              themeValue ? "text-gray-900" : "text-white"
            }`}
          >
            Recent Blogs
          </h2>
          {/* <Link
            href="/Admin/allBlogs"
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium flex items-center transition-colors"
          >
            View all <ExternalLink size={16} className="ml-1" />
          </Link> */}
              <Link href={`/Admin/allBlogs`}>
                    <button
                      className={`rounded-lg  flex items-center gap-x-1  text-sm transition-all duration-200  px-2.5  py-1.5   cursor-pointer  ${
                        themeValue
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md"
                      } group/tooltip relative`}
                    >
                      <span>View All </span>
                      <ExternalLink size={16} /> 
                    </button>
                  </Link>
        </div>
      </div>

      {/* Blog List - Same Grid Structure as AllBlogList */}
      <div
        className={`divide-y ${
          themeValue ? "divide-gray-200" : "divide-gray-700"
        }`}
      >
        {recentBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <FileText
              size={48}
              className={`mx-auto mb-4 ${
                themeValue ? "text-gray-300" : "text-gray-600"
              }`}
            />
            <p className={themeValue ? "text-gray-600" : "text-gray-300"}>
              No blogs found
            </p>
          </div>
        ) : (
          recentBlogs.map((blog: any) => (
            <div
              key={blog._id || blog.id}
              className={`grid grid-cols-12 gap-4 p-4 rounded-xl transition-colors duration-200 items-center group cursor-pointer ${
                themeValue
                  ? "hover:bg-gray-50 border-b border-gray-300"
                  : "hover:bg-gray-700/50 border-b border-gray-700"
              }`}
              onClick={() => handleBlogClick(blog._id || blog.id)}
            >
              {/* Thumbnail - Same as AllBlogList */}
              <div className="col-span-12 md:col-span-1 flex justify-center md:justify-start">
                {blog?.blogImage ? (
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shadow-sm">
                    <Image
                    width={56}
                    height={56}
                    loading="lazy"
                      src={blog?.blogImage}
                      alt={blog?.blogTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center shadow-sm ${
                      themeValue
                        ? "bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-400"
                        : "bg-gradient-to-br from-blue-900/20 to-indigo-900/20 text-blue-400"
                    }`}
                  >
                    <FileText size={20} />
                  </div>
                )}
              </div>

              {/* Blog Info - Same as AllBlogList */}
              <div className="col-span-12 md:col-span-6">
                <h3
                  className={`font-semibold mb-1 line-clamp-2 leading-tight ${
                    themeValue ? "text-gray-900" : "text-white"
                  } group-hover:text-indigo-600 transition-colors`}
                >
                  {blog.blogTitle || blog.title}
                </h3>
                <p
                  className={`text-sm line-clamp-1 mb-1 ${
                    themeValue ? "text-gray-600" : "text-gray-300"
                  }`}
                >
                  {blog.blogContent?.replace(/<[^>]*>/g, "").substring(0, 100)}
                  ...
                </p>
                <div className="flex items-center space-x-3 text-xs">
                  <span
                    className={`flex items-center ${
                      themeValue ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    <Calendar size={12} className="mr-1" />
                    {formatDate(blog.createdAt || blog.date)}
                  </span>
                </div>
              </div>

              {/* Author - Same as AllBlogList */}
              <div className="col-span-6 md:col-span-3 flex items-center space-x-2">
                {blog.userId?.profilePic ? (
                  <div className="relative w-8 h-8">
                    <Image
                    width={32}
                    height={32}
                    loading="lazy"
                      src={blog.userId.profilePic}
                      alt={blog?.userId?.name || "Author"}
                      className="rounded-full object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.innerHTML = `
                          <div class="w-8 h-8 rounded-full flex items-center justify-center
                            ${
                              themeValue
                                ? "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600"
                                : "bg-gradient-to-br from-purple-900/30 to-pink-900/30 text-purple-400"
                            }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.78.635 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        `;
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      themeValue
                        ? "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600"
                        : "bg-gradient-to-br from-purple-900/30 to-pink-900/30 text-purple-400"
                    }`}
                  >
                    <User size={14} />
                  </div>
                )}
                <span
                  className={`text-sm font-medium truncate max-w-[100px] ${
                    themeValue ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  {blog?.userId?.name || blog.author || "Unknown Author"}
                </span>
              </div>

              {/* Status - Same as AllBlogList (No Actions Column) */}
              <div className="hidden md:block col-span-12 md:col-span-2 flex items-center mt-2 md:mt-0">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyles(
                    blog.status
                  )}`}
                >
                  {blog.status?.charAt(0).toUpperCase() + blog.status?.slice(1) || "Published"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer - Same as AllBlogList */}
      {recentBlogs.length > 0 && (
        <div
          className={`p-4 border-t ${
            themeValue ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <div className="flex items-center justify-between text-sm">
            <span className={themeValue ? "text-gray-500" : "text-gray-400"}>
              Showing {recentBlogs.length} of {AllBlogs?.data?.length || 0} blogs
            </span>
            <span
              className={`flex items-center ${
                themeValue ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Latest first
            </span>
          </div>
        </div>
      )}
    </div>
  );
})


export default RecentBlog;