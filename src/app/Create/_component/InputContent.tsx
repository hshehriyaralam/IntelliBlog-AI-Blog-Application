"use client"
import React from 'react';
import InlineSuggestionOverlay from "../../../components/blog/InlineSuggestionOverlay";

const InputContent = React.memo(function InputContent({
  value,
  onChange,
  themeValue,
  textareaRef,
  onKeyDown,
  onFocus,
  onBlur,
  onCompositionStart,
  onCompositionEnd,
  ariaDescribedBy,
  suggestion,
  isLoading,
  onAccept,
}: any) {
  
  return(
    <div className="space-y-2">
      <label className="block text-sm font-extrabold text-[var(--ink)]">
        Blog Content
      </label>
      <div className="relative">
        <textarea
          ref={textareaRef}
          name="content"
          required
          rows={4}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          aria-describedby={ariaDescribedBy}
          placeholder="Write your amazing content here..."
          className="relative z-[11] min-h-48 w-full resize-y rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-transparent px-4 py-3 text-base leading-7 text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:shadow-[4px_4px_0_var(--purple)]"
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
    </div>
  )
})
export default InputContent;