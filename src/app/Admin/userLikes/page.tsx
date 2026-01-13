'use client';
import { Suspense, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ContextTheme } from "../../../Context/DarkTheme";
import LoadingPage from "../../../components/layout/LoadingPage";
import LikedLists from "./_component/LikedList"
import { useAllLikesAdminQuery } from "../../../Redux/Services/adminApi";
import type { LikeData } from "../../../../types/Admin"
import dynamic from "next/dynamic";



const LikedFilter = dynamic(() => import("./_component/likedFilter"), { ssr: false });
const PaginationItems = dynamic(() => import('@/components/common/paginationItems'), {
  ssr: false,
});


export default function UserLikes() {
  const { data: likesData, isLoading } = useAllLikesAdminQuery(undefined);
  const { themeValue, light, dark } = useContext(ContextTheme);
  const [likes, setLikes] = useState<LikeData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentItems, setCurrentItems] = useState<any[]>([]);

  const handlePageChange = useCallback((items:any[]) => {
          setCurrentItems(items);
        }, []);

 

useEffect(() => {
  if (likesData?.data) {
    const formatted = likesData.data.map((like: any) => ({
      userId: like.userId,
      userName: like?.user?.name || "Unknown User",
      userEmail: like?.user?.email || "N/A",
      userProfile: like?.user?.profilePic || "/default-avatar.png",

      blogId: like?.blogId,
      blogTitle: like?.blog?.blogTitle || "Unknown Blog",
      blogImage: like?.blog?.blogImage || "",
      blogSummary: like?.blog?.blogSummary || "",
      blogCreatedAt: like?.blog?.createdAt || "",
      likedAt: like?.likedAt || "",

      authorId: like?.blog?.author?.id || "",
      authorName: like?.blog?.author?.name || "Unknown Author",
      authorEmail: like?.blog?.author?.email || "",
      authorProfile: like?.blog?.author?.profilePic || "/default-avatar.png",
    }));

    setLikes(formatted);
  }
}, [likesData]);


  const filteredLikes = useMemo(() => {
    if (!searchQuery) return likes;
    const query = searchQuery.toLowerCase();
    return likes.filter((like) =>
      like.userName.toLowerCase().includes(query) ||
      like.userEmail.toLowerCase().includes(query) ||
      like.blogTitle.toLowerCase().includes(query)
    );
  }, [likes, searchQuery]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className={`min-h-screen ${themeValue ? light : dark} md:p-6 sm:p-2`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
            <h1 className={`text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent  lg:text-left text-center lg:mt-0 mt-4`}>
            User Likes
          </h1>
           <p className={`mt-2 ${themeValue ? 'text-gray-600' : 'text-gray-300'}  mt-2  text-[16px] lg:max-w-[600px]  lg:text-left   text-center`}>
            See which users liked which blogs
          </p>
        </div>

        {/* Search Filter */}
        <LikedFilter
          themeValue={themeValue}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          light={light}
          dark={dark}
        />


        <div className="flex items-center justify-end mx-6 " >
         {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
            >
              Clear search
            </button>
          )}
          </div>

        {/* Likes Table */}
        <Suspense fallback={<LoadingPage />}>
        <LikedLists
          themeValue={themeValue}
          light={light}
          dark={dark}
          filteredLikes={currentItems}
          searchQuery={searchQuery}
        />
        </Suspense>



        

        {/* Footer Info */}
        {currentItems?.length > 0 && (
          <div
            className={`mt-4 text-sm ${
              themeValue ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Showing {currentItems.length} of {likes.length} likes
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}

        <PaginationItems
        ItemsPerPage={10}
        filteredItems={filteredLikes}
        onPageChange={handlePageChange}
        themeValue={themeValue}
        />
      </div>
    </div>
  );
}
