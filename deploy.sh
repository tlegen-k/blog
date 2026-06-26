#!/usr/bin/env bash
set -euo pipefail
rm -rf dist/
pnpm build
rsync -az --delete -e "ssh -p 52847" dist/ deploy@144.91.71.70:/var/www/blog/
echo "✓ Deployed"
