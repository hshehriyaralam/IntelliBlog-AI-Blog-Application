"use client";
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext } from 'react';
import { useFetchBlogQuery } from "../../Redux/Services/blogApi"; 
import {liveRefetchOptions} from "../../hooks/rtkOptions"

import BlogCard from "../common/BLogCard"

export default function HomeBlogs() {
  const { data } = useFetchBlogQuery(undefined,liveRefetchOptions );
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme)

  return (
    <div className="flex flex-col gap-8">
 

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.blogs?.slice(0, 7).map((blog: any, index: number) => {
          const isFeatured = index % 6 === 0;
          return (
            <div
              key={blog._id}
              className={`
                border
                ${isFeatured ? 'lg:col-span-2' : ''}
                ${themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`} 
                rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300
                hover:scale-[1.02] cursor-pointer
              `}
            >
              <BlogCard 
                blog={blog}
                isFeatured={isFeatured}
                themeValue={themeValue}
                lightText={lightText}
                DarkText={DarkText}
              />
            </div>    
          );
        })}
      </div>
    </div>
  );
}