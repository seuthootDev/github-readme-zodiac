import { pickDisplayStats, relativeFill, formatStatValue } from "../lib/stats.js";
import { seededRandom } from "../lib/zodiac.js";
import { drawCharacter, INK } from "./characters.js";
import { EMBEDDED_FONT_CSS } from "../data/embedded-fonts.js";
import constellationIcons from "../data/constellation-bg-icons.js";

/** Design coordinate space (viewBox). Display size can be smaller via options. */
const WIDTH = 600;
const HEIGHT = 320;
/** Default on-page size — compact README card (override with ?width=). */
const DEFAULT_DISPLAY_WIDTH = 360;

function escapeXml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function barWidth(value, peak, max = 160) {
  return relativeFill(value, peak, max);
}

function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function wrapText(text, maxChars, maxLines = 3) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
      if (lines.length >= maxLines) break;
    } else {
      current = next;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines;
}

/** Rough text width for pill sizing (no font metrics in SVG strings). */
function textWidth(str, fontSize, factor = 0.6) {
  return String(str).length * fontSize * factor;
}

/** Soft 4-point sparkle centered at (x, y). */
function sparklePath(x, y, r) {
  const p = (n) => n.toFixed(1);
  return `M${p(x)},${p(y - r)} Q${p(x)},${p(y)} ${p(x + r)},${p(y)} Q${p(x)},${p(y)} ${p(x)},${p(y + r)} Q${p(x)},${p(y)} ${p(x - r)},${p(y)} Q${p(x)},${p(y)} ${p(x)},${p(y - r)} Z`;
}

function heartPath(x, y, s) {
  const p = (n) => n.toFixed(1);
  return `M${p(x)},${p(y + 4 * s)} C${p(x - 8 * s)},${p(y - 2 * s)} ${p(x - 5 * s)},${p(y - 8 * s)} ${p(x)},${p(y - 4 * s)} C${p(x + 5 * s)},${p(y - 8 * s)} ${p(x + 8 * s)},${p(y - 2 * s)} ${p(x)},${p(y + 4 * s)} Z`;
}

/** Background confetti: sparkles, hearts and dots that gently twinkle. */
function renderConfetti(seed, colors) {
  const rand = seededRandom(`confetti-${seed}`);
  const parts = [];
  for (let i = 0; i < 26; i++) {
    const x = rand() * WIDTH;
    const y = rand() * HEIGHT;
    const kind = rand();
    const color = rand() < 0.6 ? colors.star : colors.accent;
    const base = color === colors.star ? 0.55 + rand() * 0.3 : 0.18 + rand() * 0.14;
    const dur = (2.4 + rand() * 3).toFixed(2);
    const begin = (rand() * 3).toFixed(2);
    const anim = `<animate attributeName="opacity" values="${base.toFixed(2)};${(base * 0.35).toFixed(2)};${base.toFixed(2)}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>`;
    if (kind < 0.5) {
      const r = 3 + rand() * 5;
      parts.push(`<path d="${sparklePath(x, y, r)}" fill="${color}" opacity="${base.toFixed(2)}">${anim}</path>`);
    } else if (kind < 0.7) {
      const s = 0.45 + rand() * 0.35;
      parts.push(`<path d="${heartPath(x, y, s)}" fill="${color}" opacity="${base.toFixed(2)}">${anim}</path>`);
    } else {
      const r = 1.6 + rand() * 2.4;
      parts.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${base.toFixed(2)}">${anim}</circle>`);
    }
  }
  return parts.join("");
}

/** Accent-tinted constellation art behind the character, like a star map in the sticker. */
function renderConstellation(zodiac, colors, uid) {
  const icon = constellationIcons[zodiac.id];
  if (!icon) return "";
  // Art is cropped to its stars; fit it inside the card around the sticker.
  const x = 344;
  const y = 12;
  const w = 244;
  const h = 200;
  return `
    <mask id="${uid}-const" maskUnits="userSpaceOnUse" x="${x}" y="${y}" width="${w}" height="${h}">
      <image href="${icon}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>
    </mask>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${colors.accent}" opacity="0.5" mask="url(#${uid}-const)">
      <animate attributeName="opacity" values="0.35;0.6;0.35" dur="6s" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" repeatCount="indefinite"/>
    </rect>`;
}

/** Character sticker in the top-right, gently bobbing. */
function renderCharacter(zodiac, colors, uid) {
  const art = drawCharacter(zodiac.id);
  if (!art) return "";
  const cx = 470;
  const cy = 112;
  const scale = 1.2;
  const half = 60 * scale;
  return `
    <circle cx="${cx}" cy="${cy}" r="82" fill="#ffffff" opacity="0.55"/>
    <circle cx="${cx}" cy="${cy}" r="82" fill="none" stroke="${colors.accent}" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round" opacity="0.5"/>
    ${renderConstellation(zodiac, colors, uid)}
    <ellipse cx="${cx}" cy="${cy + 70}" rx="34" ry="5" fill="${colors.text}" opacity="0.08"/>
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="2.8s" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" repeatCount="indefinite"/>
      <g transform="translate(${cx - half} ${cy - half}) scale(${scale})">
        ${art}
      </g>
    </g>`;
}

function speechBubble(x, y, w, h) {
  return `
    <path d="M${x + 108},${y + 1} L${x + 118},${y - 9} L${x + 128},${y + 1} Z" fill="#ffffff" opacity="0.8"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#ffffff" opacity="0.8"/>`;
}

/** Speech bubble with the sign blurb, under the character. */
function renderDescription(zodiac, colors) {
  const lines = wrapText(zodiac.description, 33, 3);
  if (!lines.length) return "";
  const x = 352;
  const y = 214;
  const w = 236;
  const h = 26 + lines.length * 16;
  const text = lines
    .map(
      (line, i) =>
        `<text class="body" x="${x + 14}" y="${y + 22 + i * 16}" fill="${colors.text}" font-size="12" font-weight="700" opacity="0.85">${escapeXml(line)}</text>`,
    )
    .join("\n    ");
  return `${speechBubble(x, y, w, h)}
    ${text}`;
}

/** Speech bubble with today's dev horoscope: lucky language + one piece of advice. */
function renderForecast(forecast, colors) {
  const x = 352;
  const y = 210;
  const w = 236;
  const advice = wrapText(forecast.advice, 34, 2);
  const h = 54 + advice.length * 15;
  const adviceText = advice
    .map(
      (line, i) =>
        `<text class="body" x="${x + 14}" y="${y + 58 + i * 15}" fill="${colors.text}" font-size="12" font-weight="700" opacity="0.85">${escapeXml(line)}</text>`,
    )
    .join("\n    ");
  return `${speechBubble(x, y, w, h)}
    <path d="${sparklePath(x + 18, y + 16, 5)}" fill="${colors.accent}"/>
    <text class="title" x="${x + 28}" y="${y + 20}" fill="${colors.accent}" font-size="11" font-weight="700" letter-spacing="1.2">TODAY · ${escapeXml(forecast.dateLabel.toUpperCase())}</text>
    <text class="body" x="${x + 14}" y="${y + 40}" fill="${colors.muted}" font-size="12" font-weight="700">Lucky language <tspan fill="${colors.accent}" font-weight="800">${escapeXml(forecast.luckyLanguage)}</tspan></text>
    ${adviceText}`;
}

/** Two-tongued flame with a light core, centered at (x, y). */
function flameIcon(x, y, s, color) {
  const p = (dx, dy) => `${(x + dx * s).toFixed(1)},${(y + dy * s).toFixed(1)}`;
  const outer = `M${p(0.5, -8)} C${p(2, -4)} ${p(6, -2)} ${p(6, 2.5)} C${p(6, 6)} ${p(3.3, 8)} ${p(0, 8)} C${p(-3.3, 8)} ${p(-6, 6)} ${p(-6, 2.5)} C${p(-6, -0.5)} ${p(-4.5, -2.5)} ${p(-3.5, -4)} C${p(-3, -2)} ${p(-2.2, -1)} ${p(-1, -0.5)} C${p(-1.5, -3.5)} ${p(-0.8, -6)} ${p(0.5, -8)} Z`;
  const core = `M${p(0, 1)} C${p(1, 3)} ${p(2.5, 4)} ${p(2.5, 5.5)} C${p(2.5, 7)} ${p(1.3, 7.5)} ${p(0, 7.5)} C${p(-1.3, 7.5)} ${p(-2.5, 7)} ${p(-2.5, 5.5)} C${p(-2.5, 4)} ${p(-1, 3)} ${p(0, 1)} Z`;
  return `<path d="${outer}" fill="${color}"/>
    <path d="${core}" fill="#ffffff" opacity="0.75"/>`;
}

/** Footer: real activity (streak + yearly contributions), or the tagline when unavailable. */
function renderFooter(activity, colors) {
  if (!activity) {
    return `<text class="body" x="30" y="300" fill="${colors.accent}" font-size="11" font-weight="800">
      ✦ Your coding personality written in the stars
    </text>`;
  }
  const parts = [];
  if (activity.streak > 0) {
    parts.push(
      `<tspan fill="${colors.accent}" font-weight="800">${escapeXml(formatStatValue(activity.streak))}-day</tspan> streak`,
    );
  }
  parts.push(
    `<tspan fill="${colors.accent}" font-weight="800">${escapeXml(formatStatValue(activity.contributions))}</tspan> contributions this year`,
  );
  return `${flameIcon(38, 295, 0.85, colors.accent)}
    <text class="body" x="50" y="300" fill="${colors.muted}" font-size="12" font-weight="700">${parts.join("  ·  ")}</text>`;
}

/** Sign badge pill + element/planet tag. */
function renderSignBadge(zodiac, colors) {
  const label = zodiac.sign.toUpperCase();
  const x = 30;
  const y = 24;
  const h = 26;
  const w = Math.round(textWidth(label, 13, 0.72) + 40);
  const tag = [zodiac.element, zodiac.planet].filter(Boolean).join(" · ");
  const tagX = x + w + 8;
  const tagW = Math.round(textWidth(tag, 11, 0.58) + 20);
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" fill="${colors.accent}"/>
    <path d="${sparklePath(x + 15, y + h / 2, 6)}" fill="#ffffff"/>
    <text class="title" x="${x + 27}" y="${y + 18}" fill="#ffffff" font-size="13" font-weight="700" letter-spacing="1.5">${escapeXml(label)}</text>
    ${
      tag
        ? `<rect x="${tagX}" y="${y + 2}" width="${tagW}" height="${h - 4}" rx="11" fill="#ffffff" opacity="0.7"/>
    <text class="body" x="${tagX + tagW / 2}" y="${y + 17}" text-anchor="middle" fill="${colors.muted}" font-size="11" font-weight="700">${escapeXml(tag)}</text>`
        : ""
    }`;
}

function renderLanguages(languages, colors) {
  const top = (languages || []).slice(0, 3).map((l) => l.name);
  const parts = [];
  let x = 30;
  for (const name of top) {
    const w = Math.round(textWidth(name, 11, 0.6) + 18);
    if (x + w > 330) break;
    parts.push(`<rect x="${x}" y="148" width="${w}" height="20" rx="10" fill="#ffffff" opacity="0.75"/>
    <text class="body" x="${x + w / 2}" y="162" text-anchor="middle" fill="${colors.accent}" font-size="11" font-weight="800">${escapeXml(name)}</text>`);
    x += w + 6;
  }
  return parts.join("\n    ");
}

function renderStatBars(displayStats, colors) {
  const peak = Math.max(0, ...displayStats.map((s) => Number(s.value) || 0));
  return displayStats
    .map((stat, i) => {
      const y = 202 + i * 26;
      const w = barWidth(stat.value, peak);
      return `
      <text class="body" x="32" y="${y}" fill="${colors.muted}" font-size="12" font-weight="700">${escapeXml(stat.label)}</text>
      <rect x="118" y="${y - 11}" width="160" height="12" rx="6" fill="#ffffff" opacity="0.75"/>
      <rect x="118" y="${y - 11}" width="${w}" height="12" rx="6" fill="${colors.bar}">
        <animate attributeName="width" from="0" to="${w}" dur="0.9s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1"/>
      </rect>
      <rect x="122" y="${y - 9}" width="${Math.max(0, w - 8)}" height="3" rx="1.5" fill="#ffffff" opacity="0.45">
        <animate attributeName="width" values="0;${Math.max(0, w - 8)}" dur="0.9s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1"/>
      </rect>
      <text class="body" x="288" y="${y}" fill="${colors.text}" font-size="12" font-weight="800">${escapeXml(formatStatValue(stat.value))}</text>`;
    })
    .join("");
}

function secondaryDisplayName(profile) {
  const login = String(profile.username || "").trim();
  const name = String(profile.name || "").trim();
  if (!name || !login) return name && name !== login ? name : "";
  if (name.toLowerCase() === login.toLowerCase()) return "";
  return name;
}

/**
 * @param {{ profile: object, zodiac: object, stats: object, forecast?: object, activity?: object, meta?: { source?: string, width?: number } }} input
 */
export function renderZodiacCard({ profile, zodiac, stats, forecast, activity, meta = {} }) {
  const colors = zodiac.colors;
  const displayStats = pickDisplayStats(stats, zodiac, 3);
  const login = profile.username || profile.name || "developer";
  const realName = secondaryDisplayName(profile);
  const role = profile.role || "Software Developer";
  const uid = `zg-${profile.username}-${zodiac.id}`.replace(/[^a-z0-9-]/gi, "");
  const sourceLabel =
    meta.source === "birthdate" ? "mapped by birthdate" : "mapped by star-seed";
  const nameLabel = realName ? `${login} (${realName})` : login;
  const nameLine = realName
    ? `${escapeXml(login)}<tspan fill="${colors.muted}" font-size="13" font-weight="700">  ${escapeXml(realName)}</tspan>`
    : escapeXml(login);

  const displayWidth = clamp(
    Number(meta.width) || DEFAULT_DISPLAY_WIDTH,
    240,
    900,
  );
  const displayHeight = Math.round((displayWidth / WIDTH) * HEIGHT);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${displayWidth}" height="${displayHeight}" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(nameLabel)} Developer Zodiac Card">
  <title>${escapeXml(nameLabel)} — ${escapeXml(zodiac.sign)} ${escapeXml(zodiac.title)}</title>
  <defs>
    <linearGradient id="${uid}-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors.bg0}"/>
      <stop offset="100%" stop-color="${colors.bg1}"/>
    </linearGradient>
    <radialGradient id="${uid}-glow" cx="78%" cy="35%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="${uid}-clip">
      <rect width="${WIDTH}" height="${HEIGHT}" rx="24"/>
    </clipPath>
    <style>
${EMBEDDED_FONT_CSS}
      .title { font-family: Fredoka, 'Trebuchet MS', sans-serif; }
      .body { font-family: Nunito, 'Trebuchet MS', sans-serif; }
    </style>
  </defs>

  <g clip-path="url(#${uid}-clip)">
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#${uid}-bg)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#${uid}-glow)"/>
    ${renderConfetti(`${profile.username}-${zodiac.id}`, colors)}

    ${renderCharacter(zodiac, colors, uid)}

    ${renderSignBadge(zodiac, colors)}
    <text class="title" x="30" y="82" fill="${colors.text}" font-size="22" font-weight="600">
      ${escapeXml(zodiac.title)}
    </text>

    <text class="body" x="30" y="114" fill="${colors.text}" font-size="20" font-weight="800">
      ${nameLine}
    </text>
    <text class="body" x="30" y="134" fill="${colors.muted}" font-size="13" font-weight="700">
      ${escapeXml(role)}
    </text>

    ${renderLanguages(profile.languages, colors)}
    ${renderStatBars(displayStats, colors)}
    ${forecast ? renderForecast(forecast, colors) : renderDescription(zodiac, colors)}

    ${renderFooter(activity, colors)}
    ${
      forecast
        ? ""
        : `<text class="body" x="572" y="300" text-anchor="end" fill="${colors.muted}" font-size="10" font-weight="700" opacity="0.8">
      ${escapeXml(sourceLabel)}
    </text>`
    }
  </g>
  <rect x="3" y="3" width="${WIDTH - 6}" height="${HEIGHT - 6}" rx="21" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.8"/>
  <rect x="1" y="1" width="${WIDTH - 2}" height="${HEIGHT - 2}" rx="23" fill="none" stroke="${INK}" stroke-width="2" opacity="0.12"/>
</svg>`;
}

export const CARD_SIZE = {
  width: WIDTH,
  height: HEIGHT,
  defaultDisplayWidth: DEFAULT_DISPLAY_WIDTH,
};
