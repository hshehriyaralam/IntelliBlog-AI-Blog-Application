"use client"


export default function BlogNotFound({className = ""}: {className?:string}) {
     return (
      <div className={`flex min-h-[50vh] w-full items-center justify-center px-6 text-center ${className}`}>
        <div className="rounded-[var(--r-card)] border-[3px] border-dashed border-[var(--ink)] bg-[var(--paper)] p-8 text-2xl font-black text-[var(--ink)] shadow-[var(--sh-card)]">
          Blog not found!
        </div>
      </div>
    );
}