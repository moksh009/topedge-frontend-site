#!/usr/bin/env bash
# Quality-first product demo encode for the marketing site.
# Usage: ./scripts/compress-demo-video.sh input.mp4 cart-recovery
# Outputs: public/marketing/demos/<name>.mp4 + <name>-poster.jpg
#
# Blurry old approach (avoid):
#   scale=1280 + CRF 30  → soft UI text
#   GIF                  → larger + worse
#
# Better method (this script):
#   - 1920 wide (≈2× for ~960–1040 CSS px → sharp on retina)
#   - 30 fps (UI demos don’t need 60; half the weight, same crispness)
#   - lanczos scale, CRF 18, slow preset
#   - muted + faststart; sharp JPG poster
# Lazy-load + poster keep first paint fast.

set -euo pipefail

IN="${1:?input video required}"
NAME="${2:?output name required, e.g. cart-recovery}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/marketing/demos"
mkdir -p "$OUT"

ffmpeg -y -i "$IN" \
  -vf "fps=30,scale=1920:-2:flags=lanczos" \
  -c:v libx264 -preset slow -crf 18 -profile:v high \
  -an -movflags +faststart -pix_fmt yuv420p \
  "$OUT/${NAME}.mp4"

ffmpeg -y -ss 0.8 -i "$IN" -frames:v 1 -update 1 \
  -vf "scale=1920:-2:flags=lanczos" -q:v 3 \
  "$OUT/${NAME}-poster.jpg"

ls -lh "$OUT/${NAME}.mp4" "$OUT/${NAME}-poster.jpg"
echo "Wire in src/marketing/data/productDemoVideos.ts → ${NAME}"
