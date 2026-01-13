'use client'
import React from 'react';

const PreviewBlog = React.memo(function PreviewBlog(
  {  themeValue, title,  summary ,  tags, imagePreview,}: any){
  console.log("PreviewBlog");
  
  return(
    <div className={`p-4 rounded-xl border ${
      themeValue 
        ? 'bg-white border-gray-200 shadow-sm' 
        : 'bg-gray-800 border-gray-700 shadow-md'
    }`}>
      <h2 className={`text-lg font-semibold mb-3 ${themeValue ? 'text-gray-800' : 'text-white'}`}>
        📝 Preview
      </h2>
      
      <div className={`p-4 rounded-lg ${
        themeValue ? 'bg-gray-50' : 'bg-gray-700/50'
      }`}>
        {imagePreview && (
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
        )}
        
        <h3 className={`font-semibold mb-2 text-sm ${themeValue ? 'text-gray-800' : 'text-white'}`}>
          {title || "Your blog title will appear here"}
        </h3>
        
        <p className={`text-sm mb-3 ${themeValue ? 'text-gray-600' : 'text-gray-300'} line-clamp-2`}>
          {summary || "Your summary will appear here"}
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags?.map((tag: string, i: number) => (
              <span 
                key={i} 
                className={`px-2 py-1 text-xs rounded-full ${
                  themeValue 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-indigo-900/30 text-indigo-300'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

export default PreviewBlog;