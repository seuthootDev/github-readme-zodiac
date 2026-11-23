# github-readme-zodiac

[![CI](https://github.com/seuthootDev/github-readme-zodiac/actions/workflows/ci.yml/badge.svg)](https://github.com/seuthootDev/github-readme-zodiac/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![GitHub stars](https://img.shields.io/github/stars/seuthootDev/github-readme-zodiac.svg?style=flat)](https://github.com/seuthootDev/github-readme-zodiac/stargazers) [![Contributing](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Your GitHub activity, written in the stars.** A zodiac-themed profile card for your README — add it with a single URL.

![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev)

## Quick start

Paste this into your profile README and replace `YOUR_USERNAME`:

```md
[![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=YOUR_USERNAME&birthdate=YYYY-MM-DD)](https://github.com/seuthootDev/github-readme-zodiac)
```

That's it — no fork, no token, no setup. Your sign comes from `birthdate` (or force one with `sign=`), and the stats come from your public GitHub activity.

**Live demo:** [github-readme-zodiac.vercel.app](https://github-readme-zodiac.vercel.app)

## All 12 signs

<p align="center">
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=aries" width="360" alt="Aries" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=taurus" width="360" alt="Taurus" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=gemini" width="360" alt="Gemini" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=cancer" width="360" alt="Cancer" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=leo" width="360" alt="Leo" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=virgo" width="360" alt="Virgo" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=libra" width="360" alt="Libra" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=scorpio" width="360" alt="Scorpio" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=sagittarius" width="360" alt="Sagittarius" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=capricorn" width="360" alt="Capricorn" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=aquarius" width="360" alt="Aquarius" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=pisces" width="360" alt="Pisces" />
</p>

### Options

| Param | Description |
|-------|-------------|
| `username` | GitHub username (**required**) |
| `birthdate` | `YYYY-MM-DD` |
| `sign` | Force sign: `aries` … `pisces` |
| `name` | Override display name |
| `role` | Override role |
| `width` | Display width in px (`240`–`900`, default **`360`**) |

```md
[![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev)](https://github.com/seuthootDev/github-readme-zodiac)

[![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&width=480)](https://github.com/seuthootDev/github-readme-zodiac)
```

### ☿ Mercury retrograde

While Mercury is retrograde (about three times a year, ~3 weeks each), a tiny ☿ planet orbits your character **backwards**, with a reverse arrow and **Rx**: deploy with care. Nothing to configure. (It spins when you open the SVG directly; README embeds show a still frame.) Dates come from an ephemeris table in [`src/data/mercury-retrograde.js`](src/data/mercury-retrograde.js) (2026–2035, regenerate with `node scripts/gen-retrograde.js`).

Sister project (Asian zodiac): [github-readme-chinese-zodiac](https://github.com/seuthootDev/github-readme-chinese-zodiac)

---

## Bonus: pin it as a Gist

Prefer your profile **Pins** over the README? This repo is also a [GitHub Action](https://github.com/marketplace/actions/zodiac-dev-card-gist) that keeps a text version of the card in a pinned Gist — no fork needed.

| Mode | Where it appears | Setup |
|------|------------------|--------|
| **SVG card** | Profile **README** | One URL (above) |
| **Pinned Gist** | Profile **Pins** | Token + one workflow file (below) |

### What a Pin looks like

GitHub only shows about **5 lines** of a pinned Gist. Below is the full 12-sign gallery (pin + full gist) from the local preview:

**[Gist pin preview — 12 signs (PDF)](docs/gist-pin-preview-12-signs.pdf)**

Also available as HTML (download / open locally): [docs/gist-pin-preview.html](docs/gist-pin-preview.html)

Example pin body (Taurus):

```text
♉ TAURUS · Builder                        ✦
✨ seuthootDev · JUNG SEUNGHOON              \
⭐   4  📦  36  👥   0                  ✦-----✦
Consistency ███████████░  95%             \
Builder     █████████░░░  75%              ✦--✦
```

Open the Gist itself to see the **full** card (description + tagline under the pin fold).

> **Pin quality (help wanted).** Pins work, but the constellation ASCII is still a rough sketch vs real sky maps. SVG cards are the polished path today — see [CONTRIBUTING.md](CONTRIBUTING.md#help-wanted-pinned-gist-polish-highest-priority) if you want to improve `src/gist/constellations.js`.

#### How to put this on your profile Pins

1. Create a **public** [Gist](https://gist.github.com/) (any filename, placeholder text) and copy its ID  
   (`https://gist.github.com/YOU/`**`GIST_ID`** — not the `.js` embed URL)
2. Create a [classic token](https://github.com/settings/tokens) with only the **`gist`** scope (shown once — save it; the same token works for the [Asian sister action](https://github.com/seuthootDev/github-readme-chinese-zodiac))
3. In any repo you own (your `USERNAME/USERNAME` profile repo is a good home), add Secrets `GH_TOKEN` (the token) and `GIST_ID`  
   **Settings → Secrets and variables → Actions → New repository secret**
4. Add `.github/workflows/zodiac-gist.yml`:

```yaml
name: Update Zodiac Gist

on:
  workflow_dispatch:
  schedule:
    - cron: "0 0 * * *" # daily, 00:00 UTC

jobs:
  update-gist:
    runs-on: ubuntu-latest
    steps:
      - uses: seuthootDev/github-readme-zodiac@v1
        with:
          gh_token: ${{ secrets.GH_TOKEN }}
          gist_id: ${{ secrets.GIST_ID }}
          birthdate: "1995-04-24" # optional — picks your sign
```

5. **Actions** → **Update Zodiac Gist** → **Run workflow**
6. [Pin the Gist](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/pinning-items-to-your-profile) on your profile

#### Inputs

| Input | Required | Notes |
|-------|----------|-------|
| `gh_token` | yes | PAT with `gist` scope — pass it from a secret |
| `gist_id` | yes | Gist ID only |
| `birthdate` | no | `YYYY-MM-DD` → sign |
| `sign` | no | force a sign, e.g. `leo` |
| `username` | no | GitHub login (default: token owner) |
| `name` / `role` | no | display overrides |

The token is used only to read your public stats and write that one Gist.

#### Pin vs SVG

| Feature | Action? | Uses [github-readme-zodiac.vercel.app](https://github-readme-zodiac.vercel.app)? |
|---------|---------|----------------------------------------------------------------------------------|
| **Pinned Gist** | Yes | No |
| **SVG in README** | No | Yes (shared public instance), unless you deploy your own |

---

## Stats

Each card shows **3 of 5** traits. Which three appear depends on the sign’s `statKeys`. Values are weighted from public GitHub signals with **no maximum**. Bars are relative to the highest of the three shown.

| Stat | Drawn from (roughly) |
|------|----------------------|
| **Consistency** | Account age + repos per year |
| **Explorer** | Distinct languages + public repos |
| **Builder** | Public repos + stars + forks |
| **Open Source** | Stars + forks + followers |
| **Debugger** | Open issues + repos (+ a little stars) |

Sister project ([Asian zodiac](https://github.com/seuthootDev/github-readme-chinese-zodiac)) uses the same signals with different labels: Discipline / Ingenuity / Craft / Renown / Insight.

---

## Daily forecast & streak

The speech bubble is a **daily dev horoscope** — a lucky language (picked from your own top languages) and one piece of advice. It changes every day (UTC) and stays the same all day.

The footer shows your **current streak** and **contributions this year**. This needs `GITHUB_TOKEN` on the server (GraphQL); without it the card shows the tagline instead.

## How it works

**Pinned Gist (Action)**

```
Your workflow → this Action
  → GitHub API (your profile)
  → Zodiac + stats
  → PATCH your Gist
  → Pin on your profile
```

**SVG (shared or self-hosted)**

```
README image URL → Vercel /api/card → GitHub API → Zodiac + stats → SVG
```

## Local development

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

```bash
node scripts/preview-all-gists.js
# → scripts/out/all-signs-gist-preview.html
```

## Project layout

```
action.yml
.github/workflows/update-gist.yml
assets/signs/                 # title glyphs
assets/signs-line/            # line-art accent
assets/constellations/        # card constellation art
docs/gist-pin-preview-12-signs.pdf
docs/gist-pin-preview.html
docs/license-*.pdf            # Magnific certificates
scripts/update-gist.js
scripts/preview-all-gists.js
scripts/extract-zodiac-signs.py
src/gist/
api/card.js
public/index.html
```

## Contributing

New designs, card copy, sign-flavored roles, pin layouts — **ideas are welcome anytime.**  
Highest-priority gap today: **pinned Gist constellation ASCII** (see [help wanted](CONTRIBUTING.md#help-wanted-pinned-gist-polish-highest-priority)).  
See [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits / attribution

Card sign artwork is derived from Magnific (Freepik) assets under a **free license with attribution**:

| Used for | Asset | Designed by | Certificate |
|----------|--------|-------------|-------------|
| Title glyphs (`assets/signs`) | [zodiac white signs set…](https://www.magnific.com/free-vector/zodiac-white-signs-set-isolated-dark-background-zodiac-line-stylized-symbols-astrological-calendar-collection-horoscope-constellation-vector-illustration_67006418.htm) | [hannazasimova — Magnific.com](https://www.magnific.com) | [docs/license-zodiac-white-signs-set-67006418.pdf](docs/license-zodiac-white-signs-set-67006418.pdf) |
| Line-art accent (`assets/signs-line`) | [flat zodiac sign collection](https://www.magnific.com/free-vector/flat-zodiac-sign-collection_15112717.htm) | [Freepik — Magnific.com](https://www.magnific.com) | [docs/license-flat-zodiac-sign-collection-15112717.pdf](docs/license-flat-zodiac-sign-collection-15112717.pdf) |
| Card constellations (`assets/constellations`) | [various zodiac signs flat icon set](https://www.magnific.com/free-vector/various-zodiac-signs-flat-icon-set_9652101.htm) | [Freepik — Magnific.com](https://www.magnific.com) | [docs/license-various-zodiac-signs-flat-icon-set-9652101.pdf](docs/license-various-zodiac-signs-flat-icon-set-9652101.pdf) |

## License

[MIT](LICENSE) © seuthootDev

Third-party artwork remains under its Magnific license (see certificates above); the MIT license covers this repository’s code.

## Roadmap

- [x] Username → zodiac SVG
- [x] Birthdate mapping + GitHub REST stats
- [x] Editable name / role (auto by default)
- [x] Pinned Gist Action (productive-box style)
- [x] Marketplace Action for pins (no fork)
- [ ] Pin constellation ASCII closer to real figures ([help wanted](CONTRIBUTING.md#help-wanted-pinned-gist-polish-highest-priority))
- [x] Daily dev forecast + GraphQL contributions / streak
- [ ] Optional self-host docs for high SVG traffic

---

## More from the same author

Want a terminal-style contribution graph too? Sister project:

### [github-readme-insight-terminal-ascii](https://github.com/seuthootDev/github-readme-insight-terminal-ascii)

GitHub stats as macOS / Windows / Ubuntu terminal SVGs — contribution graph, stats, top languages, neofetch.

![mac](https://github-readme-insight-terminal-asci.vercel.app/svg?user=torvalds&theme=mac&scale=0.8)

```md
![GitHub contribution graph](https://github-readme-insight-terminal-asci.vercel.app/svg?user=YOUR_USERNAME&theme=mac)
```

### [claude-gh-guard](https://github.com/seuthootDev/claude-gh-guard)

Not a card, but a tool for anyone juggling personal and work GitHub accounts in [Claude Code](https://claude.com/claude-code). It shows the GitHub and Claude account in use on the status line, and blocks `git commit`, `git push` and `gh pr create` when the account is definitely the wrong one for the repo.

![Matching account](https://raw.githubusercontent.com/seuthootDev/claude-gh-guard/main/assets/match.png)

![Wrong account, gh pr create blocked](https://raw.githubusercontent.com/seuthootDev/claude-gh-guard/main/assets/mismatch.png)

![No remote, nothing to check](https://raw.githubusercontent.com/seuthootDev/claude-gh-guard/main/assets/no-remote.png)

```sh
npx claude-gh-guard init
```
