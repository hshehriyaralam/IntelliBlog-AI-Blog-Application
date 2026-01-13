import React, { useCallback, useContext } from 'react'
import { useAuthNavigate } from "@/hooks/useAuthNavigate";
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { ContextTheme } from "@/Context/DarkTheme";




const ViewAllButton = () => {
  const { authNavigate, isAuthenticating } = useAuthNavigate();
  const goBlogs = useCallback(() => authNavigate('/Blogs'), [authNavigate]);
  const { themeValue } = useContext(ContextTheme);
  

  return (
     <div className="flex justify-center lg:justify-end">
          <Button
            onClick={goBlogs}
            disabled={isAuthenticating}
            variant="ghost"
            className={`flex items-center gap-2 group mt-4 px-8 py-1.5 cursor-pointer ${
              themeValue
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md"
            }`}
          >
            View All Articles
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </div>
  )
}

export default ViewAllButton
