#!/bin/bash
# Publishes the landing site (docs/roadmap/landing-page.md § Hosting):
#   1. Cloudflare, which serves govoridictionaries.com since 2026-10-08:
#      site/cloudflare/deploy.sh builds site/ with Eleventy and deploys the Worker.
#   2. GitHub Pages, the rollback origin until the move has held: the raw site/ pushed
#      to sergey-khrykov/govori-site as before (the pages switch language in the browser
#      there, the way the site worked before R0).
#   site/deploy.sh --github-only   refresh the GitHub copy alone
set -euo pipefail

SITE_REPO="$HOME/dev/govori-site"
SITE_SRC="$(cd "$(dirname "$0")" && pwd)"

if [[ "${1:-}" != "--github-only" ]]; then
  "$SITE_SRC/cloudflare/deploy.sh"
fi

# Clone if needed
if [ ! -d "$SITE_REPO/.git" ]; then
  echo "Cloning govori-site..."
  gh repo clone sergey-khrykov/govori-site "$SITE_REPO"
fi

# Pull latest
git -C "$SITE_REPO" pull --ff-only 2>/dev/null || true

# Sync files
rsync -av --delete --exclude .git --exclude videos_full --exclude .DS_Store \
  --exclude .dist --exclude cloudflare --exclude node_modules --exclude _build \
  --exclude package.json --exclude package-lock.json --exclude eleventy.config.js \
  "$SITE_SRC/" "$SITE_REPO/"

# Deep-link targets get a sibling .html twin: GitHub Pages 301-redirects /w to
# /w/ (the directory index), and a redirecting target is what Google's link
# checker reports as a misconfigured deep link. The twin answers /w with a 200
# while /w/ keeps working for links already shared in that form. Generated at
# deploy time so <page>/index.html stays the single source of truth; the
# ../img/… paths inside resolve to /img/… from both URLs.
for page in w promo; do
  cp "$SITE_REPO/$page/index.html" "$SITE_REPO/$page.html"
done

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
echo "GitHub Pages copy (the rollback origin) updated."
