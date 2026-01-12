'use client'
import React from "react";
import { Button } from "../ui/button";


const FilterActions = React.memo(({ themeValue, onApply, onClear }: any) => {
  return (
    <div className="flex gap-3 mt-4 justify-end">
      <Button
        onClick={onClear}
        className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
          themeValue ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-600 text-gray-300 hover:bg-gray-700'
        }`}
      >
        Clear All
      </Button>

      <Button
        onClick={onApply}
        className={`px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all cursor-pointer`}
      >
        Apply Filters
      </Button>
    </div>
  )
}
)
export default FilterActions;