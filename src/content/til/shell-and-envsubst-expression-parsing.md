---
title: Shell and envsubst expression parsing difference
date: 2026-06-25
tags:
  - shell
  - envsubst
  - helm
  - deployment
---

**Shell** expansion can parse expression, apply defaults and conditionals, substitutions, etc.

**envsubst** does text substitution only. No shell logic or commands execution embedded in the file.

Helm charts use Helm template syntax and none of the above. Powered by Helm's Go engine.

In the typical application deployment configuration, Helm values file gets pre-rendered from env variable.

The actual stages of rendering Helm chart values:

```

config/*-api.config

  -> envsubst-style rendering

  -> deployments/helm/api.yml becomes real values YAML

  -> Helm chart reads .Values.replicaCount

```

  
 **Shell-compatible expansion** is a feature of the shell itself, like `bash`, `sh`, or `zsh`. 

**`envsubst`-style substitution** is a much simpler text replacement tool. It only swaps environment variable names for values.