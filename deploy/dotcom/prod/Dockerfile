# syntax=docker/dockerfile:1

FROM hexpm/elixir:1.20.4-erlang-29.0.6-alpine-3.23.5 AS builder

# Keep build tools and dependencies in this stage; the runtime stage receives
# generated artifacts only.
WORKDIR /home

ENV LANG="C.UTF-8" MIX_ENV="prod"
ENV CYPRESS_INSTALL_BINARY=0

# Install system build tools together. BuildKit keeps downloaded Alpine packages
# between builds without adding the package cache to the image.
RUN --mount=type=cache,target=/etc/apk/cache,sharing=locked \
  apk add build-base git nodejs npm

# Configure Git to use HTTPS in order to avoid issues with the internal MBTA network.
RUN git config --global url.https://github.com/.insteadOf git://github.com/

# Install Elixir dependencies before copying application source so code changes
# do not invalidate this dependency layer.
COPY mix.exs mix.lock ./
RUN mix local.hex --force && \
  mix local.rebar --force
RUN --mount=type=cache,target=/root/.hex \
  mix deps.get --only prod

# Compile dependencies while only dependency manifests and configuration are
# present, so application source changes can reuse their compiled artifacts.

RUN mix deps.compile --only prod

# The asset lockfile is refreshed against the locally fetched Phoenix packages,
# then dependencies are installed using a reusable npm download cache.
COPY assets/package.json assets/package-lock.json ./assets/
RUN --mount=type=cache,target=/root/.npm \
  npm install --prefix assets --package-lock-only && \
  npm ci --prefix assets --ignore-scripts && \
  npm install --prefix assets

# Copy frequently changing application files only after dependency installation.
COPY assets ./assets
COPY priv ./priv

# Only asset compilation depends on this build argument, so changing the Sentry
# DSN does not invalidate dependency installation.
ARG SENTRY_DSN=""
RUN npm run --prefix assets webpack:build -- --env SENTRY_DSN=$SENTRY_DSN

# Copy frequently changing application files only after dependency installation.
COPY config ./config
COPY lib ./lib
COPY rel ./rel

# Compile the app, digest its assets, and assemble the production release.
RUN mix compile && \
  mix phx.digest && \
  mix release

FROM hexpm/elixir:1.20.4-erlang-29.0.6-alpine-3.23.5

ENV PORT=4000 MIX_ENV="prod" PHX_SERVER=true TERM=xterm LANG="C.UTF-8" REPLACE_OS_VARS=true

# Keep the runtime image limited to the packages required by the running app.
RUN --mount=type=cache,target=/etc/apk/cache,sharing=locked \
  apk add curl libssl3

# Preserve the release path used by both the entrypoint and asset-upload workflow.
COPY --from=builder /home/_build /home/_build

ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=${SENTRY_RELEASE}

EXPOSE 4000
CMD ["/home/_build/prod/rel/dotcom/bin/dotcom", "start"]
