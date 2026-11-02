"use client"
import ListeBlogEng from './ListenBlogEng'
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import BookmarkButton from './BookmarkButton'
import LikedByUser from './likedbyUser';
import React from 'react';



const  ActionRow = React.memo(({
  isPlaying,
  setIsPlaying,
  setCurrentIndex,
  blogId,
  themeValue,

}: {
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  setCurrentIndex: (v: { section: string; index: number | null }) => void;
  blogId: string;
  themeValue: boolean;
}) =>  {



  return (
    <div className="sticky bottom-3 z-20 mt-8 rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--paper)] p-3 shadow-[var(--sh-card)] md:static md:border-0 md:bg-transparent md:p-0 md:shadow-none">
      {/* Main Row - Listen Button + Action Buttons */}
      <div className="flex w-full flex-row items-center justify-between gap-4">
        
        {/* 🎧 Listen Button */}
        <div className="flex-1 min-w-0">
          <ListeBlogEng
            isPlaying={isPlaying}
            blogId={blogId}
            setCurrentIndex={setCurrentIndex}
            setIsPlaying={setIsPlaying}
          />
        </div>

        {/* ❤️ Action Buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LikeButton blogId={blogId}/>
          <ShareButton   blogId={blogId}  />
          <BookmarkButton blogId={blogId}  />
        </div>
      </div>

      {/* ✅ LikedByUser - Always below both sections */}
      <div className="mt-3 w-full text-end">
        <LikedByUser blogId={blogId}  themeValue={themeValue} />
      </div>
    </div>
  );
})

export default ActionRow;