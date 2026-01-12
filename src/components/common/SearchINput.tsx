'use client'
import { Search } from "lucide-react";

export default function SearchInput({themeValue, light, dark,value,onChange}:any){
    return(
         <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
        type="text"
        placeholder="Search blogs by title, content, or author..."
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-4 py-3 rounded-lg border outline-none ${
            themeValue 
            ? `${light} border-gray-300 text-gray-800 placeholder-gray-800` 
            : `${dark} border-gray-600 text-gray-200 placeholder-gray-800`
        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
        />
    </div>
    )
}