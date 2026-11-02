# IntelliBlog Neo-Brutalism UI

## Design tokens

The shared tokens live in `src/app/globals.css`:

- `--ink`, `--bg`, `--paper`, `--white`, `--blue`, `--teal`, `--pink`,
  `--rose`, `--yellow`, `--purple`, `--mint`, and `--muted`
- `--bw`, `--bw-frame`, `--r-card`, `--r-btn`, `--r-chip`
- `--sh-card`, `--sh-btn`, and `--sh-chip`

Use the CSS variables through Tailwind arbitrary values instead of adding
component-level hex colors.

## Shared components

Reusable presentational primitives are in `src/components/ui/`:

- `Button`
- `Card`
- `Chip`
- `Input`, `Textarea`, and `Select`
- `Badge`
- `Avatar`
- `SectionHeading`
- `PageFrame`
- `Skeleton`
- `EmptyState`
- SVG stickers in `stickers/`

Use existing domain components for blog cards, author cards, filters, actions,
and pagination. Keep their query, mutation, and state contracts unchanged.

## Sticker rules

Stickers are inline, static SVG components. They are decorative:

- Keep `aria-hidden="true"` and `pointer-events: none`.
- Use at most four floating stickers on desktop and one on mobile.
- Hide floating stickers below the `md` breakpoint.
- Do not place stickers over text, controls, or focus targets.
- Use hard shadows and palette fills; do not animate them.

## Responsive rules

- Design mobile-first at 360px and prevent page-level horizontal overflow.
- Use one column below `768px`, two columns at tablet widths, and three or four
  columns only when the content has room.
- Keep interactive controls at least `44px` high.
- Inputs and textareas use at least `16px` text to avoid mobile browser zoom.
- Tables may scroll inside their own container; the page itself must not scroll
  horizontally.
- Mobile admin navigation is a horizontally scrollable pill bar.
- Reduce card and button shadows on mobile.
- Honor `prefers-reduced-motion` by disabling transitions and marquee effects.

## Adding a new page

1. Keep the existing route, server/client boundary, data hooks, and lazy
   imports unchanged.
2. Wrap page content in `PageFrame`.
3. Start with `SectionHeading` and the shared spacing/grid patterns.
4. Build surfaces from `Card`, `Button`, `Chip`, `Badge`, and the form
   primitives rather than repeating long class strings.
5. Use the tokens from `globals.css`; do not hard-code palette values in JSX.
6. Preserve empty, loading, error, and disabled states.
7. Add explicit image dimensions or `fill`/`sizes`, meaningful alt text, and
   visible keyboard focus.
8. Check 360, 390, 768, 1024, 1280, and 1440px widths before merging.

## Final QA (2026-11-02)

The final source scan found no remaining `dark:` utilities, `prefers-color-scheme`
rules, gradients, glass/backdrop utilities, or component-level hex colors. The
hex values that remain are the intentional design-token definitions in
[`src/app/globals.css`](../src/app/globals.css). The theme provider remains
mounted for compatibility, but is neutralized to always return the light
theme; the navbar theme toggle and its import were removed. Legacy unused
hero/banner assets and deleted loading/filter components are removed from the
worktree.

### Production payload comparison

Measurements use the same webpack production-server method documented in
[`ui-redesign-baseline.md`](./ui-redesign-baseline.md). Values are raw unique
external script bytes.

| Route | Baseline JS | Final JS | Delta | CSS baseline | CSS final |
|---|---:|---:|---:|---:|---:|
| `/` | 766,018 B | 756,992 B | -9,026 B | 98,408 B | 71,379 B |
| `/Admin` | 719,472 B | 745,317 B | +25,845 B | 98,408 B | 71,379 B |
| `/Admin/allBlogs` | 781,293 B | 781,704 B | +411 B | 98,408 B | 71,379 B |
| `/Admin/allUsers` | 774,094 B | 774,937 B | +843 B | 98,408 B | 71,379 B |
| `/Admin/userBookmarks` | 782,096 B | 782,200 B | +104 B | 98,408 B | 71,379 B |
| `/Admin/userLikes` | 749,506 B | 774,934 B | +25,428 B | 98,408 B | 71,379 B |
| `/Authors` | 730,395 B | 756,069 B | +25,674 B | 98,408 B | 71,379 B |
| `/Authors/[id]` | 736,771 B | 763,220 B | +26,449 B | 98,408 B | 71,379 B |
| `/Blogs` | 744,625 B | 749,119 B | +4,494 B | 98,408 B | 71,379 B |
| `/Blogs/[id]` | 731,392 B | 731,833 B | +441 B | 98,408 B | 71,379 B |
| `/Collection` | 746,601 B | 747,711 B | +1,110 B | 98,408 B | 71,379 B |
| `/Create` | 757,526 B | 757,294 B | -232 B | 98,408 B | 71,379 B |
| `/Profile` | 779,221 B | 780,249 B | +1,028 B | 98,408 B | 71,379 B |

CSS is 27,029 B smaller than baseline (27.5%). Routes with material JS
increases are admin dashboard, admin likes, authors, author details, and Blogs;
the increase is from the existing redesign component graph and should be
reviewed before release if the strict per-route budget is enforced.

### Validation notes

- `npx tsc --noEmit`: passed.
- `npm run build`: passed.
- `npx next build --webpack`: passed.
- `npm run lint`: unavailable because the script invokes the removed `next lint`
  command in Next.js 16.
- Direct `npx eslint src`: unavailable because the repository has no ESLint 9
  flat config.
- Browser checks at 360, 390, 768, 1024, 1280, and 1440px found no page-level
  horizontal overflow on Home. The mobile navigation drawer opens and exposes
  the existing links.
- Authenticated smoke flows and Lighthouse could not be completed against the
  local server: profile/API requests return 401 without a valid session, and no
  Lighthouse runner is configured in the repository.
