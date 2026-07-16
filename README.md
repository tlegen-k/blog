# tk.dev — research archive

Minimal personal research archive focused on cyber risk, probabilistic systems, Monte Carlo simulation, trading systems, and AI/systems thinking. Built with Astro. Self-hosted on VPS.

## Stack

- **Framework**: [Astro](https://astro.build) v4
- **Content**: Markdown / MDX in `src/content/`
- **Hosting**: VPS with nginx (static output)
- **Writing**: Obsidian → git → deploy

## Local dev

```bash
pnpm install
pnpm dev             # syncs vault content, then starts localhost:4321
pnpm build           # syncs vault content, then outputs to dist/
pnpm preview         # preview the build
```

## Sections

| Path | Purpose |
|------|---------|
| `/posts` | Longer structured writing |
| `/til` | Short daily notes (Today I Learned) |
| `/research` | Ongoing research notes |
| `/projects` | Selected projects |
| `/about` | About page |

## Content types

### TIL (Today I Learned)

Short exploratory notes. Low friction.

**Location**: `src/content/til/YYYY-MM-DD-slug.md`

**Frontmatter**:
```yaml
---
title: "What you learned"
date: 2026-05-24
tags: [swe]          # swe | cyber | trading | infra
draft: false
---
```

### Posts

Longer structured writing.

**Location**: `src/content/posts/slug.md`

**Frontmatter**:
```yaml
---
title: "Full title"
date: 2026-05-24
description: "One sentence summary shown on listing page and in RSS."
tags: [cyber]
type: post
draft: false
---
```

**Valid tags**: `swe`, `cyber`, `trading`, `infra`

## Obsidian workflow

Write in `Publishing/Astro Export/` — only content in that folder is public.

### Local content sync

The content sources are your vault's `~/Documents/second-brain/Publishing/posts` and
`~/Documents/second-brain/Publishing/til` directories. `pnpm dev` and `pnpm build`
mirror both into the local Astro collections automatically; use `pnpm sync:content` to
mirror them on demand. The mirrored `src/content/posts/` and `src/content/til/`
directories are ignored by git.

On a machine where the vault lives elsewhere, set `CONTENT_POSTS_DIR` and/or
`CONTENT_TIL_DIR` before running a command, for example:

```bash
CONTENT_POSTS_DIR=/path/to/Publishing/posts \
CONTENT_TIL_DIR=/path/to/Publishing/til pnpm build
```

Workflow:
```
Daily Notes → Knowledge → Publishing/Notes or Posts → Publishing/Published → Publishing/Astro Export → Astro
```

## Deployment

### Manual

```bash
# Edit VPS_USER and VPS_HOST in deploy.sh first
./deploy.sh
```

### Automatic (GitHub Actions)

Push to `main` triggers build + rsync to VPS via `.github/workflows/deploy.yml`.

**Required GitHub secrets**:
- `VPS_HOST` — server IP or hostname
- `VPS_USER` — SSH user
- `VPS_SSH_KEY` — private key (ed25519 recommended; public key must be in `~/.ssh/authorized_keys` on VPS)

### Nginx config (VPS)

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/blog;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    gzip on;
    gzip_types text/html text/css application/javascript application/json;
}
```

Run `certbot --nginx -d yourdomain.com` for HTTPS.

## Publishing checklist

**TIL**
- [ ] `draft: false`
- [ ] date correct
- [ ] at least one tag
- [ ] git commit + push

**Post**
- [ ] `draft: false`
- [ ] `description` filled in (used in RSS + meta)
- [ ] tags set
- [ ] git commit + push

## RSS

`/rss.xml` — includes both posts and TILs.
