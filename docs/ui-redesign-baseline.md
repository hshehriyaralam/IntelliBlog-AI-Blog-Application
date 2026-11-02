# IntelliBlog Neo-Brutalism UI Redesign Baseline

Date: 2026-11-01

## Framework and runtime

- Next.js 16.1.1 using the App Router (`src/app`).
- React 19.1.0 and React DOM 19.1.0.
- TypeScript 5 with strict type checking enabled.
- The production build succeeds with both the default Turbopack builder and the webpack builder.
- Route-level code splitting is emitted by Next.js; API routes are server-only and are not included in the browser First Load JS measurements below.

## Styling and UI approach

- Tailwind CSS 4 is loaded from `src/app/globals.css` with `@import "tailwindcss"`.
- `tw-animate-css` is also imported globally.
- Most styling is inline Tailwind utility classes in JSX.
- Shared shadcn-style primitives exist in `src/components/ui` (`button`, `input`, `label`, `pagination`, `select`, and `textarea`) and use `class-variance-authority`, `clsx`, and `tailwind-merge`.
- Radix UI is used by the select and label primitives.
- `lucide-react` supplies icons.
- `styled-components` is present in `package.json`, but no application source usage was found.
- `src/app/globals.css` currently also contains a remote Google Fonts `@import` and the light/dark body rules.

## Theme and dark-mode locations

Theme state is provided by the client-only `ThemeContext` component in
[`src/Context/DarkTheme.tsx`](../src/Context/DarkTheme.tsx). It is mounted by
[`src/app/ClientProviders.tsx`](../src/app/ClientProviders.tsx), which wraps the
application providers.

- The provider reads and writes `localStorage.theme`, exposes `themeValue`,
  `changeTheme`, and light/dark utility class strings.
- The navbar theme toggle and conditional theme classes are in
  [`src/components/layout/Navbar.tsx`](../src/components/layout/Navbar.tsx).
- The home and profile pages consume the context directly:
  [`src/app/page.tsx`](../src/app/page.tsx) and
  [`src/app/Profile/page.tsx`](../src/app/Profile/page.tsx).
- Author/profile components also receive theme values through props, notably
  [`src/app/Authors/_component/AuthorsCard.tsx`](../src/app/Authors/_component/AuthorsCard.tsx),
  [`src/app/Authors/_component/ProfileSection.tsx`](../src/app/Authors/_component/ProfileSection.tsx),
  [`src/app/Profile/_component/ProfilSection.tsx`](../src/app/Profile/_component/ProfilSection.tsx),
  and [`src/app/Profile/_component/BlogsSection.tsx`](../src/app/Profile/_component/BlogsSection.tsx).
- `body.light` and `body.dark` are defined in
  [`src/app/globals.css`](../src/app/globals.css).
- `dark:` Tailwind variants and dark conditional classes remain across shared
  cards, filters, loaders, blog details, author views, profile views, and UI
  primitives. A source scan found 41 direct dark/theme references across 18
  files, in addition to the provider consumers.
- The current root layout loads Geist and Geist Mono through `next/font/google`
  in [`src/app/layout.tsx`](../src/app/layout.tsx), while the global stylesheet
  separately imports Inter from Google Fonts.

## Page and route inventory

### User-facing pages

- `/` — [`src/app/page.tsx`](../src/app/page.tsx)
- `/Authors` — [`src/app/Authors/page.tsx`](../src/app/Authors/page.tsx)
- `/Authors/[id]` — [`src/app/Authors/[id]/page.tsx`](../src/app/Authors/[id]/page.tsx)
- `/Blogs` — [`src/app/Blogs/page.tsx`](../src/app/Blogs/page.tsx)
- `/Blogs/[id]` — [`src/app/Blogs/[id]/page.tsx`](../src/app/Blogs/[id]/page.tsx)
- `/Collection` — [`src/app/Collection/page.tsx`](../src/app/Collection/page.tsx)
- `/Create` — [`src/app/Create/page.tsx`](../src/app/Create/page.tsx)
- `/Profile` — [`src/app/Profile/page.tsx`](../src/app/Profile/page.tsx)
- `/_not-found` — Next.js not-found page generated from the app tree

### Admin pages

- `/Admin` — [`src/app/Admin/page.tsx`](../src/app/Admin/page.tsx)
- `/Admin/allBlogs` — [`src/app/Admin/allBlogs/page.tsx`](../src/app/Admin/allBlogs/page.tsx)
- `/Admin/allUsers` — [`src/app/Admin/allUsers/page.tsx`](../src/app/Admin/allUsers/page.tsx)
- `/Admin/userBookmarks` — [`src/app/Admin/userBookmarks/page.tsx`](../src/app/Admin/userBookmarks/page.tsx)
- `/Admin/userLikes` — [`src/app/Admin/userLikes/page.tsx`](../src/app/Admin/userLikes/page.tsx)
- Shared admin shell — [`src/app/Admin/layout.tsx`](../src/app/Admin/layout.tsx)

### API routes

The build also contains the existing API route tree under
[`src/app/api/`](../src/app/api/). These routes are intentionally excluded from
UI First Load JS measurements and are not to be changed by the redesign.

## Shared component inventory

- Global layout/navigation: [`src/app/layout.tsx`](../src/app/layout.tsx),
  [`src/components/layout/Navbar.tsx`](../src/components/layout/Navbar.tsx),
  [`src/components/layout/ProtectedRoutes.tsx`](../src/components/layout/ProtectedRoutes.tsx),
  [`src/components/common/ScrollToTop.tsx`](../src/components/common/ScrollToTop.tsx).
- Home sections: `src/components/HomeComponets/` (hero, tags, author CTA,
  view-all controls), `src/components/layout/hero.tsx`, and
  [`src/components/layout/HomeBlogs.tsx`](../src/components/layout/HomeBlogs.tsx).
- Blog cards and discovery: `src/components/common/` (blog card, authors,
  search, date/tag filters, filter actions/toggle, pagination, errors) and
  `src/app/Blogs/_component/` (search/title filters, author info, tags,
  action row, like, bookmark, share, listen, liked-by-user, loading, error,
  and not-found states).
- Blog detail and collection cards: `src/app/Blogs/[id]/page.tsx`,
  `src/app/Collection/_component/BlogCard.tsx`, and
  `src/app/Collection/_component/errorPage.tsx`.
- Authors and profiles: `src/app/Authors/_component/` (author card, profile
  section, author blogs) and `src/app/Profile/_component/` (profile section,
  blog section, user-not-found state).
- Create form: `src/app/Create/_component/` (title, content, summary, tags,
  feature image, preview, and centered action buttons).
- Dashboard/admin: `src/components/DashboardComponent/` (stats, recent blogs,
  quick actions), `src/app/Admin/_component` equivalents under each admin
  route (filters, lists, actions, delete controls, bookmark/like lists and
  dialogs), plus the admin layout.
- Feedback and loading: `src/components/common/` (alert, loaders, AI loader,
  button loaders, error page, loading page) and
  [`src/Context/AlertContext.tsx`](../src/Context/AlertContext.tsx).
- UI primitives: `src/components/ui/` (button, input, label, pagination,
  select, textarea).

## Production performance baseline

Commands:

```text
npm.cmd run build
npm.cmd exec -- next build --webpack
```

Both completed successfully. The default build uses Turbopack. The webpack
build was used for the reproducible static asset measurement because Next.js
16 does not print the legacy First Load JS table.

The values below are the sum of the raw response bytes for each unique external
JavaScript `<script src>` in the production HTML returned by `next start -p
3100`. They represent the current route First Load JS browser payload,
excluding inline bootstrap text, compression effects, and API responses.

| Route | First Load JS |
|---|---:|
| `/` | 766,018 B |
| `/Admin` | 719,472 B |
| `/Admin/allBlogs` | 781,293 B |
| `/Admin/allUsers` | 774,094 B |
| `/Admin/userBookmarks` | 782,096 B |
| `/Admin/userLikes` | 749,506 B |
| `/Authors` | 730,395 B |
| `/Authors/[id]` (sample id `test`) | 736,771 B |
| `/Blogs` | 744,625 B |
| `/Blogs/[id]` (sample id `test`) | 731,392 B |
| `/Collection` | 746,601 B |
| `/Create` | 757,526 B |
| `/Profile` | 779,221 B |

Webpack production CSS output:

| Asset | Size |
|---|---:|
| `.next/static/css/f92e31cab272006d.css` | 98,408 B |
| **Total CSS** | **98,408 B** |

These values are the baseline to compare against after each redesign phase.
The measurement should be repeated with the same production-server method;
route First Load JS must not increase beyond the permitted 1–2 KB rounding
difference, and total CSS should remain within the requested 15% budget.

## Proposed phase plan

1. **Foundation and shell** — establish the light-only tokens, Inter font
   loading, global focus/reset rules, page frame, navbar/mobile menu styling,
   and shared button/input/card/badge primitives without changing behavior.
2. **Home page** — restyle the hero, stats strip, feature cards, latest blogs,
   tags, authors, responsive frame, and decorative stickers.
3. **Content discovery** — restyle Blogs, blog detail, Authors, author detail,
   Collection, filters, pagination, cards, loading, empty, error, and action
   states.
4. **Create and Profile** — restyle the create form/preview/upload states and
   profile/author-owned blog views while preserving validation and upload logic.
5. **Admin and shared states** — restyle dashboard/admin tables, filters,
   dialogs, loaders, alerts/toasts, not-found/error pages, and responsive
   mobile table behavior.
6. **Validation and comparison** — run lint, typecheck, production build, and
   the same route/CSS measurements; verify widths 360, 390, 768, 1024, 1280,
   and 1440 px, reduced-motion behavior, accessibility focus states, and no
   horizontal overflow.

