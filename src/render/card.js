import { pickDisplayStats } from "../lib/stats.js";
import { seededRandom } from "../lib/zodiac.js";

const WIDTH = 600;
const HEIGHT = 300;

function escapeXml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function barWidth(value, max = 160) {
  return Math.round((clamp(value) / 100) * max);
}

function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function renderStars(seed, color, count = 48) {
  const rand = seededRandom(`stars-${seed}`);
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = rand() * WIDTH;
    const y = rand() * HEIGHT;
    const r = 0.4 + rand() * 1.4;
    const base = 0.25 + rand() * 0.55;
    const peak = Math.min(1, base + 0.25 + rand() * 0.3);
    const dur = (1.8 + rand() * 3.2).toFixed(2);
    const begin = (rand() * 4).toFixed(2);
    // Twinkle via opacity pulse; staggered so the sky feels alive
    parts.push(
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${color}" opacity="${base.toFixed(2)}">
        <animate attributeName="opacity" values="${base.toFixed(2)};${peak.toFixed(2)};${(base * 0.55).toFixed(2)};${base.toFixed(2)}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      </circle>`,
    );
  }
  return parts.join("");
}

function renderConstellation(points, colors) {
  if (!points?.length) return "";
  const lines = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    lines.push(
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colors.accent}" stroke-opacity="0.55" stroke-width="1.2"/>`,
    );
  }
  // Close a soft loop for denser shapes
  if (points.length > 3) {
    const [x1, y1] = points[points.length - 1];
    const [x2, y2] = points[0];
    lines.push(
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colors.accent}" stroke-opacity="0.28" stroke-width="1"/>`,
    );
  }
  const nodes = points
    .map(([x, y], i) => {
      const r = i === 0 ? 3.2 : 2.4;
      const dur = (2.4 + (i % 4) * 0.55).toFixed(2);
      const begin = (i * 0.35).toFixed(2);
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="${colors.star}" opacity="0.95">
        <animate attributeName="opacity" values="0.55;1;0.7;0.95" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
        <animate attributeName="r" values="${r};${(r * 1.25).toFixed(2)};${r}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      </circle>`;
    })
    .join("");
  return `${lines.join("")}${nodes}`;
}

function renderStatBars(displayStats, colors) {
  return displayStats
    .map((stat, i) => {
      const y = 198 + i * 28;
      const w = barWidth(stat.value);
      return `
      <text x="36" y="${y}" fill="${colors.muted}" font-size="12" font-family="Georgia, 'Times New Roman', serif">${escapeXml(stat.label)}</text>
      <rect x="150" y="${y - 10}" width="160" height="8" rx="2" fill="${colors.text}" opacity="0.08"/>
      <rect x="150" y="${y - 10}" width="${w}" height="8" rx="2" fill="${colors.bar}">
        <animate attributeName="width" from="0" to="${w}" dur="0.9s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1"/>
      </rect>
      <text x="320" y="${y}" fill="${colors.text}" font-size="12" font-family="Georgia, 'Times New Roman', serif" opacity="0.85">${stat.value}</text>`;
    })
    .join("");
}

function renderLanguages(languages, colors) {
  const top = (languages || []).slice(0, 3).map((l) => l.name);
  if (!top.length) return "";
  const label = top.join("   ·   ");
  return `<text x="36" y="168" fill="${colors.accent}" font-size="13" font-family="Georgia, 'Times New Roman', serif" letter-spacing="0.5">${escapeXml(label)}</text>`;
}

/**
 * @param {{ profile: object, zodiac: object, stats: object, meta?: { source?: string } }} input
 */
export function renderZodiacCard({ profile, zodiac, stats, meta = {} }) {
  const colors = zodiac.colors;
  const displayStats = pickDisplayStats(stats, zodiac, 3);
  const displayName = profile.name || profile.username;
  const role = profile.role || "Software Developer";
  const uid = `zg-${profile.username}-${zodiac.id}`.replace(/[^a-z0-9-]/gi, "");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(displayName)} Developer Zodiac Card">
  <title>${escapeXml(displayName)} — ${escapeXml(zodiac.sign)} ${escapeXml(zodiac.title)}</title>
  <defs>
    <linearGradient id="${uid}-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors.bg0}"/>
      <stop offset="100%" stop-color="${colors.bg1}"/>
    </linearGradient>
    <radialGradient id="${uid}-glow" cx="72%" cy="28%" r="45%">
      <stop offset="0%" stop-color="${colors.accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${colors.bg0}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="${uid}-clip">
      <rect width="${WIDTH}" height="${HEIGHT}" rx="16"/>
    </clipPath>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&amp;family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&amp;display=swap');
      .title { font-family: Cinzel, Georgia, serif; }
      .body { font-family: 'Source Serif 4', Georgia, serif; }
    </style>
  </defs>

  <g clip-path="url(#${uid}-clip)">
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#${uid}-bg)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#${uid}-glow)"/>
    ${renderStars(`${profile.username}-${zodiac.id}`, colors.star)}

    <!-- constellation panel -->
    <g transform="translate(310, 10)" opacity="0.95">
      ${renderConstellation(zodiac.constellation, colors)}
    </g>

    <text class="title" x="36" y="52" fill="${colors.accent}" font-size="22" font-weight="700" letter-spacing="3">
      ${escapeXml(zodiac.symbol)}  ${escapeXml(zodiac.sign.toUpperCase())}
    </text>
    <text class="title" x="36" y="82" fill="${colors.text}" font-size="18" opacity="0.95">
      ${escapeXml(zodiac.title)}
    </text>

    <text class="body" x="36" y="122" fill="${colors.text}" font-size="20" font-weight="600">
      ${escapeXml(displayName)}
    </text>
    <text class="body" x="36" y="144" fill="${colors.muted}" font-size="13">
      ${escapeXml(role)}
    </text>

    ${renderLanguages(profile.languages, colors)}
    ${renderStatBars(displayStats, colors)}

    <text x="560" y="278" text-anchor="end" fill="${colors.muted}" font-size="10" font-family="Georgia, serif" opacity="0.7">
      ${escapeXml(meta.source === "birthdate" ? "mapped by birthdate" : "mapped by star-seed")} · developer zodiac
    </text>
  </g>
</svg>`;
}

export const CARD_SIZE = { width: WIDTH, height: HEIGHT };
