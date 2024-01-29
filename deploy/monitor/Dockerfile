FROM node:21-bookworm

WORKDIR /home/runner

COPY package*.json .
COPY monitor /home/runner/monitor
COPY scenarios /home/runner/scenarios
COPY deploy/monitor/ /home/runner/deploy/monitor

RUN npm ci
RUN npx playwright install chromium
RUN npx playwright install-deps

RUN curl "https://download.splunk.com/products/universalforwarder/releases/9.1.3/linux/splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz" -o "splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz"
RUN tar xvfz splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz -C /opt
RUN mv ./deploy/monitor/splunk/inputs.conf /opt/splunkforwarder/etc/system/local/inputs.conf
RUN mv ./deploy/monitor/splunk/user-seed.conf /opt/splunkforwarder/etc/system/local/user-seed.conf

RUN mv ./deploy/monitor/entrypoint /home/runner/entrypoint
RUN chmod +x /home/runner/entrypoint

ENV TARGET_URL=https://www.mbta.com

RUN mv ./deploy/monitor/entrypoint /home/runner/entrypoint
RUN chmod +x /home/runner/entrypoint

ENTRYPOINT ["/home/runner/entrypoint"]
