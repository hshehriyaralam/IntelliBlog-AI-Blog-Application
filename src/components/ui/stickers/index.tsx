type StickerProps = {
  className?: string
}

const stickerProps = {
  "aria-hidden": true,
  "pointerEvents": "none",
} as const

export function PencilTile({ className }: StickerProps) {
  return (
    <svg {...stickerProps} className={className} viewBox="0 0 96 96" fill="none">
      <rect x="14" y="13" width="64" height="64" rx="16" fill="var(--blue)" stroke="var(--ink)" strokeWidth="5" transform="rotate(-10 14 13)" />
      <path d="m37 58 7-25 22 13-16 20-13 3Z" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="4" />
      <path d="m44 33 8-11 22 13-8 11" fill="var(--pink)" stroke="var(--ink)" strokeWidth="4" />
    </svg>
  )
}

export function AIBubble({ className }: StickerProps) {
  return (
    <svg {...stickerProps} className={className} viewBox="0 0 120 90" fill="none">
      <path d="M12 12h82a12 12 0 0 1 12 12v34a12 12 0 0 1-12 12H54L34 82l4-12H12A12 12 0 0 1 0 58V24A12 12 0 0 1 12 12Z" fill="var(--teal)" stroke="var(--ink)" strokeWidth="5" />
      <path d="M27 48V32M45 48V25M63 48V36" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
      <path d="m84 18 2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7Z" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="3" />
    </svg>
  )
}

export function HeartCircle({ className }: StickerProps) {
  return (
    <svg {...stickerProps} className={className} viewBox="0 0 96 96" fill="none">
      <circle cx="48" cy="48" r="36" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="5" />
      <path d="M48 68 27 47c-12-18 12-29 21-14 9-15 33-4 21 14L48 68Z" fill="var(--pink)" stroke="var(--ink)" strokeWidth="4" />
    </svg>
  )
}

export function BookmarkCircle({ className }: StickerProps) {
  return (
    <svg {...stickerProps} className={className} viewBox="0 0 96 96" fill="none">
      <circle cx="48" cy="48" r="37" fill="var(--pink)" stroke="var(--ink)" strokeWidth="5" />
      <path d="M31 25h34v44L48 57 31 69V25Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="5" />
    </svg>
  )
}

export function HalfRing({ className, color = "teal" }: StickerProps & { color?: "teal" | "pink" | "yellow" | "purple" }) {
  const fill = {
    teal: "var(--teal)",
    pink: "var(--pink)",
    yellow: "var(--yellow)",
    purple: "var(--purple)",
  }[color]

  return (
    <svg {...stickerProps} className={className} viewBox="0 0 84 84" fill="none">
      <path d="M10 62a36 36 0 0 1 50-48l10 17a17 17 0 0 0-24 23L10 62Z" fill={fill} stroke="var(--ink)" strokeWidth="5" />
      <circle cx="21" cy="45" r="9" fill="var(--paper)" />
    </svg>
  )
}

export function Cursor({ className }: StickerProps) {
  return (
    <svg {...stickerProps} className={className} viewBox="0 0 64 76" fill="none">
      <path d="m8 5 43 31-20 3 10 23-10 5-11-23-14 13L8 5Z" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  )
}

export function Target({ className }: StickerProps) {
  return (
    <svg {...stickerProps} className={className} viewBox="0 0 96 96" fill="none">
      <circle cx="43" cy="50" r="31" fill="var(--teal)" stroke="var(--ink)" strokeWidth="5" />
      <circle cx="43" cy="50" r="18" fill="var(--mint)" stroke="var(--ink)" strokeWidth="4" />
      <circle cx="43" cy="50" r="6" fill="var(--pink)" stroke="var(--ink)" strokeWidth="3" />
      <path d="m57 36 24-24M68 12h13v13" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Database({ className }: StickerProps) {
  return (
    <svg {...stickerProps} className={className} viewBox="0 0 96 96" fill="none">
      <path d="M19 22c0-8 13-13 29-13s29 5 29 13v48c0 8-13 13-29 13S19 78 19 70V22Z" fill="var(--teal)" stroke="var(--ink)" strokeWidth="5" />
      <ellipse cx="48" cy="22" rx="29" ry="13" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="5" />
      <path d="M20 45c0 8 13 13 28 13s28-5 28-13M20 68c0 8 13 13 28 13s28-5 28-13" stroke="var(--ink)" strokeWidth="4" />
    </svg>
  )
}

export function ServerStack({ className }: StickerProps) {
  return (
    <svg {...stickerProps} className={className} viewBox="0 0 112 96" fill="none">
      <rect x="12" y="10" width="88" height="22" rx="7" fill="var(--paper)" stroke="var(--ink)" strokeWidth="5" />
      <rect x="12" y="37" width="88" height="22" rx="7" fill="var(--mint)" stroke="var(--ink)" strokeWidth="5" />
      <rect x="12" y="64" width="88" height="22" rx="7" fill="var(--rose)" stroke="var(--ink)" strokeWidth="5" />
      <circle cx="26" cy="21" r="3" fill="var(--pink)" />
      <circle cx="26" cy="48" r="3" fill="var(--purple)" />
      <circle cx="26" cy="75" r="3" fill="var(--yellow)" />
      <path d="M40 21h41M40 48h41M40 75h41" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function PlusCircle({ className }: StickerProps) {
  return (
    <svg {...stickerProps} className={className} viewBox="0 0 96 96" fill="none">
      <circle cx="48" cy="48" r="34" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="5" />
      <path d="M48 29v38M29 48h38" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}
