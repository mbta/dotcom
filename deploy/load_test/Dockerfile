FROM debian:trixie-20260223-slim

WORKDIR /app

RUN apt-get update && apt-get install -y curl git make build-essential inotify-tools nodejs npm

RUN npm install -g artillery@2.0.30
COPY ../../integration/load_tests/homepage-heavy-load.yml ./test.yml

CMD npx artillery run -e ${ENVIRONMENT} ./test.yml
