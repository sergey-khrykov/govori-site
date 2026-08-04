#!/bin/bash
# Regenerate img/og-image.png (1200x630 social card) from img/og-image.svg
# plus the app icon, composited with rounded corners.
#
# The SVG holds the gradient and type; the icon is composited separately so it
# keeps its own artwork and gets a 44px corner radius matching .hero-icon.
# Glyph positions in the SVG (the acute over the 'o') were measured against
# Helvetica at 104px — re-measure if the wordmark type ever changes.
#
# Requires: rsvg-convert, magick (both via homebrew).

set -euo pipefail
cd "$(dirname "$0")"

W=1200; H=630
ICON=240        # icon box
ICON_X=150      # icon position on the card
ICON_Y=195
RADIUS=44

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

rsvg-convert -w $W -h $H img/og-image.svg -o "$tmp/bg.png"

# White-on-black mask -> CopyOpacity. A transparent-canvas mask silently
# produces a fully transparent icon, so keep the black background.
magick -size ${ICON}x${ICON} xc:black -fill white \
  -draw "roundrectangle 0,0,$((ICON-1)),$((ICON-1)),$RADIUS,$RADIUS" "$tmp/mask.png"

magick img/app-icon.png -resize ${ICON}x${ICON}! -alpha set \
  "$tmp/mask.png" -compose CopyOpacity -composite "$tmp/icon.png"

magick "$tmp/bg.png" "$tmp/icon.png" -geometry +${ICON_X}+${ICON_Y} \
  -composite img/og-image.png

magick identify img/og-image.png
echo "Wrote img/og-image.png"
