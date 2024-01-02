#!/bin/bash
set -e

#===============================================================================
# A standalone script for running Dotcom with mock data.
# Should work both locally and on CI.
# Runs Dotcom on port 8082 and mocks the API on port 8080 with Wiremock
# If run with ENABLE_RECORDING=true, it runs Wiremock with --record-mappings,
# and will overwrite some of the JSON files in test/{mappings|__files}
# with new API responses from the endpoint specified in WIREMOCK_PROXY_URL
#
# Run it like
# source ./scripts/run_mock_server.sh
# or else it'll immediately exit and shut down the server.
#===============================================================================

# When script exits, clean up processes
function cleanup() {
  error_code=$?
  printf -- '\033[31m z_z Time to go! Closing the mock server and killing leftover running processes... \033[0m\n'
  pkill -TERM -f "wiremock"
  pkill -TERM -f "mix phx.server"
  pkill -TERM -f "sleep"
  exit "${error_code}"
}
trap cleanup EXIT

# Require these variables to proceed
if [[ -z "${WIREMOCK_PROXY_URL}" ]]; then
  echo "Unable to start: Must provide WIREMOCK_PROXY_URL in environment"
  exit 1
fi

#===============================================================================
# Setting up Wiremock
#===============================================================================

export WIREMOCK_PROXY=true
export WIREMOCK_PROXY_URL="${WIREMOCK_PROXY_URL}"
export WIREMOCK_TRIP_PLAN_PROXY_URL="${WIREMOCK_TRIP_PLAN_PROXY_URL:-}"
export V3_URL=http://localhost:8080
export OPEN_TRIP_PLANNER_URL=http://localhost:8080

# Download Wiremock if not available (e.g. on CI)
if [[ ! ${OSTYPE} == "darwin"* ]] && [[ -n ${SEMAPHORE_CACHE_DIR} ]]; then
  printf -- '\033[33m Downloading Wiremock... \033[0m\n'
  wiremock_version="2.25.1"
  mkdir -p "${SEMAPHORE_CACHE_DIR}"/wiremock
  if [[ ! -f ${SEMAPHORE_CACHE_DIR}/wiremock/wiremock-standalone-${wiremock_version}.jar ]]; then
    cd "${SEMAPHORE_CACHE_DIR}"/wiremock && curl -O https://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/${wiremock_version}/wiremock-standalone-${wiremock_version}.jar && cd -
  fi
  export WIREMOCK_PATH="${SEMAPHORE_CACHE_DIR}"/wiremock/wiremock-standalone-${wiremock_version}.jar
fi

#===============================================================================
# Setting up the Phoenix server with production settings, without real data
#===============================================================================

export MIX_ENV=prod
export SENTRY_REPORTING_ENV="test"
export PORT=8082
export WARM_CACHES=false # Don't expect cached data in this case
export REACT_BUILD_PATH=react_renderer/dist/app.js
export USE_SERVER_SENT_EVENTS=false # Used to disable events in Vehicles.Stream
export STATIC_SCHEME=http
export STATIC_PORT=8082
export DRUPAL_ROOT="${DRUPAL_ROOT:=http://www.cms.example}"

#===============================================================================
# Running Wiremock, optionally with recording
#===============================================================================

if [[ "${ENABLE_RECORDING:-}" = "true" ]]; then
  printf -- '\033[33m [Wiremock] Starting (recording responses) \033[0m\n'
  java -jar "${WIREMOCK_PATH}" --root-dir=test --global-response-templating \
    --record-mappings >>/dev/null 2>&1 &
else
  printf -- '\033[33m [Wiremock] Starting \033[0m\n'
  java -jar "${WIREMOCK_PATH}" --root-dir=test --global-response-templating \
    >>/dev/null 2>&1 &
fi

#===============================================================================
# Running the Phoenix server, supressing the output
#===============================================================================

printf -- '\033[33m [Phoenix] Starting server \033[0m\n'
mix phx.server >>/dev/null 2>&1 &

#===============================================================================
# Wait for both to be running before proceeding
#===============================================================================
wiremock_iterations=0
printf '\033[34m [Wiremock] Waiting on port 8080 .\033[0m'
until curl -X GET -H "X-WM-Proxy-Url: ${WIREMOCK_PROXY_URL}" \
  --output /dev/null --silent --head --fail http://localhost:8080/alerts/; do
  if [ "$wiremock_iterations" -ge 5 ]; then
    printf -- '\033[31m x_x failed \033[0m\n'
    exit 1
  fi
  ((wiremock_iterations++))
  printf '.'
  sleep 1
done
printf -- '\033[92m ^_^ running \033[0m\n'

phoenix_iterations=0
printf '\033[34m [Phoenix] Waiting on port 8082 .\033[0m'
until curl --output /dev/null --silent --head --fail \
  http://localhost:8082/_health; do
  if [ "$phoenix_iterations" -ge 20 ]; then
    printf -- '\033[31m [Phoenix] x_x failed \033[0m\n'
    exit 1
  fi
  ((phoenix_iterations++))
  printf '.'
  sleep 1
done
printf -- '\033[92m ^_^ running \033[0m\n'

printf -- '\033[95m \^_^/ Setup complete! \n Mocked server up and ready for requests on http://localhost:8082\033[0m\n\n'
