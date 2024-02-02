FROM node:21-bookworm

WORKDIR /home/runner

COPY monitor /home/runner/monitor
COPY scenarios /home/runner/scenarios

RUN if [ "$(dpkg --print-architecture)" = "arm64" ]; then \
      curl "https://download.splunk.com/products/universalforwarder/releases/9.1.3/linux/splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz" -o "splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz"; \
      tar xvfz splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz -C /opt; \
      curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscli.zip"; \
    elif [ "$(dpkg --print-architecture)" = "amd64" ]; then \
      curl "https://download.splunk.com/products/universalforwarder/releases/9.1.3/linux/splunkforwarder-9.1.3-d95b3299fa65-Linux-x86_64.tgz" -o "splunkforwarder-9.1.3-d95b3299fa65-Linux-x86_64.tgz"; \
      tar xvfz splunkforwarder-9.1.3-d95b3299fa65-Linux-x86_64.tgz -C /opt; \
      curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscli.zip"; \
    else \
      echo "Architecture $(dpkg --print-architecture) is not supported."; exit 1; \
    fi

COPY deploy/monitor/ /home/runner/deploy/monitor

RUN mv ./deploy/monitor/splunk/inputs.conf /opt/splunkforwarder/etc/system/local/inputs.conf
RUN mv ./deploy/monitor/splunk/user-seed.conf /opt/splunkforwarder/etc/system/local/user-seed.conf

RUN unzip awscli.zip
RUN ./aws/install
RUN /usr/local/bin/aws --version

COPY package*.json .

RUN npm ci --ignore-scripts
RUN npx playwright install chromium
RUN npx playwright install-deps
