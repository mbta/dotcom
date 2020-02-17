#!/usr/bin/env bash
set -e

fork_point=$(git merge-base --fork-point origin/master)
changed=$(git diff --name-only "$fork_point" apps/site/assets/css)

if [ -z "$changed" ]; then
  echo "No CSS files changed relative to origin/master fork point."
else
  npx stylelint $changed --config apps/site/assets/.stylelintrc --ignore-path apps/site/assets/.stylelintignore
fi
