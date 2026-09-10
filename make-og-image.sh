#!/bin/bash
# Regenerate img/og-image.png (1200x630 social card) from img/og-image.svg
# plus the app icon, composited with rounded corners.
#
# The SVG holds the gradient and type; the icon is composited separately so it
# keeps its own artwork and gets a 44px corner radius matching .hero-icon.
# Glyph positions in the SVG (the acute over the 'o') were measured against
# Helvetica at 104px — re-measure if the wordmark type ever changes.
#
# Usage: ./make-og-image.sh [srb|mne|hrv] — each variant reads its own
# img/og-image-<app>.svg + img/app-icon-<app>.png and writes img/og-image-<app>.png.
#
# Requires: rsvg-convert, magick (both via homebrew).

set -euo pipefail
cd "$(dirname "$0")"

APP="${1:-srb}"
case "$APP" in
  srb) SVG=img/og-image.svg;     ICON_SRC=img/app-icon.png;     OUT=img/og-image.png ;;
  mne) SVG=img/og-image-mne.svg; ICON_SRC=img/app-icon-mne.png; OUT=img/og-image-mne.png ;;
  hrv) SVG=img/og-image-hrv.svg; ICON_SRC=img/app-icon-hrv.png; OUT=img/og-image-hrv.png ;;
  *) echo "unknown app: $APP" >&2; exit 1 ;;
esac

W=1200; H=630
ICON=240        # icon box
ICON_X=150      # icon position on the card
ICON_Y=195
RADIUS=44

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

rsvg-convert -w $W -h $H "$SVG" -o "$tmp/bg.png"

# White-on-black mask -> CopyOpacity. A transparent-canvas mask silently
# produces a fully transparent icon, so keep the black background.
magick -size ${ICON}x${ICON} xc:black -fill white \
  -draw "roundrectangle 0,0,$((ICON-1)),$((ICON-1)),$RADIUS,$RADIUS" "$tmp/mask.png"

magick "$ICON_SRC" -resize ${ICON}x${ICON}! -alpha set \
  "$tmp/mask.png" -compose CopyOpacity -composite "$tmp/icon.png"

magick "$tmp/bg.png" "$tmp/icon.png" -geometry +${ICON_X}+${ICON_Y} \
  -composite "$OUT"

magick identify "$OUT"
echo "Wrote $OUT"
