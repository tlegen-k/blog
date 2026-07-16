#!/usr/bin/env bash
set -euo pipefail

echo "📦 Building site..."
rm -rf dist/
pnpm build

echo ""
echo "🔍 Changes to be deployed:"
echo "---"
rsync -az --delete -e "ssh -p 52847" --dry-run dist/ deploy@144.91.71.70:/var/www/blog/ 2>&1 | grep -E '^(deleting|[^.].*/$|[^.][^/]*$)' || echo "(no deletions or changes)"
echo "---"
echo ""

read -p "⚠️  Deploy to production? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 1
fi

echo "🚀 Deploying..."
rsync -az --delete -e "ssh -p 52847" dist/ deploy@144.91.71.70:/var/www/blog/
echo "✓ Deployed"
