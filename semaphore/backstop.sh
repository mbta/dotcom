#!/usr/bin/env bash

# TODO: Deprecate Backstop in favor of a newer visual regression test 

# Do exit on failure at this point
set -e

# Ensure build is up to date
npm run webpack:build

# trigger change 

# Start the server
source ./semaphore/run_mock_server.sh

# Do not exit on failure at this point (so s3 file uploads in CI)
set +e

if npm run backstop:test
then
  echo "Backstop tests passed!"
  exit 0
else
  echo "Some tests failed."
  # If in CI, upload backstop data to S3
  if [[ -n $SEMAPHORE_CACHE_DIR ]]; then
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    FILENAME="$BRANCH.tar.gz"
    tar -czvf "$FILENAME" apps/site/test/backstop_data
    LINK=$(curl -F "file=@$FILENAME" https://file.io/\?expires=1d | jq -r .link)
    echo "Backstop report located at $LINK, available for 1 day for a single download."
  fi
  exit 1
fi
