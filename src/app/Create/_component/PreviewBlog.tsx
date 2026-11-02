'use client'
import React from 'react';

const PreviewBlog = React.memo(function PreviewBlog(
  {  themeValue, title,  summary ,  tags, imagePreview,}: any){
  return(
  <div className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--sh-card)]">
    <h2 className="mb-4 text-xl font-black tracking-[-0.03em] text-[var(--ink)]">
      Preview
      </h2>
      
      <div className="overflow-hidden rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--blue)]">
        {imagePreview && (
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="mb-0 h-40 w-full border-b-[3px] border-[var(--ink)] object-cover"
          />
        )}
        
        <div className="bg-[var(--white)] p-4">
        <h3 className="mb-2 text-lg font-black leading-tight text-[var(--ink)]">
          {title || "Your blog title will appear here"}
        </h3>
        
        <p className="mb-3 line-clamp-3 text-sm leading-6 text-[var(--muted)]">
          {summary || "Your summary will appear here"}
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags?.map((tag: string, i: number) => (
              <span 
                key={i} 
                className="rounded-full border-2 border-[var(--ink)] bg-[var(--mint)] px-2 py-1 text-xs font-extrabold text-[var(--ink)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  )
})

export default PreviewBlog;