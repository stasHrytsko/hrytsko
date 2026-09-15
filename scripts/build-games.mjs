#!/usr/bin/env node
// Builds the Prototype Validation Project log: the card grid and one page per published prototype.
// Source of truth: projects/30-games/games.json. Run: node scripts/build-games.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projectDir = join(root, 'projects', '30-games');
const data = JSON.parse(readFileSync(join(projectDir, 'games.json'), 'utf8'));

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const PLATFORMS = { itch: 'itch.io', youtube: 'YouTube', x: 'X', threads: 'Threads' };
const count = (value) => value.toLocaleString('en-GB');
const percent = (value) => `${value.toLocaleString('en-GB')}%`;
const METRICS = {
  qualifiedPlayers: { label: 'Qualified players', format: count },
  clarityRate: { label: 'Understood the mechanic', format: percent },
  retryRate: { label: 'Retried after failure', format: percent },
  moreRate: { label: 'Wanted more content', format: percent },
  returnRate: { label: 'Returned', format: percent },
  votes: { label: 'Player votes', format: count }
};

const esc = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const dayLabel = (day) => `Day ${String(day).padStart(2, '0')}`;
const longDate = (iso) => {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};
// Cards are narrow, so they carry an abbreviated month.
const shortDate = (iso) => {
  const [, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1].slice(0, 3)}`;
};

// Planned days render as light empty slots so a filled day stands out against them.
function logCard(game) {
  if (game.status !== 'published') {
    return `<article class="log-card log-card--planned"><span class="log-date">${esc(dayLabel(game.day))}</span></article>`;
  }
  return `<a class="log-card" href="./${esc(game.slug)}/">
<div class="log-cover geo-cover" aria-hidden="true"></div>
<div class="log-info"><span class="log-date">${esc(dayLabel(game.day))} · ${esc(shortDate(game.date))}</span><h3>${esc(game.title)}</h3></div>
</a>`;
}

// itch is skipped here when it already carries the primary Play button.
function platformLinks(links, skip = []) {
  return Object.entries(PLATFORMS)
    .filter(([key]) => links[key] && !skip.includes(key))
    .map(([key, label]) => `<a class="text-link" href="${esc(links[key])}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`)
    .join('');
}

function statCards(metrics, updated) {
  const cards = Object.entries(METRICS)
    .filter(([key]) => Number.isFinite(metrics[key]))
    .map(([key, metric]) => `<div class="stat-card reveal"><strong>${metric.format(metrics[key])}</strong><span>${metric.label}</span></div>`);
  if (!cards.length) return '';
  const note = updated ? `\n<p class="small">Figures recorded by hand on ${esc(longDate(updated))}.</p>` : '';
  return `\n<section class="detail-block">
<h2>How it landed</h2>
<div class="stat-cards stat-cards--inline">${cards.join('')}</div>${note}
</section>`;
}

// Feedback is a hand-written summary of reactions gathered across platforms, not quoted comments.
function feedback(summary = {}) {
  const liked = summary.liked || [];
  const didntWork = summary.didntWork || [];
  if (!liked.length && !didntWork.length) return '';
  const card = (label, items, variant) => items.length
    ? `<article class="flat-card reveal"><span class="card-label">${label}</span><ul class="feedback-list feedback-list--${variant}">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></article>`
    : '';
  return `\n<section class="detail-block">
<h2>What players said</h2>
<div class="card-grid">${card('Liked', liked, 'liked')}${card('Didn’t work', didntWork, 'flat')}</div>
</section>`;
}

function notes(note) {
  const blocks = [];
  if (note.tried) blocks.push(`<section class="detail-block"><h2>What I tried</h2><p>${esc(note.tried)}</p></section>`);
  if (note.change) blocks.push(`<section class="detail-block"><h2>What I would change</h2><p>${esc(note.change)}</p></section>`);
  return blocks.length ? `\n${blocks.join('\n')}` : '';
}

function gamePage(game, next) {
  const play = game.links.itch
    ? `<a class="button" href="${esc(game.links.itch)}" target="_blank" rel="noopener noreferrer">Play on itch.io <span aria-hidden="true">↗</span></a>`
    : '';
  const nextLink = next && next.status === 'published'
    ? `<a class="next-project" href="../${esc(next.slug)}/"><div><span class="meta">${esc(dayLabel(next.day))}</span><br><strong>${esc(next.title)}</strong></div><span aria-hidden="true">→</span></a>`
    : `<a class="next-project" href="../"><div><span class="meta">Back to the log</span><br><strong>Prototype Validation Project</strong></div><span aria-hidden="true">→</span></a>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(game.title)} — Prototype Validation Project</title>
<meta name="description" content="${esc(game.pitch || game.title)}">
<link rel="icon" type="image/svg+xml" href="../../../favicon.svg">
<link rel="stylesheet" href="../../../styles.css">
<meta name="theme-color" content="#ededeb">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header>
<div class="wrap nav"><a class="wordmark" href="../../../" aria-label="Stas Hrytsko home">SH<span>.</span></a>
<nav aria-label="Main navigation"><a href="../../../experience/">Career</a><a href="../../" class="active" aria-current="location">Projects</a></nav>
</div>
</header>
<main class="wrap" id="main">
<section class="page-hero"><a class="back" href="../">← Prototype Validation Project</a>
<div class="meta">${esc(dayLabel(game.day))} / ${esc(longDate(game.date))}</div>
<h1>${esc(game.title)}</h1>
${game.pitch ? `<p class="lede">${esc(game.pitch)}</p>` : ''}
<div class="actions">${play}${platformLinks(game.links, play ? ['itch'] : [])}</div>
</section>
<article class="detail-body">${statCards(game.metrics, data.metricsUpdated)}${notes(game.notes)}${feedback(game.feedback)}
</article>
${nextLink}
</main>
<footer class="wrap"><div class="footer"><span>© 2026 Stas Hrytsko</span><span>Valencia, Spain</span><a href="#main">Back to the top ↑</a></div></footer>
</body>
</html>
`;
}

const games = [...data.games].sort((a, b) => a.day - b.day);

// Keep the overview and project page in sync with actual published games.
const publishedCount = games.filter((game) => game.status === 'published').length;
const stage = publishedCount >= 30 ? 'Completed' : publishedCount > 0 ? 'In progress' : 'Planning';
const readyText = publishedCount === 0
  ? 'The experiment framework and 30-slot prototype log are in place. The hub, analytics and first two playable prototypes are the next milestones.'
  : `${publishedCount} of 30 prototypes published. Play the completed entries, vote and follow the evidence behind each result.`;

function updateSummary(html) {
  return html
    .replace(/<!-- stage:30-games:start -->[\s\S]*?<!-- stage:30-games:end -->/g, `<!-- stage:30-games:start -->${stage}<!-- stage:30-games:end -->`)
    .replace(/<!-- count:30-games:start -->[\s\S]*?<!-- count:30-games:end -->/g, `<!-- count:30-games:start -->${publishedCount}<!-- count:30-games:end -->`)
    .replace(/<!-- ready:30-games:start -->[\s\S]*?<!-- ready:30-games:end -->/g, `<!-- ready:30-games:start -->\n<p>${esc(readyText)}</p>\n<!-- ready:30-games:end -->`);
}


const grid = `<div class="log-grid">\n${games.map(logCard).join('\n')}\n</div>`;
const indexPath = join(projectDir, 'index.html');
const index = readFileSync(indexPath, 'utf8');
const markers = /<!-- log:start -->[\s\S]*?<!-- log:end -->/;
if (!markers.test(index)) throw new Error('log:start / log:end markers missing in projects/30-games/index.html');
writeFileSync(indexPath, updateSummary(index.replace(markers, `<!-- log:start -->\n${grid}\n<!-- log:end -->`)));
const overviewPath = join(root, 'projects', 'index.html');
writeFileSync(overviewPath, updateSummary(readFileSync(overviewPath, 'utf8')));

let pages = 0;
games.forEach((game, i) => {
  if (game.status !== 'published') return;
  const dir = join(projectDir, game.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), gamePage(game, games[i + 1]));
  pages += 1;
});

console.log(`log grid: ${games.length} card(s); game pages written: ${pages}`);
