import * as React from "react"

import { cn } from "@/lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  status?: "published" | "draft" | "rejected" | "error"
}

function Badge({ className, status = "published", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--r-chip)] border-[2.5px] border-[var(--ink)] px-3 py-1 text-xs font-extrabold text-[var(--ink)]",
        status === "published" && "bg-[var(--mint)]",
        status === "draft" && "bg-[var(--yellow)]",
        (status === "rejected" || status === "error") && "bg-[var(--pink)]",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
