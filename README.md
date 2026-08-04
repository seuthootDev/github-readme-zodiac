# github-readme-zodiac

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Contributing](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Zodiac-themed profile cards from your GitHub activity.

> Your coding personality written in the stars

Sister project (Asian zodiac): [github-readme-chinese-zodiac](https://github.com/seuthootDev/github-readme-chinese-zodiac)

Two ways to show it on your profile:

| Mode | Where it appears | Style |
|------|------------------|--------|
| **Pinned Gist** (like [productive-box](https://github.com/maxam2017/productive-box)) | Profile **Pins** | ASCII / text card |
| **SVG card** | Profile **README** | Full-color image (default **360×192**) |

**Live SVG demo:** [https://github-readme-zodiac.vercel.app](https://github-readme-zodiac.vercel.app)

---

## What a Pin looks like

GitHub only shows about **5 lines** of a pinned Gist. Below is the full 12-sign gallery (pin + full gist) from the local preview:

**[Gist pin preview — 12 signs (PDF)](docs/gist-pin-preview-12-signs.pdf)**

Also available as HTML (download / open locally): [docs/gist-pin-preview.html](docs/gist-pin-preview.html)

Example pin body (Taurus):

```text
♉ TAURUS · Builder                        ✦
✨ JUNG SEUNGHOON · Full-Stack Dev           \
⭐   4  📦  36  👥   0                  ✦-----✦
Consistency ███████████░  95%             \
Builder     █████████░░░  75%              ✦--✦
```

Open the Gist itself to see the **full** card (description + tagline under the pin fold).

### How to put this on your profile Pins

Same pattern as [productive-box](https://github.com/maxam2017/productive-box): **fork → Action fills your Gist → pin that Gist**. No Vercel for Pins.

1. **[Fork this repo](https://github.com/seuthootDev/github-readme-zodiac/fork)**
2. Create a **public** [Gist](https://gist.github.com/) and copy its ID  
   (`https://gist.github.com/YOU/`**`GIST_ID`** — not the `.js` embed URL)
3. Create a PAT with **`gist`** scope → on **your fork**, add Secrets `GH_TOKEN` + `GIST_ID`
4. On **your fork**, add Variable `BIRTHDATE` = `YYYY-MM-DD` (optional but recommended)
5. **Actions** → **Update Zodiac Gist** → **Run workflow**
6. [Pin the Gist](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/pinning-items-to-your-profile) on your profile

Details (secrets table, variables, schedule): **[§ Pin a Zodiac Gist — fork setup](#1-pin-a-zodiac-gist--fork-setup)** below.

---

## 1) Pin a Zodiac Gist — fork setup

**Recommended:** fork this repo and run the Action on **your fork**.

### 1. Fork

Fork [seuthootDev/github-readme-zodiac](https://github.com/seuthootDev/github-readme-zodiac).

### 2. Create a public Gist

1. https://gist.github.com/  
2. Filename e.g. `zodiac.md`, any placeholder text  
3. **Create public gist**  
4. Copy only the **Gist ID** (not the `.js` embed URL):  
   `https://gist.github.com/YOU/`**`GIST_ID`**

### 3. Create a token (once)

https://github.com/settings/tokens → **Tokens (classic)** → enable **`gist`** only.  
The token string is shown **once** — save it. The same PAT can be reused on the Asian sister project.

### 4. Secrets and Variables on **your fork**

**Settings → Secrets and variables → Actions**

**Secrets** tab:

| Secret | Value |
|--------|--------|
| `GH_TOKEN` | PAT with `gist` scope |
| `GIST_ID` | Gist ID only (see above) |

**Variables** tab (optional but recommended):

| Variable | Value | Notes |
|----------|--------|--------|
| `BIRTHDATE` | `YYYY-MM-DD` | e.g. `1995-04-24` → zodiac sign |
| `USERNAME` | your GitHub login | default: token owner |
| `SIGN` | `scorpio` | force a sign |
| `NAME` | display name | optional override |
| `ROLE` | `Backend Dev` | optional override |

> Birthdate is a **Variable** (`BIRTHDATE`), not a Secret.  
> Path: Settings → Secrets and variables → Actions → **Variables** → New repository variable.

### 5. Run the Action

1. On **your fork**: **Actions** → enable workflows if prompted  
2. **Update Zodiac Gist** → **Run workflow**  
3. [Pin the Gist on your profile](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/pinning-items-to-your-profile)

Also runs on every push to `main` and daily at 00:00 UTC.

### Pin vs SVG

| Feature | Your fork’s Action? | Uses [github-readme-zodiac.vercel.app](https://github-readme-zodiac.vercel.app)? |
|---------|---------------------|----------------------------------------------------------------------------------|
| **Pinned Gist** | Yes | No |
| **SVG in README** | No | Yes (shared public instance), unless you deploy your own |

---

## 2) SVG card (README embed)

```md
![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=YOUR_USERNAME)
```

### Demo

```md
![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev)
```

![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev)

### All 12 signs (SVG)

<p align="center">
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=aries" width="49%" alt="Aries" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=taurus" width="49%" alt="Taurus" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=gemini" width="49%" alt="Gemini" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=cancer" width="49%" alt="Cancer" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=leo" width="49%" alt="Leo" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=virgo" width="49%" alt="Virgo" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=libra" width="49%" alt="Libra" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=scorpio" width="49%" alt="Scorpio" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=sagittarius" width="49%" alt="Sagittarius" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=capricorn" width="49%" alt="Capricorn" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=aquarius" width="49%" alt="Aquarius" />
  <img src="https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=pisces" width="49%" alt="Pisces" />
</p>

### SVG options

| Param | Description |
|-------|-------------|
| `username` | GitHub username (**required**) |
| `birthdate` | `YYYY-MM-DD` |
| `sign` | Force sign: `aries` … `pisces` |
| `name` | Override display name |
| `role` | Override role |
| `width` | Display width in px (`240`–`900`, default **`360`**) |

```md
![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev)

![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&width=480)
```

---

## Stats (playful, not astrology)

Each card shows **3 of 5** traits. Which three appear depends on the sign’s `statKeys`. Values are scaled from public GitHub signals (0–100).

| Stat | Drawn from (roughly) |
|------|----------------------|
| **Consistency** | Account age + repos per year |
| **Explorer** | Distinct languages + public repos |
| **Builder** | Public repos + stars + forks |
| **Open Source** | Stars + forks + followers |
| **Debugger** | Open issues + repos (+ a little stars) |

Sister project ([Asian zodiac](https://github.com/seuthootDev/github-readme-chinese-zodiac)) uses the same signals with different labels: Discipline / Ingenuity / Craft / Renown / Insight.

---

## How it works

**Pinned Gist (fork)**

```
Your fork → GitHub Action
  → GitHub API (your profile)
  → Zodiac + stats
  → PATCH your Gist
  → Pin on your profile
```

**SVG (shared or self-hosted)**

```
README image URL → Vercel /api/card → GitHub API → Zodiac + stats → SVG
```

Stats are playful mappings from public GitHub signals, not real astrology.

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
See [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits / attribution

Card sign artwork is derived from Magnific (Freepik) assets under a **free license with attribution**:

| Used for | Asset | Designed by | Certificate |
|----------|--------|-------------|-------------|
| Title glyphs (`assets/signs`) | [zodiac white signs set…](https://www.magnific.com/free-vector/zodiac-white-signs-set-isolated-dark-background-zodiac-line-stylized-symbols-astrological-calendar-collection-horoscope-constellation-vector-illustration_67006418.htm) | [hannazasimova — Magnific.com](https://www.magnific.com) | [docs/license-zodiac-white-signs-set-67006418.pdf](docs/license-zodiac-white-signs-set-67006418.pdf) |
| Line-art accent (`assets/signs-line`) | [flat zodiac sign collection](https://www.magnific.com/free-vector/flat-zodiac-sign-collection_15112717.htm) | [Freepik — Magnific.com](https://www.magnific.com) | [docs/license-flat-zodiac-sign-collection-15112717.pdf](docs/license-flat-zodiac-sign-collection-15112717.pdf) |

## License

[MIT](LICENSE) © seuthootDev

Third-party artwork remains under its Magnific license (see certificates above); the MIT license covers this repository’s code.

## Roadmap

- [x] Username → zodiac SVG
- [x] Birthdate mapping + GitHub REST stats
- [x] Editable name / role (auto by default)
- [x] Pinned Gist Action (productive-box style)
- [x] Fork-based pin setup guide
- [ ] GraphQL contributions / streak
- [ ] Optional self-host docs for high SVG traffic
