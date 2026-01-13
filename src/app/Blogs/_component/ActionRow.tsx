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
    <div className="mt-8">
      {/* Main Row - Listen Button + Action Buttons */}
      <div className="flex flex-row items-center justify-between gap-4 w-full">
        
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
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
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