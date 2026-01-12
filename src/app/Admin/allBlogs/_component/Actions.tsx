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
                 ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md"
                 : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md"
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