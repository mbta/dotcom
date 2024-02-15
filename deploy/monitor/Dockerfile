FROM node:21-bookworm

WORKDIR /home/runner

COPY package*.json .

RUN npm ci --ignore-scripts
RUN npx playwright install chromium
RUN npx playwright install-deps

RUN ./node_modules/pm2/bin/pm2 install pm2-logrotate

COPY integration /home/runner/integration

CMD ["./node_modules/pm2/bin/pm2-runtime", "./integration/monitor/ecosystem.config.js"]
