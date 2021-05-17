FROM hexpm/elixir:1.10.3-erlang-22.3.3-debian-stretch-20200224

WORKDIR /root

ARG SENTRY_DSN=""

# Debian dependencies
RUN apt-get update && apt-get install -y curl git make build-essential

# Install node/npm
# Instructions from https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
  apt-get install -y nodejs

# Clean up
RUN apt-get clean

ENV MIX_ENV=prod

# Configure Git to use HTTPS in order to avoid issues with the internal MBTA network
RUN git config --global url.https://github.com/.insteadOf git://github.com/

# Install Hex+Rebar
RUN mix local.hex --force && \
  mix local.rebar --force

ADD . .

WORKDIR /root/apps/site/
RUN mix do deps.get, deps.compile

WORKDIR /root/apps/site/assets/
RUN npm install
RUN npm run webpack:build -- --env.SENTRY_DSN=$SENTRY_DSN

WORKDIR /root/apps/site/react_renderer/
RUN npm install && npx webpack

WORKDIR /root/apps/site/
RUN mix phx.digest

WORKDIR /root
RUN mix distillery.release --verbose
