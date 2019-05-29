#/usr/bin/env bash
set -e

# run javascript  tests
cd apps/site/assets && npm test && cd -
