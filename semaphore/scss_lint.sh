#!/usr/bin/env bash

changed=$(git diff --name-only origin/master apps/site/assets/css)

if [ -z "$changed" ]; then
  echo "No CSS files changed from origin/master."
else
  rbenv local 2.4.1
  gem install scss_lint -v 0.59.0
  scss-lint $changed
fi
