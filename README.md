# PokéDex Mini

React + Vite Pokédex built from the Week 6 instructions (Steps 1–4), plus extras for the "make it cool" bonus.

**Live site:** https://YOUR-USERNAME.github.io/pokedex-mini/

## Features
- Browse all 1025 Pokémon in a card grid with "Load more" and loading skeletons
- Search by name or Pokédex number, with autocomplete suggestions
- Filter by type (18 types, uses the `/type` endpoint)
- Detail page: official artwork, shiny toggle, cry sound, description, height/weight, abilities, animated stat bars, evolution chain, prev/next
- Favorites saved in `localStorage`
- Dark / light mode, random Pokémon button, responsive layout
- HashRouter routing + 404 page, loading/error states, race-condition guard

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
1. In `vite.config.js`, make sure `base` is `/<your-repo-name>/`
2. Push the source: `git add . && git commit -m "..." && git push`
3. `npm run deploy`
4. GitHub → Settings → Pages → source: `gh-pages` branch
