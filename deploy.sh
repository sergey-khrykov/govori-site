#!/bin/bash
set -euo pipefail

SITE_REPO="$HOME/dev/govori-site"
SITE_SRC="$(cd "$(dirname "$0")" && pwd)"

# Clone if needed
if [ ! -d "$SITE_REPO/.git" ]; then
  echo "Cloning govori-site..."
  gh repo clone sergey-khrykov/govori-site "$SITE_REPO"
fi

# Pull latest
git -C "$SITE_REPO" pull --ff-only 2>/dev/null || true

# Sync files
rsync -av --delete --exclude .git --exclude videos_full --exclude .DS_Store "$SITE_SRC/" "$SITE_REPO/"

# Check for changes
cd "$SITE_REPO"
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "No changes to deploy."
  exit 0
fi

# Show what changed
git status --short
echo ""

# Commit and push
git add -A
git commit -m "Update site $(date +%Y-%m-%d-%H%M)"
git push

echo ""
echo "Deployed to GitHub Pages."
