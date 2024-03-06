FROM node:21-bookworm

WORKDIR /home/runner

COPY package*.json .

RUN npm ci --ignore-scripts
RUN npx playwright install chromium
RUN npx playwright install-deps

RUN ./node_modules/pm2/bin/pm2 install pm2-logrotate
RUN ./node_modules/pm2/bin/pm2 set pm2-logrotate:max_size 1M
RUN ./node_modules/pm2/bin/pm2 set pm2-logrotate:rotateInterval '*/15 * * * *'
RUN ./node_modules/pm2/bin/pm2 set pm2-logrotate:compress true

COPY integration /home/runner/integration

CMD ["./node_modules/pm2/bin/pm2-runtime", "./integration/monitor/ecosystem.config.js"]
