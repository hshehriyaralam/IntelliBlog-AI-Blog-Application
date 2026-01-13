"use client";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";


const  DeleteButton = React.memo(({ 
  themeValue,
  setShowDeleteModal,
  setSelectedUser,
  user,
}: any) => {
  return (
    <div className="flex items-center space-x-2">
      <Link href={`/Authors/${user.id}`}>
        <Button
          className={`rounded-lg  flex items-center gap-x-1  text-sm transition-all duration-200  px-2  py-1   cursor-pointer  ${
            themeValue
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md"
          } group/tooltip relative`}
        >
          <Eye size={14} /> 
          <span>Profile </span>
        </Button>
      </Link>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedUser(user);
          setShowDeleteModal(true);
        }}
          className={`px-2 py-1 flex items-center gap-x-1 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer 
    ${
      themeValue
        ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white hover:from-rose-700 hover:to-red-600 shadow-md hover:shadow-lg'
        : 'bg-gradient-to-r from-rose-500 to-red-400 text-white hover:from-rose-600 hover:to-red-500 shadow-md hover:shadow-lg'
    }`}
      >
        <Trash2 size={12} />
        <span>Delete</span>
      </Button>
    </div>
  );
}
)


export default DeleteButton;