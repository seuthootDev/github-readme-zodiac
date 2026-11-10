import periods from "../data/mercury-retrograde.js";

/** The Mercury retrograde period containing `date` (UTC day), or null. */
export function mercuryRetrograde(date = new Date()) {
  const day = date.toISOString().slice(0, 10);
  const hit = periods.find(([start, end]) => day >= start && day <= end);
  return hit ? { start: hit[0], end: hit[1] } : null;
}
