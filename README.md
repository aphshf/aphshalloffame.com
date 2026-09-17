# aphshalloffame.com

Source code for [https://aphshalloffame.com/](https://aphshalloffame.com/).

This README is aimed at whoever is managing the site day to day — how to run it, how to change content, and how it gets deployed.

## Tech stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS
- **Package manager:** pnpm (pinned to `10.34.1` via `packageManager` in `package.json`)
- **Node.js:** >= 24
- **Images:** Cloudinary (hosting/transforms) + `sharp` for local image processing
- **Forms:** [kwesforms](https://kwesforms.com/) powers the contact and bio-nomination forms
- **Hosting:** [Vercel](https://vercel.com/), auto-deployed from this repo's `main` branch

There is **no database**. All site content is static JSON checked into the repo (see below).

## Getting started

```bash
pnpm install
pnpm dev
```

The site runs at `http://localhost:3000`.

### Environment variables

Create a `.env.local` file (git-ignored) with:

```
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Ask whoever manages the Cloudinary account for these values, or pull them from Vercel if the [Vercel CLI](https://vercel.com/docs/cli) is installed and the project is linked:

```bash
npm i -g vercel
vercel link
vercel env pull
```

## Editing content

There's no admin dashboard — content lives as JSON files in `/db` and is edited directly in the repo. Any change pushed to `main` redeploys the live site automatically.

| File | Controls |
| --- | --- |
| `db/members.json`, `db/directory.json` | Inductees and the directory listing |
| `db/ceremonies.json`, `db/years.json` | Ceremony pages by year |
| `db/events.json` | Events page |
| `db/home.json` | Homepage content |
| `db/navigation.json`, `db/sub-navigation.json` | Site navigation menus |
| `db/pageSEO.json` | Page titles / meta descriptions |
| `db/donate.json` | Donate page content |
| `db/contactMembers.json` | Who receives contact form submissions |
| `db/bio-nomination.json` | Bio nomination form config |

Images are uploaded to Cloudinary and referenced by URL/ID from these JSON files — they are not stored in the repo.

**Workflow for a content change:**

1. Edit the relevant file(s) in `/db`.
2. Run `pnpm dev` locally and check the affected page.
3. Commit and push to `main` — Vercel builds and deploys automatically (usually within a couple of minutes).

## Site structure

Routes live under `/app` (Next.js App Router):

- `/` — home
- `/history`
- `/mission-statement`
- `/directory`
- `/inductee/[slug]` — individual inductee page
- `/ceremony/[year]`
- `/events`
- `/donate`
- `/contact`
- `/bio-nomination`

## Scripts

```bash
pnpm dev              # local dev server
pnpm build            # production build
pnpm start            # run a production build locally
pnpm lint             # next lint + prettier
pnpm prod             # lint + build (run before merging anything non-trivial)
pnpm bio-updater      # runs .scripts/bio-updater.js, if present
```

## Deployment

- Hosted on Vercel, connected to this GitHub repo. Pushing to `main` deploys to production automatically.
- If something breaks after a deploy, use **Instant Rollback** in the Vercel dashboard (Deployments tab) to revert to the last known-good deployment, or run `vercel rollback`.
- A bad content change can also be undone with `git revert <commit>` pushed to `main`.
