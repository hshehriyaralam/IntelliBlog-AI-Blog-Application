'use client'
import { useContext, useMemo } from 'react';
import { ContextTheme } from '../../Context/DarkTheme'
import { useFetchBlogQuery } from '../../Redux/Services/blogApi';
import { Hash, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';



function Tags() {
  const router = useRouter()
  const { themeValue, lightText, DarkText } = useContext(ContextTheme)
  const { data, isLoading, isError } = useFetchBlogQuery(undefined ,{
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,})  
  const allTags = data?.blogs?.map((blogs: { blogTags: string[] }) => blogs.blogTags).flat() || [];
  const uniqueTags = useMemo(() => {
  return [...new Set(allTags)];}, [allTags]);
  const handleTagClick = (tag: string) =>  router.push(`/Blogs`);
  
  if (isLoading) {
    return (
      <div className={`
        rounded-2xl shadow-lg border-2 p-4 
        transition-all duration-300 hover:scale-[1.02] 
        relative overflow-hidden group
        ${themeValue 
          ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-indigo-500/30' 
          : 'bg-gray-800/30 border-gray-700 hover:border-gray-600 hover:shadow-indigo-500/30'
        }
      `}>
        {/* Corner Shadow Effects */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="flex items-center justify-center py-2">
          <Loader2 className="animate-spin text-indigo-500" size={20} />
          <span className={`ml-2 text-xs ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>
            Loading...
          </span>
        </div>
      </div>
    )
  }
  if (isError) {
    return (
      <div className={`
        rounded-2xl shadow-lg border-2 p-4 
        transition-all duration-300 hover:scale-[1.02] 
        relative overflow-hidden group
        ${themeValue 
          ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-indigo-500/30' 
          : 'bg-gray-800/30 border-gray-700 hover:border-gray-600 hover:shadow-indigo-500/30'
        }
      `}>
        {/* Corner Shadow Effects */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <p className={`text-xs text-center py-2 ${themeValue ? lightText : DarkText}`}>Failed to load tags 😢</p>
      </div>
    )
  }

  return (
    <div className={`
      rounded-2xl shadow-lg border-2 p-4 
      transition-all duration-300 hover:scale-[1.02] 
      relative overflow-hidden group
      ${themeValue 
        ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-indigo-500/30' 
        : 'bg-gray-800/30 border-gray-700 hover:border-gray-600 hover:shadow-indigo-500/30'
      }
    `}>
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-indigo-500 opacity-10 group-hover:opacity-15 transition-all duration-500 group-hover:scale-125"></div>
        <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-indigo-500 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-110"></div>
      </div>

      {/* Floating Icon Effect */}
      <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-15 transition-opacity duration-300">
        <Hash size={28} className={themeValue ? 'text-indigo-600' : 'text-indigo-400'} />
      </div>

      {/* Corner Shadow Effects - Stats ki tarah */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex items-center gap-2 mb-3 relative z-10">
        <div className={`
          p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md
          ${themeValue 
            ? 'bg-indigo-100 text-indigo-600' 
            : 'bg-indigo-900/30 text-indigo-300'
          }
        `}>
          <Hash size={18} />
        </div>
        <h3 className={`text-lg font-semibold ${themeValue ? lightText : DarkText}`}>
          Popular Tags
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2 relative z-10">
        {uniqueTags.slice(0, 6).map((tag: any, index: any) => (
          <span
            key={index}
            onClick={() => handleTagClick(tag)}
            className={`
              inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
              transition-all duration-300 cursor-pointer group/tag relative overflow-hidden
              hover:scale-105 active:scale-95
              ${themeValue 
                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-800 shadow-sm' 
                : 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 text-indigo-200 hover:from-indigo-900/40 hover:to-purple-900/40 hover:text-white shadow-sm'
              }
            `}
          >
            {/* Tag Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-indigo-500 opacity-0 group-hover/tag:opacity-15 transition-all duration-300"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-indigo-500 opacity-0 group-hover/tag:opacity-10 transition-all duration-300"></div>
            </div>

            {/* Hash Icon */}
            <Hash size={10} className="mr-1 opacity-70 group-hover/tag:opacity-100 transition-opacity duration-300 relative z-10" />
            
            {/* Tag Text */}
            <span className="relative z-10">{tag}</span>

            {/* Hover Effect Border */}
            <div className={`
              absolute inset-0 rounded-full border border-transparent 
              group-hover/tag:border-white/20 transition-all duration-300 pointer-events-none
            `}></div>

            {/* Tag Corner Effects - Stats ki tarah */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-indigo-500/40 rounded-tl-full opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-indigo-500/40 rounded-br-full opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300"></div>
          </span>
        ))}
      </div>

      {/* Hover Effect Border */}
      <div className={`
        absolute inset-0 rounded-2xl border-2 border-transparent 
        group-hover:border-indigo-500/20 transition-all duration-300 pointer-events-none
      `}></div>

      {/* Original Corner Accents */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${
        themeValue ? 'border-indigo-200' : 'border-indigo-700'
      } rounded-tl-2xl opacity-30`}></div>
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${
        themeValue ? 'border-indigo-200' : 'border-indigo-700'
      } rounded-br-2xl opacity-30`}></div>
    </div>
  )
}


export default Tags