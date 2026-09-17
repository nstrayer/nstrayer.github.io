# Nick Strayer's Personal Website

Source for [nickstrayer.me](https://nickstrayer.me), hosted on GitHub Pages from
[nstrayer/nstrayer.github.io](https://github.com/nstrayer/nstrayer.github.io).

The site uses Astro 7, React 19, Tailwind CSS 4, and TypeScript. Its current design
features a photographic paper texture, textured ink headings, fine rules, and
uncropped borderless project images. Labels use sentence case and navigation
works without client-side JavaScript.

## Local development

Node.js 22.12 or newer and npm 9.6.5 or newer are required. Node 24 is the recommended
version and is used in GitHub Actions; `.nvmrc` selects it if you use nvm.

```sh
cd /Users/nicholasstrayer/dev/nstrayer.github.io
# Optional, if nvm is installed: nvm install && nvm use
npm ci
npm run dev
```

Open <http://localhost:4321>. Changes reload automatically. Astro 7 runs the server
in the background; use `npm run dev -- stop` to stop it and
`npm run dev -- status` to check whether it is running.
Use `npm run preview -- stop` to stop a production preview.

| Command | Action |
| --- | --- |
| `npm ci` | Install exactly the dependencies in the lockfile |
| `npm run dev` | Start the local development server |
| `npm run check` | Check Astro and TypeScript source |
| `npm run build` | Generate the static site in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm outdated` | Check for newer dependency versions |
| `npm audit` | Check dependencies for known vulnerabilities |

## Editing the site

- `src/data/constants.ts`: profile and site-wide settings
- `src/data/projects.json`: project descriptions, images, and links
- `src/content/posts/`: Markdown posts; copy an existing file to start a new one
- `src/content.config.ts`: post frontmatter schema, including the optional AI disclosure
- `src/components/`: page sections and reusable components
- `src/styles/global.css`: Tailwind theme and shared styles
- `public/`: static images, favicon, and custom-domain `CNAME`
- `src/components/background/`: retained WebGL experiments; the current background
  is the paper texture in `src/components/Background.astro`

### Adding a post

Create a Markdown file in `src/content/posts/`. The filename becomes its URL under
`/posts/`. Each post needs a title, description, and publication date:

```md
---
title: A useful note
description: One sentence shown on the posts index.
publishedAt: 2026-09-16
tags:
  - TypeScript
ai:
  statement: I used Codex to help edit this post.
  tools:
    - Codex
---

Post content starts here.
```

The `tags` and `ai` fields are optional. Set `draft: true` to keep a post out of
the generated site.

To add a semantic caption to a Markdown table, place a `Table:` paragraph
immediately after it. Inline Markdown is supported in the caption:

```md
| Variant | Error rate |
| --- | ---: |
| Current | 58% |

Table: Error rate for the **current** tool schema.
```

## Paper background

The background uses the supplied `Texturelabs_Paper_373XL.jpg` from [Texturelabs](https://texturelabs.org), resized into WebP assets in `src/assets/`. The original stays outside the published site. To regenerate the assets after installing dependencies, run `node scripts/prepare-paper-texture.mjs`.

The page uses the `.paper-surface` treatment in `src/styles/global.css`. Adjust `--paper-opacity` there to change the texture's strength (currently `0.40`). Brightness and contrast apply only to the decorative layer behind the text. The sheet does not tile or animate; print and increased-contrast modes omit the texture.

Headings and paragraphs use multiply blending to feel printed onto the paper. Large `.ink-heading` titles also clip the paper image into a dense navy fill; `--ink-coverage` controls how much grain shows within the letters (currently `90%` ink). The text remains selectable, with native sharp edges. Dark mode, print, and increased-contrast modes use solid text. Keep section and hero-content z-indices automatic so text can blend with the page backdrop.

## Page layout

The header and introduction fill the first screen, with content allowed to grow on smaller screens. They share `.page-width` with the sections below. Navigation sits beside the introduction on desktop and wraps below it on mobile. Use sentence-case labels and simple rules; avoid decorative numbering and figure labels.

Posts appear before Selected work, with compact title/description/date entries and more space around the section itself. Selected work uses small, uncropped, borderless thumbnails beside descriptions. `src/data/projects.json` supports optional `category` and `caption` fields for useful context. Local raster images are resized into responsive WebP variants by Astro; GIFs and remote images retain their original formats. The first six projects are visible, with the remaining projects in a native `<details>` disclosure that works without JavaScript.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, checks the source, builds
with Node 24, and publishes to GitHub Pages. Local development and builds do not
publish changes. The custom domain is configured in GitHub Pages and
`public/CNAME`.

## Dependency compatibility

Dependencies were refreshed in September 2026. TypeScript stays on the latest 6.x
release because the current `@astrojs/check` supports TypeScript 5 and 6, not 7.
Upgrade it when the checker adds support.
