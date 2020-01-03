#!/usr/bin/env bash
set -e

# Note: Must be done in this order, since some Elixir macros generate code from
# the contents of built frontend assets (e.g. SVG files)
npm run react:build
npm run webpack:build
mix compile --warnings-as-errors
