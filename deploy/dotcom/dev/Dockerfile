FROM hexpm/elixir:1.18.4-erlang-28.0.2-debian-trixie-20250811-slim

RUN apt-get update && apt-get install -y curl git make build-essential inotify-tools
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app

COPY mix.exs .
COPY mix.lock .
COPY package.json .
COPY assets/package.json ./assets/package.json
COPY assets/package-lock.json ./assets/package-lock.json

RUN mix local.hex --force
RUN mix local.rebar --force

RUN mix deps.get
RUN mix deps.compile
RUN npm install --prefix assets --omit=optional --audit false --fund false --loglevel verbose --ignore-scripts

CMD mix deps.get && elixir --name $NAME --cookie foobarbaz -S mix phx.server
