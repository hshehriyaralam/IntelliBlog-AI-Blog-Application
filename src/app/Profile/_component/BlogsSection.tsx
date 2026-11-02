'use client'
import { Trash2  } from "lucide-react";
import { Button } from "../../../components/ui/button";
import  SingleButtonLoader from '../../../components/common/SingleButtonLoader'
import React from "react";
import Image from "next/image";



const  ProfileBlogsSections = React.memo(({themeValue,dark,blog,light, handleDeleteBlog,deletingId}:any) => {
    return(
<div className="overflow-hidden rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--white)] shadow-[var(--sh-card)] transition-transform hover:-translate-y-1">
    {/* Blog Image */}
    <div className="relative h-48 overflow-hidden border-b-[3px] border-[var(--ink)] bg-[var(--blue)]">
        <Image
        width={400}
        height={400}
        loading="lazy"
        src={blog.blogImage}
        alt={blog.blogTitle}
        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
        />
    </div>

    {/* Content */}
    <div className="p-5">
        <h3 className="mb-2 text-lg font-black text-[var(--ink)]">
        {blog.blogTitle}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm leading-6 text-[var(--muted)]">
        {blog.blogSummary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t-2 border-dashed border-[var(--ink)] pt-3">
        <span className="text-xs font-bold text-[var(--muted)]">
            {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        <Button
            variant="ghost"
            size="sm"
            className="group/tooltip relative flex cursor-pointer items-center gap-x-1 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--pink)] px-2 py-1 text-sm text-[var(--ink)] shadow-[3px_3px_0_var(--ink)]"
            onClick={(e) => {
            e.preventDefault();
            handleDeleteBlog(blog._id);
            }}
             disabled={deletingId === blog._id}>
            {/* {deletingId === blog._id ?  <SingleButtonLoader />   : <Trash2 className="w-4 h-4" />} */}
              {deletingId === blog._id  ?  <SingleButtonLoader  />  :  (
                    <>
                       <Trash2 size={10} />
                        <span className="text-xs" >Delete</span>
                        
                    </>
                  )      } 
        </Button>
        </div>
    </div>
    </div>
    )
})


export default ProfileBlogsSections;