#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

function main {
  if [[ "${1:-}" == "note" ]]; then
    create_note "${@:2}"
  elif [[ "${1:-}" == "essay" ]]; then
    create_essay "${@:2}"
  else
    die "USAGE: scripts/new-content.sh note [<devlog slug>] | essay <title>"
  fi
}

function create_note {
  if [[ "${#}" -gt 1 ]]; then
    die "USAGE: scripts/new-content.sh note [<devlog slug>]"
  fi

  local devlog_slug="${1:-}"
  local stamp
  local slug_suffix
  local file

  stamp=$(date +%Y-%m-%d-%H%M)
  slug_suffix="note"
  [[ -n "${devlog_slug}" ]] && slug_suffix=$(slugify "${devlog_slug}")
  file="${ROOT_DIR}/_notes/${stamp}-${slug_suffix}.md"

  write_file "${file}" \
    "---" \
    "date: $(date '+%Y-%m-%d %H:%M %z')" \
    "$(if [[ -n "${devlog_slug}" ]]; then printf 'devlog: %s' "${devlog_slug}"; fi)" \
    "tags: []" \
    "---"

  open_in_editor "${file}"
}

function create_essay {
  if [[ "${#}" -ne 1 || -z "${1}" ]]; then
    die "USAGE: scripts/new-content.sh essay <title>"
  fi

  local title="${1}"
  local current_date
  local file

  current_date=$(date +%Y-%m-%d)
  file="${ROOT_DIR}/_essays/${current_date}-$(slugify "${title}").markdown"

  write_file "${file}" \
    "---" \
    "layout: essay" \
    "title: ${title}" \
    "date: $(date '+%Y-%m-%d %H:%M:%S %z')" \
    "categories: " \
    "---"

  open_in_editor "${file}"
}

function write_file {
  local file="${1}"
  shift

  [[ ! -e "${file}" ]] || die "File already exists: ${file#${ROOT_DIR}/}"
  printf '%s\n' "$@" > "${file}"
  printf 'Wrote %s\n' "${file#${ROOT_DIR}/}"
}

function open_in_editor {
  local file="${1}"
  local editor="${EDITOR:-vim}"

  command -v "${editor}" >/dev/null 2>&1 || die "Editor not found: ${editor}"
  "${editor}" "${file}"
}

function slugify {
  local slug

  slug=$(printf '%s' "${1}" | tr '[:upper:]' '[:lower:]' | tr -cs '[:alnum:]' '-')
  slug="${slug#-}"
  slug="${slug%-}"
  [[ -n "${slug}" ]] || die "Could not create a filename slug from: ${1}"
  printf '%s' "${slug}"
}

function die {
  printf 'Fatal: %s\n' "$*" >&2
  exit 1
}

main "$@"
