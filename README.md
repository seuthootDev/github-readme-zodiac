# github-readme-zodiac

Zodiac-themed profile cards from your GitHub activity.

> Your coding personality written in the stars

Two ways to show it on your profile:

| Mode | Where it appears | Style |
|------|------------------|--------|
| **Pinned Gist** (like [productive-box](https://github.com/maxam2017/productive-box)) | Profile **Pins** | ASCII / text card |
| **SVG card** | Profile **README** | Full-color 600×300 image |

**Live SVG demo:** [https://github-readme-zodiac.vercel.app](https://github-readme-zodiac.vercel.app)

---

## 1) Pin a Zodiac Gist (recommended for Pins)

Same idea as productive-box: a GitHub Action writes your card into a **public Gist**, then you **pin that Gist**.

### Prep

1. Create a new **public** Gist: https://gist.github.com/  
   - Add any filename (e.g. `zodiac.md`) and some placeholder text  
   - Create public gist  
   - Copy the Gist ID from the URL  
     `https://gist.github.com/seuthootDev/`**`GIST_ID`**
2. Create a token with the **`gist`** scope: https://github.com/settings/tokens/new  
   - (`repo` is not required for this Action)

### Setup in this repo

1. Open **Settings → Secrets and variables → Actions**
2. Add **Repository secrets**:

| Secret | Value |
|--------|--------|
| `GH_TOKEN` | Personal access token (`gist` scope) |
| `GIST_ID` | Gist ID from the URL |

3. (Optional) **Variables** — same Settings page → **Variables** tab → **New repository variable**:

| Variable | Value | Notes |
|----------|--------|--------|
| `USERNAME` | `seuthootDev` | default: token owner |
| `BIRTHDATE` | `YYYY-MM-DD` | e.g. `1998-11-05` → real zodiac sign |
| `SIGN` | `scorpio` | forces a sign (overrides birthdate) |
| `NAME` | display name | overrides GitHub name |
| `ROLE` | `Backend Developer` | overrides auto role |

**Birthday:** add variable `BIRTHDATE` = `YYYY-MM-DD`, then re-run the workflow. Do **not** put the birthday in a Secret unless you want it hidden from the variables UI — Variables are fine for this.

4. **Actions** tab → enable workflows if needed  
5. Run **Update Zodiac Gist** → **Run workflow**  
6. [Pin the Gist on your profile](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/pinning-items-to-your-profile)

The workflow also runs daily at 00:00 UTC.

### Use from another repo

```yaml
name: Update Zodiac Gist
on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: seuthootDev/github-readme-zodiac@main
        env:
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
          GIST_ID: ${{ secrets.GIST_ID }}
          USERNAME: ${{ vars.USERNAME }}
          BIRTHDATE: ${{ vars.BIRTHDATE }}
          SIGN: ${{ vars.SIGN }}
```

### Local gist update

```bash
set GH_TOKEN=ghp_xxx
set GIST_ID=your_gist_id
set USERNAME=seuthootDev
node scripts/update-gist.js
```

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

### All 12 signs

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

```md
![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=scorpio)
![Developer Zodiac](https://github-readme-zodiac.vercel.app/card/seuthootDev)
```

---

## How it works

**SVG**

```
README image URL → Vercel /api/card → GitHub API → Zodiac + stats → SVG
```

**Pinned Gist**

```
GitHub Action (schedule)
  → GitHub API (profile + repos)
  → Zodiac + stats
  → PATCH gist
  → Pin gist on profile
```

Stats are playful mappings from public GitHub signals, not real astrology.

## Local development (SVG preview)

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy (SVG)

Hosted on Vercel: [github-readme-zodiac.vercel.app](https://github-readme-zodiac.vercel.app)

Optional: `GITHUB_TOKEN` on Vercel for higher API rate limits.

## Project layout

```
action.yml                    Reusable Action entry
.github/workflows/update-gist.yml
scripts/update-gist.js        Gist updater
src/gist/render.js            ASCII pin card
api/card.js                   SVG serverless API
api/profile.js
src/data/zodiac.*
src/lib/
src/render/card.js
public/index.html
```

## Roadmap

- [x] Username → zodiac SVG
- [x] Birthdate mapping + GitHub REST stats
- [x] Editable name / role (auto by default)
- [x] Pinned Gist Action (productive-box style)
- [ ] GraphQL contributions / streak
- [ ] Richer theme params & animation presets
