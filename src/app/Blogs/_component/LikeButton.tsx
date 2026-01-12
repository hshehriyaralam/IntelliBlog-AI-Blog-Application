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
        className={`flex items-center cursor-pointer gap-1.5 px-3 py-2 rounded-full shadow-md transition-all hover:scale-105
        ${liked ? "bg-pink-700" : "bg-pink-200"}`}
      >
        <Heart
          className={`w-5 h-5 transition-colors 
          ${liked ? "text-pink-200 fill-pink-700" : "text-pink-700"}`}
        />
        <span
          className={`text-sm font-medium ${
            liked ? "text-pink-100" : "text-pink-700"
          }`}
        >
          {count}
        </span>
      </button>
    </div>
  );
}
)


export default LikeButton;  