'use client'
import {User,Mail,Calendar,FileText,Eye} from 'lucide-react'
import Image from 'next/image';
import React, { useMemo, useState } from 'react'



const  AuthorsProfileSection = React.memo(({
        themeValue,
        light,
        dark,
        user,
        blogs,
    }:any) => {
  const [imgError, setImgError] = useState(false);
   const hasImage = user?.profilePic && user.profilePic.trim() !== "" && !imgError;
      

      
  // Date formatting
  const joinedDate = useMemo(() => 
    user.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "N/A"
  , [user?.createdAt]);

  const lastSeen = useMemo(() => 
    user.lastSeenAt 
    ? new Date(user.lastSeenAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently active"
  , [user?.lastSeenAt]);

  const totalLikes = useMemo(() => user?.totalLikes, [user?.totalLikes]);
  const LikedBlogs = useMemo(() => user?.likedBlogs?.length, [user?.likedBlogs]);
  const bookmarks  = useMemo(() => user?.bookmarks?.length || 0, [user?.bookmarks]);
    return(
        <div className="mb-8 overflow-hidden rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--white)] shadow-[var(--sh-card)]">
          <div className="flex flex-col md:flex-row">
            {/* Profile Image */}
            <div className="md:w-1/3 p-8 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="flex size-36 items-center justify-center rounded-full border-[3px] border-[var(--ink)] bg-[var(--blue)] p-2">
                  <div className="w-full h-full rounded-full bg-white  flex items-center justify-center overflow-hidden">
                    {hasImage ? (
                      <Image
                      width={128}
                      height={128}
                      loading='lazy'
                        src={user.profilePic}
                        alt={`${ <User className="w-12 h-12 text-indigo-600 " />}`}
                        onError={() => setImgError(true)}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl font-black text-[var(--ink)]">{user?.name?.charAt(0) || "?"}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <span className={`rounded-full border-2 border-[var(--ink)] px-4 py-1.5 text-sm font-extrabold ${
                  user.role === "admin"
                    ? "bg-[var(--pink)] text-[var(--ink)]"
                    : "bg-[var(--yellow)] text-[var(--ink)]"
                }`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="border-t-[3px] border-[var(--ink)] p-8 md:w-2/3 md:border-l-[3px] md:border-t-0">
              <h1 className="mb-4 text-4xl font-black tracking-[-0.04em] text-[var(--ink)]">
                {user.name}
              </h1>

              <div className="mb-6 grid grid-cols-1 gap-4 text-[var(--muted)] md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-500" />
                  <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                    {user.email}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                    Joined {joinedDate}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-purple-500" />
                  <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                    Last seen {lastSeen}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                    {blogs.length} articles published
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className={`p-3 rounded-xl text-center ${
                  'border-[3px] border-[var(--ink)] bg-[var(--rose)]'
                }`}>
                  <div className="text-2xl font-black text-[var(--ink)]">{blogs.length}</div>
                  <div className="text-xs font-bold text-[var(--ink)]">Articles</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  'border-[3px] border-[var(--ink)] bg-[var(--blue)]'
                }`}>
                  <div className="text-2xl font-black text-[var(--ink)]">{bookmarks}</div>
                  <div className="text-xs font-bold text-[var(--ink)]">Bookmarks</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  'border-[3px] border-[var(--ink)] bg-[var(--purple)]'
                }`}>
                  <div className="text-2xl font-black text-white">{totalLikes}</div>
                  <div className="text-xs font-bold text-white">Likes</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  'border-[3px] border-[var(--ink)] bg-[var(--mint)]'
                }`}>
                  <div className="text-2xl font-black text-[var(--ink)]">{LikedBlogs}</div>
                  <div className="text-xs font-bold text-[var(--ink)]">Liked Blogs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
})


export default AuthorsProfileSection;