"use client";
import { ContextTheme } from "../Context/DarkTheme";
import {useContext, useMemo } from "react";
import LoadingPage from "@/components/layout/LoadingPage";
import HeroTopCard from "../components/HomeComponets/HeroTopCard";
import ViewAllButton from "@/components/HomeComponets/viewAllBtn";
import dynamic from "next/dynamic";





const Blogs = dynamic(() => import("../components/layout/HomeBlogs"),
{loading : () => <LoadingPage />});

const TopAuthors = dynamic(() => import("../components/common/Authors"), {
  loading : () => <LoadingPage />});

const Tags = dynamic(() => import("../components/HomeComponets/Tags"), {
  loading : () => <LoadingPage /> });



export default function Home() {
  const { themeValue, light, dark } = useContext(ContextTheme);
  const themeClass = useMemo(() => (themeValue ? light : dark), [themeValue]);
  return (
    <div className={`min-h-screen w-full  pb-5 ${themeClass} `}>
      <div className="flex flex-col lg:flex-row gap-y-4 gap-x-4 p-6  justify-center   ">
        <HeroTopCard />
        <div className="w-full lg:w-[20%] space-y-4">
          <Tags />
          <TopAuthors navigate={"/Authors"}  themeValue={themeValue} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:-mt-10  mt-0  ">
        <div className="flex items-center justify-between  mb-2">
          <h2
            className={`  sm:text-1xl  lg:text-3xl font-bold  bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent  `}
          >
            Latest Articles
          </h2>
        </div>

        <Blogs />
        <ViewAllButton />
      </div>
    </div>
  );
}
