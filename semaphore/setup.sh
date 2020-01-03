#!/usr/bin/env bash
set -e

# Turn off some high-memory services
SERVICES="apache2 cassandra docker elasticsearch memcached mongod mysql \
  postgresql sphinxsearch rabbitmq-server redis-server"
for service in $SERVICES; do sudo service "$service" stop; done
killall Xvfb

# Free up some disk space since we use a lot of swap and our repo is huge
# (per Semaphore support, this should fix issues with the cache not persisting)
sudo tune2fs -m 1 /dev/dm-0
rm -rf ~/.kiex ~/.lein ~/.kerl ~/.phpbrew ~/.sbt

# Add more swap space (~200MB => 2GB)
sudo swapoff -a
sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
sudo mkswap /swapfile
sudo swapon /swapfile

# Ensure cache directories exist
CACHE=$SEMAPHORE_CACHE_DIR
mkdir -p "$CACHE/asdf/installs" "$CACHE/gems" "$CACHE/mix/deps" "$CACHE/npm"

export MIX_ENV=test
export MIX_DEPS_PATH=$CACHE/mix/deps
export GEM_HOME=$CACHE/gems

# Install asdf and link cached languages
ASDF_GIT=https://github.com/asdf-vm/asdf.git
git clone $ASDF_GIT ~/.asdf --branch v0.7.6
ln -s "$CACHE/asdf/installs" ~/.asdf/installs
source ~/.asdf/asdf.sh

# Add asdf plugins and install languages
asdf plugin-add erlang
asdf plugin-add elixir
asdf plugin-add nodejs
asdf plugin-add ruby
~/.asdf/plugins/nodejs/bin/import-release-team-keyring
asdf install
asdf reshim # Needed to pick up languages that were already installed in cache

# Fetch Elixir dependencies
#   Note: Must be done before NPM, since some NPM packages are installed from
#   files inside Elixir packages
mix local.hex --force
mix local.rebar --force
mix deps.get

# Fetch Node dependencies
#   Note: Must be done before compiling Elixir apps, since some Elixir macros
#   require frontend assets to be present at compile time
npm config set cache "$CACHE/npm"
npm run install:ci
npm run react:setup:ci
