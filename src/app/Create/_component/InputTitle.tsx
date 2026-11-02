'use client'
import React from 'react';

const InputTitle = React.memo(function InputTitle({value, onChange,themeValue}: any){


  
  return(
    <div className="space-y-2">
      <label className="block text-sm font-extrabold text-[var(--ink)]">
        Blog Title
      </label>
      <input
        type="text"
        name="title"
        required
        value={value}
        onChange={onChange}
        placeholder="Enter a captivating title..."
        className="min-h-12 w-full rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] px-4 py-3 text-base text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:shadow-[4px_4px_0_var(--purple)]"
      />
    </div>
  )
})
export default InputTitle;