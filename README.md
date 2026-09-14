# HRYTSKO

Personal website for Stas Hrytsko, a programme and delivery leader based in Valencia. A short introduction leads to two destinations: Career and Projects.

## Run locally

The site itself needs no installation or build step. From the repository root:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Any static HTTP server will work.

## The 30 Games log

`projects/30-games/games.json` is the single source of truth for the daily log. After editing it, regenerate the cards and per-game pages:

```sh
node scripts/build-games.mjs
```

The script has no dependencies. It rewrites the card grid between the `log:start` / `log:end` markers in `projects/30-games/index.html` and writes one static page per game with `"status": "published"`. Entries still marked `"planned"` render as a “Coming soon” card with no link and no page.

Metrics (plays, likes, comments) are recorded by hand and stamped with the `metricsUpdated` date. They are deliberately not fetched live: itch.io exposes no public play counts, and X and Threads need paid or per-account API access, so a live counter would break quietly and silently show zero.

Player reactions live on the platforms where they were posted. Rather than embedding comments, each day carries a hand-written summary under `feedback`: `liked` and `didntWork`, each a short list. Both render as two cards; the `liked` list uses accent markers.

## Structure

- `index.html` — name, role and one floating white-and-black card linking to Career and Projects.
- `projects/index.html` — standalone project collection, with one linked card per existing project preview.
- `experience/index.html` — Career: career as expandable company cards in two chapters (Delivery, Procurement &amp; commercial), plus delivery scope, credentials, education, recommendations and volunteering.
- `projects/30-games/index.html` — 30 Games in 30 Days concept, with the generated daily log grid.
- `projects/30-games/games.json` — source of truth for the log: days, links, hand-recorded metrics and a hand-written feedback summary.
- `scripts/build-games.mjs` — dependency-free generator for the log grid and per-game pages.
- `projects/mobile-apps/index.html` — mobile application work.
- `projects/short-film/index.html` — short film work.
- `projects/board-game/index.html` — tabletop game work.
- `styles.css` — shared responsive layout and typography.
- `favicon.svg` — original repository favicon, preserved.
- `404.html` — fallback page for hosts that support it.

## Content and design

A quiet, compact homepage inspired by the clarity of Julie Zhuo’s personal introduction. Palette: `#ededeb` background, `#212121` near-black, `#e8673d` accent. Typography uses a system grotesk stack (Inter first, then Helvetica Neue / Segoe UI / system UI) with a monospace stack for small labels, so nothing is downloaded. The Career page carries a black-and-white portrait; no external fonts or remote services. The project category filter uses a small local script; with JavaScript unavailable, all projects stay visible.

All site copy is English. Project cards and pages show categories and stages. Career content is based on supplied LinkedIn screenshots, with a verified profile URL. Detailed career cases, project stages, direct credential URLs and the Bayer recommendation document still need to be supplied; this prototype does not claim completed releases. Products is intentionally absent until there are released works.

Edit the HTML files directly and adjust the shared stylesheet. Links and assets are relative so the site works at a domain root or a subdirectory.

## Hosting

Plain HTML and CSS; deploy directly on Vercel or another static host. Serve the repository root with no build command. No hosting credentials, deployment workflows, or provider-specific project identities are included.

`noindex,nofollow` is retained while the content is a prototype. Remove it from all HTML pages when publishing the finished content. Domain and production hosting configuration remain separate steps.

## Career content notes

Career titles and dates follow the supplied LinkedIn screenshots, including overlapping Buyer / Senior Buyer dates at Bayer. The current employer remains NDA. Career-wide claims, including delivery account growth from 8 to 50, are not attributed to a specific employer without supporting detail.

SAFe is shown with its August 2024 expiry. Recommendations are clearly attributed excerpts of visible text; truncated portions have not been reconstructed. Certificate and project document URLs are not invented. The existing /experience/ URL remains the Career page. Projects now lives at /projects/. Navigation and project return links use that page; old homepage #work, #experience and #projects anchors still resolve to the introduction links.

Expand companies with native HTML details controls (keyboard and screen reader accessible, no JavaScript required).

The 30/30 project is the focus for September 2026. Its stage is Planning until the first game is published; other projects remain Concept until their stages are confirmed.

## Career review — September 2026

The Career page now leads with a concrete delivery focus, two evidence-backed experience highlights and a manager recommendation. Earlier procurement roles remain available in a collapsed chapter. Scope is labelled explicitly: approximately 150 programme contributors and a team of one Program Manager plus four Project Managers. The ambiguous 8-to-50 account-growth claim is omitted pending confirmation of the unit, period and attribution. Detailed outcome case studies still need supporting results; highlights do not claim specific launches are completed. CV download and new contact actions are deliberately deferred by the owner. The approved black-and-white portrait with an orange band is now connected from `experience/file_00000000b10881f4941cb8662542f7a6.png`. The supplied image is used unchanged and displayed without cropping.


## Project categories and 30/30 focus

Navigation uses Career / Projects; the existing `/experience/` URL and homepage anchors are preserved. The Projects page has All, Games, Apps, Films and Tabletop filters. Tabletop belongs to Games as well as Tabletop. All cards remain available when JavaScript is disabled.

30 Games in 30 Days is featured for September 2026. The 30-day clock starts with the first game. The generator updates stage, published count and ready summary in both the collection and project page from `games.json`: zero releases = Planning, 1–29 = In progress, 30 = Completed. Run `node scripts/build-games.mjs` after updating the log. Other project pages now use What I’m making / The goal / What’s ready / What’s next.
