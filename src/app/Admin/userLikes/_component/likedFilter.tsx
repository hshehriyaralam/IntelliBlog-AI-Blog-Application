"use client"
import { Search} from "lucide-react";
import React from "react";


const  LikedFilter = React.memo(({themeValue,searchQuery,setSearchQuery,light,dark}:any)  => {

    return(
         <div className={`mb-6 rounded-2xl shadow-lg border ${
                         themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`
                       } p-2`}>
                           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="flex-1 relative">
                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                             <input
                             type="text"
                             placeholder="Search users by name..."
                             value={searchQuery}
                             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                               setSearchQuery(e.target.value)
                             }
                             className={`w-full pl-10 pr-4 py-3 rounded-lg border-none outline-none ${
                                 themeValue 
                                 ? `${light} border-gray-300 text-gray-800 placeholder-gray-800` 
                                 : `${dark} border-gray-600 text-gray-200 placeholder-gray-400`
                             } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                             />
           </div>
                           </div>
                       </div>
    )
})

export default LikedFilter;