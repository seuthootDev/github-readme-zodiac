# github-readme-zodiac

GitHub 활동 데이터를 별자리 테마 SVG 카드로 보여 주는 README 장식 카드입니다.

> Your coding personality written in the stars

## Quick start (local)

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

Card API:

```
http://localhost:3000/api/card?username=octocat
http://localhost:3000/api/card?username=octocat&birthdate=1998-11-05
http://localhost:3000/card/octocat.svg   # rewrite after Vercel deploy
```

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import on [vercel.com](https://vercel.com)
3. (Optional) set env `GITHUB_TOKEN` for higher API rate limits
4. Use your deployment URL in README:

```md
![Developer Zodiac](https://YOUR_DOMAIN/api/card?username=YOUR_USERNAME)
```

Optional birthdate (YYYY-MM-DD):

```md
![Developer Zodiac](https://YOUR_DOMAIN/api/card?username=YOUR_USERNAME&birthdate=1998-11-05)
```

Force a sign:

```md
![Developer Zodiac](https://YOUR_DOMAIN/api/card?username=YOUR_USERNAME&sign=scorpio)
```

Display name / role default to GitHub-based auto estimates. Override only when you want:

```md
![Developer Zodiac](https://YOUR_DOMAIN/api/card?username=YOUR_USERNAME&name=Seunghoon&role=Backend%20Developer)
```

Preview page flow: Generate → auto-fill name/role → edit if needed → copy README markdown (overrides appear in the URL only when changed).

Stat **bars shown** follow each zodiac (e.g. Scorpio → Debugger / Explorer / Consistency). Values still come from GitHub activity.

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
- Stats (Consistency / Explorer / Builder / …) are playful mappings from public GitHub signals, not real astrology

## Project layout

```
api/card.js          Vercel serverless entry
src/data/zodiac.json 12 signs + palettes
src/lib/             github / zodiac / stats
src/render/card.js   600×300 SVG renderer
public/index.html    preview landing
scripts/local-server.js
```

## Phase roadmap

- [x] Phase 1 — username → zodiac SVG
- [x] Phase 2 (lite) — birthdate mapping + GitHub REST stats
- [ ] Phase 2+ — GraphQL contributions / streak
- [ ] Phase 3 — richer themes, animation presets, custom layout params
