FROM mcr.microsoft.com/playwright:v1.42.1-jammy

RUN apt install dumb-init -y

RUN useradd -m runner
USER runner
WORKDIR /home/runner

COPY package*.json .

RUN npm ci --ignore-scripts

RUN ./node_modules/pm2/bin/pm2 install pm2-logrotate
RUN ./node_modules/pm2/bin/pm2 set pm2-logrotate:max_size 1M
RUN ./node_modules/pm2/bin/pm2 set pm2-logrotate:rotateInterval '*/15 * * * *'
RUN ./node_modules/pm2/bin/pm2 set pm2-logrotate:compress true

COPY integration /home/runner/integration

CMD ["./node_modules/pm2/bin/pm2-runtime", "./integration/monitor/ecosystem.config.js"]
