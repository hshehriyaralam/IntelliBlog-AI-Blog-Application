'use client'
import { Eye} from "lucide-react";
import DeleteBlogButton from "./DeleteBlogBtn";
import Link from "next/link";
import React from "react";



const  ActionsAdmin = React.memo(({themeValue,blog}:any) => {
    return(
    <div className="flex items-center space-x-2 md:justify-end">
      <Link  href={`/Blogs/${blog._id}`}>
     <button
             className={`rounded-lg  flex items-center gap-x-1  text-sm transition-all duration-200  px-2  py-1   cursor-pointer  ${
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