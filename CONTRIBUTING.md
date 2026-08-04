# Contributing to github-readme-zodiac

Thanks for stopping by. This project is intentionally playful — **new ideas are welcome anytime.**

You do **not** need to ship a huge feature. Small, creative PRs are often the best fit.

## Ideas we especially love

Beyond the default 12-sign look, feel free to propose:

- **Alternate card designs** — new SVG layouts, palettes, or constellation styles (without breaking the pin/SVG readability rules)
- **Copy & flavor text** — zodiac titles, descriptions, taglines, or tone variants
- **Role / identity mapping** — better auto-role guesses, sign-flavored role suggestions, locale-friendly labels
- **Pin (Gist) presentation** — clearer 5-line pin layouts, safer monospace art, accessibility tweaks
- **Docs & DX** — clearer fork setup, examples, previews, translations of docs
- **Themes & options** — query params, named themes, light/dark variants (keep defaults stable)

If you are unsure whether an idea fits, **open an issue first** — we would rather chat than see you rebuild something in the wrong direction.

## Ground rules

1. Keep the spirit: *“Your coding personality written in the stars.”* Fun stats, not real astrology claims.
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
