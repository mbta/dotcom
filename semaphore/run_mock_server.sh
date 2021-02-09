#!/bin/bash
set -e

#===============================================================================
# A standalone script for running Dotcom with mock data.
# Shold work both locally and on CI.
# Runs Dotcom on port 8082 and mocks the API on port 8080 with Wiremock
# If run with ENABLE_RECORDING=true, it runs Wiremock with --record-mappings,
# and will overwrite some of the JSON files in apps/site/test/{mappings|__files}
# with new API responses from the endpoint specified in WIREMOCK_PROXY_URL
#
# Run it like
# bash ./semaphore/run_mock_server.sh &
# or else it'll immediately exit and shut down the server.
#===============================================================================

# When script exits, clean up processes
function cleanup () {
  error_code=$?
  printf -- '\033[35m :( Killing running processes... \033[0m\n'
  pkill -TERM -f "wiremock"
  pkill -TERM -f "mix phx.server"
  pkill -TERM -f "sleep"
  printf -- '\033[35m DONE.\nExiting....\n\n \033[0m\n'
  exit "${error_code}";
}
trap cleanup ERR EXIT SIGINT SIGTERM

#===============================================================================
# Setting up Wiremock
#===============================================================================

export WIREMOCK_PROXY=true
export WIREMOCK_PROXY_URL="${WIREMOCK_PROXY_URL:=https://dev.api.mbtace.com}"
export WIREMOCK_TRIP_PLAN_PROXY_URL="${WIREMOCK_TRIP_PLAN_PROXY_URL:=https://dev.otp.mbtace.com}"
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
export REACT_BUILD_PATH=apps/site/react_renderer/dist/app.js 
export USE_SERVER_SENT_EVENTS=false # Used to disable events in Vehicles.Stream
export STATIC_SCHEME=http
export STATIC_PORT=8082 
export DRUPAL_ROOT="${DRUPAL_ROOT:=https://live-mbta.pantheonsite.io}"

#===============================================================================
# Running Wiremock, optionally with recording
#===============================================================================

cd apps/site
if [[ "${ENABLE_RECORDING:-}" = "true" ]]; then
  printf -- '\033[36m [Wiremock] Starting (recording responses) \033[0m\n'
  java -jar "${WIREMOCK_PATH}" --root-dir=test --global-response-templating \
    --record-mappings 1>/dev/null 2>/dev/null &
else
  printf -- '\033[36m [Wiremock] Starting \033[0m\n'
  java -jar "${WIREMOCK_PATH}" --root-dir=test --global-response-templating \
    1>/dev/null 2>/dev/null &
fi
cd - 1>/dev/null

#===============================================================================
# Running the Phoenix server, supressing the output
#===============================================================================

printf -- '\033[36m [Phoenix] Starting server \033[0m\n'
mix phx.server 1>/dev/null 2>/dev/null &

#===============================================================================
# Wait for both to be running before proceeding
#===============================================================================
wiremock_iterations=0
printf '\033[34m [Wiremock] Waiting on port 8080 .\033[0m'
until curl -X GET -H "X-WM-Proxy-Url: https://dev.api.mbtace.com" \
  --output /dev/null --silent --head --fail http://localhost:8080/alerts/; do
  if [ "$wiremock_iterations" -ge 4 ]; then break; fi
  ((wiremock_iterations++))
  printf '.'
  sleep 1
done
printf -- '\033[32m \342\234\224 mock API is running \033[0m\n'

phoenix_iterations=0
printf '\033[34m [Phoenix] Waiting on port 8082 .\033[0m'
until curl --output /dev/null --silent --head --fail \
  http://localhost:8082/_health; do
  if [ "$phoenix_iterations" -ge 20 ]; then break; fi
  ((phoenix_iterations++))
  printf '.'
  sleep 1
done
printf -- '\033[32m \342\234\224 application server is running \033[0m\n'

sleep 10
printf -- '\033[36m Setup complete! \033[0m\n'
