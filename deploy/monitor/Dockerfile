FROM node:21-bookworm

WORKDIR /home/runner

COPY package*.json .
COPY monitor /home/runner/monitor
COPY scenarios /home/runner/scenarios
COPY deploy/monitor/entrypoint .

RUN npm run install:monitor
RUN npx playwright install chromium
RUN npx playwright install-deps
