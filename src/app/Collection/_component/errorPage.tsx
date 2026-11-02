"use client"
import React from "react"
import { Button } from "@/components/ui/button"



const ErrorPage = React.memo(({ themeValue, light, dark }:any) => {
    return (
        <div className="flex min-h-[50vh] items-center justify-center bg-[var(--paper)]">
      <div className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--pink)] p-8 text-center shadow-[var(--sh-card)]">
        <p className="mb-4 text-lg font-black text-[var(--ink)]">Failed to load bookmarks</p>
        <Button
          onClick={() => window.location.reload()} 
          variant="secondary"
        >
          Try Again
        </Button>
      </div>
    </div>
    )
})


export default ErrorPage;