'use client'
import React from 'react';
import InlineSuggestionOverlay from '../../../components/blog/InlineSuggestionOverlay';

const InputSummary = React.memo(function InputSummary({
  value,
  onChange,
  themeValue,
  textareaRef,
  onKeyDown,
  onFocus,
  onBlur,
  suggestion,
  isLoading,
  onAccept,
  ariaDescribedBy,
}: any){


  
  return(
    <div className="space-y-2">
      <label className="block text-sm font-extrabold text-[var(--ink)]">
        Blog Summary
        <span className="ml-1 text-xs font-medium text-[var(--muted)]">(150-200 recommended)</span>
      </label>
      <div className="relative">
        <textarea
          ref={textareaRef}
          name="summary"
          required
          rows={4}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-describedby={ariaDescribedBy}
          placeholder="Write a compelling summary that makes readers want to click..."
          className="relative z-[11] min-h-36 w-full resize-y rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-transparent px-4 py-3 text-base leading-7 text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:shadow-[4px_4px_0_var(--purple)]"
        />
        <InlineSuggestionOverlay
          textareaRef={textareaRef}
          text={value}
          suggestion={suggestion}
          isLoading={isLoading}
          onAccept={onAccept}
        />
      </div>
      <span id={ariaDescribedBy} className="sr-only">
        AI suggestions available. Press Tab to accept.
      </span>
      <p className={`text-right text-xs font-extrabold ${value.length >= 180 ? 'text-[var(--pink)]' : 'text-[var(--muted)]'}`}>
        {value.length}/200 characters
      </p>
    </div>
  )
})

export default InputSummary;