"use client";
import { useFetchBlogQuery } from "../../Redux/Services/blogApi";
import BlogCard from "../common/BLogCard";

export default function HomeBlogs() {
  const { data } = useFetchBlogQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <div className="contents">
      {data?.blogs?.slice(0, 3).map((blog: any) => (
        <div key={blog._id} className="min-w-0">
          <BlogCard blog={blog} isFeatured={false} themeValue />
        </div>
      ))}
    </div>
  );
}
