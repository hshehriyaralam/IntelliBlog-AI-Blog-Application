"use client"


export default function ErrorPage({className = ""}: {className?:string}) {
     return (
      <div className={`flex min-h-[50vh] w-full items-center justify-center px-6 text-center ${className}`}>
        <div className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--pink)] p-8 text-xl font-black text-[var(--ink)] shadow-[var(--sh-card)]">
          Error fetching blog details.
        </div>
      </div>
    );
}
