'use clinet'
import { Filter,  ArrowDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";



const  FilterToogle = React.memo(({showFilters,onClick}:any) => {

    return(
        <>
        <Button
        onClick={onClick}
        variant="secondary"
        className="w-full cursor-pointer sm:w-auto"
    >
        <Filter size={18} />
        Filters
        <ArrowDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
    </Button>
        </>
    )
})

export default FilterToogle;