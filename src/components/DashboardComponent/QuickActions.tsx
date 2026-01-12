"use client";
import Link from "next/link";
import {
  FileText,
  Users,
  ThumbsUp,
  Bookmark,
} from "lucide-react";
import { useMemo } from "react";


export default function QuickActions({themeValue, light, dark}:any) {


  const actions = [
    {
      href: "/Admin/allBlogs",
      label: "Manage Blogs",
      icon: FileText,
      color: "blue",
    },
    {
      href: "/Admin/allUsers",
      label: "Manage Users",
      icon: Users,
      color: "green",
    },
    {
      href: "/Admin/userLikes",
      label: "View Likes",
      icon: ThumbsUp,
      color: "purple",
    },
    {
      href: "/Admin/userBookmarks",
      label: "View Bookmarks",
      icon: Bookmark,
      color: "indigo",
    },
  ];

  const getColorClasses = useMemo(() => (color: string) => {
    const colorMap = {
      blue: {
        bg: themeValue ? "bg-blue-50" : "bg-blue-900/20",
        text: themeValue ? "text-blue-600" : "text-blue-400",
        hoverText: themeValue ? "group-hover:text-blue-600" : "group-hover:text-blue-400"
      },
      green: {
        bg: themeValue ? "bg-green-50" : "bg-green-900/20",
        text: themeValue ? "text-green-600" : "text-green-400",
        hoverText: themeValue ? "group-hover:text-green-600" : "group-hover:text-green-400"
      },
      purple: {
        bg: themeValue ? "bg-purple-50" : "bg-purple-900/20",
        text: themeValue ? "text-purple-600" : "text-purple-400",
        hoverText: themeValue ? "group-hover:text-purple-600" : "group-hover:text-purple-400"
      },
      indigo: {
        bg: themeValue ? "bg-indigo-50" : "bg-indigo-900/20",
        text: themeValue ? "text-indigo-600" : "text-indigo-400",
        hoverText: themeValue ? "group-hover:text-indigo-600" : "group-hover:text-indigo-400"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  }, [themeValue]);

  return (
    <div className={`rounded-xl shadow-sm border ${
      themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`
    }`}>
      <div className={`p-6 border-b ${
        themeValue ? "border-gray-200" : "border-gray-700"
      }`}>
        <h2 className={`text-xl font-semibold ${
          themeValue ? "text-gray-900" : "text-white"
        }`}>
          Quick Actions
        </h2>
      </div>
      <div className="p-6 space-y-3">
        {actions.map((action, index) => {
          const colorClasses = getColorClasses(action.color);
          
          return (
            <Link
              key={index}
              href={action.href}
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 group ${
                themeValue 
                  ? "hover:bg-gray-50" 
                  : "hover:bg-gray-700/50"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${colorClasses.bg} mr-3 group-hover:scale-110 transition-transform duration-200`} >
                <action.icon 
                  size={18} 
                  className={colorClasses.text} 
                />
              </div>
              
              <span
                className={`font-medium ${
                  themeValue ? "text-gray-700" : "text-gray-300"
                } ${colorClasses.hoverText} transition-colors`}
              >
                {action.label}
              </span>
              
              <span className={`ml-auto transition-colors ${
                themeValue 
                  ? "text-gray-400 group-hover:text-gray-600" 
                  : "text-gray-500 group-hover:text-gray-300"
              }`}>
                →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}