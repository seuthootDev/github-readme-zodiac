import { describe, it } from "node:test";
import assert from "node:assert/strict";
import signs from "../data/zodiac.js";
import { renderZodiacCard } from "./card.js";

describe("renderZodiacCard stats", () => {
  it("sizes bars relative to the highest of the three shown stats", () => {
    const svg = renderZodiacCard({
      profile: {
        username: "alice",
        name: "Alice",
        role: "Dev",
        languages: [{ name: "JS" }],
      },
      zodiac: signs[0],
      stats: {
        builder: 200,
        explorer: 100,
        debugger: 50,
        consistency: 1,
        openSource: 1,
      },
    });

    const anim = [
      ...svg.matchAll(/attributeName="width" from="0" to="(\d+)"/g),
    ].map((m) => Number(m[1]));

    assert.deepEqual(anim, [160, 80, 40]);
    assert.match(svg, />200</);
    assert.match(svg, />100</);
    assert.match(svg, />50</);
  });
});

describe("renderZodiacCard forecast and activity", () => {
  const input = {
    profile: { username: "alice", languages: [] },
    zodiac: signs[0],
    stats: { builder: 1, explorer: 1, debugger: 1 },
  };

  it("shows the daily forecast and activity footer when given", () => {
    const svg = renderZodiacCard({
      ...input,
      forecast: { luckyLanguage: "Go", advice: "Ship it, then polish it.", dateLabel: "Oct 27" },
      activity: { streak: 14, contributions: 412 },
    });
    assert.match(svg, /TODAY · OCT 27/);
    assert.match(svg, />Go</);
    assert.match(svg, />14-day<\/tspan> streak/);
    assert.match(svg, />412<\/tspan> contributions this year/);
    assert.doesNotMatch(svg, /written in the stars/);
  });

  it("falls back to the sign blurb and tagline", () => {
    const svg = renderZodiacCard(input);
    assert.match(svg, /written in the stars/);
    assert.doesNotMatch(svg, /TODAY ·/);
  });
});

describe("Mercury retrograde tape", () => {
  const input = {
    profile: { username: "alice", languages: [] },
    zodiac: signs[0],
    stats: { builder: 1, explorer: 1, debugger: 1, consistency: 1, openSource: 1 },
  };

  it("drapes a caution tape across the corner while Mercury is retrograde", () => {
    const svg = renderZodiacCard({ ...input, meta: { retrograde: { start: "2026-10-24", end: "2026-11-13" } } });
    assert.match(svg, /class="retrograde"/);
    assert.match(svg, /MERCURY Rx/);
    assert.match(svg, /DEPLOY WITH CARE/);
    const opens = (svg.match(/<g[\s>]/g) || []).length;
    const closes = (svg.match(/<\/g>/g) || []).length;
    assert.equal(opens, closes);
  });

  it("no tape otherwise", () => {
    const svg = renderZodiacCard({ ...input, meta: {} });
    assert.doesNotMatch(svg, /retrograde/);
  });
});
