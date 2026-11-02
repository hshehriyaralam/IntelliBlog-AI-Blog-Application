import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] text-sm font-extrabold transition-transform duration-150 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--yellow)] px-6 py-3.5 text-[var(--ink)] shadow-[var(--sh-btn)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none",
        destructive:
          "bg-[var(--pink)] px-6 py-3.5 text-[var(--ink)] shadow-[var(--sh-btn)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none",
        outline:
          "bg-[var(--paper)] px-6 py-3.5 text-[var(--ink)] shadow-[var(--sh-btn)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none",
        secondary:
          "bg-[var(--purple)] px-6 py-3.5 text-white shadow-[var(--sh-btn)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none",
        ghost:
          "border-transparent bg-transparent text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--paper)]",
        link: "border-transparent bg-transparent text-[var(--purple)] underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2 has-[>svg]:px-3",
        sm: "gap-1.5 px-5 py-2.5 text-xs has-[>svg]:px-3",
        lg: "px-6 has-[>svg]:px-4",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
