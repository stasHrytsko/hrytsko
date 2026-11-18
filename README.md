# HRYTSKO

Personal website for Stas Hrytsko, a Technical Program & Delivery Manager based in Valencia. The site is a single career page: introduction, scope, what I do, career history and education.

Last content review: November 2026.

## Run locally

The site needs no installation or build step. From the repository root:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Any static HTTP server will work. Note that `python3 -m http.server` does not serve `404.html` for missing paths; open http://localhost:8000/404.html to preview it.

## Structure

- `index.html` — the career page: portrait and introduction, delivery scope, What I do, career as expandable company cards in two chapters (Delivery, Procurement & commercial) and education.
- `experience/index.html` — redirect to the home page, kept so the old `/experience/` URL still resolves.
- `404.html` — fallback page for hosts that support it.
- `styles.css` — shared responsive layout and typography.
- `portrait.webp` — black-and-white portrait with an orange band, 960 × 1200.
- `favicon.svg` — site favicon.

There is no JavaScript. Companies and Dev.Pro positions expand with native HTML `details` controls, so they are keyboard and screen reader accessible.

## Content and design

Palette: `#ededeb` background, `#212121` near-black, `#e8673d` accent. Typography uses a system grotesk stack (Inter first, then Helvetica Neue / Segoe UI / system UI) with a monospace stack for small labels, so nothing is downloaded. No external fonts or remote services.

All site copy is English. Edit `index.html` directly and adjust the stylesheet.

The portrait is the approved image re-encoded from the original 1122 × 1402 PNG (1.5 MB) to WebP (about 54 KB). It is displayed without cropping. The original PNG remains in the git history.

## Career content notes

- Titles and dates follow the LinkedIn profile, including the overlapping Buyer / Senior Buyer dates at Bayer.
- The current employer, BrainRocket, is named. Scope is labelled explicitly: approximately 150 programme contributors and a team of one Program Manager plus four Project Managers.
- Account growth from 8 to 50 people is attributed to the Securrency / DTCC Digital Assets account at Dev.Pro.
- The Bayer letter of recommendation is referenced through the LinkedIn profile; no document URL is invented.
- There is no credentials or recommendations section, no CV download and no contact form. These are deferred by the owner.

## Projects

The Projects section and its pages were removed in November 2026. The Prototype Validation Project hub lives in a separate repository, `stasHrytsko/play`, deployed at play.hrytsko.com, and is not linked from this site. Old `/projects/` URLs now return the 404 page.

## Hosting

Plain HTML and CSS; deploy on Vercel or another static host. Serve the repository root with no build command. No hosting credentials, deployment workflows or provider-specific project identities are included.

`index.html` and `experience/index.html` use relative links. `404.html` uses root-absolute links (`/styles.css`, `/`) because a host serves it at any path depth, so the site is expected to live at a domain root.

The career page carries no `robots` restriction and can be indexed. Only `404.html` and the `/experience/` redirect are marked `noindex`.
