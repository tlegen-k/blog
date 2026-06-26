
Build a minimal personal research website with this architecture:

# Purpose

Public intellectual/research archive focused on:

* cyber risk
* probabilistic systems
* Monte Carlo
* trading systems
* AI/systems thinking

NOT a generic blog.

---

# Stack

* Notes/knowledge management: [Obsidian](https://obsidian.md?utm_source=chatgpt.com)
* Git hosting/version control: [GitHub](https://github.com?utm_source=chatgpt.com)
* Static site generator: [Astro](https://astro.build?utm_source=chatgpt.com)
* Hosting: VPS + nginx
* Optional React components inside Astro

---

# Existing Obsidian Vault

Keep existing PARA structure.

Add only:

```text
Knowledge/
Publishing/
```

---

# Obsidian Structure

```text
Knowledge/
├── Cyber Risk
├── Probabilistic Systems
├── Monte Carlo
├── Trading Systems
├── AI + Systems
├── Mental Models
└── Research Notes

Publishing/
├── Ideas
├── Notes
├── Essays
├── Visuals
├── Published
└── Astro Export
```

---

# Workflow

```text
Daily Notes
→ Knowledge
→ Publishing/Notes or Essays
→ Publishing/Published
→ Publishing/Astro Export
→ Astro website
```

Only content inside:

```text
Publishing/Astro Export
```

is public.

---

# Astro Requirements

Create:

* fast minimal technical website
* markdown-native
* dark/light mode
* responsive
* SEO-friendly
* RSS feed
* tag support

Sections:

```text
/notes
/essays
/projects
/research
/about
```

---

# Content Model

## Notes

Short exploratory writing.

## Essays

Longer structured writing.

Use Astro content collections.

---

# Frontmatter Example

```md
---
title: "Monte Carlo and Adaptive Systems"
date: 2026-05-25
tags: ["cyber-risk", "simulation"]
type: "essay"
draft: false
---
```

---

# Website Style

Minimal, intellectual, clean.

Avoid:

* startup aesthetics
* excessive animations
* social-media feel

Prefer:

* typography-focused
* research notebook feel
* simple navigation

---

# Homepage

Include:

* short bio
* current interests
* latest writing
* selected projects

Tone:
“Software engineer exploring cyber risk, probabilistic systems, simulation, and decision-making under uncertainty.”

---

# Deployment

Use:

* Astro static build
* nginx serving `/dist`
* Git-based deployment
* easy future CI/CD support

---

# Important Constraints

Optimize for:

* low-friction publishing
* markdown workflow
* long-term ownership
* easy writing from Obsidian

Do NOT overengineer:

* CMS
* database
* auth
* complex backend
* advanced styling initially.
