FROM node:21-bookworm

WORKDIR /home/runner

COPY package*.json .
COPY monitor /home/runner/monitor
COPY scenarios /home/runner/scenarios
COPY deploy/monitor/ /home/runner/deploy/monitor

RUN npm ci
RUN npx playwright install chromium
RUN npx playwright install-deps
