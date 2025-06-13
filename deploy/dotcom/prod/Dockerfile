###
# Three-stage Dockerfile
###

# 1.) Get the Elixir dependencies within an Elixir container
FROM hexpm/elixir:1.18.3-erlang-27.3.3-debian-buster-20240612-slim AS elixir-builder

ENV LANG="C.UTF-8" MIX_ENV="prod" REPLACE_OS_VARS=true



# Debian dependencies
RUN apt-get update --allow-releaseinfo-change && apt-get install -y curl git make build-essential

# Configure Git to use HTTPS in order to avoid issues with the internal MBTA network
RUN git config --global url.https://github.com/.insteadOf git://github.com/

# Install Hex+Rebar
RUN mix local.hex --force && \
	mix local.rebar --force

WORKDIR /root

COPY mix.exs mix.exs
COPY mix.lock mix.lock

RUN mix deps.get --only prod

COPY config config

RUN mix deps.compile


# 2) Build the frontend assets within a node.js container instead of installing node/npm
FROM node:18.17.1-buster AS assets-builder

# Stop cypress from downloading it's massive binary.
ENV CYPRESS_INSTALL_BINARY=0

ARG SENTRY_DSN=""

WORKDIR /root

COPY assets assets
COPY priv/static priv/static

# copy in Elixir deps required to build node modules for Phoenix
COPY --from=elixir-builder /root/deps deps
RUN npm ci --ignore-scripts --prefix assets -S -install-links deps/mbta_metro/priv/

# required so that Tailwind styles used in Elixir templates are built
COPY lib/dotcom_web/ lib/dotcom_web
# Compile JS/CSS to priv/static
RUN npm --prefix assets run webpack:build -- --env SENTRY_DSN=$SENTRY_DSN

# 3) now, build the application back in the Elixir container
FROM elixir-builder AS app-builder

WORKDIR /root

ENV MIX_ENV="prod" REPLACE_OS_VARS=true

COPY lib lib
COPY priv priv
COPY --from=assets-builder /root/assets assets
COPY --from=assets-builder /root/priv/static priv/static

# re-compile the application after the assets are copied, since some of them
# are built into the application (SVG icons)
RUN mix compile --no-deps-check --no-app-loading
RUN mix phx.digest
RUN mix sentry.package_source_code --no-compile --no-deps-check

COPY config/runtime.exs config
COPY rel rel

RUN mix release

# --- Set up runtime container ---
FROM hexpm/elixir:1.18.3-erlang-27.3.3-debian-buster-20240612-slim

RUN apt-get update --allow-releaseinfo-change && \
  apt-get upgrade -y --no-install-recommends && \
  apt-get install -y --no-install-recommends \
    ca-certificates curl dumb-init libssl1.1 libsctp1 && \
  rm -rf /var/lib/apt/lists/*

# Set exposed ports
EXPOSE 4000
ENV PORT=4000 MIX_ENV="prod" PHX_SERVER=true TERM=xterm LANG="C.UTF-8" REPLACE_OS_VARS=true

WORKDIR /root

COPY --from=app-builder /root/priv/static ./priv/static
COPY --from=app-builder /root/_build/prod/rel/dotcom .

ENTRYPOINT ["/usr/bin/dumb-init", "/root/bin/dotcom"]
CMD ["start"]
