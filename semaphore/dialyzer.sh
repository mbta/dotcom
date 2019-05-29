#/usr/bin/env bash
set -e

# Add more swap memory. Default is ~200m, our setup made it 2G, now make it 4G
sudo swapoff -a
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096
sudo mkswap /swapfile
sudo swapon /swapfile

mix compile --force --warnings-as-errors

# copy any pre-built PLTs to the right directory
find $SEMAPHORE_CACHE_DIR -name "dialyxir_*_deps-dev.plt*" | xargs -I{} cp '{}' _build/dev

export ERL_CRASH_DUMP=/dev/null
mix dialyzer --plt

# copy build PLTs back
cp _build/dev/*_deps-dev.plt* $SEMAPHORE_CACHE_DIR

/usr/bin/time -v mix dialyzer --halt-exit-status
