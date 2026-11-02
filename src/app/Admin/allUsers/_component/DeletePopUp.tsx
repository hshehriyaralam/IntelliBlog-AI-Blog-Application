"use client"
import {useDeleteUserAdminMutation} from "../../../../Redux/Services/adminApi"
import { useAlert } from '../../../../Context/AlertContext'
import  SingleButtonLoader from "../../../../components/common/SingleButtonLoader"
import React from "react";
import { Button } from "@/components/ui/button";



const  DeletePopUp = React.memo(({user, themeValue, setShowDeleteModal, setSelectedUser,light,dark }: any) => {
  const [deleteUserAdmin, { isLoading }] = useDeleteUserAdminMutation(undefined);
  const { showAlert } = useAlert()
  
    if (!user) return null;

    const handleDelete = async () => {
    try {
      await deleteUserAdmin(user.id).unwrap();  
      showAlert('success', `${user.name} Account deleted successfully`);
      if (setSelectedUser) setSelectedUser(null);
    } catch (error) {
      console.error(error);
      showAlert('error', 'Failed to delete user');
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(42,42,42,0.55)] p-4">
      <div
        className="w-11/12 max-w-xs rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--paper)] p-5 shadow-[var(--sh-card)] sm:w-full sm:max-w-sm"
      >
        <h3
          className="mb-2 text-lg font-black text-[var(--ink)]"
        >
          Delete User Account
        </h3>
        <p
          className="mb-4 text-[var(--muted)]"
        >
          Are you sure you want to delete this user account? This action will
          permanently remove the user and all their data.
        </p>
        <p className="text-sm text-red-600 mb-6">
          ⚠️ This action cannot be undone.
        </p>
        <div className="flex space-x-3 justify-end">
          <Button
            onClick={() => setShowDeleteModal(false)}
            variant="outline"
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="cursor-pointer text-sm"
          >
            {isLoading ?  <SingleButtonLoader /> : "Delete Account" }
          </Button>
        </div>
      </div>
    </div>
  )
}
)

export default DeletePopUp;