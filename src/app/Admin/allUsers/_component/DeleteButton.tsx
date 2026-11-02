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
              ? "border-[3px] border-[var(--ink)] bg-[var(--purple)] text-white shadow-[var(--sh-btn)]"
              : "border-[3px] border-[var(--ink)] bg-[var(--purple)] text-white shadow-[var(--sh-btn)]"
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
        ? 'border-[3px] border-[var(--ink)] bg-[var(--pink)] text-white shadow-[var(--sh-btn)]'
        : 'border-[3px] border-[var(--ink)] bg-[var(--pink)] text-white shadow-[var(--sh-btn)]'
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