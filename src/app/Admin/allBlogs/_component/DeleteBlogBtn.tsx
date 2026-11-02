'use client'
import { Trash2} from "lucide-react";
import {useDeleteBlogAdminMutation} from "../../../../Redux/Services/adminApi"
import { useAlert } from '../../../../Context/AlertContext'
import SingleButtonLoader from '../../../../components/common/SingleButtonLoader'
import { Button } from "@/components/ui/button";
import React from "react";

const  DeleteBlogButton = React.memo(({themeValue,blog}:any) => {
    const [deleteBlogAdmin, { isLoading }] = useDeleteBlogAdminMutation(undefined)
    const { showAlert } = useAlert()
     const handleDelete = async () => {
      try {
        await deleteBlogAdmin(blog._id).unwrap();
        showAlert('success', 'The blog was successfully deleted by the admin')
      } catch (error) {
        console.error(error);
        showAlert('error', 'The admin failed to delete the blog.')
      }
  };
    return (
      <>
    <Button
    onClick={handleDelete}
      className={`min-h-8 px-2 py-0.5 flex items-center gap-x-1 text-[11px] font-extrabold rounded-[var(--r-btn)] border-2 transition-all duration-200 cursor-pointer
    ${
      themeValue
        ? 'border-[3px] border-[var(--ink)] bg-[var(--pink)] text-white shadow-[var(--sh-btn)]'
        : 'border-[3px] border-[var(--ink)] bg-[var(--pink)] text-white shadow-[var(--sh-btn)]'
    }`}
    >
      {isLoading ?  <SingleButtonLoader  />     :  (
        <>
           <Trash2 size={12} />
            <span>Delete</span>
            
        </>
      )}  
    </Button>
      </>

    )
}
)

export default DeleteBlogButton