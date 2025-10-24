FROM hexpm/elixir:1.18.4-erlang-28.0.2-alpine-3.22.1 AS builder

# ENVS AND ARGS
ENV LANG="C.UTF-8" MIX_ENV="prod"
ENV CYPRESS_INSTALL_BINARY=0
ARG SENTRY_DSN=""

WORKDIR /home

ADD . .

# ALPINE PACKAGES
RUN apk update
RUN apk add build-base
RUN apk add git
RUN apk add nodejs
RUN apk add npm

# Configure Git to use HTTPS in order to avoid issues with the internal MBTA network
RUN git config --global url.https://github.com/.insteadOf git://github.com/

# ELIXIR SETUP
RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get --only prod

# NODE SETUP
RUN npm install --prefix assets --package-lock-only
RUN npm ci --prefix assets --ignore-scripts
RUN npm install --prefix assets

# COMPILE NODE ASSETS
RUN npm run --prefix assets webpack:build -- --env SENTRY_DSN=$SENTRY_DSN

# CREATE ELIXIR RELEASE
RUN mix compile
RUN mix phx.digest
RUN mix release

FROM hexpm/elixir:1.18.4-erlang-28.0.2-alpine-3.22.1

ENV PORT=4000 MIX_ENV="prod" PHX_SERVER=true TERM=xterm LANG="C.UTF-8" REPLACE_OS_VARS=true

RUN apk update
RUN apk add curl
RUN apk add libssl3

COPY --from=builder /home/_build /home/_build
COPY --from=builder /tmp/.functions /tmp/.functions

# RUN
EXPOSE 4000
CMD ["/home/_build/prod/rel/dotcom/bin/dotcom", "start"]
