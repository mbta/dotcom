FROM mcr.microsoft.com/playwright:v1.58.1-jammy

RUN apt-get update
RUN apt-get install dumb-init -y
# The base image's ca-certificates predates the eMudhra distrust (USN-8944-1).
RUN apt-get update && apt-get install -y --only-upgrade ca-certificates \
  && dpkg --compare-versions "$(dpkg-query -W -f='${Version}' ca-certificates)" ge 20260816ubuntu0.22.04.1

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
