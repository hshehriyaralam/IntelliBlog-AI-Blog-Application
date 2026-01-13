"use client";
import { ContextTheme } from "../../Context/DarkTheme";
import { useCallback, useContext, useMemo, useState } from "react";
import { useAllUserQuery} from "../../Redux/Services/userApi";
import AuthorsCard from "./_component/AuthorsCard"
import dynamic from "next/dynamic";
import {useLoggedInUser} from "@/hooks/LoggedInUser"



const PaginationItems  = dynamic(() => import("../../components/common/paginationItems"), { ssr: false });


export default function Authors() {
    const {loggedInUserId} = useLoggedInUser()
    const { data:allUsers } = useAllUserQuery(undefined);
    const { themeValue, light, dark } = useContext(ContextTheme);
    const [currentItems, setCurrentItems] = useState<any[]>([]);
    const users = useMemo(() => {
  return allUsers?.data ? [...allUsers.data].reverse() : [];
}, [allUsers]);


 const handlePageChange = useCallback((items:any[]) => {
  setCurrentItems(items);
}, []);



    


  return (
    <div className={`w-full min-h-screen px-4 py-8 ${themeValue ? light : dark}`}>
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent   lg:mb-4 mb-2">
          Meet Our Creative Authors
        </h1>
        <p className={`lg:text-lg  text-md   ${themeValue ? "text-gray-600" : "text-gray-400"} 
            lg:max-w-[450px]  max-w-[300px]   mx-auto `}>
          Discover the talented writers and contributors who bring amazing content to our platform
        </p>
      </div>

      {/* Authors Grid */}
      <div className="max-w-6xl mx-auto  ">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentItems?.map((user: any, index: number) => {
            // const isYou = user?.id === loggedInUserId;

          const joinedDate = user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long", 
                day: "numeric", 
                year: "numeric", 
              })
            : "N/A";

            // Last Seen → Full Date + Time
            const lastSeen = user?.lastSeenAt
              ? new Date(user.lastSeenAt).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A";

            return (
              <div key={user.id || index}>
              <AuthorsCard
              user={user}
              isYou={user?.id === loggedInUserId}
              joinedDate={joinedDate}
              lastSeen={lastSeen}
              themeValue={themeValue}
              light={light}
              dark={dark}
              />
              </div>
              );
          })}
        </div>
      </div>

      <PaginationItems 
      ItemsPerPage={9}
      filteredItems={users || []}
      themeValue={themeValue} 
      onPageChange={handlePageChange}
      />
    </div>
  );
}
