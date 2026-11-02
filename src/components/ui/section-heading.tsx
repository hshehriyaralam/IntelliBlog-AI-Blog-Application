import * as React from "react"

import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: React.ReactNode
  children: React.ReactNode
  className?: string
}

function SectionHeading({ eyebrow, children, className }: SectionHeadingProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {eyebrow ? <p className="text-base font-medium text-[var(--muted)]">{eyebrow}</p> : null}
      <h2 className="text-[clamp(2rem,5vw,3.625rem)] font-black leading-[0.95] tracking-[-0.045em] text-[var(--ink)]">
        {children}
      </h2>
    </div>
  )
}

export { SectionHeading }
