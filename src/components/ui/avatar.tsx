import * as React from "react"

import { cn } from "@/lib/utils"

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string | null
  alt?: string
  fallback?: string
}

function Avatar({ className, src, alt = "", fallback = "?", ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-[var(--ink)] bg-[var(--blue)] font-extrabold text-[var(--ink)]",
        className
      )}
      {...props}
    >
      {src ? <img src={src} alt={alt} className="size-full object-cover" /> : fallback.slice(0, 1).toUpperCase()}
    </div>
  )
}

export { Avatar }
