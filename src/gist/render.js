import { pickDisplayStats } from "../lib/stats.js";
import { getAsciiConstellation } from "./constellations.js";

const LEFT_WIDTH = 34;
const BAR_WIDTH = 12;

/** ASCII bar — avoid █/░ width quirks in gist monospace. */
function bar(value, width = BAR_WIDTH) {
  const filled = Math.max(0, Math.min(width, Math.round((value / 100) * width)));
  return `${"#".repeat(filled)}${"-".repeat(width - filled)}`;
}

function clipPad(str, width) {
  const s = String(str ?? "");
  if (s.length === width) return s;
  if (s.length > width) return s.slice(0, width);
  return s + " ".repeat(width - s.length);
}

function num(n, width = 4) {
  return String(n ?? 0).padStart(width, " ");
}

function mergePinRows(leftLines, rightLines) {
  const rows = Math.max(leftLines.length, rightLines.length, 5);
  const out = [];
  for (let i = 0; i < rows; i++) {
    const left = clipPad(leftLines[i] || "", LEFT_WIDTH);
    const right = rightLines[i] || "";
    out.push(right ? `${left}  ${right}` : left.trimEnd());
  }
  return out;
}

/**
 * Pin-first card:
 * - GitHub pin ~5 lines → those rows are fixed-width ASCII + constellation
 * - Numbers are padded so *4 vs *400 never shifts the star map
 * - Gist filename still carries the unicode sign for pin title identity
 */
export function renderGistCard({ profile, zodiac, stats }) {
  const displayStats = pickDisplayStats(stats, zodiac, 3);
  const displayName = profile.name || profile.username;
  const role = profile.role || "Software Developer";
  const langs = (profile.languages || [])
    .slice(0, 3)
    .map((l) => l.name)
    .join("/");

  const constellation = getAsciiConstellation(zodiac.id);

  // Exactly 5 pin rows — identity + map always visible together
  const pinLeft = [
    // ASCII sign name (unicode symbol lives in gist filename / pin title)
    clipPad(`${zodiac.sign.toUpperCase()} · ${zodiac.title}`, LEFT_WIDTH),
    clipPad(`${displayName} · ${role}`, LEFT_WIDTH),
    clipPad(
      `*${num(profile.stars)} #${num(profile.publicRepos)} ~${num(profile.followers)} ${langs}`,
      LEFT_WIDTH,
    ),
    clipPad(
      `${displayStats[0].label.slice(0, 11).padEnd(11)} ${bar(displayStats[0].value)} ${num(displayStats[0].value, 3)}%`,
      LEFT_WIDTH,
    ),
    clipPad(
      `${displayStats[1].label.slice(0, 11).padEnd(11)} ${bar(displayStats[1].value)} ${num(displayStats[1].value, 3)}%`,
      LEFT_WIDTH,
    ),
  ];

  const lines = [...mergePinRows(pinLeft, constellation)];

  // Full gist body (below the fold of the pin)
  lines.push("------------------------------------");
  lines.push(`${zodiac.symbol} ${zodiac.element} · ${zodiac.planet}`);
  if (displayStats[2]) {
    lines.push(
      `${displayStats[2].label.slice(0, 11).padEnd(11)} ${bar(displayStats[2].value)} ${num(displayStats[2].value, 3)}%`,
    );
  }
  if (zodiac.description) {
    lines.push("");
    lines.push(zodiac.description);
  }
  lines.push("");
  lines.push("Your coding personality written in the stars");

  return lines.join("\n");
}

/** Pin title identity — unicode sign shows here even if body is ASCII. */
export function gistFilename(zodiac) {
  return `${zodiac.symbol} ${zodiac.sign}.md`;
}
