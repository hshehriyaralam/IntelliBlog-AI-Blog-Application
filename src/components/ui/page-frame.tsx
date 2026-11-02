import * as React from "react"

import { cn } from "@/lib/utils"

function PageFrame({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "mx-auto flex min-h-[calc(100vh-80px)] w-full flex-col bg-[var(--paper)] text-[var(--ink)] px-4 py-8 md:max-w-[1440px] md:border-[var(--bw-frame)] md:border-[var(--ink)] md:rounded-[52px] md:px-12 md:py-16 lg:px-24 lg:py-[92px]",
        className
      )}
      {...props}
    />
  )
}

export { PageFrame }
