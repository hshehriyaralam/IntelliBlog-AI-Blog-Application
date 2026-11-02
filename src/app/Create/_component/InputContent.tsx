'use client'
import React from 'react';

const InputContent = React.memo( function InputContent({value, onChange,themeValue}: any){
  
  return(
    <div className="space-y-2">
      <label className="block text-sm font-extrabold text-[var(--ink)]">
        Blog Content
      </label>
      <textarea
        name="content"
        required
        rows={4}
        value={value}
        onChange={onChange}
        placeholder="Write your amazing content here..."
        className="min-h-48 w-full resize-y rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] px-4 py-3 text-base leading-7 text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:shadow-[4px_4px_0_var(--purple)]"
      />
    </div>
  )
})
export default InputContent;