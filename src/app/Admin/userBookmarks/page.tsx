'use client'
import { Suspense, useCallback, useContext, useMemo, useState } from "react";
import { ContextTheme } from "../../../Context/DarkTheme";
import BookmarkList from "./_component/bookmarkList";
import LoadingPage from "../../../components/layout/LoadingPage";
import {useAllbookmarksAdminQuery} from '../../../Redux/Services/adminApi';
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";



  const BookmarkFilter = dynamic  (() => import("./_component/bookmarkFilter"), {
    ssr: false,
  }); 

  const PaginationItems = dynamic(() => import("../../../components/common/paginationItems"),{ ssr: false });
  


export default function UserBookmarks() {
  const { data, isLoading, error } = useAllbookmarksAdminQuery(undefined);
  const { themeValue, light, dark } = useContext(ContextTheme);
  const [searchQuery, setSearchQuery] = useState("");
    const [currentItems, setCurrentItems] = useState<any[]>([]);
  
  
  // Transform API data to match the expected format
  const transformedBookmarks = useMemo(() => {
    if (!data?.bookmarks) return [];
    
    return data.bookmarks.map((bookmark: any) => ({
      id: bookmark.bookmarkId,
      userId: bookmark.userId,
      userName: bookmark.bookmarkedByName,
      userEmail: bookmark.bookmarkedByEmail,
      userProfile: bookmark.bookmarkedByProfilePic,
      blogId: bookmark.blogId,
      blogTitle: bookmark.blogTitle || "Untitled Blog",
      blogImage: bookmark.blogImage,
      blogDescription: bookmark.blogDescription,
      authorName: bookmark.authorName,
      authorId: bookmark.authorId,
      authorProfile: bookmark.authorProfilePic,
      bookmarkedAt: bookmark.bookmarkedAt,
      createdAt: bookmark.createdAt || bookmark.bookmarkedAt
    }));
  }, [data?.bookmarks]);

  const filteredBookmarks = useMemo(() => {
    if (!searchQuery) return transformedBookmarks;
    const query = searchQuery.toLowerCase();
    return transformedBookmarks.filter((bookmark:any) =>
      bookmark.userName.toLowerCase().includes(query) ||
      bookmark.userEmail.toLowerCase().includes(query) ||
      bookmark.blogTitle.toLowerCase().includes(query) ||
      bookmark.authorName.toLowerCase().includes(query)
    );
  }, [transformedBookmarks, searchQuery]);


     const handlePageChange = useCallback((items:any[]) => {
      setCurrentItems(items);
    }, []);


  if (error) {
    return (
      <div className={`min-h-screen ${themeValue ? light : dark} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Bookmarks</h2>
          <p className="text-gray-600">Failed to load bookmarks data. Please try again later.</p>
        </div>
      </div>
    );
  }

  
  if (isLoading) return <LoadingPage />;


  return (
    <div className={`min-h-screen ${themeValue ? light : dark} md:p-6 sm:p-2`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent  lg:text-left text-center lg:mt-0 mt-4">
            User Bookmarks
          </h1>
          <p className={`${themeValue ? "text-gray-600" : "text-gray-300"} mt-2  text-[15px] lg:max-w-[600px] max-w-[250px]  lg:text-left text-center  lg:mx-0 mx-auto`}>
            Track and manage all user saved content across the platform 
          </p>
        </div>

        {/* Search Filter */}
        <BookmarkFilter
          themeValue={themeValue}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          light={light}
          dark={dark}
        />

        {/* Results Info */}
        <div className={`mb-4 flex items-center justify-between ${
          themeValue ? 'text-gray-600' : 'text-gray-300'
        }`}>
          <p className="text-sm">
            Showing <span className="font-semibold text-indigo-600">{filteredBookmarks.length}</span> of{" "}
            <span className="font-semibold">{transformedBookmarks.length}</span> bookmarks
          </p>
          {searchQuery && (
            <Button
              onClick={() => setSearchQuery("")}
              className="text-sm text-red-600 hover:text-red-700 font-medium  cursor-pointer"
            >
              Clear search
            </Button>
          )}
        </div>

        {/* Bookmarks Table */}
        <Suspense fallback={<LoadingPage />}>
        <BookmarkList
          themeValue={themeValue}
          light={light}
          dark={dark}
          filteredBookmarks={currentItems}
          searchQuery={searchQuery}/>
        </Suspense>

        {/* Footer Info */}
        {filteredBookmarks.length > 0 && (
          <div
            className={`mt-4 text-sm ${
              themeValue ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Showing {currentItems.length} of {transformedBookmarks.length} bookmarks
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}
      </div>

      <PaginationItems 
        ItemsPerPage={10}
        filteredItems={filteredBookmarks}
        onPageChange={handlePageChange}
        themeValue={themeValue}  />
    </div>
  );
}