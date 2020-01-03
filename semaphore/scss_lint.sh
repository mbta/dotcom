#!/usr/bin/env bash
set -e

fork_point=$(git merge-base --fork-point origin/master)
changed=$(git diff --name-only "$fork_point" apps/site/assets/css)

if [ -z "$changed" ]; then
  echo "No CSS files changed relative to origin/master fork point."
else
  gem install scss_lint -v 0.59.0 --no-document
  scss-lint $changed
fi
