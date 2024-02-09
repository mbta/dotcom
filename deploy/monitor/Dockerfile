FROM node:21-bookworm

WORKDIR /home/runner

COPY package*.json .
COPY monitor /home/runner/monitor
COPY scenarios /home/runner/scenarios

RUN npm ci --ignore-scripts
RUN npx playwright install chromium
RUN npx playwright install-deps

CMD ["node", "monitor/all-scenarios.js"]
