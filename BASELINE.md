# Baseline: aphshalloffame.com (before migration)

Snapshot: Internet Archive capture `20201026035002` of `http://aphshalloffame.com/` (the last version of the old site before the rebuild started on 2020-11-18)
Recorded: 2026-10-09

The old site was never in a git repo, so the Internet Archive is the only record of it. For the Lighthouse runs, the archived HTML, stylesheet and images were downloaded as-is, with the absolute `http://aphshalloffame.com/` links rewritten to local paths, and served from localhost with gzip (the original Apache server used gzip, per its archived response headers).

## The site

| Check | Result |
| --- | --- |
| How it was built | Hand-written static HTML. Inline `<font>` tags and `style=""` attributes plus one shared `style.css` (3.9 KB) |
| Server | Apache (archived `Server` header) |
| Homepage last modified | 2015-12-18 (archived `Last-Modified` header). Still unchanged in October 2020 |
| Homepage announcement in Oct 2020 | "Congratulations Class of 2016 Inductees", four years out of date |
| Files captured by the archive (before June 2021) | 185: 107 HTML pages, 1 stylesheet, 35 JPEG, 40 PNG, 2 BMP |
| Inductee pages | 88, one hand-written HTML file each (`/Inductees/JosephOReedJr.html`) |
| Ceremony photo galleries | 6 (2003, 2005, 2007, 2010, 2012, 2014). None for 2016 |
| Ceremony photo pages | One HTML page per photo (`/2010Page/pic1.html`, `pic2.html`, ...). Each shows a thumbnail and a "Next Photo" link |
| Navigation | A sidebar listing every inductee, copied into every page |
| Copies of the sidebar in sync | No. Of the 5 pages sampled, the homepage and an inductee page list 88 inductees, Mission Statement lists 76, and the 2010 ceremony page lists 63 |
| Files to edit to add one inductee to the navigation | Every page that carries the sidebar: up to 107 |
| Forms (contact, nomination) | None |
| Events, donation, or ticket information | None |

## Security and search

| Check | Result |
| --- | --- |
| HTTPS | No. Every archived capture before June 2021 is `http://`, and the pages link their own stylesheet and images with hard-coded `http://` URLs |
| `<title>` | "Main Page @ aphshalloffame.com" on all 5 sampled pages, including inductee and ceremony pages |
| Meta description | Present but empty (`content=""`) |
| Sitemap or robots.txt | None captured |
| Mobile viewport tag | None. Phones render the desktop layout shrunk to fit |
| `<!doctype>` | None (quirks mode) |
| `lang` attribute | None |
| Images with alt text | 0 of 6 on the sampled pages |

## Lighthouse

Lighthouse 12.6.1, Chrome 154, mobile preset with simulated throttling, Incognito, 3 runs per page, median reported. Served from the local copy described above.

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Home (`/`) | 99 | 53 | 82 | 82 |
| Inductee (`/Inductees/JosephOReedJr.html`) | 94 | 53 | 82 | 82 |
| Ceremony (`/2010Page/pic1.html`) | 95 | 53 | 82 | 82 |

| Metric | Home | Inductee | Ceremony |
| --- | --- | --- | --- |
| FCP | 0.75 s | 0.75 s | 0.75 s |
| LCP | 2.1 s | 2.6 s | 3.0 s |
| TBT | 0 ms | 0 ms | 0 ms |
| CLS | 0 | 0.11 | 0 |
| Total transfer | 216 KiB | 303 KiB | 366 KiB |
| Requests | 4 | 5 | 5 |
| Photos shown | 0 | 1 | 1 (a 229×155 thumbnail) |

Failed audits, the same on all three pages:

- Accessibility: `color-contrast`, `heading-order`, `html-has-lang`, `image-alt`, `target-size`
- Best Practices: `doctype`, `viewport`, `font-size`, `image-size-responsive`
- SEO: `meta-description`, `image-alt`

## Notes

- The high Performance scores are real. The old pages are a few kilobytes of HTML with no JavaScript, so they paint quickly. They also show very little: the homepage has no photos, and each ceremony page shows a single thumbnail.
- Best Practices is overstated. Lighthouse treats `localhost` as secure, so the old site's lack of HTTPS is not counted against it. Served from the real `http://` origin it would also fail `is-on-https`.
- The 404 in the console on every page is the missing favicon in the local copy. It is not counted as a finding.
- Sidebar counts come from `grep -c 'Inductees/'` on each downloaded page. The "up to 107 files" figure assumes every archived HTML page carries the sidebar, which held for all 5 sampled pages.
- Evidence: `curl -sI "https://web.archive.org/web/20201026035002id_/http://aphshalloffame.com/"` (the `x-archive-orig-*` headers), and the CDX listing `https://web.archive.org/cdx/search/cdx?url=aphshalloffame.com/*&to=20210601&collapse=urlkey`.
