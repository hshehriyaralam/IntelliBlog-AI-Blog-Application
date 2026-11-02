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
            className="group flex flex-col items-center rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--mint)] p-6 text-center shadow-[var(--sh-card)] transition-transform hover:-translate-y-1"
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
                  className="rounded-full border-[3px] border-[var(--ink)] object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex size-20 items-center justify-center rounded-full border-[3px] border-[var(--ink)] bg-[var(--blue)]">
                  <span className="text-3xl font-black text-[var(--ink)]">{user?.name?.charAt(0) || "?"}</span>
                </div>
              )}
            </div>
            {/* Author Info */}
            <h2
              className="mb-1 text-lg font-black text-[var(--ink)]"
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
                    ? "bg-[var(--pink)] text-[var(--ink)]"
                    : "bg-[var(--yellow)] text-[var(--ink)]"
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
                className="max-w-[200px] truncate text-sm text-[var(--muted)]"
              >
                {user.email}
              </span>
            </div>

            {/* Stats */}
            <div className="mb-4 w-full divide-y-2 divide-dashed divide-[var(--ink)]">
              <div className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-green-500" />
                  <span
                    className="text-[var(--muted)]"
                  >
                    Blogs
                  </span>
                </div>
                <span className="font-black text-[var(--ink)]">
                  {user.blogCount || 0}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  <span
                    className="text-[var(--muted)]"
                  >
                    Joined
                  </span>
                </div>
                <span className="text-right text-xs font-bold text-[var(--ink)]">
                  {joinedDate}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2 text-purple-500" />
                  <span
                    className="text-[var(--muted)]"
                  >
                    Last Seen
                  </span>
                </div>
                <span className="text-right text-xs font-bold text-[var(--ink)]">
                  {lastSeen}
                </span>
              </div>
            </div>

            {/* View Profile Button */}
            <button
              className="flex min-h-11 w-full items-center justify-center rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--purple)] px-4 py-2 text-sm font-extrabold text-white shadow-[var(--sh-btn)] transition-transform hover:-translate-y-0.5"
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
