# ConvergenSEE website (Next.js)

The Next.js 16 rebuild of the ConvergenSEE marketing site (Mumbai digital
marketing agency), migrated from the Vite SPA that still lives on `main` /
in `../convergensee-website`. This worktree is branch `website-2`.

Next.js 16 App Router + React 19. Plain JSX (no TypeScript), no test suite,
no CSS framework — styling is inline `style={{}}` objects plus
`src/globals.css`.

## Running it

- `npm run dev` — dev server
- `npm run build` — production build (all routes statically prerendered)
- `npm run start` — serve the production build

## Layout

- `app/` — thin server components only: one `page.jsx` per route exporting
  metadata, plus `layout.jsx` (fonts, Nav, default metadata, Organization
  JSON-LD), `sitemap.js`, `robots.js`, `icon.svg`, `opengraph-image.jpg`,
  `not-found.jsx`.
- `app/careers/[role]` and `app/blogs/[slug]` — dynamic routes with
  `generateStaticParams` + `generateMetadata` + `notFound()`, fed by the data
  modules below. JobPosting / Article / Breadcrumb JSON-LD live here.
- `src/<Name>Page.jsx` — one `'use client'` body component per page.
- `src/lib/routes.js` — **the only file that knows about URLs.** `PATH_FOR`,
  `slugify`, `jobPath`, `findJobBySlug`, `ALL_JOBS`, `keyForPath`. Server-safe.
- `src/lib/seo.js` — `SITE_URL` (canonical: https://convergensee.ai — www 301s
  at the host), `buildMetadata()`, JSON-LD builders, `JsonLd` component.
- `src/lib/careersTeams.js` — teams + openings; an opening added here gets a
  page at `/careers/<slug>`, a sitemap entry and JobPosting JSON-LD for free.
- `src/lib/blogPosts.js` — blog posts, same pattern; add a post object and the
  listing card, `/blogs/<slug>` page and sitemap entry follow.
- `src/lib/teamRoster.js` — the ~40-person roster. Portraits are 640×880 crops
  in `public/team/`.
- `src/Nav.jsx` — fixed header, rendered once by the layout; highlight comes
  from `usePathname()` + `keyForPath`.
- `src/Footer.jsx` — the site footer, real `<Link>`s, takes no props.
- `src/ContactForm.jsx` + `src/lib/actions.js` — the shared contact form and
  its server action. The action validates and logs; **delivery (email/CRM) is
  still TODO.**
- `src/globals.css` — @font-face (self-hosted Archivo + Saira Condensed in
  `public/fonts/`; family names must stay 'Archivo' / 'Saira Condensed'
  because inline styles reference them literally), reset, ticker keyframes,
  micro-interaction classes.
- `src/ScrollRestorer.jsx` — manual back/forward scroll restoration, mounted
  once by the layout. Native restore fires before remounting pages reach full
  height, so this saves per-path offsets and re-applies them instantly on
  popstate, retrying across frames until the layout settles.
- `src/useResponsive.js` — viewport hook. Initial width is a constant 1440 so
  SSR and hydration agree; phones relayout one frame after mount. Don't
  reintroduce a `window.innerWidth` initial state.

## Conventions

- Colours are re-declared per file as `G` (#34cc32 green), `DARK` (#000718),
  `CARD` (#0f1520), `DIM` (#666a74), `BORDER` (rgba(255,255,255,0.1)).
- Boxes/panels are `background: transparent` with a 1–2px `BORDER` outline.
- **Never use a grey fill** (`CARD` #0f1520, #1a2235 or any other grey) as a
  background for new panels, strips, cards or sections. Use transparent or
  `DARK`. The user has rejected grey fills repeatedly.
- Navigation is `<Link href={PATH_FOR[key]}>` (crawlable) for anything
  anchor-like; `useRouter().push()` only for genuine button handlers.
- New images: `next/image` with `fill` inside positioned containers or real
  width/height; small svg icons stay plain `<img>`.

## Known gaps (pre-launch checklist)

1. Contact form logs submissions server-side only — wire email/CRM delivery
   in `src/lib/actions.js`. The careers CV upload (`JoinSection.jsx`) is
   still a visual mock.
2. Placeholder copy everywhere the Figma build had it: the one blog post,
   Work page hero, team blurbs/groupings in `careersTeams.js`, advisory
   board bios.
3. Media weight: `public/` is ~130MB (8MB jpgs, 47MB `public/figma/`,
   13MB review-reel.mp4) — compress/prune before launch.
4. JobPosting JSON-LD uses placeholder `datePosted`; add real dates to
   openings when known.
5. Host not connected yet. When it is: point apex + www at it, 301 www→apex,
   and confirm `SITE_URL` in `src/lib/seo.js`.

## Sibling folders — none of these are this site

`../convergensee-website` is the old Vite SPA (branch `main`). Everything
else under `/Users/apple/CC CSEE/` is dead: `csee-react`, `csee-react-2009`,
`CHNC-SCroll`, `framer`, `backups`, `sidebar icons`, `techdata-convergensee`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
