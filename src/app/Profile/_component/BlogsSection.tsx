'use client'
import { Trash2  } from "lucide-react";
import { Button } from "../../../components/ui/button";
import  SingleButtonLoader from '../../../components/common/SingleButtonLoader'



export default function ProfileBlogsSections({themeValue,dark,blog,light, handleDeleteBlog,deletingId}:any){
    return(
<div className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
    themeValue ? `${light} border border-gray-200` : `${dark} border border-gray-700`
    }`}>
    {/* Blog Image */}
    <div className="relative h-48 overflow-hidden">
        <img
        src={blog.blogImage}
        alt={blog.blogTitle}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
    </div>

    {/* Content */}
    <div className="p-5">
        <h3 className={`font-semibold mb-2 text-lg ${themeValue ? 'text-gray-800' : 'text-white'}`}>
        {blog.blogTitle}
        </h3>
        <p className={`text-sm mb-3 line-clamp-2 ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>
        {blog.blogSummary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className="text-xs text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        <Button
            variant="ghost"
            size="sm"
            className={`rounded-lg  flex items-center gap-x-1  text-sm transition-all duration-200  px-2  py-1   cursor-pointer  ${
               themeValue
                 ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md"
                 : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md"
             } group/tooltip relative`}
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
}