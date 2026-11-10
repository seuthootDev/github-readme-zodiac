import { describe, it } from "node:test";
import assert from "node:assert/strict";
import periods from "../data/mercury-retrograde.js";
import { mercuryRetrograde } from "./retrograde.js";

const at = (s) => new Date(`${s}T12:00:00Z`);

describe("mercuryRetrograde", () => {
  it("is active inside a period, including both station days", () => {
    assert.deepEqual(mercuryRetrograde(at("2026-11-10")), { start: "2026-10-24", end: "2026-11-13" });
    assert.ok(mercuryRetrograde(at("2026-10-24")));
    assert.ok(mercuryRetrograde(at("2026-11-13")));
  });

  it("is null outside every period", () => {
    assert.equal(mercuryRetrograde(at("2026-10-23")), null);
    assert.equal(mercuryRetrograde(at("2026-11-14")), null);
    assert.equal(mercuryRetrograde(at("2026-05-01")), null);
  });

  it("is null past the end of the table instead of guessing", () => {
    assert.equal(mercuryRetrograde(at("2040-01-01")), null);
  });
});

describe("mercury-retrograde table", () => {
  it("covers 2026–2035 with about three ~3-week periods a year, sorted and non-overlapping", () => {
    assert.ok(periods.length >= 30);
    assert.ok(periods[0][0].startsWith("2026"));
    assert.ok(periods.at(-1)[1] >= "2035-06-01");
    for (let i = 0; i < periods.length; i++) {
      const [s, e] = periods[i];
      const days = (Date.parse(e) - Date.parse(s)) / 86400000;
      assert.ok(days >= 18 && days <= 26, `${s}→${e} is ${days} days`);
      if (i) assert.ok(s > periods[i - 1][1], `${s} overlaps the previous period`);
    }
  });
});
