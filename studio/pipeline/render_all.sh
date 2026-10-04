#!/usr/bin/env bash
# Full production render: carousel slides, reel covers, reel videos (silent; audio muxed in build_library.py)
set -e
cd "$(dirname "$0")/.."
node pipeline/render.mjs slides 2>&1 | grep -v -i memory | grep -v '^$'
node pipeline/render.mjs covers 2>&1 | grep -v -i memory | grep -v '^$' | tail -1
node pipeline/render.mjs reels "$@" 2>&1 | grep -v -i memory | grep -v '^$'
echo ALL_DONE
