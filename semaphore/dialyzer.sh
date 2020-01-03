#!/usr/bin/env bash
set -e

# Add even more swap space (2GB => 4GB). This is not part of the shared setup
# script because other CI tasks (e.g. Backstop) need the extra disk space.
sudo swapoff -a
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096
sudo mkswap /swapfile
sudo swapon /swapfile

# FIXME: Workaround for Dialyzer errors in test environment. Once we fix these,
#        can delete this block and add `build_app.sh` to the CI task instead.
export MIX_ENV=dev
npm run webpack:build
mix compile --warnings-as-errors
# /FIXME

export ERL_CRASH_DUMP=/dev/null
PLT_CACHE=$SEMAPHORE_CACHE_DIR/plt

# Restore cached PLTs, rebuild them if needed, then store them back in cache
mkdir -p "$PLT_CACHE"
cp "$PLT_CACHE"/*.plt* _build/$MIX_ENV || :
mix dialyzer --plt
cp _build/$MIX_ENV/*.plt* "$PLT_CACHE"

# Dialyze it!
/usr/bin/time -v mix dialyzer --no-check --halt-exit-status
