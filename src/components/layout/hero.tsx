'use client'
import TopAuthors from '../common/Authors';
import HeroTopCard from '../HomeComponets/HeroTopCard';
import Tags from '../HomeComponets/Tags';
import {ContextTheme} from '../../Context/DarkTheme'
import { useContext } from 'react';
import { useAuthNavigate } from "@/hooks/useAuthNavigate";
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Blogs from "./HomeBlogs"


export default function Hero() {
    const { authNavigate, isAuthenticating } = useAuthNavigate();
  
  const {themeValue, light ,dark} = useContext(ContextTheme)
  return (
  <div className={`min-h-screen w-full  pb-5    ${themeValue ? light : dark} `}>
  <div className="flex flex-col lg:flex-row gap-y-4 gap-x-4 p-6  justify-center   ">

   <HeroTopCard />
    <div className="w-full lg:w-[20%] space-y-4">
      {/* Top Authors */}
      <Tags />
      <TopAuthors  navigate={"/Authors"} />
    </div>
  </div>





  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:-mt-10  mt-0  ">
     {/* <div className="max-w-full mx-auto   ">
              <Stats />
              </div> */}
         {/* Header with View All Button */}
      <div className="flex items-center justify-between  mb-2">

            <h2 className={`  sm:text-1xl  lg:text-3xl font-bold  bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent  `}>Latest Articles</h2>
      </div>
        
             
      <Blogs />

   <div className="flex justify-center lg:justify-end">
    <Button
      onClick={() => authNavigate('/Blogs')}
      disabled={isAuthenticating}
      variant="ghost"
      className={`flex items-center gap-2 group mt-4 px-8 py-1.5 cursor-pointer ${
        themeValue
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md'
          : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md'
      }`}
    >
      View All Articles
      <ArrowRight
        size={16}
        className="group-hover:translate-x-1 transition-transform"
      />
    </Button>
</div>


  </div>
</div>

  );
}