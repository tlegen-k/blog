---
title: "T3/T4 DOCSIS timeouts are a coax SNR problem, not a modem problem"
date: 2026-05-22
tags: [infra]
---

Spent two weekends thinking my Arris SB8200 was dying. The modem log was full of `T3 timeout` and `T4 timeout` errors, which look like the modem is struggling to maintain upstream channel locks.

Turns out these are almost always a **coax signal quality issue** — splitters, corroded connectors, or RG-59 cable that can't handle DOCSIS 3.1 frequencies.

The actual fix was having the ISP tech:
1. Replace the exterior tap connection (oxidized)
2. Remove an unnecessary splitter in the line
3. Confirm signal levels were within spec (upstream power 38–48 dBmV, downstream SNR > 33 dB)

After that, zero T3/T4 errors for weeks.

**Lesson**: when the modem logs show timing errors, don't replace the modem — trace the coax path and fix the physical layer first.
