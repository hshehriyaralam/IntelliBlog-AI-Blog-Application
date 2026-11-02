import * as React from "react"

import { cn } from "@/lib/utils"

type EmptyStateProps = React.HTMLAttributes<HTMLDivElement> & {
  title: React.ReactNode
  description?: React.ReactNode
}

function EmptyState({ title, description, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--r-card)] border-[3px] border-dashed border-[var(--ink)] bg-[var(--paper)] p-8 text-center",
        className
      )}
      {...props}
    >
      <h3 className="font-black tracking-[-0.04em]">{title}</h3>
      {description ? <p className="mt-2 text-sm text-[var(--muted)]">{description}</p> : null}
    </div>
  )
}

export { EmptyState }
