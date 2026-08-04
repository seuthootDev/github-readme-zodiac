import { pickDisplayStats, STAT_LABELS } from "../lib/stats.js";

function bar(value, width = 21) {
  const filled = Math.max(0, Math.min(width, Math.round((value / 100) * width)));
  return `${"█".repeat(filled)}${"░".repeat(width - filled)}`;
}

function padLabel(label, len = 12) {
  return label.length >= len ? label.slice(0, len) : label.padEnd(len, " ");
}

function wrapLine(text, width = 42) {
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

/**
 * Text card for a pinned Gist (productive-box style).
 */
export function renderGistCard({ profile, zodiac, stats }) {
  const displayStats = pickDisplayStats(stats, zodiac, 3);
  const displayName = profile.name || profile.username;
  const role = profile.role || "Software Developer";
  const langs = (profile.languages || [])
    .slice(0, 4)
    .map((l) => l.name)
    .join(" · ");

  const lines = [
    `${zodiac.symbol} ${zodiac.sign.toUpperCase()}  ·  ${zodiac.title}`,
    `${zodiac.element} · ${zodiac.planet}`,
    "────────────────────────────────",
    `${displayName}`,
    role,
    `⭐ ${profile.stars ?? 0}   📦 ${profile.publicRepos ?? 0} repos   👥 ${profile.followers ?? 0}`,
  ];

  if (langs) {
    lines.push("");
    lines.push(langs);
  }

  lines.push("");
  for (const stat of displayStats) {
    lines.push(
      `${padLabel(stat.label)} ${bar(stat.value)} ${String(stat.value).padStart(3)}%`,
    );
  }

  // Extra traits so the pin feels fuller (not only the sign's top 3)
  const extraKeys = Object.keys(STAT_LABELS).filter(
    (k) => !displayStats.some((s) => s.key === k),
  );
  for (const key of extraKeys.slice(0, 2)) {
    lines.push(
      `${padLabel(STAT_LABELS[key])} ${bar(stats[key] ?? 0)} ${String(stats[key] ?? 0).padStart(3)}%`,
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
