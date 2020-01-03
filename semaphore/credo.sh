#!/usr/bin/env bash

# https://stackoverflow.com/a/17841619
function join_by {
  local d=$1; shift; echo -n "$1"; shift; printf "%s" "${@/#/$d}";
}

fork_point=$(git merge-base --fork-point origin/master)
changed=$(git diff --name-only "$fork_point" "*.ex" "*.exs")

if [ -z "$changed" ]; then
  echo "No Elixir files changed relative to origin/master fork point."
else
  # Since Credo doesn't support running checks only on specified files via the
  # command line, we create a temporary copy of the config file whose `included`
  # contains only the files that have changed.
  replace=$(join_by \",\" "$changed")
  sed -e "s:apps/:$replace:" < config/.credo.exs > /tmp/.credo.exs
  mix credo --config-file /tmp/.credo.exs
fi
