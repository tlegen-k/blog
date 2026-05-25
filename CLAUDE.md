# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # dev server at localhost:4321
pnpm build        # static output → dist/
pnpm preview      # preview built output
pnpm astro sync   # regenerate content collection types (run after editing config.ts)
./deploy.sh       # build + rsync to VPS (edit VPS_USER/VPS_HOST first)
```

No test suite. No linter configured.

## Purpose

Public intellectual/research archive — NOT a generic blog. Focused on: cyber risk, probabilistic systems, Monte Carlo simulation, trading systems, AI/systems thinking.

## Architecture

Astro v4 static site. Two content collections defined in `src/content/config.ts`:

- **`posts`** — longer structured writing. Requires `description` (used in RSS/meta). Lives in `src/content/posts/`.
- **`til`** — short daily notes (Today I Learned). No `description`. Lives in `src/content/til/`.

Both collections filter by `draft: false` at query time.

**Sections**: `/posts`, `/til`, `/research`, `/projects`, `/about`. The research, projects, and about pages are static stubs — no content collection backing them.

**Page routing**: file-based under `src/pages/`. Dynamic routes `[slug].astro` use `getStaticPaths` + `getCollection`. Index pages show most recent N entries (5 posts, 8 TILs).

**Layouts**: `Base.astro` wraps all pages (nav, global styles). `PostLayout.astro` wraps individual post/TIL pages and renders Markdown body. Nav includes all five sections.

**Utilities**: `src/lib/utils.ts` — `formatDate`, `formatDateShort`, `sortByDate` (descending).

**RSS**: `/rss.xml` combines both collections.

**Styling**: single `src/styles/global.css`, CSS variables for theming. No component library.

**Site URL**: `astro.config.mjs` has `site: 'https://yourdomain.com'` — update before deploying for correct sitemap/RSS URLs.

## Content frontmatter

TIL (`src/content/til/YYYY-MM-DD-slug.md`):
```yaml
---
title: "What you learned"
date: 2026-05-24
tags: [swe]   # swe | cyber | trading | infra
draft: false
---
```

Post (`src/content/posts/slug.md`):
```yaml
---
title: "Full title"
date: 2026-05-24
description: "One sentence shown on listing page and in RSS."
tags: [cyber]
type: post
draft: false
---
```

`description` is required by the posts schema — build fails without it.

## Obsidian workflow

Only content in `Publishing/Astro Export/` is public. Symlink `src/content/` into the vault or set vault root inside the repo.
