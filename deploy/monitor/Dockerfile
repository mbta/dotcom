FROM node:21-bookworm

WORKDIR /home/runner

COPY . .

RUN npm ci
RUN npx playwright install chromium
RUN npx playwright install-deps

RUN curl "https://download.splunk.com/products/universalforwarder/releases/9.1.3/linux/splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz" -o "splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz"
RUN tar xvfz splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz -C /opt
RUN mv ./splunk/inputs.conf /opt/splunkforwarder/etc/system/local/inputs.conf
RUN mv ./splunk/user-seed.conf /opt/splunkforwarder/etc/system/local/user-seed.conf

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscli.zip"
RUN unzip awscli.zip
RUN ./aws/install

ENV TARGET_URL=https://www.mbta.com

RUN chmod +x /home/runner/entrypoint

ENTRYPOINT ["/home/runner/entrypoint"]
