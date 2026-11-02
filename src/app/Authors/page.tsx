"use client";
import { ContextTheme } from "../../Context/DarkTheme";
import { useCallback, useContext, useMemo, useState } from "react";
import { useAllUserQuery} from "../../Redux/Services/userApi";
import AuthorsCard from "./_component/AuthorsCard"
import dynamic from "next/dynamic";
import {useLoggedInUser} from "@/hooks/LoggedInUser"
import { PageFrame } from "@/components/ui/page-frame";
import { SectionHeading } from "@/components/ui/section-heading";



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
    <PageFrame className="min-h-0 gap-10 py-10 md:py-16">
      {/* Header Section */}
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading eyebrow="People behind the posts">Meet Our Creative Authors</SectionHeading>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
          Discover the talented writers and contributors who bring amazing content to our platform
        </p>
      </div>

      {/* Authors Grid */}
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
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
    </PageFrame>
  );
}
