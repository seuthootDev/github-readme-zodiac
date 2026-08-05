# Contributing to github-readme-zodiac

Thanks for stopping by. This project is intentionally playful — **new ideas are welcome anytime.**

You do **not** need to ship a huge feature. Small, creative PRs are often the best fit.

## Help wanted: pinned Gist polish (highest priority)

The **SVG README card** is in good shape. The **pinned Gist** path works end-to-end, but the **ASCII presentation is not yet at the quality we want to call “done.”** That is intentional transparency for future contributors — not a blocker for using Pins.

Known gap:

- **Constellation ASCII ≠ real sky maps.** The pin-side glyphs in [`src/gist/constellations.js`](src/gist/constellations.js) are simplified monospace sketches. Several signs read as abstract star doodles more than recognizable constellations (Orion-style shapes, relative star placement, etc.). We want grids that stay aligned in GitHub’s ~5-line pin preview **and** feel closer to the real figures.

What helps most:

1. Redesign one or more sign grids (keep `*` stars + `/ \ - |` connectors; see file header notes on ✦ width)
2. Preview with `node scripts/preview-all-gists.js` (and the PDF/HTML under `docs/`)
3. Open a PR labeled `pin` — even a single improved sign is welcome

SVG constellation art under `assets/constellations` is a separate track; pin ASCII is the pain point today.

## Ideas we especially love

Beyond the default 12-sign look, feel free to propose:

- **Alternate card designs** — new SVG layouts, palettes, or constellation styles (without breaking the pin/SVG readability rules)
- **Copy & flavor text** — zodiac titles, descriptions, taglines, or tone variants
- **Role / identity mapping** — better auto-role guesses, sign-flavored role suggestions, locale-friendly labels
- **Pin (Gist) presentation** — constellation fidelity (above), clearer 5-line layouts, safer monospace art
- **Docs & DX** — clearer fork setup, examples, previews, translations of docs
- **Themes & options** — query params, named themes, light/dark variants (keep defaults stable)

If you are unsure whether an idea fits, **open an issue first** — we would rather chat than see you rebuild something in the wrong direction.

## Ground rules

1. Keep the playful tone: *“Your coding personality written in the stars.”*
2. Prefer backward-compatible URL/API changes. If you must break something, call it out in the PR.
3. Pin cards must stay readable in GitHub’s ~5-line Gist preview; avoid alignment that breaks when numbers grow.
4. Do not commit secrets (tokens, `.env`). Use `.env.example` only.
5. Match existing code style; keep diffs focused.

## How to contribute

1. Fork the repo and create a branch: `feat/…`, `fix/…`, or `docs/…`
2. Make your change locally
   - SVG preview: `npm start` → http://localhost:3000
   - Gist pin gallery: `node scripts/preview-all-gists.js`
3. Open a Pull Request against `main`
4. In the PR, briefly explain **what** changed and **why** (screenshots / pin preview text help a lot)

## Issue labels (handy ones)

| Label | Use for |
|-------|---------|
| `idea` | New concepts, design riffs, copy proposals |
| `design` | Visual / SVG / constellation work |
| `good first issue` | Small, well-scoped starter tasks |
| `docs` | README, guides, examples |
| `pin` | Gist / profile pin specific work |
| `svg` | README SVG card specific work |

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
