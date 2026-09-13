# HRYTSKO

Text-only personal website prototype for Stas Hrytsko, a delivery manager and independent builder based in Valencia.

## Run locally

No installation or build step is required. From the repository root:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Any static HTTP server will work.

## Structure

- `index.html` — introduction, experience, projects, approach, and contact.
- `experience/index.html` — professional background and expandable delivery principles.
- `projects/30-games/index.html` — 30 Games in 30 Days concept.
- `projects/mobile-apps/index.html` — mobile application work.
- `projects/short-film/index.html` — short film work.
- `projects/board-game/index.html` — tabletop game work.
- `styles.css` — shared responsive layout and typography.
- `favicon.svg` — original repository favicon, preserved.
- `404.html` — fallback page for hosts that support it.

## Content and design

Large graphite typography, a light gray background, and orange accents. No portrait photos, generated illustrations, raster image assets, external fonts, JavaScript dependencies, or remote services.

All site copy is English. Project pages are marked as concept previews. Actual project stages, career cases, and contact links still need to be supplied; this prototype does not claim completed releases. Products is intentionally absent until there are released works.

Edit the HTML files directly and adjust the shared stylesheet. Links and assets are relative so the site works at a domain root or a subdirectory.

## Hosting

Plain HTML and CSS; deploy directly on Vercel or another static host. Serve the repository root with no build command. No hosting credentials, deployment workflows, or provider-specific project identities are included.

`noindex,nofollow` is retained while the content is a prototype. Remove it from all HTML pages when publishing the finished content. Domain and production hosting configuration remain separate steps.
