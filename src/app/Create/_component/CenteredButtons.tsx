'use client'
import { Button } from "../../../components/ui/button"
import React from 'react';


const CenteredButtons = React.memo(function CenteredButtons({CancellBlog, text, themeValue}: any){

  
  return(
    <div className="mt-8 flex justify-center gap-4">
      <Button
        onClick={CancellBlog}
        type='button'
        variant="outline"
        className={`px-6 py-3 border transition-all  cursor-pointer hover:scale-105 ${
          themeValue 
            ? 'border-gray-300 text-gray-700 hover:bg-gray-100' 
            : 'border-gray-600 text-gray-300 hover:bg-gray-700'
        }`}
      >
        Cancel
      </Button>
      
      <Button
        type={'submit'} 
        className="px-8 py-3 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg"
      >
        {text}
      </Button>
    </div>
  )
})

export default CenteredButtons;