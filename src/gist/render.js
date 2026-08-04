import { pickDisplayStats } from "../lib/stats.js";

function bar(value, width = 20) {
  const filled = Math.max(0, Math.min(width, Math.round((value / 100) * width)));
  return `${"█".repeat(filled)}${"░".repeat(width - filled)}`;
}

function padLabel(label, len = 12) {
  return label.length >= len ? label.slice(0, len) : label.padEnd(len, " ");
}

/**
 * Text card for a pinned Gist (productive-box style).
 */
export function renderGistCard({ profile, zodiac, stats }) {
  const displayStats = pickDisplayStats(stats, zodiac, 3);
  const displayName = profile.name || profile.username;
  const role = profile.role || "Software Developer";
  const langs = (profile.languages || [])
    .slice(0, 3)
    .map((l) => l.name)
    .join(" · ");

  const lines = [
    `${zodiac.symbol} ${zodiac.sign.toUpperCase()}`,
    zodiac.title,
    "────────────────────────────",
    displayName,
    role,
  ];

  if (langs) lines.push(langs);

  lines.push("");
  for (const stat of displayStats) {
    lines.push(
      `${padLabel(stat.label)} ${bar(stat.value)}  ${String(stat.value).padStart(3)}`,
    );
  }

  lines.push("");
  lines.push("✦ Your coding personality written in the stars");

  return lines.join("\n");
}

/** Preferred gist filename — shows as the pin title. */
export function gistFilename(zodiac) {
  return `${zodiac.symbol} ${zodiac.sign}.md`;
}
