"use client";
import { useState,useMemo } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { User } from "lucide-react";
import { useLoggedInUser } from "@/hooks/LoggedInUser";
import React from "react";
import { useSingleBlogQuery } from "@/Redux/Services/blogApi";

const LikedByUser = React.memo(({ blogId,themeValue }: { blogId: string, themeValue: boolean }) => {
  const {loggedInUserId} = useLoggedInUser()
  const { data: likedUsersData } = useSingleBlogQuery(blogId,{pollingInterval: 1000});
  const likedUsers = likedUsersData?.blog?.likes || [];
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  
  
  
  const likedByUser = likedUsers.map((like: any) => like.userId).filter(Boolean);

  if (!likedByUser || likedByUser.length === 0) {
    return (
      <div
        className={`text-[10x] md:text-[13px] ${
          themeValue ? "text-gray-500" : "text-gray-400"
        }`}
      >
        No likes yet
      </div>
    );
  }

// Check if logged-in user liked this post
const isYou = likedByUser.some((u:any) => u._id === loggedInUserId);

// First user (excluding you if needed)
const firstUser = useMemo(() => isYou
  ? likedByUser.find((u:any) => u._id !== loggedInUserId)
  : likedByUser[0], [isYou, likedByUser, loggedInUserId]);

// Calculate other users count
const totalCount = useMemo(() => likedByUser.length, [likedByUser]);
const otherCount = useMemo(() => isYou ? totalCount - 1  : totalCount - (firstUser ? 1 : 0), [isYou, totalCount, firstUser]);
  
  return (
    <div
      className={`text-[10px] md:text-[13px] ${
        themeValue ? "text-gray-700" : "text-gray-300"
      }`}
    >
      <span>
  Liked by{" "}
  <button
    onClick={() => setIsOpen(true)}
    className="font-bold hover:underline"
  >
    {isYou ? "You" : firstUser?.name}
  </button>

  {otherCount > 0 && (
    <>
      {" "}and{" "}
      <button
        onClick={() => setIsOpen(true)}
        className="font-semibold hover:underline"
      >
        {otherCount} others
      </button>
    </>
  )}
</span>


      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            className={`w-full max-w-xs sm:max-w-sm rounded-xl shadow-lg p-4 border transition ${
              themeValue
                ? "bg-white text-gray-900 border-gray-300"
                : "bg-black text-gray-100 border-gray-800"
            }`}
          >
            <Dialog.Title className="text-base sm:text-lg font-bold mb-3">
              Liked by
            </Dialog.Title>

            <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
              {likedByUser.map((user:any, index:number) => {
                const hasImage =
                  user.profilePic && user.profilePic.trim() !== "" && !imgError;
                return (
                  <Link
                    key={user.id || index}
                    href={`/Authors/${user._id}`}
                    className={`flex items-center gap-3 p-2 rounded-md transition ${
                      themeValue ? "hover:bg-gray-100" : "hover:bg-gray-900"
                    }`}
                  >
                    {hasImage ? (
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-300">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                    <span className="font-medium text-sm sm:text-base">{user.name}</span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer text-white py-1.5 sm:py-2 rounded-lg text-sm sm:text-base"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
})

export default LikedByUser;
