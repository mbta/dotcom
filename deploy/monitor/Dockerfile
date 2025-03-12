FROM mcr.microsoft.com/playwright:v1.51.0

RUN apt-get update
RUN apt-get install dumb-init -y

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

CMD ["/usr/bin/dumb-init", "./node_modules/pm2/bin/pm2-runtime", "./integration/monitor/ecosystem.config.js"]
