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
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark blog"}
      className={`flex size-11 items-center justify-center rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] transition-transform shadow-[3px_3px_0_var(--ink)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none ${
        bookmarked ? "bg-[var(--yellow)]" : "bg-[var(--paper)]"
      }`}
    >
      <Bookmark
        className="size-5 text-[var(--ink)]"
      />
    </button>
  );
}
)

export default BookmarkButton;