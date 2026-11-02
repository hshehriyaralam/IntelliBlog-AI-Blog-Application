
A1. Role and goal

You are a senior front-end engineer. Redesign the entire UI of the IntelliBlog blog application to the Neo-Brutalism design system described below.

This is a visual re-skin only. The app serves roughly 1,000 to 1,500 users, so it must stay exactly as fast, stable and functional as it is today.

A2. Hard guardrails (never break these)

Do NOT change any of the following:

Business logic, data fetching, API routes, server actions, DB queries, auth/session handling, middleware, environment variables.
The AI "Generate Summary & Tags" feature logic, like/bookmark logic, search/filter logic, pagination or infinite scroll logic, image upload logic, form validation logic, admin permissions logic.
Route names and URL structure (for example /Create, /Blogs, /Authors, /Admin). Keep them exactly as they are.
Props contracts, TypeScript types and context/state shapes of existing components, unless a purely visual prop is needed.
Server vs client component boundaries: do not add "use client" to a file that does not already have it. Do not convert server components to client components.
Existing code splitting: keep every next/dynamic / React.lazy / route-level split exactly as is. Do not merge lazy chunks into main bundles.
Existing data-testid, id and aria-* attributes used by logic or tests.
Metadata / SEO tags, sitemap, robots, OpenGraph.

Allowed to change: JSX markup structure for layout, class names, CSS / Tailwind config, fonts, static assets, purely presentational components.

If a requested visual change would require touching logic, stop and ask instead of guessing.

A3. Step 0: audit before editing (mandatory, once)

Before making any change, inspect the repo and report:

Framework and router (Next.js App Router or Pages Router), React version, TypeScript or JS.
Styling approach in use (Tailwind, CSS Modules, styled-components, plain CSS, UI library such as shadcn/MUI/Chakra). Use the existing approach. Do not introduce a new styling library or UI kit.
Where the current dark-mode / theme toggle lives (ThemeProvider, dark: classes, prefers-color-scheme).
The list of pages and shared components (navbar, footer, cards, forms, tables, modals, toasts, skeletons).
Performance baseline: run a production build (next build or equivalent) and record First Load JS per route and total CSS size. Save the numbers in docs/ui-redesign-baseline.md. Every phase must be compared against this baseline.

Then propose a short phase plan and wait for confirmation if anything is unclear.

A4. Design system: "Neo-Brutalism" (follow exactly)

Mood: friendly, bold, hand-made. Flat pastel colors, thick dark outlines, hard offset shadows, big heavy headlines, playful sticker-style icons. Nothing glossy, no gradients, no blur, no glassmorphism.

Design tokens

Define these once (Tailwind theme extension or CSS variables in the global stylesheet) and reuse everywhere. Never hard-code hex values in components.

css
:root {
  --ink:    #2a2a2a;   /* all borders, text, shadows */
  --bg:     #fdebdf;   /* page background (peach) */
  --paper:  #faf6f1;   /* main surfaces */
  --white:  #ffffff;
  --blue:   #8fa4ec;
  --teal:   #1f9d8f;
  --pink:   #ee4b8b;
  --rose:   #f58de8;
  --yellow: #f6c944;
  --purple: #a54df2;
  --mint:   #7ae6b8;
  --muted:  #555555;   /* secondary text */

  --bw: 3px;           /* standard border width */
  --bw-frame: 4px;     /* page frame border */
  --r-card: 22px;
  --r-btn: 14px;
  --r-chip: 999px;
  --sh-card: 7px 7px 0 var(--ink);
  --sh-btn:  5px 5px 0 var(--ink);
  --sh-chip: 3px 3px 0 var(--ink);
}
Typography (keep exactly the same as the reference images)
Font: Inter via next/font/google (self-hosted, display: "swap", subsets: ["latin"], variable font with the opsz axis so display sizes look like "Inter Display"). Only load the weights actually used (400, 500, 600, 700, 800, 900). No other font families.
Headings (h1, h2, h3, card titles, stat numbers): weight 800 to 900, letter-spacing -0.04em to -0.045em, tight line-height (0.86 to 1.05).
Hero h1: uppercase, about 104px desktop, scaling down with clamp() to about 44px on small phones. One key phrase sits inside a pink (--rose) highlight block: 4px ink border, radius 20px, hard shadow 7px 7px 0, rotated about -1.6deg.
Section headings: small eyebrow text above (16 to 18px, --muted), then h2 about 58px desktop, clamp() down to 32px mobile.
Body text: Inter 400/500, 16 to 20px, line-height 1.5, color 
#4a4a4a.
Buttons / chips / labels: weight 700 to 800.
Core component recipes
Component	Recipe
Page frame (desktop)	--paper background, 4px ink border, radius 52px, centered, on a --bg page. Outer padding about 92px top / 100px sides.
Card	white (or a pastel color), 3px ink border, radius 22px, shadow 7px 7px 0 ink, padding 24 to 28px.
Button (primary)	background --yellow, 3px border, radius 14px, shadow 5px 5px 0, Inter 800, padding 15px 26px. Variants: purple (white text) for "Profile / Create", outline (--paper) for secondary. Small size: padding 10px 20px, shadow 4px 4px 0.
Button hover	transform: translate(-2px,-2px) and shadow grows to 7px 7px 0.
Button active	transform: translate(4px,4px) and shadow 0 0 0 (pressed look).
Button disabled / loading	--paper background, 60% opacity, no shadow, cursor: not-allowed. Keep existing loading logic, only restyle the spinner (ink-colored).
Chip / tag	pill, 2.5px ink border, Inter 800 at 13 to 16px. Rotate colors through mint / rose / yellow / blue.
Input / textarea / select	white, 3px ink border, radius 14px, padding 12 to 16px. On focus: shadow 4px 4px 0 var(--purple) plus ink border (no browser default glow). Placeholder color 
#8a8a8a. Error state: border --pink, shadow 4px 4px 0 var(--pink), error text in bold ink.
Dropzone (image upload)	3px dashed ink border, radius 22px, subtle diagonal-stripe background (repeating-linear-gradient, very light).
Avatar	circle, 3px ink border, colored background with bold initial when no image.
Badge (status)	small pill, 2.5px border. Published = mint, Draft = yellow, Rejected/Error = pink.
Nav active link	yellow underline bar (5px high, 2px ink border, radius 9px) under the active item.
Stats strip	full-width yellow band, 4px ink top and bottom borders, rotated about -1.4deg, heavy uppercase numbers separated by "✦".
Table (admin)	3px ink border, header row --yellow with 800 weight text, rows separated by 2.5px dashed ink lines, hover row --paper.
Modal / dialog	card recipe, centered, backdrop is a flat rgba(42,42,42,.55) (no blur).
Toast	card recipe, small, colored by type (mint success, pink error, yellow info).
Skeleton	
#eadfd3 blocks with 3px ink border, no shimmer animation (or a very cheap opacity pulse).
Focus (keyboard)	outline: 3px solid var(--purple); outline-offset: 3px; on all interactive elements.
Sticker decorations
Build stickers as small inline SVG React components in components/ui/stickers/ (pencil tile, AI speech bubble with bars and sparkle, heart circle, bookmark circle, half-ring shapes in teal / pink / yellow / purple, cursor arrow, target, database, server stack, plus-circle).
Style: 4 to 5px ink stroke, flat fills from the palette, hard offset shadow.
All stickers: aria-hidden="true", pointer-events: none, no JS, no animation, server components.
Use them sparingly: max 4 floating stickers per page on desktop, 0 to 1 on mobile (hide below md). Never put a sticker over text or controls.
Use filter: drop-shadow(...) only on small decorative SVGs, never on cards, lists or large areas. Use box-shadow for cards and buttons.
Motion
Only transform and opacity transitions, 100 to 150ms.
No scroll-jacking, no parallax, no heavy animation libraries.
The stats strip may scroll with a CSS-only marquee on desktop. On mobile it must be static or wrap.
Respect @media (prefers-reduced-motion: reduce) (disable marquee and transitions).
A5. Dark mode: REMOVE (light theme only)
The new design is light only.
Remove the dark/light toggle button from the navbar (and anywhere else).
Force the light theme: no dark class applied, color-scheme: light.
Remove dark: variants and prefers-color-scheme: dark rules from every file you restyle.
Do not delete the theme provider file if other code imports it. Neutralize it safely (always light) so nothing breaks. Tell me what you neutralized.
A6. Responsive requirements (mobile is a first-class target)

Design mobile-first. Test at 360, 390, 768, 1024, 1280, 1440 px widths.

Zero horizontal scroll at any width (the exception is tables or code blocks inside their own scroll container).
Touch targets at least 44x44px. Inputs at least 16px font size (prevents iOS zoom).
Use clamp() for headline sizes. Use CSS Grid / Flex with minmax, auto-fit.
Shadows shrink on mobile: cards 4px 4px 0, buttons 3px 3px 0.
Below md (768px): remove the outer peach gutter and big rounded frame. Sections go full width with 3px borders and 16px side padding. Hide floating stickers and half-rings.
Navbar on mobile: logo plus a hamburger button that opens a neo-styled drawer or dropdown card with all links. Reuse the existing menu state logic, restyle only.
Multi-column layouts collapse to a single column in the order: main content, then supporting content.
Admin sidebar becomes a horizontally scrollable pill tab bar, or a drawer, on mobile.
Admin tables become stacked cards on mobile (label : value rows), or live in a horizontally scrollable container with a visible scroll hint.
Sticky bars (like / bookmark on blog detail) must not cover content: use safe-area padding.
A7. Performance rules (1,000 to 1,500 users, must stay fast)
No new npm dependencies (no animation libs, no icon packs, no UI kits). If an icon library is already installed, keep using only the icons already imported (tree-shaken).
Do not add "use client", useEffect-based styling, or JS-driven layout. All visuals are CSS and static SVG.
No backdrop-filter, no large filter: blur, no big drop-shadow filters, no full-page gradients, no CSS mix-blend-mode.
Fonts: next/font only, self-hosted, subset, display: swap, preload only what is needed. No @import from Google Fonts.
Images: keep next/image usage. Always provide width/height or fill + sizes. priority only for the above-the-fold hero/LCP image. Everything else lazy. Use the existing image domains/config.
Avoid layout shift (CLS): reserve space for images, fonts and stickers (explicit width/height on SVGs).
Long lists (Blogs grid, admin tables): keep the existing pagination or infinite scroll. Add content-visibility: auto; contain-intrinsic-size: 400px; on list items where safe.
Keep the CSS small: reuse tokens and shared components. No duplicated giant class strings. If using Tailwind, extract repeated patterns into shared components (Button, Card, Chip, Input, Badge, Avatar, SectionHeading, PageFrame).
Keep route-level code splitting and lazy imports unchanged. Heavy admin pieces stay lazy.
Budget: per-route First Load JS must not increase versus the baseline from Step 0 (a rounding difference of 1 to 2 KB is acceptable). Total CSS should not grow by more than about 15%. Lighthouse mobile Performance, Accessibility and Best Practices scores must be equal or better than baseline.
No new network requests on page load because of the redesign (no remote images, no remote fonts, no analytics).
Home stats strip: do not add new DB queries or API calls for it. Reuse data the page already loads. If the data is not available, render the strip with static text ("Write ✦ Read ✦ Share ✦ Save ✦") instead.
A8. Quality and accessibility
Text contrast WCAG AA at minimum (ink on pastel colors is fine; never put white text on yellow, mint or rose).
Semantic HTML (nav, main, section, button vs a), correct heading order (one h1 per page).
Visible keyboard focus on everything interactive.
alt text on content images. Decorative SVG gets aria-hidden.
Preserve all existing empty, loading and error states, and restyle them in this system.
No console errors or hydration warnings. No TypeScript or ESLint errors.
Keep the 404 / error pages consistent with the theme.
A9. Working method
Work one phase at a time. After each phase run: lint, typecheck, production build, then compare First Load JS with the baseline.
Prefer small, reviewable commits per page. Commit message style: ui(neo): restyle <page>.
At the end of each phase, give me: files changed, anything you were unsure about, the bundle comparison, and a mobile check list.
If anything is ambiguous, ask a short question instead of inventing behavior.