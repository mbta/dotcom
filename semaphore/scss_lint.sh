#!/usr/bin/env bash

fork_point=$(git merge-base --fork-point origin/master)
changed=$(git diff --name-only $fork_point "*.ex" "*.exs")

if [ -z "$changed" ]; then
  echo "No files changed relative to origin/master fork point."
else
  rbenv local 2.4.1
  gem install scss_lint -v 0.59.0
  scss-lint $changed
fi
