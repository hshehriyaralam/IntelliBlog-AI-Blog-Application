'use client'
import { Button } from "@/components/ui/button";
import { Bookmark, Users,  FileText, Calendar, Eye, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const  BookmarkList = React.memo(({ 
  filteredBookmarks,
  searchQuery,
  themeValue,
  light,
  dark,
}: any) => {
  const router = useRouter();
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (key: string) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const targetDate = new Date(dateString);
    const diffMs = now.getTime() - targetDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  const handleUserClick = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/Authors/${userId}`);
  };

  const handleBlogClick = (blogId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/Blogs/${blogId}`);
  };

  const handleAuthorClick = (authorId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/Authors/${authorId}`);
  };


  
  return (
    <div
      className={`rounded-xl shadow-lg overflow-hidden ${
        themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`
      }`}
    >
      {/* Table Header */}
      <div
        className={`hidden md:grid grid-cols-12 gap-4 p-6 py-8 font-semibold text-sm border-b ${
          themeValue
            ? `border-gray-200 ${light} text-gray-700`
            : `border-gray-700 ${dark} text-gray-300`
        }`}
      >
        <div className="col-span-5 flex items-center space-x-2">
          <span>Blog Details</span>
        </div>
        <div className="col-span-3 flex items-center space-x-2">
          <span>User</span>
        </div>
        <div className="col-span-2 flex items-center space-x-2 justify-center">
          <span>Bookmarked</span>
        </div>
        <div className="col-span-2 flex items-center space-x-2 justify-center">
          <span>Actions</span>
        </div>
      </div>

      {/* Table Body */}
      <div className={`${themeValue ? `${light}` : `${dark}`}`}>
        {filteredBookmarks.length === 0 ? (
          <div className="p-8 text-center">
            <div className={`inline-flex p-3 rounded-xl ${themeValue ? "bg-gray-100" : "bg-gray-800"}`}>
              <Bookmark
                size={40}
                className={`mx-auto ${
                  themeValue ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            <h3 className={`text-lg font-semibold mt-4 mb-2 ${
              themeValue ? "text-gray-700" : "text-gray-300"
            }`}>
              No Bookmarks Found
            </h3>
            <p className={`max-w-md mx-auto text-sm ${themeValue ? "text-gray-500" : "text-gray-400"}`}>
              {searchQuery
                ? "No bookmarks match your search criteria"
                : "Bookmarks will appear here when users save content"}
            </p>
          </div>
        ) : (
          <div>
            {filteredBookmarks.map((bookmark: any, index: number) => (
              <div
                key={bookmark.id || bookmark.bookmarkId}
                className={`p-6 transition-all duration-200 group rounded-xl ${
                  themeValue 
                    ? "hover:bg-blue-50/30" 
                    : "hover:bg-gray-800/30"
                } ${index !== filteredBookmarks.length - 1 ? (themeValue ? "border-b border-gray-100" : "border-b border-gray-800") : ""}`}
              >
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Blog Content Section */}
                    <div className="flex items-start space-x-3">
                      {/* Blog Image */}
                      <div className="flex-shrink-0">
                        <div
                          className="w-14 h-14 rounded-md overflow-hidden border cursor-pointer"
                          onClick={(e) => handleBlogClick(bookmark.blogId, e)}
                        >
                          {bookmark.blogImage && !imgErrors[`blog-${index}`] ? (
                            <Image
                            width={56}
                            height={56}
                            loading="lazy"
                              src={bookmark.blogImage}
                              alt={bookmark.blogTitle}
                              className="w-full h-full object-cover"
                              onError={() => handleImgError(`blog-${index}`)}
                            />
                          ) : (
                            <div
                              className={`w-full h-full flex items-center justify-center ${
                                themeValue ? `${light}` : `${dark}`
                              }`}
                            >
                              <FileText size={16} className={themeValue ? "text-gray-400" : "text-gray-500"} />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Blog Content */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-semibold text-sm line-clamp-1 mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                            themeValue ? "text-gray-900" : "text-white"
                          }`}
                          onClick={(e) => handleBlogClick(bookmark.blogId, e)}
                        >
                          {bookmark.blogTitle}
                        </h4>

                        {bookmark.blogSummary && (
                          <p
                            className={`text-xs line-clamp-2 mb-1 ${
                              themeValue ? "text-gray-600" : "text-gray-300"
                            }`}
                          >
                            {bookmark.blogSummary}
                          </p>
                        )}

                        {/* Author Info */}
                        <div className="flex items-center space-x-2">
                          {bookmark.authorProfile && !imgErrors[`author-${index}`] ? (
                            <Image
                            width={24}
                            height={24}
                              src={bookmark.authorProfile}
                              alt={bookmark.authorName}
                              loading="lazy"
                              className="w-6 h-6 rounded-full object-cover border cursor-pointer"
                              onClick={(e) => handleAuthorClick(bookmark.authorId, e)}
                              onError={() => handleImgError(`author-${index}`)}
                            />
                          ) : (
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                                themeValue
                                  ? "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600"
                                  : "bg-gradient-to-br from-purple-900/30 to-pink-900/30 text-purple-400"
                              }`}
                              onClick={(e) => handleAuthorClick(bookmark.authorId, e)}
                            >
                              <User size={12} />
                            </div>
                          )}
                          <span
                            className={`text-xs cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                              themeValue ? "text-gray-500" : "text-gray-400"
                            }`}
                            onClick={(e) => handleAuthorClick(bookmark.authorId, e)}
                          >
                            By {bookmark.authorName}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* User, Date & Actions Section */}
                    <div className="flex flex-col space-y-3">
                      {/* User & Date Row */}
                      <div className="flex  flex-col gap-y-4 items-center  justify-between">
                        {/* User Info Left */}
                        <div className="flex items-center space-x-3">
                          {bookmark.userProfile && !imgErrors[`user-${index}`] ? (
                            <Image
                              width={24}
                              height={24}
                              src={bookmark.userProfile}
                              alt={bookmark.userName}
                              loading="lazy"
                              className="w-8 h-8 rounded-full object-cover border cursor-pointer"
                              onClick={(e) => handleUserClick(bookmark.userId, e)}
                              onError={() => handleImgError(`user-${index}`)}
                            />
                          ) : (
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                                themeValue
                                  ? "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600"
                                  : "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 text-blue-400"
                              }`}
                              onClick={(e) => handleUserClick(bookmark.userId, e)}
                            >
                              <Users size={14} />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <h3
                              className={`font-semibold text-xs cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                                themeValue ? "text-gray-900" : "text-white"
                              }`}
                              onClick={(e) => handleUserClick(bookmark.userId, e)}
                            >
                              {bookmark.userName}
                            </h3>
                            <p
                              className={`text-xs mt-0.5 truncate ${
                                themeValue ? "text-gray-500" : "text-gray-400"
                              }`}
                            >
                              {bookmark.userEmail}
                            </p>
                          </div>
                        </div>

                        {/* Bookmarked Date Right */}
                        <div className="">
                          <div
                            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                              themeValue
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-green-900/20 text-green-400 border border-green-700"
                            }`}
                          >
                            <Bookmark size={10} />
                            <span className="font-semibold whitespace-nowrap">
                              {getTimeAgo(bookmark.bookmarkedAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions Centered Below */}
                      <div className="flex justify-center space-x-3 pt-2">
                         <Button
                        onClick={(e) => handleBlogClick(bookmark.blogId, e)}
                        className={`flex items-center justify-center cursor-pointer space-x-1 px-6
                           py-1.5 rounded-lg text-sm font-medium transition-all duration-200  ${
                themeValue 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md'
              }`}
                      >
                        <Eye size={12} />
                        <span>View Blog</span>
                      </Button>

                        <Button
                          onClick={(e) => handleUserClick(bookmark.userId, e)}
                          className={`flex items-center justify-center space-x-1 cursor-pointer px-6 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                            themeValue
                              ? "bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                          }`}
                        >
                          <Users size={12} />
                          <span> View User</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                  {/* Blog Content Column */}
                  <div className="col-span-5">
                    <div className="flex items-start space-x-3">
                      {/* Blog Image */}
                      <div className="flex-shrink-0">
                        <div 
                          className="w-14 h-14 rounded-md overflow-hidden border cursor-pointer group/blog-image"
                          onClick={(e) => handleBlogClick(bookmark.blogId, e)}
                        >
                          {bookmark.blogImage && !imgErrors[`blog-${index}`] ? (
                            <Image
                            width={56}
                            height={56}
                              src={bookmark.blogImage}
                              alt={bookmark.blogTitle}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover/blog-image:scale-110"
                              onError={() => handleImgError(`blog-${index}`)}
                            />
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center ${
                              themeValue ? `${light}` : `${dark}`
                            }`}>
                              <FileText size={16} className={themeValue ? "text-gray-400" : "text-gray-500"} />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Blog Content */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-semibold text-sm line-clamp-1 mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                            themeValue ? "text-gray-900" : "text-white"
                          }`}
                          onClick={(e) => handleBlogClick(bookmark.blogId, e)}
                        >
                          {bookmark.blogTitle}
                        </h4>
                        
                        {bookmark.blogDescription && (
                          <p className={`text-xs line-clamp-2 mb-1 ${
                            themeValue ? "text-gray-600" : "text-gray-300"
                          }`}>
                            {bookmark.blogDescription} 
                          </p>
                        )}
                        
                        {/* Author Info */}
                        <div className="flex items-center space-x-2">
                          {bookmark.authorProfile && !imgErrors[`author-${index}`] ? (
                            <Image
                            width={24}
                            height={24}
                              src={bookmark.authorProfile}
                              alt={bookmark.authorName}
                              loading="lazy"
                              className="w-6 h-6 rounded-full object-cover border cursor-pointer"
                              onClick={(e) => handleAuthorClick(bookmark.authorId, e)}
                              onError={() => handleImgError(`author-${index}`)}
                            />
                          ) : (
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                                themeValue
                                  ? "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600"
                                  : "bg-gradient-to-br from-purple-900/30 to-pink-900/30 text-purple-400"
                              }`}
                              onClick={(e) => handleAuthorClick(bookmark.authorId, e)}
                            >
                              <User size={12} />
                            </div>
                          )}
                          <span 
                            className={`text-xs cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                              themeValue ? "text-gray-500" : "text-gray-400"
                            }`}
                            onClick={(e) => handleAuthorClick(bookmark.authorId, e)}
                          >
                            By {bookmark.authorName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Column */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-3">
                      {bookmark.userProfile && !imgErrors[`user-${index}`] ? (
                        <Image
                          src={bookmark.userProfile}
                          alt={bookmark.userName}
                          width={40}
                          height={40}
                          loading="lazy"
                          className="w-10 h-10 rounded-full object-cover border cursor-pointer"
                          onClick={(e) => handleUserClick(bookmark.userId, e)}
                          onError={() => handleImgError(`user-${index}`)}
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                            themeValue
                              ? "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600"
                              : "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 text-blue-400"
                          }`}
                          onClick={(e) => handleUserClick(bookmark.userId, e)}
                        >
                          <Users size={14} />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3
                          className={`font-semibold text-sm cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                            themeValue ? "text-gray-900" : "text-white"
                          }`}
                          onClick={(e) => handleUserClick(bookmark.userId, e)}
                        >
                          {bookmark.userName}
                        </h3>
                        <p className={`text-xs mt-0.5 ${
                          themeValue ? "text-gray-500" : "text-gray-400"
                        }`}>
                          {bookmark.userEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bookmarked Date Column */}
                  <div className="col-span-2">
                    <div className="flex flex-col items-center space-y-1">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                        themeValue ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-green-900/20 text-green-400 border border-green-700"
                      }`}>
                        <Bookmark size={10} />
                        <span className="font-semibold whitespace-nowrap">
                          {getTimeAgo(bookmark.bookmarkedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="col-span-2">
                    <div className="flex flex-row space-x-2 w-full max-w-[140px] mx-auto">
                      <button
                        onClick={(e) => handleBlogClick(bookmark.blogId, e)}
                        className={`flex items-center justify-center cursor-pointer space-x-1 px-2.5 py-1 rounded-lg text-sm font-medium transition-all duration-200 w-full ${
                themeValue 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md'
              }`}
                      >
                        <Eye size={14} />
                        <span>Blog</span>
                      </button>
                      
                      <button
                        onClick={(e) => handleUserClick(bookmark.userId, e)}
                        className={`flex items-center justify-center space-x-1 cursor-pointer px-2.5 py-1 rounded-lg text-sm font-medium transition-all duration-200 w-full ${
                          themeValue 
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300" 
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                        }`}
                      >
                        <Users size={14} />
                        <span>User</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredBookmarks.length > 0 && (
        <div
          className={`px-4 py-3 border-t ${
            themeValue
              ? "bg-gray-50 text-gray-600 border-gray-200"
              : "bg-gray-800 text-gray-400 border-gray-700"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className={`p-1.5 rounded-lg ${
                themeValue ? "bg-blue-100 text-blue-600" : "bg-blue-900/30 text-blue-400"
              }`}>
                <Bookmark size={14} />
              </div>
              <div>
                <span className={`font-medium text-sm ${themeValue ? "text-gray-700" : "text-gray-300"}`}>
                  {filteredBookmarks.length} bookmarked {filteredBookmarks.length === 1 ? 'blog' : 'blogs'}
                </span>
                <p className={`text-xs ${themeValue ? "text-gray-500" : "text-gray-400"}`}>
                  Real-time bookmark analytics
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`text-xs flex items-center ${
                themeValue ? "text-gray-500" : "text-gray-400"
              }`}>
                <Calendar size={10} className="mr-1" />
                Updated just now
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                themeValue ? "bg-gray-200 text-gray-700" : "bg-gray-700 text-gray-300"
              }`}>
                {filteredBookmarks.length} entries
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
)

export default BookmarkList;