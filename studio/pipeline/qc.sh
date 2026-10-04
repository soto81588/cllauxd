#!/usr/bin/env bash
# Render mid-scene QC frames for the given reels and tile them into contact sheets.
set -e
cd "$(dirname "$0")/.."
QC=${QC_DIR:-out/qc}
mkdir -p "$QC"
ARGS=()
for id in "$@"; do
  FR=$(python3 -c "
import json
t=json.load(open('public/data/timing/$id.json'))
print(','.join(str(int(((b['scene_s']+b['scene_e'])/2)*30)) for b in t['beats']))")
  ARGS+=("$id:0,$FR")
done
OUT_DIR="$QC" node pipeline/render.mjs stills "${ARGS[@]}" 2>&1 | grep -v -i memory | grep -v '^$' | tail -2
for id in "$@"; do
  python3 pipeline/contact_sheet.py "$QC/sheet_$id.jpg" $(ls $QC/qc_${id}_*.png | sort -t_ -k3 -n) >/dev/null
done
echo done
