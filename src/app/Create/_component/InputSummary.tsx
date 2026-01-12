'use client'
import React from 'react';

const InputSummary = React.memo(function InputSummary({value, onChange,themeValue}: any){


  
  return(
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
        Blog Summary
        <span className="text-xs ml-1 text-gray-500">(150-200 characters recommended)</span>
      </label>
      <textarea
        name="summary"
        required
        rows={4}
        value={value}
        onChange={onChange}
        placeholder="Write a compelling summary that makes readers want to click..."
        className={`w-full px-4 py-3 rounded-lg outline-none border transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
          themeValue 
            ? 'bg-white border-gray-300 text-gray-800 placeholder-gray-400' 
            : 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
        }`}
      />
      <p className={`text-xs ${themeValue ? 'text-gray-500' : 'text-gray-400'}`}>
        {value.length}/200 characters
      </p>
    </div>
  )
})

export default InputSummary;