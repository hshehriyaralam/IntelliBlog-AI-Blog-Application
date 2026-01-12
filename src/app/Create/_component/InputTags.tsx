'use client'
import { Button } from '../../../components/ui/button';
import { Plus, X } from 'lucide-react';
import React from 'react';

const InputTags = React.memo(function InputTags(
  {value, onChange, onKeyDown, addTag, removeTag, tags, themeValue}: any){

  return(
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
        Tags
        <span className="text-xs ml-1 text-gray-500">(Press Enter to add)</span>
      </label>
      
      <div className="flex gap-2 mb-2 items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Add relevant tags..."
          className={`flex-1 px-4 py-2 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            themeValue 
              ? 'bg-white border-gray-300 text-gray-800 placeholder-gray-400' 
              : 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
          }`}
        />
        <Button 
          onClick={addTag} 
          type='button'
          size="sm" 
          className="h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags?.map((tag: string, i: number) => (
          <span 
            key={i} 
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              themeValue 
                ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 hover:from-indigo-200 hover:to-purple-200' 
                : 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 text-indigo-200 hover:from-indigo-900/40 hover:to-purple-900/40'
            }`}
          >
            #{tag}
            <button 
              onClick={() => removeTag(i)}   
              className="ml-1 hover:text-red-500 transition-colors"
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