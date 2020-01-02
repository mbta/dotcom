#!/usr/bin/env bash

# https://stackoverflow.com/a/17841619
function join_by {
  local d=$1; shift; echo -n "$1"; shift; printf "%s" "${@/#/$d}";
}

changed=$(git diff --name-only origin/master "*.ex" "*.exs")

if [ -z "$changed" ]; then
  echo "No files changed from origin/master."
else
  # Since Credo doesn't support running checks only on specified files via the
  # command line, we create a temporary copy of the config file whose `included`
  # contains only the files that have changed.
  replace=$(join_by \",\" $changed)
  cp config/.credo.exs config/.changed.exs
  sed -i.bak -e "s:apps/:$replace:" config/.changed.exs
  MIX_ENV=test mix credo --config-file config/.changed.exs
  exit=$?
  rm config/.changed.exs config/.changed.exs.bak
  exit $exit
fi
