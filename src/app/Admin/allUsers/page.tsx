'use client'
import { useState, useContext, useMemo, Suspense, useCallback } from "react";
import { useAllUserAdminQuery } from '../../../Redux/Services/adminApi'
import {liveRefetchOptions}  from '../../../hooks/rtkOptions'
import { ContextTheme } from "../../../Context/DarkTheme";
import LoadingPage from "../../../components/layout/LoadingPage";
import AllUserAdminPage from "./_component/AllUser"
import type {AdminUser  as User} from "../../../../types/Admin"
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";


const NameFilter  = dynamic(() => import("./_component/Filter"), {ssr: false});
const  DeletePopUp = dynamic(() => import("./_component/DeletePopUp"), { ssr: false});
const PaginationItems = dynamic(() => import("../../../components/common/paginationItems"),{ ssr: false });





export default function AllUsers() {
  const { themeValue, light, dark } = useContext(ContextTheme);
  const { data, isLoading } = useAllUserAdminQuery(undefined)
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = useMemo(() => data?.data?.slice().reverse() || [], [data]);

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let result = users;

    if (q) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [users, searchQuery]);


  const handlePageChange = useCallback((items:any[]) => {
      setCurrentItems(items);
    }, []);
 

  if (isLoading) return <LoadingPage />;
  

  return (
    <div className={`min-h-screen ${themeValue ? light : dark} p-2`}>
      <div className="max-w-7xl mx-auto  ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className={`text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent  lg:text-left text-center lg:mt-0 mt-4`}>
                User Management
              </h1>
              <p className={`mt-2 ${themeValue ? 'text-gray-600' : 'text-gray-300'}  mt-2  text-[16px] lg:max-w-[600px]  lg:text-left   text-center   mx-auto`}>
                Manage all user accounts and permissions
              </p>
            </div>
          </div>
        </div>

        <NameFilter  
        themeValue={themeValue}
        light={light}
        dark={dark}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        />

        <div className="flex items-center justify-end mx-6 " >
         {searchQuery && (
            <Button
              onClick={() => setSearchQuery("")}
              className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
            >
              Clear search
            </Button>
          )}
          </div>

           {/* Users Table */}
           <Suspense fallback={<LoadingPage />}>
        <AllUserAdminPage 
        filteredUsers={currentItems}
      setShowDeleteModal={setShowDeleteModal}
      setSelectedUser={setSelectedUser}
      themeValue={themeValue}
      light={light}
      dark={dark}
        />
        </Suspense>
      </div>

      <PaginationItems
      ItemsPerPage={10}
      filteredItems={filteredUsers}
      onPageChange={handlePageChange}
      themeValue={themeValue}/>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser &&  <DeletePopUp  
      user={selectedUser} 
      setSelectedUser={setSelectedUser}
      themeValue={themeValue }
      light={light}
      dark={dark}
      setShowDeleteModal={setShowDeleteModal}
       />}
    </div>
  );
}