"use client";

import { useEffect, useRef } from "react";

type Props = {
  textareaRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  text: string;
  suggestion: string;
  isLoading?: boolean;
  onAccept: () => void;
};

export default function InlineSuggestionOverlay({
  textareaRef,
  text,
  suggestion,
  isLoading = false,
  onAccept,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const overlay = overlayRef.current;
    if (!textarea || !overlay) return;
    const sync = () => {
      if (suggestion && overlay.scrollHeight > textarea.clientHeight) {
        textarea.scrollTop = Math.max(0, overlay.scrollHeight - textarea.clientHeight);
      }
      overlay.scrollTop = textarea.scrollTop;
      overlay.scrollLeft = textarea.scrollLeft;
    };
    textarea.addEventListener("scroll", sync);
    const observer = new ResizeObserver(sync);
    observer.observe(textarea);
    sync();
    return () => {
      textarea.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [suggestion, textareaRef]);

  if (!suggestion && !isLoading) return null;

  return (
    <>
      {isLoading && (
        <span className="absolute right-2 top-2 z-20 rounded-[var(--r-chip)] border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 py-1 text-xs font-extrabold text-[var(--ink)] shadow-[var(--sh-chip)]">
          AI thinking...
        </span>
      )}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 overflow-y-auto whitespace-pre-wrap break-words rounded-[var(--r-btn)] border-[3px] border-transparent px-4 py-3 text-base leading-7 text-[var(--ink)]"
      >
        <span className="text-transparent">{text}</span>
        <span className="text-[#8a8a8a]">{suggestion}</span>
      </div>
      {suggestion && <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onAccept}
        className="absolute bottom-2 right-2 z-20 hidden min-h-8 rounded-[var(--r-chip)] border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 text-xs font-extrabold text-[var(--ink)] shadow-[var(--sh-chip)] md:block"
        aria-label="Accept AI suggestion"
      >
        Tab to accept
      </button>}
      {suggestion && <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onAccept}
        className="absolute right-2 top-2 z-20 min-h-11 min-w-11 rounded-[var(--r-chip)] border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 text-xs font-extrabold text-[var(--ink)] shadow-[var(--sh-chip)] md:hidden"
        aria-label="Accept AI suggestion"
      >
        Accept
      </button>}
    </>
  );
}
