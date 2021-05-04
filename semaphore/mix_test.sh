#!/usr/bin/env bash
set -e
mix coveralls.json -u --exclude=wallaby
