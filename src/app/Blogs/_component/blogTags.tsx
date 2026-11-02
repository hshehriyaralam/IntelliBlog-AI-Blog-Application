import React from 'react';

const  BlogTags = React.memo(({blog}:any) => {
    return(
        <>
        {blog.blogTags?.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-3">
            {blog.blogTags.map((tag: string, index: number) => (
              <span
                key={index}
                className="rounded-full border-[2.5px] border-[var(--ink)] bg-[var(--mint)] px-3 py-1 text-xs font-extrabold text-[var(--ink)] shadow-[var(--sh-chip)] transition-transform hover:-translate-y-0.5 sm:text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        </>
    )
})

export default BlogTags;