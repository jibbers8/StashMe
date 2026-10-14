#!/usr/bin/env bash
# Builds narrated MP4s: ./build.sh            (all videos)
#                       ./build.sh 03-bever-townsend
# Needs: python3 with kokoro-onnx + soundfile, node with playwright, ffmpeg,
# and the Kokoro model files in $KOKORO_DIR (default: ./models). See README.md.
set -euo pipefail
cd "$(dirname "$0")"
videos=("$@")
[ ${#videos[@]} -eq 0 ] && videos=($(ls videos))
for v in "${videos[@]}"; do
  echo "== $v: narration"
  python3 engine/tts.py "$v"
  echo "== $v: frames + encode"
  node engine/render.mjs "$v"
done
