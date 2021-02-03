#!/usr/bin/env bash
set -e

function kill_processes () {
  error_code=$?
  printf -- '\033[31m Killing running processes \033[0m\n';
  pkill -TERM -f "wiremock"
  echo "Killing $SERVER_PID"
  pkill -TERM -P "$SERVER_PID"
  printf -- "DONE.\nExiting with error code %s.\n\n" "${error_code}";
  exit ${error_code};
}

# When script exits, clean up processes
trap kill_processes EXIT

function run_wiremock () {
  if [[ "${ENABLE_RECORDING:-}" = "true" ]]; then
  printf -- '\033[32m Mock API: start (record responses) \033[0m\n';
    npm run wiremock:record &
  else
  printf -- '\033[32m Mock API: start \033[0m\n';
    npm run wiremock &
  fi
}

function run_server () {
  if [[ "${ENABLE_RECORDING:-}" = "true" ]]; then
    printf -- '\033[32m Mock server: start (recording responses) \033[0m\n';
    SENTRY_REPORTING_ENV="test" npm run server:mocked:record 1>/dev/null 2>/dev/null &
  else
    printf -- '\033[32m Mock server: start \033[0m\n';
    SENTRY_REPORTING_ENV="test" npm run server:mocked 1>/dev/null 2>/dev/null &
  fi
  SERVER_PID=$!
}

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

run_server

until curl --output /dev/null --silent --head --fail http://localhost:8082/_health; do
  printf 'waiting for phoenix server...\n'
  sleep 5
done
printf -- '\033[32m Mock API: running \033[0m\n';

until curl -X GET -H "X-WM-Proxy-Url: https://dev.api.mbtace.com" --output /dev/null --silent --head --fail http://localhost:8080/alerts/; do
  printf 'waiting for wiremock server...\n'
  sleep 5
done
printf -- '\033[32m Mock Server: running \033[0m\n';

printf -- '\033[32m Setup complete! \033[0m\n';

printf -- 'Start taking screenshots... \n';

# Do not exit on failure at this point
# set +e

npm config set unsafe-perm true
npm run screenshots

exit 0
