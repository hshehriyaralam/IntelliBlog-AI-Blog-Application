"use client";
import { Bookmark } from "lucide-react";
import {
  useGetBookmarksQuery,
  useToggleBookmarkMutation,
} from "../../../Redux/Services/bookmarkApi";
import { useState, useEffect } from "react";
import React from "react";

const  BookmarkButton  = React.memo(({ blogId }: { blogId: string }) => {
  const { data: bookmarks } = useGetBookmarksQuery(undefined);
  const [toggleBookmark] = useToggleBookmarkMutation();

  // ✅ local state for instant UI updates
  const [bookmarked, setBookmarked] = useState(false);

  // ✅ initialize bookmarked state when data loads
  useEffect(() => {
    if (bookmarks?.bookmarks) {
      const found = bookmarks.bookmarks.some(
        (b: any) => b.blogId._id === blogId
      );
      setBookmarked(found);
    }
  }, [bookmarks, blogId]);

  // ✅ optimistic UI update
  const handleBookmark = async () => {
    try {
      // 🔹 Toggle UI instantly
      setBookmarked((prev) => !prev);

      // 🔹 Call API
      const res = await toggleBookmark({ blogId }).unwrap();

      // 🔹 Optional: verify backend state (if response includes updated status)
      if (res?.isBookmarked !== undefined) {
        setBookmarked(res.isBookmarked);
      }
    } catch (error) {
      console.error("Bookmark toggle failed:", error);

      // ❌ revert UI if API fails
      setBookmarked((prev) => !prev);
    }
  };


  return (
    <button
      onClick={handleBookmark}
      className={`p-2 sm:p-2.5 rounded-full transition-all shadow-md hover:scale-110 cursor-pointer ${
        bookmarked ? "bg-amber-500" : "bg-amber-100"
      }`}
    >
      <Bookmark
        className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
          bookmarked ? "text-gray-200" : "text-amber-500"
        }`}
      />
    </button>
  );
}
)

export default BookmarkButton;