'use client'
import { Eye} from "lucide-react";
import DeleteBlogButton from "./DeleteBlogBtn";
import Link from "next/link";
import React from "react";



const  ActionsAdmin = React.memo(({themeValue,blog}:any) => {
    return(
    <div className="flex flex-nowrap items-center gap-1 md:justify-end">
      <Link  href={`/Blogs/${blog._id}`}>
     <button
             className={`flex min-h-8 items-center gap-x-1 rounded-[var(--r-btn)] border-2 border-[var(--ink)] px-2 py-0.5 text-[11px] font-extrabold transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer ${
               themeValue
                 ? "border-[3px] border-[var(--ink)] bg-[var(--purple)] text-white shadow-[var(--sh-btn)]"
                 : "border-[3px] border-[var(--ink)] bg-[var(--purple)] text-white shadow-[var(--sh-btn)]"
             } group/tooltip relative`}
           >
             <Eye size={14} /> 
             <span>View</span>
           </button>
    </Link>
   <DeleteBlogButton  themeValue={themeValue}  blog={blog} />
  </div>
    )
})

export default ActionsAdmin