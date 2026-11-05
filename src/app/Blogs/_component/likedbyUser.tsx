"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { User, X, Heart } from "lucide-react";
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
        className="text-[10px] text-[var(--muted)] md:text-[13px]"
      >
        No likes yet
      </div>
    );
  }

// Check if logged-in user liked this post
const isYou = likedByUser.some((u:any) => u._id === loggedInUserId);

// First user (excluding you if needed)
const firstUser = isYou
  ? likedByUser.find((u:any) => u._id !== loggedInUserId)
  : likedByUser[0];
const totalCount = likedByUser.length;
const otherCount = isYou ? totalCount - 1 : totalCount - (firstUser ? 1 : 0);
  
  return (
    <div
      className="text-[10px] text-[var(--muted)] md:text-[13px]"
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
        <div className="fixed inset-0 bg-[rgba(42,42,42,0.55)]" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            className="w-full max-w-md rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--paper)] p-5 text-[var(--ink)] shadow-[var(--sh-card)] sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between border-b-[3px] border-dashed border-[var(--ink)] pb-4">
              <Dialog.Title className="flex items-center gap-2 text-xl font-black tracking-[-0.04em]">
                <span className="flex size-10 items-center justify-center rounded-full border-[3px] border-[var(--ink)] bg-[var(--rose)] shadow-[3px_3px_0_var(--ink)]">
                  <Heart className="size-5 fill-[var(--pink)]" />
                </span>
                Liked by
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close likes"
                className="flex size-10 items-center justify-center rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px] active:translate-y-0.5 active:shadow-none"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
              {likedByUser.map((user:any, index:number) => {
                const hasImage =
                  user.profilePic && user.profilePic.trim() !== "" && !imgError;
                return (
                  <Link
                    key={user.id || index}
                    href={`/Authors/${user._id}`}
                    className={`flex items-center gap-3 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] p-2.5 shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px] ${
                      index % 2 === 0 ? "bg-[var(--mint)]" : "bg-[var(--blue)]"
                    }`}
                  >
                    {hasImage ? (
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="size-10 rounded-full border-[3px] border-[var(--ink)] object-cover"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-full border-[3px] border-[var(--ink)] bg-[var(--yellow)]">
                        <User className="size-5 text-[var(--ink)]" />
                      </div>
                    )}
                    <span className="truncate text-sm font-extrabold sm:text-base">{user.name}</span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-5 min-h-11 w-full cursor-pointer rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--purple)] py-2 text-sm font-extrabold text-white shadow-[var(--sh-btn)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px] active:translate-y-1 active:shadow-none sm:text-base"
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
