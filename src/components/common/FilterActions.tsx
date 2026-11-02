'use client'
import React from "react";
import { Button } from "../ui/button";


const FilterActions = React.memo(({ themeValue, onApply, onClear }: any) => {
  return (
    <div className="flex gap-3 mt-4 justify-end">
      <Button
        onClick={onClear}
        variant="outline"
        size="sm"
        className="cursor-pointer"
      >
        Clear All
      </Button>

      <Button
        onClick={onApply}
        variant="secondary"
        size="sm"
        className="cursor-pointer"
      >
        Apply Filters
      </Button>
    </div>
  )
}
)
export default FilterActions;