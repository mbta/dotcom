###
# Three-stage Dockerfile
###

# 1.) Get the Elixir dependencies within an Elixir container
FROM hexpm/elixir:1.10.3-erlang-22.3.4.17-debian-buster-20210326 as elixir-builder

ENV LANG="C.UTF-8" MIX_ENV="prod"

WORKDIR /root
ADD . .

# Debian dependencies
RUN apt-get update && apt-get install -y curl git make build-essential

# Configure Git to use HTTPS in order to avoid issues with the internal MBTA network
RUN git config --global url.https://github.com/.insteadOf git://github.com/

# Install Hex+Rebar
RUN mix local.hex --force && \
mix local.rebar --force

RUN mix do deps.get


# 2.) Build the frontend assets within a node.js container instead of installing node/npm
FROM node:14.15.1-buster as assets-builder

ARG SENTRY_DSN=""

WORKDIR /root
ADD . .

# copy in Elixir deps required to build node modules for Phoenix
COPY --from=elixir-builder /root/deps ./deps

WORKDIR /root/apps/site/assets/
RUN npm install
RUN npm run webpack:build -- --env.SENTRY_DSN=$SENTRY_DSN

WORKDIR /root/apps/site/react_renderer/
RUN npm install && npx webpack

# now, build the application back in the Elixir container
FROM elixir-builder as app-builder

WORKDIR /root

# Add frontend assets compiled in the node container, required by phx.digest
COPY --from=assets-builder /root/apps/site/priv/static ./apps/site/priv/static

WORKDIR /root/apps/site/
RUN mix do deps.compile
RUN mix phx.digest

WORKDIR /root
RUN mix distillery.release --verbose


# 3.) Use the nodejs container for the runtime environment
# Since we're server-rendering the React templates, we need a Javascript engine running inside the container.
FROM node:14.15.1-buster

# Set exposed ports
EXPOSE 4000

ENV PORT=4000 MIX_ENV="prod" TERM=xterm LANG="C.UTF-8" REPLACE_OS_VARS=true

# erlang-crypto requires system library libssl1.1
RUN apt-get update && apt-get install -y --no-install-recommends \
	libssl1.1 libsctp1 curl \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /root
ADD . .

COPY --from=app-builder /root/_build/prod/rel /root/rel

ADD rel/bin/startup /root/rel/site/bin/startup

RUN mkdir /root/work

WORKDIR /root/work

# run the application
CMD ["/root/rel/site/bin/startup", "foreground"]
