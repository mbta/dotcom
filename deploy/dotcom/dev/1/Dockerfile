FROM hexpm/elixir:1.17.0-erlang-27.0-debian-buster-20240513-slim

RUN apt-get update && apt-get install -y curl git make build-essential inotify-tools
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app

COPY mix.exs .
COPY mix.lock .
COPY config .
COPY package.json .
COPY assets/package.json ./assets/package.json
COPY assets/webpack.config* .

RUN mix local.hex --force
RUN mix local.rebar --force

EXPOSE 4001

CMD mix deps.get \
     && npm --prefix assets install --package-lock-only --ignore-scripts --no-save --audit false --fund false --loglevel verbose \
     && elixir --sname dotcom1 --cookie foobarbaz -S mix phx.server
