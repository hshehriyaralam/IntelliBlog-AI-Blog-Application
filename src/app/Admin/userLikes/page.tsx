'use client';
import { Suspense, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ContextTheme } from "../../../Context/DarkTheme";
import LoadingPage from "../../../components/layout/LoadingPage";
import LikedLists from "./_component/LikedList"
import { useAllLikesAdminQuery } from "../../../Redux/Services/adminApi";
import type { LikeData } from "../../../../types/Admin"
import dynamic from "next/dynamic";
import { PageFrame } from "@/components/ui/page-frame";
import { SectionHeading } from "@/components/ui/section-heading";



const LikedFilter = dynamic(() => import("./_component/likedFilter"), { ssr: false });
const PaginationItems = dynamic(() => import('@/components/common/paginationItems'), {
  ssr: false,
});


export default function UserLikes() {
  const { data: likesData, isLoading } = useAllLikesAdminQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
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
    <PageFrame className="min-h-0 gap-5 !p-2 md:!p-4 lg:!p-5">
      <div className="mx-auto w-full max-w-[1480px]">
        {/* Header */}
        <div className="mb-5">
            <SectionHeading eyebrow="Admin Control">User Likes</SectionHeading>
           <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
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
    </PageFrame>
  );
}
