'use client'
import { User  } from "lucide-react";
import Loader from './Loader';
import { useState } from 'react';
import { useAuthNavigate } from "@/hooks/useAuthNavigate";





export default function BlogCard({ blog, isFeatured, themeValue,isLoading }: any) {
    const { authNavigate, isAuthenticating } = useAuthNavigate();
    const [imgError, setImgError] = useState(false);
  const hasImage = blog.userId.profilePic && blog.userId.profilePic.trim() !== "" && !imgError;
  
  if (isLoading) return <Loader />
  return (
    <div onClick={() => authNavigate(`/Blogs/${blog._id}`)}>
      {/* Image Container */}
      <div className={`relative ${isFeatured ? 'h-64' : 'h-48'} overflow-hidden`}>
        <img
          src={blog.blogImage}
          alt={blog.blogTitle}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Tags */}
        <div className="absolute bottom-2 left-3 flex flex-wrap gap-2">
          {blog.blogTags.slice(0, 2).map((tag: string, tagIndex: number) => (
            <span
              key={tagIndex}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className={`font-semibold mb-3 ${isFeatured ? 'text-xl' : 'text-lg'} ${
          themeValue ? 'text-gray-800' : 'text-white'
        }`}>
          {blog.blogTitle}
        </h2>
        
        <p className={`mb-4 ${isFeatured ? 'line-clamp-3' : 'line-clamp-2'} ${
          themeValue ? 'text-gray-600' : 'text-gray-300'
        }`}>
          {blog.blogSummary}
        </p>

        {/* Author and Date */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 p-0.5">
                <div className="w-9 h-9 rounded-full bg-white  flex items-center justify-center overflow-hidden">
                  {hasImage ? (
                    <img 
                      src={blog.userId.profilePic}
                     alt={`${blog.userId?.name || "Author"}-pic`}
                     className="w-9 h-9 rounded-full object-cover" 
                     onError={() => setImgError(true)}
                      
                    />
                  ) : (
                    <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  )}
                </div>
              </div>
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${themeValue ? 'text-gray-800' : 'text-white'}`}>
                {blog.userId?.name || "Unknown Author"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}