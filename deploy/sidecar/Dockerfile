FROM debian:bookworm-slim

WORKDIR /home/runner

RUN apt-get update
RUN apt-get install curl procps unzip -y

ARG TARGETPLATFORM
ENV SPLUNK_HOME=/opt/splunkforwarder

# Download and install Splunk Universal Forwarder
# Uses the targetplatform to get the correct architecture
RUN if [ "$TARGETPLATFORM" = "linux/arm64" ]; then \
      curl "https://download.splunk.com/products/universalforwarder/releases/9.1.3/linux/splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz" -o "splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz"; \
      tar xvfz splunkforwarder-9.1.3-d95b3299fa65-Linux-armv8.tgz -C /opt; \
    elif [ "$TARGETPLATFORM" = "linux/amd64" ]; then \
      curl "https://download.splunk.com/products/universalforwarder/releases/9.1.3/linux/splunkforwarder-9.1.3-d95b3299fa65-Linux-x86_64.tgz" -o "splunkforwarder-9.1.3-d95b3299fa65-Linux-x86_64.tgz"; \
      tar xvfz splunkforwarder-9.1.3-d95b3299fa65-Linux-x86_64.tgz -C /opt; \
    else \
      echo "Architecture $TARGETPLATFORM is not supported."; exit 1; \
    fi

COPY deploy/sidecar/ /home/runner/deploy/sidecar

# Copy the configuration files to the correct location
RUN mv ./deploy/sidecar/splunk/inputs.conf ${SPLUNK_HOME}/etc/system/local/inputs.conf
RUN mv ./deploy/sidecar/splunk/user-seed.conf ${SPLUNK_HOME}/etc/system/local/user-seed.conf

# Get around the fact that the UF --accept-license flag doesn't work without a tty
RUN rm ${SPLUNK_HOME}/ftr

# Copy the entrypoint script and make it executable
RUN mv ./deploy/sidecar/entrypoint /home/runner/entrypoint
RUN chmod +x /home/runner/entrypoint

# Clean up
RUN rm -rf ./*.tgz
RUN rm -rf ./deploy/sidecar

EXPOSE 8125

ENTRYPOINT ["/home/runner/entrypoint"]
