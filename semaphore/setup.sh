set -e
ELIXIR_VERSION=1.8.1
ERLANG_VERSION=21

mkdir -p $SEMAPHORE_CACHE_DIR/gems $SEMAPHORE_CACHE_DIR/npm $SEMAPHORE_CACHE_DIR/mix

SERVICES="apache2 cassandra docker elasticsearch memcached mongod mysql postgresql sphinxsearch rabbitmq-server redis-server"
# Turn off some high-memory apps
for service in $SERVICES; do
    sudo service $service stop
done
killall Xvfb

# Add more swap memory. Default is ~200m, make it 2G
sudo swapoff -a
sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
sudo mkswap /swapfile
sudo swapon /swapfile

export MIX_HOME=$SEMAPHORE_CACHE_DIR/mix

. /home/runner/.kerl/installs/$ERLANG_VERSION/activate
if ! kiex use $ELIXIR_VERSION; then
    kiex install $ELIXIR_VERSION
    kiex use $ELIXIR_VERSION
fi

# retry setup if it fails
n=0
until [ $n -ge 3 ]; do
    MIX_ENV=test mix do local.hex --force, local.rebar --force, deps.get && break
    n=$[$n+1]
    sleep 3
done

nvm use 8.15.0
npm install -g npm@6.7.0
echo npm version is `npm -v`

# set cache dir for node
npm config set cache $SEMAPHORE_CACHE_DIR/npm
NODEJS_ORG_MIRROR=$NVM_NODEJS_ORG_MIRROR npm run ci-install --no-optional

npm run webpack:build
npm run react:setup
npm run react:build

mix format --check-formatted
