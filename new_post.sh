#!/usr/bin/env bash

set -euo pipefail

function main {
  if [[ "${#}" -eq 1 ]]; then
    output_dir="./_posts"
    title="${1}"
  elif [[ "${#}" -eq 2 && -d "${1}" ]]; then
    output_dir=$(realpath "${1}")
    title="${2}"
  else
    die "USAGE: ./new_post.sh (<title>) | (<existing dir> <title>)"
  fi

  current_date=$(date +"%Y-%m-%d")
  current_time=$(date +"%H:%M:%S")

  new_post_content=(
    "---"
    "layout: post"
    "title: ${title}"
    "date: ${current_date} ${current_time} -0600"
    "categories: "
    "---"
  )

  printf '%s\n' "${new_post_content[@]}" > "${output_dir}/${current_date}-${title}.markdown"
}

function installed {
  cmd=$(command -v "${1}")

  [[ -n "${cmd}" ]] && [[ -f "${cmd}" ]]
  return ${?}
}

function die {
  >&2 echo "Fatal: ${@}"
  exit 1
}

# Check for all required dependencies
deps=(realpath)
for dep in "${deps[@]}"; do
  installed "${dep}" || die "Missing '${dep}'"
done

main "$@"; exit
