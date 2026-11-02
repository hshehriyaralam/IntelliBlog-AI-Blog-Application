import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--white)] p-6 text-[var(--ink)] shadow-[var(--sh-card)]",
        className
      )}
      {...props}
    />
  )
}

export { Card }
