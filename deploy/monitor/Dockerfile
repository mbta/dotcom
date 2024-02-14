FROM node:21-bookworm

WORKDIR /home/runner

COPY package*.json .
COPY health_checks /home/runner/health_checks
COPY monitor /home/runner/monitor
COPY scenarios /home/runner/scenarios

RUN npm ci --ignore-scripts
RUN npx playwright install chromium
RUN npx playwright install-deps

RUN ./node_modules/pm2/bin/pm2 install pm2-logrotate

CMD ["./node_modules/pm2/bin/pm2-runtime", "./monitor/ecosystem.config.js"]
