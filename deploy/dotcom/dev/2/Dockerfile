FROM hexpm/elixir:1.16.1-erlang-26.2.2-debian-buster-20240130

RUN apt-get update && apt-get install -y curl git make build-essential inotify-tools
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app

CMD mix deps.get && mix phx.server
