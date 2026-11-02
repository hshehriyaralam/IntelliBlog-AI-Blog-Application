import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] px-4 py-3 text-base text-[var(--ink)] shadow-none outline-none transition-[box-shadow,border-color] placeholder:text-[var(--muted)] focus:border-[var(--ink)] focus:shadow-[4px_4px_0_var(--purple)] focus-visible:outline-none aria-invalid:border-[var(--pink)] aria-invalid:shadow-[4px_4px_0_var(--pink)] disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
