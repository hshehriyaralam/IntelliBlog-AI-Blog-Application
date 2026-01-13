"use client"


export default function ErrorPage({className = ""}: {className?:string}) {
     return (
      <div className={`w-full h-screen flex justify-center
        text-red-500 font-bold text-2xl items-center 
        ${className}`}>
        Error fetching blog details.
      </div>
    );
}

