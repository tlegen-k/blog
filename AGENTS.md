# AGENTS.md

Guidance for coding agents working in this repository.

## Commands

```bash
pnpm sync:posts   # mirror the local vault's post content into src/content/posts
pnpm sync:til     # mirror the local vault's TIL content into src/content/til
pnpm sync:content # mirror both collections
pnpm dev          # sync vault content, then start Astro at localhost:4321
pnpm build        # sync vault content, then generate dist/
pnpm preview      # preview the generated site
pnpm astro sync   # regenerate Astro content types after changing config.ts
```

There is no test suite, linter, or dedicated typecheck. Run `pnpm build` after code or
content-pipeline changes.

## Project

This is an Astro v4 static research archive, not a general-purpose blog. Its topics are
cyber risk, probabilistic systems, Monte Carlo simulation, trading systems, and AI /
systems thinking.

- `src/content/config.ts` defines the `posts` and `til` content collections.
- `src/pages/` provides file-based routes; `[slug].astro` pages render collection entries.
- `src/layouts/Base.astro` provides the site shell and `PostLayout.astro` renders entries.
- `src/pages/rss.xml.js` combines published posts and TIL entries.
- `src/styles/global.css` contains all styling; do not introduce a component library
  without an explicit reason.

## Content rules

Posts require `title`, `date`, and `description`. TILs require `title` and `date`.
Both accept `tags` and `draft`; the documented tag vocabulary is `swe`, `cyber`,
`trading`, and `infra`, although the current schema permits arbitrary strings.

Homepage, index pages, and RSS omit drafts. Dynamic routes currently generate drafts,
so do not treat `draft: true` as a mechanism for keeping sensitive writing private.

### Local vault integration

The source of truth is the local vault's `~/Documents/second-brain/Publishing/posts`
and `~/Documents/second-brain/Publishing/til` directories. `pnpm sync:content`,
`pnpm dev`, and `pnpm build` mirror them into the ignored `src/content/` directories.
Set `CONTENT_POSTS_DIR` and/or `CONTENT_TIL_DIR` to override source locations.

Do not replace collection directories with external symlinks: Astro resolves targets
outside `src/content` and cannot identify collections. Do not edit or commit mirrored
directories; edit the vault source instead.

## Deployment safety

Do not run `./deploy.sh` unless the generated `dist/` has been reviewed and all desired
content is present. The script clears `dist/` and deploys with `rsync --delete` to a
hard-coded VPS destination, so an incomplete build can remove live pages.

The GitHub Actions deployment does not have access to this laptop's vault. It also
needs its configured secrets and a portable content source before it can safely deploy
content. `astro.config.mjs` still uses `https://yourdomain.com`; update it to the real
canonical URL before production deployment so sitemap and RSS URLs are correct.
