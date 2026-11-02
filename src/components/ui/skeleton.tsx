import * as React from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md border-[3px] border-[var(--ink)] bg-[var(--paper)]", className)}
      {...props}
    />
  )
}

export { Skeleton }
