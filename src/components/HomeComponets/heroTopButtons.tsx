import React from 'react'
import { Button } from '../ui/button'
import { useAuthNavigate } from "@/hooks/useAuthNavigate";


const HeroTopButtons = () => {
    const { authNavigate, isAuthenticating } = useAuthNavigate();
  return (
     <div className="flex flex-col sm:flex-row gap-4 ">
        <Button
        onClick={() => authNavigate('/Blogs')}
        disabled={isAuthenticating}
        className="px-5.5 py-5.5 bg-gradient-to-r from-indigo-600 cursor-pointer to-purple-600 text-[16px] text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5">
            Start Reading
        </Button>
        <Button
        onClick={() => authNavigate('/Create')}
        disabled={isAuthenticating}
        className="px-6 py-5 bg-white/10 backdrop-blur-sm cursor-pointer text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 transition-all text-[16px]  ">
            Create Post
        </Button>
        </div>
  )
}

export default HeroTopButtons
