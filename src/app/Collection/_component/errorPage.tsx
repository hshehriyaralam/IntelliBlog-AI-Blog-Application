"use client"
import React from "react"
import { Button } from "@/components/ui/button"



const ErrorPage = React.memo(({ themeValue, light, dark }:any) => {
    return (
        <div className={`min-h-screen flex items-center justify-center ${themeValue ? light : dark}`}>
      <div className="text-center"> 
        <p className="text-red-500 text-lg mb-4">Failed to load bookmarks</p>
        <Button
          onClick={() => window.location.reload()} 
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Try Again
        </Button>
      </div>
    </div>
    )
})


export default ErrorPage;