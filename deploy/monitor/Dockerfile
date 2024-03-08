FROM node:21-bookworm

WORKDIR /home/runner

COPY package*.json .

ENV PLAYWRIGHT_BROWSERS_PATH=0
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

RUN npx playwright install chromium --with-deps
RUN npm ci --ignore-scripts

RUN ./node_modules/pm2/bin/pm2 install pm2-logrotate
RUN ./node_modules/pm2/bin/pm2 set pm2-logrotate:max_size 1M
RUN ./node_modules/pm2/bin/pm2 set pm2-logrotate:rotateInterval '*/15 * * * *'
RUN ./node_modules/pm2/bin/pm2 set pm2-logrotate:compress true

COPY integration /home/runner/integration

CMD ["./node_modules/pm2/bin/pm2-runtime", "./integration/monitor/ecosystem.config.js"]
