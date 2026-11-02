'use client'
import { Button } from "../../../components/ui/button"
import React from 'react';


const CenteredButtons = React.memo(function CenteredButtons({CancellBlog, text, themeValue}: any){

  
  return(
    <div className="mt-10 flex flex-col-reverse justify-center gap-4 sm:flex-row">
      <Button
        onClick={CancellBlog}
        type='button'
        variant="outline"
        className="w-full cursor-pointer sm:w-auto"
      >
        Cancel
      </Button>
      
      <Button
        type={'submit'} 
        variant="secondary"
        className="w-full cursor-pointer sm:w-auto"
      >
        {text}
      </Button>
    </div>
  )
})

export default CenteredButtons;