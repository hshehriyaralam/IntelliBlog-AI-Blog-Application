'use client'

export default function ErrorPage({themeValue,light,dark}:any){
    return(
        <div className={`min-h-screen flex items-center justify-center ${
        themeValue ? `${light}` : `${dark}`
      }`}>
        <div className="text-center">
          <div className="text-red-500 text-2xl font-bold mb-4">Error fetching author details</div>
          <p className="text-gray-600 dark:text-gray-400">Please try again later</p>
        </div>
      </div>
    )
}