# HRYTSKO

Text-only personal website for Stas Hrytsko, a programme and delivery leader based in Valencia. A short introduction leads to two destinations: Work and Projects.

## Run locally

No installation or build step is required. From the repository root:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Any static HTTP server will work.

## Structure

- `index.html` — name, role and one floating white-and-black card linking to Work and Projects.
- `projects/index.html` — standalone project collection, with one linked card per existing project preview.
- `experience/index.html` — Work: career as expandable company cards in two chapters (Delivery, Procurement &amp; commercial), plus delivery scope, credentials, education, recommendations and volunteering.
- `projects/30-games/index.html` — 30 Games in 30 Days concept.
- `projects/mobile-apps/index.html` — mobile application work.
- `projects/short-film/index.html` — short film work.
- `projects/board-game/index.html` — tabletop game work.
- `styles.css` — shared responsive layout and typography.
- `favicon.svg` — original repository favicon, preserved.
- `404.html` — fallback page for hosts that support it.

## Content and design

A quiet, compact homepage inspired by the clarity of Julie Zhuo’s personal introduction. Palette: `#ededeb` background, `#212121` near-black, `#e8673d` accent. Typography uses a system grotesk stack (Inter first, then Helvetica Neue / Segoe UI / system UI) with a monospace stack for small labels, so nothing is downloaded. The Work page carries a black-and-white portrait; no other generated illustrations, raster image assets, external fonts, JavaScript dependencies, or remote services.

All site copy is English. Project pages are marked as concept previews. Work content is based on supplied LinkedIn screenshots, with a verified profile URL. Detailed career cases, project stages, direct credential URLs and the Bayer recommendation document still need to be supplied; this prototype does not claim completed releases. Products is intentionally absent until there are released works.

Edit the HTML files directly and adjust the shared stylesheet. Links and assets are relative so the site works at a domain root or a subdirectory.

## Hosting

Plain HTML and CSS; deploy directly on Vercel or another static host. Serve the repository root with no build command. No hosting credentials, deployment workflows, or provider-specific project identities are included.

`noindex,nofollow` is retained while the content is a prototype. Remove it from all HTML pages when publishing the finished content. Domain and production hosting configuration remain separate steps.

## Work content notes

Career titles and dates follow the supplied LinkedIn screenshots, including overlapping Buyer / Senior Buyer dates at Bayer. The current employer remains NDA. Career-wide claims, including delivery account growth from 8 to 50, are not attributed to a specific employer without supporting detail.

SAFe is shown with its August 2024 expiry. Recommendations are clearly attributed excerpts of visible text; truncated portions have not been reconstructed. Certificate and project document URLs are not invented. The existing /experience/ URL remains the Work page. Projects now lives at /projects/. Navigation and project return links use that page; old homepage #work, #experience and #projects anchors still resolve to the introduction links.

Expand companies with native HTML details controls (keyboard and screen reader accessible, no JavaScript required).

Project cards retain their existing Concept preview status until actual project titles, stages and releases are confirmed. The collection is ready for both ongoing and finished projects; no releases or progress have been invented.
