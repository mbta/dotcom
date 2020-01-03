#!/usr/bin/env bash
set -e

for i in {1..2}
do
  if mix test --only=wallaby
  then
    echo "Wallaby tests passed!"
    exit 0
  else
    echo "Run $i failed"
    # If not in CI, only run once
    if [[ -z $SEMAPHORE_CACHE_DIR ]]; then
      break
    fi
  fi
done
