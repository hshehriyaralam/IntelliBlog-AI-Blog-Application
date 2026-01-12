"use client";
import React, {  useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Eye,
  FileText,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const AuthorsCard = React.memo(
  ({ user, isYou, joinedDate, lastSeen, themeValue, light, dark }: any) => {
    const [imgError, setImgError] = useState(false);
    const hasImage = user?.profilePic && user.profilePic.trim() !== "" && !imgError;
    return (
      <div>
        <Link href={`/Authors/${user.id}`}>
          <div
            className={`group rounded-2xl p-6 flex flex-col items-center text-center
        
       hover:border-indigo-400 hover:shadow-xl hover:scale-105 
        
        transition-all duration-300 border  min-w-[320px] ${
          themeValue ? `${light} border-gray-300` : `${dark} border-gray-700`
        }`}
          >
            {/* Profile Image */}
            <div className="relative mb-4">
              {hasImage ? (
                <Image
                  width={90}
                  height={90}
                  src={user.profilePic}
                  alt={user.name}
                  loading="lazy"
                  className="rounded-full object-cover border-2 border-indigo-400"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-300  border-2 border-indigo-400">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
              )}
            </div>
            {/* Author Info */}
            <h2
              className={`text-lg font-semibold mb-1 ${
                themeValue ? "text-gray-800" : "text-white"
              }`}
            >
              {user.name}{" "}
              {isYou && (
                <span className="text-sm text-indigo-500 font-bold">(You)</span>
              )}
            </h2>
            {/* Role Badge */}
            <div className="flex items-center justify-center mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === "admin"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                }`}
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center justify-center mb-4 w-full">
              <Mail className="w-4 h-4 mr-2 text-indigo-500" />
              <span
                title={user.email}
                className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]"
              >
                {user.email}
              </span>
            </div>

            {/* Stats */}
            <div className="w-full space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-green-500" />
                  <span
                    className={themeValue ? "text-gray-600" : "text-gray-400"}
                  >
                    Blogs
                  </span>
                </div>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {user.blogCount || 0}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  <span
                    className={themeValue ? "text-gray-600" : "text-gray-400"}
                  >
                    Joined
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {joinedDate}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2 text-purple-500" />
                  <span
                    className={themeValue ? "text-gray-600" : "text-gray-400"}
                  >
                    Last Seen
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {lastSeen}
                </span>
              </div>
            </div>

            {/* View Profile Button */}
            <button
              className="w-full flex items-center cursor-pointer justify-center px-4 py-2
         hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105
                 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium "
            >
              View Profile & Blogs
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </Link>
      </div>
    );
  }
);

export default AuthorsCard;
