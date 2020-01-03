#!/usr/bin/env bash
set -e
MIX_ENV=test mix coveralls.json -u --exclude=wallaby
bash <(curl -s https://codecov.io/bash) -t $CODECOV_UPLOAD_TOKEN
