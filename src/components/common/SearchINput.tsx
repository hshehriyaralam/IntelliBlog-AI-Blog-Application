'use client'
import { Search } from "lucide-react";
import React from "react";


const SearchInput  = React.memo(({themeValue, light, dark,value,onChange}:any)=>{
    return(
         <div className="relative min-w-0 flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)] w-5 h-5" />
        <input
        type="text"
        placeholder="Search blogs by title, content, or author..."
        value={value}
        onChange={onChange}
        className="min-h-12 w-full rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] pl-12 pr-4 text-base text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--ink)] focus:shadow-[4px_4px_0_var(--purple)]"
        />
    </div>
    )
})

export default SearchInput;