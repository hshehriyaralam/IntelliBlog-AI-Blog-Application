'use client'
import { Button } from '../../../components/ui/button';
import { Plus, X } from 'lucide-react';
import React from 'react';

const InputTags = React.memo(function InputTags(
  {value, onChange, onKeyDown, addTag, removeTag, tags, themeValue}: any){

  return(
    <div className="space-y-2">
      <label className="block text-sm font-extrabold text-[var(--ink)]">
        Tags
        <span className="ml-1 text-xs font-medium text-[var(--muted)]">(Press Enter to add)</span>
      </label>
      
      <div className="flex gap-2 mb-2 items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Add relevant tags..."
          className="min-h-12 min-w-0 flex-1 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] px-4 py-2 text-base text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:shadow-[4px_4px_0_var(--purple)]"
        />
        <Button 
          onClick={addTag} 
          type='button'
          size="sm" 
          className="size-11 shrink-0 bg-[var(--purple)] px-0 text-white"
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags?.map((tag: string, i: number) => (
          <span 
            key={i} 
            className="inline-flex items-center gap-1 rounded-full border-[2.5px] border-[var(--ink)] bg-[var(--rose)] px-3 py-1.5 text-sm font-extrabold text-[var(--ink)] shadow-[var(--sh-chip)]"
          >
            #{tag}
            <button 
              onClick={() => removeTag(i)}   
              aria-label={`Remove ${tag} tag`}
              className="ml-1 rounded-full p-0.5 text-[var(--ink)] hover:bg-[var(--pink)]"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
})
export default InputTags;