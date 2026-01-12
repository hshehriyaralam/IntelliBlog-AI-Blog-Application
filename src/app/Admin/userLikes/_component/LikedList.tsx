import { Heart, Calendar, Users, Mail, Clock, PenTool, User, Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {useMemo, useState } from "react";





const  LikedLists  = React.memo(({
  filteredLikes,
  searchQuery,
  themeValue,
  light,
  dark,
}: any) =>  {
  const router = useRouter();
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  
  

  const handleImgError = (key: string) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  const formatDate =   useMemo(() =>  (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  const getTimeAgo = useMemo(() => (dateString: string): string => {
    const now = new Date();
    const likedDate = new Date(dateString);
    const diffMs = now.getTime() - likedDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  }, []);

  const handleUserClick = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/Authors/${userId}`);
  };

  const handleBlogClick = (blogId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/Blogs/${blogId}`);
  };


  


  return (
    <div
      className={`rounded-2xl shadow-lg border-b overflow-hidden ${
        themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`
      }`}
    >
      {/* Table Header (Desktop Only) */}
      <div
        className={`hidden md:grid grid-cols-12 gap-4 p-6 font-semibold text-sm border-b ${
          themeValue
            ? `border-gray-200 ${light} text-gray-900`
            : `border-gray-700 ${dark} text-white`
        }`}
      >
        <div className="col-span-4">Liked By</div>
        <div className="col-span-5">Blog Details</div>
        <div className="col-span-3 text-center">Author Information</div>
      </div>

      {/* Table Body */}
      <div className={`divide-y ${themeValue ? "divide-gray-200" : "divide-gray-700"}`}>
        {  filteredLikes?.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <Heart
              size={48}
              className={`mx-auto mb-4 ${
                themeValue ? "text-gray-300" : "text-gray-600"
              }`}
            />
            <p className={themeValue ? "text-gray-600" : "text-gray-300"}>
              {searchQuery
                ? "No likes found matching your search"
                : "No likes data available"}
            </p>
          </div>
        ) : (
            filteredLikes?.map((like: any, index: number) => (
            <div
              key={index}
              className={`p-4 sm:p-6 transition-colors duration-200 group  rounded-xl  ${
                themeValue ? "hover:bg-gray-50" : "hover:bg-gray-700/50"
              }`}
            >
              {/* Mobile Layout */}
              <div className="md:hidden space-y-4">
                {/* Header Row - User & Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {like.userProfile && !imgErrors[`user-${index}`] ? (
                      <Image
                      width={40}
                      height={40}
                        src={like.userProfile}
                        alt={like.userName}
                        loading="lazy"
                        className="w-10 h-10 rounded-full object-cover shadow-sm border cursor-pointer"
                        onClick={(e) => handleUserClick(like.userId, e)}
                        onError={() => handleImgError(`user-${index}`)}
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                          themeValue
                            ? "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600"
                            : "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 text-blue-400"
                        }`}
                        onClick={(e) => handleUserClick(like.userId, e)}
                      >
                        <Users size={16} />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`font-semibold text-sm cursor-pointer hover:underline ${
                          themeValue ? "text-gray-900" : "text-white"
                        }`}
                        onClick={(e) => handleUserClick(like.userId, e)}
                      >
                        {like.userName}
                      </h3>
                      <p
                        className={`text-xs flex items-center ${
                          themeValue ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        <Mail size={10} className="mr-1" />
                        {like.userEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Blog Content */}
                <div 
                  className={` ${themeValue ? "bg-gray-50" : "bg-gray-700/30"} rounded-lg p-3 cursor-pointer`}
                  onClick={(e) => handleBlogClick(like.blogId, e)}
                >
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border">
                      {like.blogImage && !imgErrors[`blog-${index}`] ? (
                        <Image
                        width={64}
                        height={48}
                        loading="lazy"
                          src={like.blogImage}
                          alt={like.blogTitle}
                          className="w-full h-full object-cover"
                          onError={() => handleImgError(`blog-${index}`)}
                        />
                      ) : (
                        <div
                          className={`w-full h-full flex items-center justify-center ${
                            themeValue ? "bg-gray-200" : "bg-gray-600"
                          }`} 
                        >
                          <Heart
                            size={16}
                            className={themeValue ? "text-gray-400" : "text-gray-500"}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-semibold text-sm line-clamp-1 mb-1 ${
                          themeValue ? "text-gray-900" : "text-white"
                        }`}
                      >
                        {like.blogTitle}
                      </h4>
                      {like.blogSummary && (
                        <p
                          className={`text-xs line-clamp-2 ${
                            themeValue ? "text-gray-600" : "text-gray-300"
                          }`}
                        >
                          {like.blogSummary.length > 100
                            ? like.blogSummary.substring(0, 100) + "..."
                            : like.blogSummary}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Author Info & Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <PenTool size={12} className={themeValue ? "text-blue-500" : "text-blue-400"} />
                      <span className={`text-xs ${themeValue ? "text-gray-500" : "text-gray-400"}`}>
                        Author:
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {like.authorProfile && !imgErrors[`author-${index}`] ? (
                        <Image
                        width={24}
                        height={24}
                        loading="lazy"
                          src={like.authorProfile}
                          alt={like.authorName}
                          className="w-6 h-6 rounded-full cursor-pointer"
                          onClick={(e) => handleUserClick(like.authorId, e)}
                          onError={() => handleImgError(`author-${index}`)}
                        />
                      ) : (
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                            themeValue
                              ? "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600"
                              : "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 text-blue-400"
                          }`}
                          onClick={(e) => handleUserClick(like.authorId, e)}
                        >
                          <User size={12} />
                        </div>
                      )}
                      <span 
                        className={`text-xs font-medium cursor-pointer hover:underline ${
                          themeValue ? "text-blue-600" : "text-blue-400"
                        }`}
                        onClick={(e) => handleUserClick(like.authorId, e)}
                      >
                        {like.authorName}
                      </span>
                    </div>
                  </div>
                    <div className={`flex items-center space-x-1 ${
                    themeValue ? "text-rose-500" : "text-rose-400"
                  }`}>
                    <Heart size={14} />
                    <span className="text-xs font-medium whitespace-nowrap">
                      {getTimeAgo(like.likedAt)}
                    </span>
                  </div>
                </div>

                {/* Published Date */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className={`text-xs ${themeValue ? "text-gray-500" : "text-gray-400"}`}>
                    Published {formatDate(like.blogCreatedAt)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} className={themeValue ? "text-gray-400" : "text-gray-500"} />
                    <span className={`text-xs ${themeValue ? "text-gray-500" : "text-gray-400"}`}>
                      {formatDate(like.likedAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                {/* User Info */}
                <div className="col-span-4">
                  <div className="flex items-center space-x-3">
                    {like.userProfile && !imgErrors[`user-${index}`] ? (
                      <Image
                      width={40}
                      height={40}
                      loading="lazy"
                        src={like.userProfile}
                        alt={like.userName}
                        className="w-10 h-10 rounded-full object-cover shadow-sm border cursor-pointer"
                        onClick={(e) => handleUserClick(like.userId, e)}
                        onError={() => handleImgError(`user-${index}`)}
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                          themeValue
                            ? "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600"
                            : "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 text-blue-400"
                        }`}
                        onClick={(e) => handleUserClick(like.userId, e)}
                      >
                        <Users size={16} />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`font-semibold text-sm cursor-pointer hover:underline ${
                          themeValue ? "text-gray-900" : "text-white"
                        }`}
                        onClick={(e) => handleUserClick(like.userId, e)}
                      >
                        {like.userName}
                      </h3>
                      <p
                        className={`text-xs flex items-center ${
                          themeValue ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        <Mail size={10} className="mr-1" />
                        {like.userEmail}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Heart size={12} className={themeValue ? "text-rose-500" : "text-rose-400"} />
                        <span className={`text-xs ${themeValue ? "text-gray-500" : "text-gray-400"}`}>
                          {getTimeAgo(like.likedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blog Content */}
                <div 
                  className="col-span-5 flex items-start space-x-4 cursor-pointer group"
                  onClick={(e) => handleBlogClick(like.blogId, e)}
                >
                  <div className="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border">
                    {like.blogImage && !imgErrors[`blog-${index}`] ? (
                      <Image
                      width={80}
                      height={56}
                      loading="lazy"
                        src={like.blogImage}
                        alt={like.blogTitle}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        onError={() => handleImgError(`blog-${index}`)}
                      />
                    ) : (
                      <div
                        className={`w-full h-full flex items-center justify-center ${
                          themeValue ? "bg-gray-200" : "bg-gray-700"
                        }`}
                      >
                        <Heart
                          size={20}
                          className={themeValue ? "text-gray-400" : "text-gray-500"}
                        />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4
                      className={`font-semibold text-sm line-clamp-1 mb-1 group-hover:underline ${
                        themeValue ? "text-gray-900" : "text-white"
                      }`}
                    >
                      {like.blogTitle}
                    </h4>
                    {like.blogSummary && (
                      <p
                        className={`text-xs line-clamp-2 ${
                          themeValue ? "text-gray-600" : "text-gray-300"
                        }`}
                      >
                        {like.blogSummary.length > 120
                          ? like.blogSummary.substring(0, 120) + "..."
                          : like.blogSummary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Author Info */}
                <div className="col-span-3">
                  <div className="flex items-center space-x-3">
                    {like.authorProfile && !imgErrors[`author-${index}`] ? (
                      <Image
                      width={24}
                      height={24}
                      loading="lazy"
                        src={like.authorProfile}
                        alt={like.authorName}
                        className="w-8 h-8 rounded-full object-cover shadow-sm border cursor-pointer"
                        onClick={(e) => handleUserClick(like.authorId, e)}
                        onError={() => handleImgError(`author-${index}`)}
                      />
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                          themeValue
                            ? "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600"
                            : "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 text-blue-400"
                        }`}
                        onClick={(e) => handleUserClick(like.authorId, e)}
                      >
                        <User size={14} />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h5
                        className={`font-medium text-xs truncate cursor-pointer hover:underline ${
                          themeValue ? "text-gray-800" : "text-gray-200"
                        }`}
                        onClick={(e) => handleUserClick(like.authorId, e)}
                      >
                        {like.authorName}
                      </h5>
                      <p
                        className={`text-xs ${
                          themeValue ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Author
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`text-xs ${
                        themeValue ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Published {formatDate(like.blogCreatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
  
      {filteredLikes?.length > 0 && (
        <div
          className={`px-4 sm:px-6 py-4 border-t text-sm ${
            themeValue
              ? "bg-gray-50 text-gray-600 border-gray-200"
              : "bg-gray-800/40 text-gray-400 border-gray-700"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Heart
                size={16}
                className={themeValue ? "text-rose-500" : "text-rose-400"}
              />
              <span>
                Showing {filteredLikes.length} liked{" "}
                {filteredLikes.length === 1 ? "blog" : "blogs"}
              </span>
            </div>
            <div
              className={`text-xs flex items-center ${
                themeValue ? "text-gray-500" : "text-gray-400"
              }`}
            >
              <Clock size={12} className="mr-1" />
              Updated just now
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
})

export default LikedLists;