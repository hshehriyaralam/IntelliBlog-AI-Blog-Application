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
      className={`px-2 py-1 flex items-center gap-x-1 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer 
    ${
      themeValue
        ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white hover:from-rose-700 hover:to-red-600 shadow-md hover:shadow-lg'
        : 'bg-gradient-to-r from-rose-500 to-red-400 text-white hover:from-rose-600 hover:to-red-500 shadow-md hover:shadow-lg'
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