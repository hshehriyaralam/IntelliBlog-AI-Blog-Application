import React from 'react'
import { Button } from '../ui/button'
import { useAuthNavigate } from "@/hooks/useAuthNavigate";


const HeroTopButtons = () => {
    const { authNavigate, isAuthenticating } = useAuthNavigate();
  return (
     <div className="mt-8 flex flex-col gap-4 sm:flex-row ">
        <Button
        onClick={() => authNavigate('/Blogs')}
        disabled={isAuthenticating}
        variant="default"
        className="cursor-pointer">
            Start reading →
        </Button>
        <Button
        onClick={() => authNavigate('/Create')}
        disabled={isAuthenticating}
        variant="outline"
        className="cursor-pointer">
            Create post
        </Button>
        </div>
  )
}

export default HeroTopButtons
