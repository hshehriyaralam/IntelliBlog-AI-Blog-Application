"use client";
import { ContextTheme } from "../../Context/DarkTheme";
import { useContext, useState } from "react";
import {
  User,
  TrendingUp,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useAllUserQuery } from "../../Redux/Services/userApi";
import {liveRefetchOptions } from "../../hooks/rtkOptions"
import Link from "next/link";
import { useAuthNavigate } from "@/hooks/useAuthNavigate";

function AuthorItem({ user, themeValue }: any) {
  const [imgError, setImgError] = useState(false);
  const hasImage =
    user?.profilePic && user.profilePic.trim() !== "" && !imgError;

  return (
    <Link href={`/Authors/${user.id}`}>
      <li
        className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 group/item relative overflow-hidden
        ${themeValue ? `hover:bg-gray-300 ` : `hover:bg-gray-800 `}`}
      >
        {/* Hover Border Effect */}
        <div className={`
          absolute inset-0 rounded-lg border border-transparent 
          group-hover/item:border-indigo-500/20 transition-all duration-300 pointer-events-none
        `}></div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-indigo-500/30 rounded-tl-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-indigo-500/30 rounded-br-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>

        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 p-0.5 group-hover/item:scale-110 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-white  flex items-center justify-center overflow-hidden">
              {hasImage ? (
                <img
                  src={user.profilePic}
                  alt={`${user.name || "Author"}-pic`}
                  className="w-9 h-9 rounded-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover/item:scale-110 transition-transform duration-300" />
              )}
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-semibold truncate ${
              themeValue ? "text-gray-800" : "text-white"
            }`}
          >
            {user.name}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendingUp size={12} className="text-indigo-500 group-hover/item:scale-110 transition-transform duration-300" />
            <p className="text-xs text-indigo-600 font-medium">
              {user?.blogCount} Articles
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default function TopAuthors({ navigate }: any) {
    const { authNavigate, isAuthenticating } = useAuthNavigate();

  const { data, isLoading, isError } = useAllUserQuery(undefined,liveRefetchOptions);
  const { themeValue } = useContext(ContextTheme);
  
  // 🔹 Loading State
  if (isLoading) {
    return (
      <div
        className={`p-4 rounded-xl flex items-center justify-center group relative overflow-hidden ${
          themeValue
            ? "bg-white shadow-md border border-gray-100 hover:shadow-indigo-500/30"
            : "bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 shadow-lg hover:shadow-indigo-500/30"
        }`}
      >
        {/* Corner Shadow Effects */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <Loader2 className="animate-spin text-indigo-500" size={24} />
        <span
          className={`ml-2 text-sm ${
            themeValue ? "text-gray-700" : "text-gray-200"
          }`}
        >
          Loading...
        </span>
      </div>
    );
  }

  // 🔹 Error State
  if (isError) {
    return (
      <div
        className={`p-4 rounded-xl text-center group relative overflow-hidden ${
          themeValue
            ? "bg-white shadow-md border border-gray-100 hover:shadow-indigo-500/30"
            : "bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 shadow-lg hover:shadow-indigo-500/30"
        }`}
      >
        {/* Corner Shadow Effects */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <p
          className={`text-sm ${themeValue ? "text-red-600" : "text-red-400"}`}
        >
          Failed to load authors 😢
        </p>
      </div>
    );
  }

  const Authors = data?.data?.map((user: any) => ({
    name: user.name,
    blogCount: user.blogCount,
    profilePic: user.profilePic,
    id: user.id,
  }));

  // Sort descending (most articles first)
  const TopAuthors = Authors.sort(
    (a: any, b: any) => b.blogCount - a.blogCount
  ).slice(0, 5);

  return (
    <div
      className={`p-4 rounded-xl group relative overflow-hidden ${
        themeValue
          ? "bg-white shadow-md border border-gray-100 hover:shadow-indigo-500/30"
          : "bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 shadow-lg hover:shadow-indigo-500/30"
      }`}
    >
      {/* Corner Shadow Effects */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`p-1.5 rounded-md group-hover:scale-110 transition-transform duration-300 ${
            themeValue
              ? "bg-indigo-100 text-indigo-600"
              : "bg-indigo-900/30 text-indigo-300"
          }`}
        >
          <TrendingUp size={16} />
        </div>
        <h3
          className={`text-base font-semibold ${
            themeValue ? "text-gray-800" : "text-white"
          }`}
        >
          Top Authors
        </h3>
      </div>

      {/* Authors List */}
      <ul className="space-y-2">
        {TopAuthors.map((user: any, index: number) => (
          <AuthorItem
            key={user.id || index}
            user={user}
            themeValue={themeValue}
            index={index}
          />
        ))}
      </ul>

      {/* View All Link */}
      {Authors.length > 6 && (
        <div className="mt-2 pt-2 border-t border-gray-700/50 mx-ato flex justify-center mt-4">
          <button
            onClick={() => authNavigate(navigate)}
            disabled={isAuthenticating}
            className={`rounded-lg flex items-center gap-x-1 text-sm transition-all duration-200 px-10 py-1.5 cursor-pointer group/btn relative overflow-hidden ${
              themeValue
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-indigo-500/30"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-indigo-500/30"
            }`}
          >
            {/* Button Corner Effects */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 rounded-tl-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40 rounded-br-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>

            <ExternalLink size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
            <span>View All</span>
          </button>
        </div>
      )}
    </div>
  );
}