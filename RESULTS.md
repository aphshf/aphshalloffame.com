# Results: aphshalloffame.com (after migration)

Measured: 2026-10-09, against `main` at `e004699` and the live site at `https://www.aphshalloffame.com/`
Baseline for comparison: [BASELINE.md](BASELINE.md)

## Before and after

| Measure | Old site (Oct 2020) | New site (Oct 2026) |
| --- | --- | --- |
| Inductee profiles | 88 | 141 (every class, 2003 to 2026) |
| Most recent class shown | 2016, homepage last modified 2015-12-18 | 2026 |
| Pages in the sitemap | No sitemap | 155 |
| HTTPS | No | Yes. `http://` returns a 308 redirect, and HSTS is set for 2 years (`max-age=63072000`) |
| Works on a phone | No viewport tag | Responsive layout with a mobile menu |
| Unique page titles | 1 ("Main Page @ aphshalloffame.com") | 152 of 154 pages. Donate and Contact were using the homepage's title and description (fixed below) |
| Meta descriptions | Empty | 154 of 154 pages have one |
| Images with alt text | 0 of 6 sampled | Profile photos use the inductee's name. Homepage grid links read out each name. Ceremony photos use file names (see backlog) |
| Lighthouse Accessibility | 53 | 96 |
| Lighthouse SEO | 82 | 100 |
| Lighthouse Best Practices | 82 (overstated, see baseline) | 89 to 96 |
| Lighthouse Performance | 94 to 99 | 76 to 94 (see below) |
| Files edited to add an inductee | Up to 107 (the sidebar is copied into every page) | 1 data file (`db/members.json`). Profile, directory, homepage grid and sitemap are generated from it |
| Sidebar copies in sync | No: 88, 76 and 63 names on different pages | Single source, so always in sync |
| Ceremony photos | One page load per photo | One gallery page per year with a slider, grid and lightbox |
| Forms | None | Contact and Bio Nomination |
| Events and donation info | None | Events page with invitation and ad PDFs, Donate page with form |

The class of 2026 (10 inductees, the event page, the invitation and ad PDFs, and the menu) went live in one commit, `26c0d72`, which changed 11 files.

## Lighthouse

Same setup as the baseline: Lighthouse 12.6.1, Chrome 154, mobile preset with simulated throttling, Incognito, 3 runs per page, median reported. The same three pages as the baseline, measured on the live site (Vercel) and on a local production build (`pnpm build && pnpm start`) for a like-for-like comparison with the baseline's local copy.

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Home (`/`) | 84 (local 81) | 96 | 96 | 100 |
| Inductee (`/inductee/JosephOReedJr`) | 94 (local 90) | 96 | 96 | 100 |
| Ceremony (`/ceremony/2010`) | 76 (local 79) | 96 | 89 | 100 |

Live site:

| Metric | Home | Inductee | Ceremony |
| --- | --- | --- | --- |
| FCP | 0.95 s | 0.86 s | 0.98 s |
| LCP | 4.5 s | 3.1 s | 7.7 s |
| TBT | 0 ms | 0 ms | 0 ms |
| CLS | 0 | 0 | 0 |
| Total transfer | 1,300 KiB | 436 KiB | 2,977 KiB |
| Requests | 165 | 19 | 59 |
| Photos shown | 10 portraits (141 downloaded) | 1 | 19 |

### Old vs new, same page

| Page | Performance | Accessibility | LCP | Transfer |
| --- | --- | --- | --- | --- |
| Home | 99 → 84 | 53 → 96 | 2.1 s → 4.5 s | 216 → 1,300 KiB |
| Inductee | 94 → 94 | 53 → 96 | 2.6 s → 3.1 s | 303 → 436 KiB |
| Ceremony | 95 → 76 | 53 → 96 | 3.0 s → 7.7 s | 366 → 2,977 KiB |

### Reading the Performance numbers

The new site scores lower on Performance for the homepage and the ceremony page. Two reasons:

- **The homepage downloads every portrait.** `MemberGallery` starts with all 141 members (`useState(members_db)`) and filters to the 2026 class only after the page loads. Visitors see 10 portraits but download 141 (142 image requests, 737 KiB of images). The old homepage had no photos at all.
- **The ceremony page does more.** The old ceremony page showed one thumbnail. The new one loads the whole 2010 gallery of 19 photos. Per photo the cost is about the same: roughly 157 KiB per photo on the new gallery, against about 155 KiB for each old photo page after the first (estimated from the 2010c1.jpg size, not measured across the whole old gallery). The difference is that the old site needed a separate page load for every photo.
- **Images aren't optimized yet.** On the ceremony page Lighthouse estimates 1,341 KiB of savings from modern image formats and 501 KiB from compression. Cloudinary can do both by URL (`f_auto,q_auto`). On the homepage the LCP element is the CSS background banner, which the browser discovers late.

The inductee profile, the page most people land on from a shared link, is now as fast as the old one (94) and scores 96 on Accessibility instead of 53.

Remaining failed audits:

- Accessibility: `color-contrast` on the light-blue section subheading and the year filter buttons. All pages.
- Best Practices: `errors-in-console`. A 404 on every page, and on the ceremony page React hydration errors #418 and #423 (server and client HTML don't match).
- Ceremony page only: `image-aspect-ratio`, `image-size-responsive`, `unsized-images`, `font-display`.

## Build and setup

### Fresh-clone setup

2026-10-09, macOS 27.0, Node 24.20.0, pnpm 10.34.1. Cloned `main` into a new folder, copied in `.env.local` (Cloudinary keys), then followed the README:

| Step | Time |
| --- | --- |
| `git clone` | under 1 s |
| `pnpm install --frozen-lockfile` | 4 s |
| `pnpm build` | 16 s (13 static pages plus generated inductee and ceremony pages) |
| `pnpm start` to first 200 response | 1 s |
| Total, clone to working site | 21 s |
| Steps that failed or needed a guess | None, given the Cloudinary keys |

Caveat: the pnpm store was already warm on this machine. A cold machine will spend longer downloading packages. The build needs the Cloudinary keys, because ceremony and inductee pages fetch their image lists from Cloudinary at build time.

### Dependency check

`pnpm audit` on 2026-10-09: **44 known vulnerabilities (2 critical, 23 high, 17 moderate, 2 low)**. Production dependencies only (`--prod`): 32.

| Package | Critical | High | Moderate | Low |
| --- | --- | --- | --- | --- |
| next 14.2.35 | 2 | 8 | 11 | 2 |
| brace-expansion | | 6 | 3 | |
| postcss | | 2 | 2 | |
| sharp | | 3 | | |
| cloudinary | | 1 | | |
| glob, braces, source-map-js | | 3 | | |
| postcss-selector-parser | | | 1 | |

Both critical advisories are remote code execution issues in Next.js, fixed in 15.5.24. One affects Windows-hosted servers, which doesn't apply here. The other is in the Image Optimization API when AVIF files are involved. This site uses `next/image` with remote Cloudinary images. On Vercel, image optimization is handled by the platform, which may reduce exposure, but I haven't verified that. Upgrading is the first item in the backlog.

The old site had no dependencies to audit. It also ran unpatched Apache over plain HTTP, and its exposure there can't be measured from the archive.

## How this was measured

- Baseline: see [BASELINE.md](BASELINE.md).
- Lighthouse: `lighthouse <url> --output=json --chrome-flags="--headless=new --incognito"`, three runs per page, median of each value.
- Titles and descriptions: every URL in `https://www.aphshalloffame.com/sitemap.xml` (155) was fetched and its `<title>` and `<meta name="description">` read. One URL failed: the sitemap lists `/ceremony`, which returns 404.
- Gallery photo counts: unique Cloudinary file names under `Ceremonies/<year>/` in each live ceremony page.

## Quick-win fixes

Applied and measured 2026-10-09, on top of `e004699`. Not yet deployed.

### Lighthouse, before and after the fixes

Both builds served locally with `pnpm start`, measured in the same session, alternating between them, with the same settings as above (mobile, 3 runs, median). The "before" column is a clean build of `e004699`. Every run of each page scored within 3 points of the others.

| Page | Performance | Best Practices | LCP | Transfer | Requests |
| --- | --- | --- | --- | --- | --- |
| Home | 81 → **88** | 96 → **100** | 5.1 s → **3.9 s** | 1,299 → **539 KiB** | 165 → **33** |
| Inductee | 90 → 90 | 96 → **100** | 3.6 s → 3.6 s | 436 → 432 KiB | 19 → 19 |
| Ceremony (2010) | 77 → **80** | 89 → **96** | 6.5 s → **5.5 s** | 2,981 → **1,212 KiB** | 59 → **45** |

Accessibility stayed at 96 and SEO at 100 on all three. Production JavaScript on the homepage, History and Mission Statement dropped from 239 kB to 104 kB, 98.5 kB and 98.5 kB (first-load JS from `next build`).

Combined with the baseline:

| Page | Old site | New site before fixes | New site after fixes |
| --- | --- | --- | --- |
| Home, Accessibility | 53 | 96 | 96 |
| Home, SEO | 82 | 100 | 100 |
| Home, Best Practices | 82 | 96 | 100 |
| Home, Performance | 99 | 81 | 88 |
| Ceremony, transfer for the whole gallery | one 366 KiB page load per photo | 2,981 KiB for 19 photos | 1,212 KiB for 19 photos |

### What changed

| Fix | Files | Effect |
| --- | --- | --- |
| Homepage grid starts on the default year | `components/shared/MemberGallery.tsx` | 141 portraits downloaded per visit → 10 |
| Gallery gets only name, slug and year from a server component, so biographies aren't sent to the browser. Removed the unused React Query provider and dependency | `components/shared/MemberGallerySection.tsx` (new), `MemberGalleryQueryProvider.tsx` (deleted), `package.json` | Homepage JS 239 kB → 104 kB |
| Banner is a prioritized `next/image` instead of a CSS background | `app/page.tsx`, `tailwind.config.js` | Banner found and preloaded immediately, served at the right size |
| Cloudinary `f_auto,q_auto` on ceremony photos, `h_1200` for slides, explicit width/height, only the first slide eager | `app/ceremony/[year]/page.tsx`, `components/GallerySlider.tsx` | Ceremony page 2,981 KiB → 1,212 KiB |
| Slider CSS bundled from `slick-carousel@1.8.1` instead of a CDN `<head>` injected by a layout | `app/ceremony/[year]/layout.tsx` (deleted), `components/GallerySlider.tsx` | Fixed the hydration errors (#418, #423) that made every ceremony page re-render from scratch in the browser. Removed two render-blocking third-party requests |
| Ceremony photo alt text: "2010 induction ceremony, photo 1" instead of the file path | `app/ceremony/[year]/page.tsx` | Readable for screen readers |
| Favicon added | `app/icon.svg` | Fixed the 404 in the console on every page |
| Inductee photo: `https` URL, removed the deprecated `layout` prop | `app/inductee/[slug]/page.tsx` | No `http://` image request, no console warning |
| **Ceremony date corrected to Thursday, October 15, 2026** on Events and Donate (it said October 17, which is a Saturday). Source: the committee's invitation PDF and "3-INV 2026 inside" | `db/events.json`, `db/donate.json` | Matches the printed invitation |
| Events advertise form embedded a Google Doc that returns 410 Gone. Now shows the 2026 ad PDF | `db/events.json` | The form view works again |
| Events meta description updated from the 2020/2021 text | `db/pageSEO.json` | Accurate in search results |
| Donate and Contact use their own title and description | `app/donate/page.tsx`, `app/contact/page.tsx` | The two pages that shared the homepage title now have their own |
| 338 doubled apostrophes (`Men''s Club`) fixed across 89 lines of biographies | `db/members.json` | Bios read correctly |
| 2007 gallery added to the Ceremonies menu (8 photos were in Cloudinary but not linked) | `db/navigation.json`, `db/ceremonies.json` | Restores a gallery from the old site |
| `/ceremony` removed from the sitemap | `app/sitemap.ts` | No 404 in the sitemap |
| Removed the dead `/api/keep-awake` cron, the `bio-updater`/`dump`/`seed` scripts, and the "mongodb" keyword | `vercel.json` (deleted), `package.json`, `README.md` | Nothing points at code that no longer exists |

After the fixes, the browser console is empty on Home, Inductee, both ceremony pages checked, Events, Donate and Contact.

### Tried and reverted

- `lazyLoad: 'ondemand'` on the ceremony slider. It cut transfer to 957 KiB but caused a large layout shift (CLS 0.39) and a later LCP, and Performance fell to 59. Reverted.

## Backlog: what's left

**Security**

- Upgrade Next.js from 14.2.35 to 15.5.24 or later. This clears both critical advisories and most of the high ones. `pnpm audit` still reports 44 after the quick wins, because none of them changed Next.js. Next 15 also needs React 19, so `react-slick`, `react-18-image-lightbox` and `@headlessui/react` need checking. That's why it isn't in the quick wins.

**Content (needs the committee)**

- Cloudinary has no photos for the 2012, 2018, 2024 or 2026 ceremonies. The old site had a 2012 gallery, so those photos existed at one point. 2026 photos can be added after October 15.
- Donate page says "the 10th induction ceremony". With 2003 through 2026 that would be the 11th. Confirm with the committee.

**Performance**

- Homepage LCP (3.9 s) is now mostly render delay (2.4 s), waiting on stylesheets and about 280 KiB of web fonts. Load fewer font weights: `app/font.ts` requests six Open Sans weights plus italics.
- Ceremony LCP (5.5 s) is the 1200px-tall first slide. Smaller responsive sizes need the slider's fixed 600px height to change first.

**Accessibility**

- Raise the contrast of the light-blue subheading and the active year button (`site.lightBlue`, `#59a7cf`). The fix means darkening the brand color, so it's a design decision. This is the only remaining Accessibility failure.

**Process**

- Re-run Lighthouse against the live site after deploying, to confirm the local numbers.
