import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex min-h-11 w-full min-w-0 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] px-4 py-3 text-base text-[var(--ink)] shadow-none outline-none transition-[box-shadow,border-color] placeholder:text-[var(--muted)] focus:border-[var(--ink)] focus:shadow-[4px_4px_0_var(--purple)] focus-visible:outline-none aria-invalid:border-[var(--pink)] aria-invalid:shadow-[4px_4px_0_var(--pink)] disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
}

export { Input }
