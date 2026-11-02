'use client'
import { Button } from "../../../components/ui/button"
import {User} from 'lucide-react'
import React from "react"

const  UserNotFoundPage  = React.memo(({themeValue, light,dark,handleGoogleLogin}:any) => {
    return(
    <div className={`${themeValue ? light : dark} min-h-screen flex items-center justify-center`}>
<div className={`text-center p-8 rounded-2xl shadow-lg border ${themeValue ? "border-gray-300" : "border-gray-600" } `}>
    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h2 className={`text-2xl font-bold mb-2   ${themeValue ? "" : "text-gray-300"}`}>No Profile Found</h2>
    <p className={`mb-6  text-gray-500 `}>Please sign in to view your profile</p>
    <Button onClick={handleGoogleLogin} className="border-[3px] border-[var(--ink)] bg-[var(--purple)] text-white shadow-[var(--sh-btn)]">
    Sign In with Google
    </Button>
</div>
</div>
    )
})

export default UserNotFoundPage;