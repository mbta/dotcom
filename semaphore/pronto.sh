#/usr/bin/env bash
set -e

gem install pronto -v 0.9.5
gem install pronto-scss -v 0.9.1
gem install pronto-credo -v 0.0.8

# run pronto
MIX_ENV=test pronto run -f github github_status -c origin/master
npm run format:check
npm run tslint

# Make sure static build happened
test -f apps/site/priv/static/css/app.css && test -f apps/site/priv/static/js/app.js
