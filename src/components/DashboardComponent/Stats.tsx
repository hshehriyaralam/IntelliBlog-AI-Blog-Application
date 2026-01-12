"use client";
import {
  useAllBlogAdminQuery,
  useAllUserAdminQuery,
  useAllbookmarksAdminQuery,
  useAllLikesAdminQuery,
} from "../../Redux/Services/adminApi";
import Link from "next/link";
import { useContext, useMemo } from "react";
import {
  FileText,
  Users as UsersIcon,
  ThumbsUp,
  Bookmark,
  Sparkles,
} from "lucide-react";
// import {liveRefetchOptions}   from "../../hooks/rtkOptions"
import React from "react";



const  Stats = React.memo(({themeValue, light, dark }:any) => {
  const { data: AllBlogs } = useAllBlogAdminQuery(undefined);
  const { data: Users } = useAllUserAdminQuery(undefined);
  const { data: bookmarks } = useAllbookmarksAdminQuery(undefined);
  const { data: likesData } = useAllLikesAdminQuery(undefined);

  const stats =   useMemo(() => [
    {
      label: "Total Blogs",
      value: AllBlogs?.data?.length || 0,
      icon: FileText,
      color: "blue",
      description: "Published content",
      href: "/Admin/allBlogs",
      trend: "+12%"
    },
    {
      label: "Total Users",
      value: Users?.data?.length || 0,
      icon: UsersIcon,
      color: "green",
      description: "Registered users",
      href: "/Admin/allUsers",
      trend: "+8%"
    },
    {
      label: "Total Bookmarks",
      value: bookmarks?.totalBookmarks || 0,
      icon: Bookmark,
      color: "purple",
      description: "Saved by users",
      href: "/Admin/userBookmarks",
      trend: "+15%"
    },
    {
      label: "Total Likes",
      value: likesData?.totalLikes || 0,
      icon: ThumbsUp,
      color: "indigo",
      description: "User engagement",
      href: "/Admin/userLikes",
      trend: "+22%"
    },
  ], [AllBlogs?.data?.length, Users?.data?.length, bookmarks?.totalBookmarks, likesData?.totalLikes]);



  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const getColorClasses =  (color: string) => {
    const colorMap: {
      [key: string]: { 
        bg: string; 
        text: string; 
        lightBg: string;
        progressBg: string;
        progressGradient: string;
        glow: string;
        border: string;
        pulse: string;
      };
    } = {
      blue: {
        bg: "bg-blue-500",
        text: themeValue ? "text-blue-600" : "text-blue-400",
        lightBg: themeValue ? "bg-blue-50" : "bg-blue-900/20",
        progressBg: themeValue ? "bg-blue-500" : "bg-blue-400",
        progressGradient: "from-blue-400 via-blue-500 to-blue-600",
        glow: "shadow-blue-500/40",
        border: themeValue ? "border-blue-200" : "border-blue-700",
        pulse: "group-hover:shadow-blue-500/30"
      },
      green: {
        bg: "bg-green-500",
        text: themeValue ? "text-green-600" : "text-green-400",
        lightBg: themeValue ? "bg-green-50" : "bg-green-900/20",
        progressBg: themeValue ? "bg-green-500" : "bg-green-400",
        progressGradient: "from-green-400 via-green-500 to-green-600",
        glow: "shadow-green-500/40",
        border: themeValue ? "border-green-200" : "border-green-700",
        pulse: "group-hover:shadow-green-500/30"
      },
      purple: {
        bg: "bg-purple-500",
        text: themeValue ? "text-purple-600" : "text-purple-400",
        lightBg: themeValue ? "bg-purple-50" : "bg-purple-900/20",
        progressBg: themeValue ? "bg-purple-500" : "bg-purple-400",
        progressGradient: "from-purple-400 via-purple-500 to-purple-600",
        glow: "shadow-purple-500/40",
        border: themeValue ? "border-purple-200" : "border-purple-700",
        pulse: "group-hover:shadow-purple-500/30"
      },
      indigo: {
        bg: "bg-indigo-500",
        text: themeValue ? "text-indigo-600" : "text-indigo-400",
        lightBg: themeValue ? "bg-indigo-50" : "bg-indigo-900/20",
        progressBg: themeValue ? "bg-indigo-500" : "bg-indigo-400",
        progressGradient: "from-indigo-400 via-indigo-500 to-indigo-600",
        glow: "shadow-indigo-500/40",
        border: themeValue ? "border-indigo-200" : "border-indigo-700",
        pulse: "group-hover:shadow-indigo-500/30"
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const calculateProgress = useMemo(() => (value: number, max: number = 1000) => {
    return Math.min((value / max) * 100, 100);
  }, []);

  const themeClasses =  useMemo(() => ({
    background: themeValue ? light : dark,
    card: themeValue 
      ? `bg-white border-gray-200` 
      : `${dark} border-gray-700`,
    text: {
      primary: themeValue ? "text-gray-900" : "text-white",
      secondary: themeValue ? "text-gray-600" : "text-gray-300",
      muted: themeValue ? "text-gray-500" : "text-gray-400"
    },
    border: themeValue ? "border-gray-200" : "border-gray-700",
    hover: {
      card: themeValue 
        ? "hover:border-gray-300 hover:shadow-2xl" 
        : "hover:border-gray-600 hover:shadow-2xl",
      border: themeValue 
        ? "group-hover:border-gray-300" 
        : "group-hover:border-gray-600"
    },
    progress: {
      bg: themeValue ? "bg-gray-200/60" : "bg-gray-700/60"
    }
  }), [themeValue, light, dark]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const colorClasses = getColorClasses(stat.color);
        const progress = calculateProgress(stat.value);

        return (
          <Link key={index} href={stat.href} className="block group">
            <div 
              className={`
                rounded-3xl shadow-2xl border-2 p-6 
                transition-all duration-500 group-hover:scale-105
                relative overflow-hidden
                ${themeClasses.card}
                ${themeClasses.hover.card}
                ${colorClasses.pulse} group-hover:shadow-2xl
              `}
            >
              {/* Animated Background Particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full ${colorClasses.bg} opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-150`}></div>
                <div className={`absolute -bottom-6 -left-6 w-20 h-20 rounded-full ${colorClasses.bg} opacity-5 group-hover:opacity-15 transition-all duration-700 group-hover:scale-125`}></div>
              </div>

              {/* Floating Icon Effect */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <stat.icon size={40} className={colorClasses.text} />
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className={`text-sm font-semibold ${themeClasses.text.secondary}`}>
                      {stat.label}
                    </p>
                  </div>
                  <p className={`text-3xl font-bold ${themeClasses.text.primary} mb-1`}>
                    {formatNumber(stat.value)}
                  </p>
                  <p className={`text-xs ${themeClasses.text.muted}`}>
                    {stat.description}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-2xl ${colorClasses.lightBg} group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <stat.icon size={28} className={colorClasses.text} />
                </div>
              </div>

              {/* Premium Progress Bar */}
              <div className="mt-6 relative">
                {/* Progress Background with Glow */}
                <div className={`w-full rounded-2xl h-3 backdrop-blur-sm ${themeClasses.progress.bg} shadow-inner relative overflow-hidden`}>
                  {/* Main Progress Bar with Advanced Gradient */}
                  <div
                    className={`h-3 rounded-2xl bg-gradient-to-r ${colorClasses.progressGradient} transition-all duration-1500 ease-out ${colorClasses.glow} relative overflow-hidden group-hover:shadow-lg`}
                    style={{ width: `${progress}%` }}
                  >
                    {/* Animated Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-fast"></div>
                    
                    {/* Moving Light Reflection */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent"></div>
                    
                    {/* Progress End Cap with Sparkle */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <div className="relative">
                        <div className={`w-4 h-4 rounded-full ${colorClasses.bg} shadow-lg border-2 border-white`}></div>
                        <Sparkles 
                          size={8} 
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white animate-pulse" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Progress Info */}
                <div className="flex justify-between items-center mt-3">
                  <span className={`text-xs font-semibold ${themeClasses.text.muted} flex items-center`}>
                    <div className={`w-2 h-2 rounded-full ${colorClasses.bg} mr-2`}></div>
                    Progress
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${colorClasses.text}`}>
                      {Math.round(progress)}%
                    </span>
                    <div className={`w-1 h-1 rounded-full ${colorClasses.bg} animate-pulse`}></div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div 
                className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500 pointer-events-none`}
              ></div>

              {/* Corner Accents */}
              <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 ${colorClasses.border} rounded-tl-3xl opacity-50`}></div>
              <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 ${colorClasses.border} rounded-br-3xl opacity-50`}></div>
            </div>
          </Link>
        );
      })}
    </div>
  );
})


export default Stats;