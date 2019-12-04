#!/usr/bin/env bash
function kill_processes () {
  pkill -TERM -f "wiremock"
  echo "Killing $SERVER_PID"
  pkill -TERM -P "$SERVER_PID"
}

# When script exits, clean up processes
trap kill_processes EXIT

# OSX
if [[ $OSTYPE == "darwin"* ]]; then
  DOCKER_INTERNAL_IP="host.docker.internal"
  # Ensure build is up to date
  npm run webpack:build
  npm run wiremock &
else
# Linux
  sudo apt-get install jq
  DOCKER_INTERNAL_IP="127.0.0.1"
  echo "Replacing host.docker.internal with $DOCKER_INTERNAL_IP"
  sed -r -e "s/host.docker.internal/$DOCKER_INTERNAL_IP/" -i'' package.json
  sed -r -e "s/host.docker.internal/$DOCKER_INTERNAL_IP/" -i'' apps/site/test/backstop.json
  sudo service docker start
  # CI
  if [[ -n $SEMAPHORE_CACHE_DIR ]]; then
    mkdir -p "$SEMAPHORE_CACHE_DIR"/wiremock
    if [[ ! -f $SEMAPHORE_CACHE_DIR/wiremock/wiremock-standalone-2.14.0.jar ]]; then
      cd "$SEMAPHORE_CACHE_DIR"/wiremock && curl -O http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/2.14.0/wiremock-standalone-2.14.0.jar && cd -
    fi
    WIREMOCK_PATH=$SEMAPHORE_CACHE_DIR/wiremock/wiremock-standalone-2.14.0.jar npm run wiremock &
  else
    npm run wiremock &
  fi
fi

# Do exit on failure at this point
set -e

SENTRY_REPORTING_ENV="test" npm run server:mocked:nocompile 1>/dev/null 2>/dev/null &
SERVER_PID=$!

until curl --output /dev/null --silent --head --fail http://localhost:8082/_health; do
  printf 'waiting for phoenix server...\n'
  sleep 5
done

until curl -X GET --output /dev/null --silent --head --fail http://localhost:8080/alerts/; do
  printf 'waiting for wiremock server...\n'
  sleep 5
done

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
    LINK=$(curl -F "file=@$FILENAME" https://file.io/\?expires\=1d | jq -r .link)
    echo "Backstop report located at $LINK, available for 1 day for a single download."
  fi
  exit 1
fi
