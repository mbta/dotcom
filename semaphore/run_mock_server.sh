#!/bin/bash
set -e

function clean_up_running_processes () {
  error_code=$?
  printf -- '\033[35m Killing running processes... \033[0m\n';
  pkill -TERM -f "wiremock"
  pkill -TERM -P "$SERVER_PID"
  printf -- '\033[35m DONE.\nExiting with error code %s.\n\n \033[0m\n' "${error_code}";
  exit ${error_code};
}

# When script exits, clean up processes
trap clean_up_running_processes ERR SIGINT SIGTERM KILL

function run_wiremock () {
  if [[ "${ENABLE_RECORDING:-}" = "true" ]]; then
  printf -- '\033[36m Mock API: start (record responses) \033[0m\n';
    npm run wiremock:record &
  else
  printf -- '\033[36m Mock API: start \033[0m\n';
    npm run wiremock &
  fi
}

# Start running the mock server
if [[ "${ENABLE_RECORDING:-}" = "true" ]]; then
  printf -- '\033[36m Mock server: start (recording responses) \033[0m\n';
  SENTRY_REPORTING_ENV="test" npm run server:mocked:record 1>/dev/null 2>/dev/null &
else
  printf -- '\033[36m Mock server: start \033[0m\n';
  SENTRY_REPORTING_ENV="test" npm run server:mocked 1>/dev/null 2>/dev/null &
fi
SERVER_PID=$!

# OSX
if [[ ${OSTYPE} == "darwin"* ]]; then
  run_wiremock
else
# Linux
  # CI
  if [[ -n ${SEMAPHORE_CACHE_DIR} ]]; then
    printf -- '\033[33m Setting up Wiremock... \033[0m\n';
    wiremock_version="2.25.1"
    mkdir -p "${SEMAPHORE_CACHE_DIR}"/wiremock
    if [[ ! -f ${SEMAPHORE_CACHE_DIR}/wiremock/wiremock-standalone-${wiremock_version}.jar ]]; then
      cd "${SEMAPHORE_CACHE_DIR}"/wiremock && curl -O https://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/${wiremock_version}/wiremock-standalone-${wiremock_version}.jar && cd -
    fi
    export WIREMOCK_PATH="${SEMAPHORE_CACHE_DIR}"/wiremock/wiremock-standalone-${wiremock_version}.jar 
  fi

  run_wiremock
fi

until curl -X GET -H "X-WM-Proxy-Url: https://dev.api.mbtace.com" --output /dev/null --silent --head --fail http://localhost:8080/alerts/; do
  printf '\033[34m Waiting for Wiremock server on port 8080... \033[0m\n';
  sleep 5
done
printf -- '\033[32m Mock API: running \033[0m\n';

until curl --output /dev/null --silent --head --fail http://localhost:8082/_health; do
  printf '\033[34m Waiting for Phoenix server on port 8082... \033[0m\n';
  sleep 5
done
printf -- '\033[32m Mock Server: running \033[0m\n';

printf -- '\033[36m Setup complete! \033[0m\n';

exit 0;
