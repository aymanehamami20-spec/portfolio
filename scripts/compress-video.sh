#!/usr/bin/env bash
#
# compress-video.sh — turn a raw export into web-ready media.
#
# Produces, for each input:
#   <name>.mp4       H.264 / AAC, faststart   (primary source)
#   <name>.webm      VP9 / Opus               (smaller where supported)
#   <name>-poster.jpg                         (first meaningful frame)
#
# Vertical (9:16) clips are capped at 1080 wide, horizontal at 1920 — with a
# 720p variant alongside for slower connections.
#
# Usage:
#   ./scripts/compress-video.sh input.mov
#   ./scripts/compress-video.sh input.mov public/media/projects/my-project
#   ./scripts/compress-video.sh "raw/*.mov" public/media/projects/my-project
#
# Requires ffmpeg + ffprobe on PATH.

set -euo pipefail

if ! command -v ffmpeg >/dev/null 2>&1 || ! command -v ffprobe >/dev/null 2>&1; then
  echo "ffmpeg and ffprobe are required. Install from https://ffmpeg.org/download.html" >&2
  exit 1
fi

if [ $# -lt 1 ]; then
  echo "Usage: $0 <input> [output-dir]" >&2
  exit 1
fi

INPUT_GLOB="$1"
OUT_DIR="${2:-public/media}"
POSTER_AT="${POSTER_AT:-00:00:01}"   # override: POSTER_AT=00:00:03 ./scripts/compress-video.sh …

mkdir -p "$OUT_DIR"

shopt -s nullglob
for INPUT in $INPUT_GLOB; do
  [ -f "$INPUT" ] || continue

  NAME="$(basename "${INPUT%.*}")"
  WIDTH="$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$INPUT")"
  HEIGHT="$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$INPUT")"

  if [ "$HEIGHT" -ge "$WIDTH" ]; then
    ORIENTATION="vertical"
    FULL_SCALE="scale=-2:1920:flags=lanczos"   # 1080x1920
    SMALL_SCALE="scale=-2:1280:flags=lanczos"  # 720x1280
  else
    ORIENTATION="horizontal"
    FULL_SCALE="scale=1920:-2:flags=lanczos"
    SMALL_SCALE="scale=1280:-2:flags=lanczos"
  fi

  echo "→ $INPUT (${WIDTH}x${HEIGHT}, $ORIENTATION)"

  # ---- H.264 MP4, full size -------------------------------------------------
  ffmpeg -y -loglevel error -i "$INPUT" \
    -vf "$FULL_SCALE" \
    -c:v libx264 -profile:v high -preset slow -crf 23 -pix_fmt yuv420p \
    -movflags +faststart \
    -c:a aac -b:a 128k \
    "$OUT_DIR/$NAME.mp4"

  # ---- H.264 MP4, 720p ------------------------------------------------------
  ffmpeg -y -loglevel error -i "$INPUT" \
    -vf "$SMALL_SCALE" \
    -c:v libx264 -profile:v main -preset slow -crf 25 -pix_fmt yuv420p \
    -movflags +faststart \
    -c:a aac -b:a 96k \
    "$OUT_DIR/$NAME-720.mp4"

  # ---- VP9 WebM -------------------------------------------------------------
  ffmpeg -y -loglevel error -i "$INPUT" \
    -vf "$FULL_SCALE" \
    -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -pix_fmt yuv420p \
    -c:a libopus -b:a 96k \
    "$OUT_DIR/$NAME.webm"

  # ---- Poster ---------------------------------------------------------------
  ffmpeg -y -loglevel error -ss "$POSTER_AT" -i "$INPUT" \
    -frames:v 1 -vf "$FULL_SCALE" -q:v 3 \
    "$OUT_DIR/$NAME-poster.jpg"

  echo "  ✓ $NAME.mp4 · $NAME-720.mp4 · $NAME.webm · $NAME-poster.jpg → $OUT_DIR"
done

echo "Done. Muted preview clips can drop their audio track with -an for a smaller file."
