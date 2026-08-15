#!/usr/bin/env bash
# Usage:
#   scripts/new-note.sh                  -> plain quick note
#   scripts/new-note.sh aoc-2025         -> note that rolls up into the aoc-2025 devlog
set -euo pipefail

DEVLOG_SLUG="${1:-}"
STAMP=$(date +%Y-%m-%d-%H%M)
SLUG_SUFFIX="note"
[ -n "$DEVLOG_SLUG" ] && SLUG_SUFFIX="$DEVLOG_SLUG"

FILE="_notes/${STAMP}-${SLUG_SUFFIX}.md"

{
  echo "---"
  echo "date: $(date '+%Y-%m-%d %H:%M')"
  if [ -n "$DEVLOG_SLUG" ]; then
    echo "devlog: ${DEVLOG_SLUG}"
    echo "tags: []"
  else
    echo "tags: []"
  fi
  echo "---"
} > "$FILE"

"${EDITOR:-vim}" "$FILE"

echo "Wrote $FILE"
