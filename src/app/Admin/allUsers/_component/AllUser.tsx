'use client'
import React, {  useState } from "react";
import { Users, Mail, FileText, UserCheck, Crown, PenTool, Heart } from "lucide-react";
import type {AdminUser  as User} from "../../../../../types/Admin"
import Image from "next/image";
import dynamic from "next/dynamic";



const DeleteButton = dynamic(() => import("./DeleteButton"), { ssr: false });



const  AllUserAdminPage = React.memo(({ filteredUsers, setShowDeleteModal, setSelectedUser,themeValue, light, dark }: any) => {
 
  // Track per-user image errors
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (userId: string) => {
    setImgErrors((prev) => ({ ...prev, [userId]: true }));
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleBadge = (user: User) => {
    const baseStyles = "px-2 py-1 text-xs font-medium rounded-full border";

    if (themeValue) {
      const styles = {
        admin: "bg-purple-100 text-purple-800 border-purple-200",
        author: "bg-blue-100 text-blue-800 border-blue-200",
        user: "bg-gray-100 text-gray-800 border-gray-200",
      };
      return (
        <span className={`${baseStyles} ${styles[user.role]} flex items-center`}>
          {user.role === "admin" && <Crown size={10} className="mr-1" />}
          {user.role === "author" && <PenTool size={10} className="mr-1" />}
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      );
    } else {
      const styles = {
        admin: "bg-purple-900/30 text-purple-400 border-purple-700",
        author: "bg-blue-900/30 text-blue-400 border-blue-700",
        user: "bg-gray-700 text-gray-300 border-gray-600",
      };
      return (
        <span className={`${baseStyles} ${styles[user.role]} flex items-center`}>
          {user.role === "admin" && <Crown size={10} className="mr-1" />}
          {user.role === "author" && <PenTool size={10} className="mr-1" />}
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      );
    }
  };

  const getStatusBadge = (user: User) => {
    const baseStyles = "px-2 py-1 text-xs font-medium rounded-full border flex items-center";

    if (user.isBanned) {
      return themeValue
        ? `${baseStyles} bg-red-100 text-red-800 border-red-200`
        : `${baseStyles} bg-red-900/30 text-red-400 border-red-700`;
    } else {
      return themeValue
        ? `${baseStyles} bg-green-100 text-green-800 border-green-200`
        : `${baseStyles} bg-green-900/30 text-green-400 border-green-700`;
    }
  };

  const formatLastSeen = (dateString: string): string => {
    const now = new Date();
    const lastSeen = new Date(dateString);
    const diffMs = now.getTime() - lastSeen.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  return (
    <div
      className={`rounded-xl shadow-lg border-b overflow-hidden ${
        themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`
      }`}
    >
      {/* Table Header */}
      <div
        className={`hidden md:grid grid-cols-12 gap-4 p-6     font-semibold text-sm border-b ${
          themeValue
            ? `border-gray-200 ${light} text-gray-900`
            : `border-gray-700 ${dark} text-white`
        }`}
      >
        <div className="col-span-3">User</div>
        <div className="col-span-2">Role</div>
        <div className="col-span-1 text-center">Blogs</div>
        <div className="col-span-1 text-center">Likes</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Last Active</div>
        <div className="col-span-1 text-left">Actions</div>
      </div>

      {/* Table Body */}
      <div className={`divide-y    ${themeValue ? "divide-gray-200" : "divide-gray-700"}`}>
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <Users
              size={48}
              className={`mx-auto mb-4 ${themeValue ? "text-gray-300" : "text-gray-600"}`}
            />
            <p className={themeValue ? "text-gray-600" : "text-gray-300"}>
              No users found matching your criteria
            </p>
          </div>
        ) : (
          filteredUsers.map((user: any) => (
            <div
              key={user.id}
              className={`grid grid-cols-12 gap-4 rounded-xl  p-6 transition-colors duration-200 items-center group ${
                themeValue ? "hover:bg-gray-50" : "hover:bg-gray-700/50"
              }`}
            >
              {/* User Info */}
              <div className="col-span-12 md:col-span-3 flex items-center space-x-3">
                <div className="relative">
                  {user.profilePic && user.profilePic.trim() !== "" && !imgErrors[user.id] ? (
                    <Image
                      width={40}
                      height={40}
                      src={user.profilePic}
                      alt={user.name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                      onError={() => handleImgError(user.id)}
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        themeValue
                          ? "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600"
                          : "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 text-blue-400"
                      }`}
                    >
                      <Users size={16} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-semibold truncate ${
                      themeValue ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {user.name}
                  </h3>
                  <p
                    className={`text-xs truncate flex items-center ${
                      themeValue ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    <Mail size={10} className="mr-1" />
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="col-span-6 md:col-span-2 flex items-center">
                {getRoleBadge(user)}
              </div>

              {/* Blog Count */}
              <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                <div
                  className={`flex items-center space-x-1 ${
                    themeValue ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  <FileText size={14} />
                  <span className="font-medium">{user.blogCount}</span>
                </div>
              </div>

              {/* Total Likes */}
              <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                <div
                  className={`flex items-center space-x-1 ${
                    themeValue ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  <Heart size={14} />
                  <span className="font-medium">{user.totalLikes}</span>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-6 md:col-span-2 flex items-center">
                <span className={getStatusBadge(user)}>
                  <UserCheck size={10} className="mr-1" />
                  Active
                </span>
              </div>

              {/* Last Active */}
              <div className=" col-span-6 md:col-span-3 md:mx-2 flex items-center  lg:justify-between justify-center  gap-x-1 ">
                <span
                  className={`hidden md:block text-xs ${themeValue ? "text-gray-600" : "text-gray-300"}`}
                >
                  {formatLastSeen(user.lastSeenAt)}
                </span>

                {/* Actions */}
                <DeleteButton
                  themeValue={themeValue}
                  setShowDeleteModal={setShowDeleteModal}
                  setSelectedUser={setSelectedUser}
                  user={user}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
)


export default AllUserAdminPage;