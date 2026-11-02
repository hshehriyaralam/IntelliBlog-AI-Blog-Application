import * as React from "react"

import { cn } from "@/lib/utils"

type ChipProps = React.HTMLAttributes<HTMLSpanElement> & {
  color?: "mint" | "rose" | "yellow" | "blue"
}

function Chip({ className, color = "mint", ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-[var(--r-chip)] border-[2.5px] border-[var(--ink)] px-3 py-1 text-xs font-extrabold text-[var(--ink)] shadow-[var(--sh-chip)]",
        {
          "bg-[var(--mint)]": color === "mint",
          "bg-[var(--rose)]": color === "rose",
          "bg-[var(--yellow)]": color === "yellow",
          "bg-[var(--blue)]": color === "blue",
        },
        className
      )}
      {...props}
    />
  )
}

export { Chip }
