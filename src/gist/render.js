import { pickDisplayStats, STAT_LABELS } from "../lib/stats.js";
import { getAsciiConstellation } from "./constellations.js";

function bar(value, width = 18) {
  const filled = Math.max(0, Math.min(width, Math.round((value / 100) * width)));
  return `${"█".repeat(filled)}${"░".repeat(width - filled)}`;
}

function padLabel(label, len = 11) {
  return label.length >= len ? label.slice(0, len) : label.padEnd(len, " ");
}

function wrapLine(text, width = 36) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > width && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Approximate visible width (treat most unicode as width 1 for gist monospace). */
function padEndVisible(str, len) {
  const s = str ?? "";
  if (s.length >= len) return s;
  return s + " ".repeat(len - s.length);
}

function mergeColumns(leftLines, rightLines, leftWidth = 38, gap = 2) {
  const rows = Math.max(leftLines.length, rightLines.length);
  const out = [];
  for (let i = 0; i < rows; i++) {
    const left = padEndVisible(leftLines[i] || "", leftWidth);
    const right = rightLines[i] || "";
    out.push(right ? `${left}${" ".repeat(gap)}${right}` : left.trimEnd());
  }
  return out;
}

/**
 * Text card for a pinned Gist (productive-box style).
 * First ~5 lines are denser — GitHub pin previews only show a few lines.
 */
export function renderGistCard({ profile, zodiac, stats }) {
  const displayStats = pickDisplayStats(stats, zodiac, 3);
  const displayName = profile.name || profile.username;
  const role = profile.role || "Software Developer";
  const langs = (profile.languages || [])
    .slice(0, 3)
    .map((l) => l.name)
    .join("·");

  const constellation = getAsciiConstellation(zodiac.id);

  // Pin-visible block (left) + constellation (right)
  const pinLeft = [
    `${zodiac.symbol} ${zodiac.sign.toUpperCase()} · ${zodiac.title}`,
    `${displayName} · ${role}`,
    `⭐${profile.stars ?? 0}  📦${profile.publicRepos ?? 0}  👥${profile.followers ?? 0}${langs ? `  ${langs}` : ""}`,
    `${padLabel(displayStats[0].label)} ${bar(displayStats[0].value)} ${displayStats[0].value}%`,
    `${padLabel(displayStats[1].label)} ${bar(displayStats[1].value)} ${displayStats[1].value}%`,
  ];

  const lines = [...mergeColumns(pinLeft, constellation, 40, 3)];

  // Rest of the card (full gist view)
  lines.push("────────────────────────────────────────");
  lines.push(`${zodiac.element} · ${zodiac.planet}`);

  if (displayStats[2]) {
    lines.push(
      `${padLabel(displayStats[2].label)} ${bar(displayStats[2].value)} ${displayStats[2].value}%`,
    );
  }

  const extraKeys = Object.keys(STAT_LABELS).filter(
    (k) => !displayStats.some((s) => s.key === k),
  );
  for (const key of extraKeys.slice(0, 2)) {
    lines.push(
      `${padLabel(STAT_LABELS[key])} ${bar(stats[key] ?? 0)} ${stats[key] ?? 0}%`,
    );
  }

  if (zodiac.description) {
    lines.push("");
    lines.push(...wrapLine(zodiac.description, 40));
  }

  return lines.join("\n");
}

/** Preferred gist filename — shows as the pin title. */
export function gistFilename(zodiac) {
  return `${zodiac.symbol} ${zodiac.sign}.md`;
}
