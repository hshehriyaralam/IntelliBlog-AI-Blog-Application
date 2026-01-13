import React from 'react';

const  BlogTags = React.memo(({blog}:any) => {
    return(
        <>
        {blog.blogTags?.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-12">
            {blog.blogTags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs sm:text-sm font-medium shadow-sm hover:scale-105 transition-transform"
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