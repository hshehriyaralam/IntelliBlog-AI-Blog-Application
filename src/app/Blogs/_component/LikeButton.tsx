"use client";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useLikeBlogMutation, useSingleBlogQuery } from "../../../Redux/Services/blogApi";
import {useLoggedInUser} from "@/hooks/LoggedInUser"
import React from "react";


export interface IUser {
  id?: string;
  _id?: string;
  name: string;
  profilePic: string;
}

const LikeButton = React.memo(({
  blogId,
}: {
  blogId: string;
})  =>  {
  const {loggedInUserId} = useLoggedInUser()
  const {data :   blogLikesData} = useSingleBlogQuery(blogId)
  const likes = blogLikesData?.blog?.likes || [];
  const likesCount = likes.length;

  const [likeBlog] = useLikeBlogMutation();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likesCount);

  // ✅ initialize like state
 useEffect(() => {
  if (
    loggedInUserId &&
    likes.some((like:any) => (like?.userId?._id)?.toString() === loggedInUserId.toString())
  ) {
    setLiked(true);
  } else {
    setLiked(false);
  }
}, [likes, loggedInUserId]);

  // ✅ toggle with backend response
const handleLike = async () => {
  try {
    // ✅ Optimistic update
    setLiked((prev) => !prev);
    setCount((prev:any) => (liked ? prev - 1 : prev + 1));

    const res = await likeBlog(blogId).unwrap();

    // ✅ Optional: confirm backend count (in case of mismatch)
    if (res?.blogLikes !== undefined) {
      setCount(res.blogLikes);
    }
  } catch (error) {
    console.error("Like failed:", error);

    // ❌ Revert optimistic update if API fails
    setLiked((prev) => !prev);
    setCount((prev:any) => (liked ? prev + 1 : prev - 1));
  }
};
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLike}
        aria-label={liked ? "Unlike blog" : "Like blog"}
        className={`flex min-h-11 items-center gap-1.5 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] px-3 py-2 shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none
        ${liked ? "bg-[var(--pink)]" : "bg-[var(--rose)]"}`}
      >
        <Heart
          className="size-5 text-[var(--ink)]"
        />
        <span
          className="text-sm font-extrabold text-[var(--ink)]"
        >
          {count}
        </span>
      </button>
    </div>
  );
}
)


export default LikeButton;  