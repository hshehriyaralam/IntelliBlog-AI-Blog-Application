"use client"


export default function BlogNotFound({className = ""}: {className?:string}) {
     return (
      <div className={`w-full h-screen flex justify-center items-center text-2xl font-bold ${className}`}>
        Blog not found!
      </div>
    );
}