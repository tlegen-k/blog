---
title: "How we model attritional cyber losses at the portfolio level"
date: 2026-05-18
description: "A look at the modeling architecture behind cyber attritional loss estimation — frequency-severity decomposition, exposure curves, and the data problems that make it hard."
tags: [cyber]
---

Cyber insurance pricing is genuinely hard. Unlike property cat models where we have decades of historical losses and stable physical relationships (a building's vulnerability to wind is well-understood), cyber is fast-moving, highly correlated, and thin on credible data.

Here's how we approach attritional loss modeling at the portfolio level — the bread and butter of pricing, as opposed to catastrophe scenarios.

## The core decomposition

Attritional losses follow the standard actuarial frequency-severity split:

```
E[Loss] = E[N] × E[X]
```

Where `N` is claim count and `X` is severity per claim. Simple in theory. The hard part is that both are functions of an exposure base that's difficult to measure.

## Exposure: the unsolved problem

For property, exposure is clear: insured value, construction type, location. For cyber, we're trying to capture the probability surface of an organization getting hit, which depends on:

- **Industry vertical** — healthcare and finance are perennial targets
- **Revenue / headcount** — proxies for attack surface and payout capacity
- **Security posture signals** — tech stack, patching cadence, MFA adoption, open ports

We use a mix of modeled exposure scores derived from external threat intelligence feeds and financial data. The calibration is painful because the ground truth (actual loss data) is sparse and often inaccurate — insureds underreport small losses and late-report large ones.

## Severity distributions

For severity, we fit log-normal and Pareto mixture models to claims data segmented by:

- Event type (ransomware, BEC, data breach)
- Company size band
- Policy year (trends are steep — 2020 ransomware severity is not 2024 ransomware severity)

The heavy tail is the critical part. A small number of large losses dominate the portfolio P&L. Getting the tail shape right matters more than fitting the body of the distribution precisely.

## The correlation problem

Attritional modeling assumes independence across insureds. That assumption breaks badly in cyber — a single vulnerability (Log4Shell, MOVEit, etc.) can trigger correlated losses across hundreds of policies simultaneously. This is the boundary between attritional and cat modeling and it's blurry in practice.

Our current approach is to model attritional under independence and layer systemic scenarios separately. Not perfect, but it's operationally tractable.

## What I'd do differently

If I were starting from scratch, I'd invest more heavily in:

1. **Continuous calibration pipelines** — loss data arrives months to years after the policy year; the model needs to update in place as development patterns emerge
2. **Feature stores for exposure signals** — threat intel data has a shelf life; stale signals are worse than no signals
3. **Uncertainty quantification** — we often report point estimates when we should be reporting distributions over model parameters

The field is young. The models will get substantially better as data accumulates and the actuarial and ML communities continue to find each other.
