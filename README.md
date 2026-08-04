# github-readme-zodiac

Zodiac-themed SVG profile cards generated from your GitHub activity — made for README embeds.

> Your coding personality written in the stars

**Live demo:** [https://github-readme-zodiac.vercel.app](https://github-readme-zodiac.vercel.app)

## Demo

```md
![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev)
```

![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev)

## All 12 signs

Force a sign with `&sign=` (demo username: `seuthootDev`):

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

## Usage

Add this to your README (replace the username):

```md
![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=YOUR_USERNAME)
```

### Options

| Param | Description |
|-------|-------------|
| `username` | GitHub username (**required**) |
| `birthdate` | `YYYY-MM-DD` — maps to a tropical zodiac sign |
| `sign` | Force a sign: `aries` … `pisces` |
| `name` | Override display name (auto from GitHub by default) |
| `role` | Override role (auto-guessed from top languages by default) |

Examples:

```md
![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&birthdate=1998-11-05)

![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&sign=scorpio)

![Developer Zodiac](https://github-readme-zodiac.vercel.app/api/card?username=seuthootDev&name=Seunghoon&role=Backend%20Developer)
```

Pretty path (same card):

```md
![Developer Zodiac](https://github-readme-zodiac.vercel.app/card/seuthootDev)
```

## How it works

```
README image URL
  → Vercel Node Function (/api/card)
  → GitHub REST API
  → Zodiac resolve + fun stats
  → SVG response
```

- Birthdate provided → tropical zodiac sign
- No birthdate → deterministic sign from username hash
- Stat **bars shown** follow each sign (e.g. Scorpio → Debugger / Explorer / Consistency)
- Stat **values** come from public GitHub signals (playful, not real astrology)
- Name / role default to auto estimates; pass `name` / `role` only to override

## Local development

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

```
http://localhost:3000/api/card?username=seuthootDev
http://localhost:3000/api/card?username=seuthootDev&sign=leo
```

## Deploy

This project is deployed on Vercel: [github-readme-zodiac.vercel.app](https://github-readme-zodiac.vercel.app)

Optional env var: `GITHUB_TOKEN` — raises GitHub API rate limits (60/hr → 5000/hr). Not required for a basic deploy.

## Project layout

```
api/card.js           Vercel serverless entry
api/profile.js        Auto name/role for the preview UI
src/data/zodiac.*     12 signs + palettes
src/lib/              github / zodiac / stats
src/render/card.js    600×300 SVG renderer
public/index.html     preview landing
scripts/local-server.js
```

## Roadmap

- [x] Username → zodiac SVG
- [x] Birthdate mapping + GitHub REST stats
- [x] Editable name / role (auto by default)
- [ ] GraphQL contributions / streak
- [ ] Richer theme params & animation presets
