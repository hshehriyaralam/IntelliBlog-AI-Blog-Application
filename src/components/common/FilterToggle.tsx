'use clinet'
import { Filter,  ArrowDown } from "lucide-react";


export default function FilterToogle({showFilters,onClick}:any){
    return(
        <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 rounded-lg  cursor-pointer
        bg-gradient-to-r from-indigo-500 to-purple-600 text-white
        rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all`}
    >
        <Filter size={18} />
        Filters
        <ArrowDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
    </button>
    )
}