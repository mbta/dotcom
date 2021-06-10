# The elixir image was built with debain stretch, use the node debain-stretch base
FROM node:14.15.1-stretch

RUN apt-get update && apt-get install -y --no-install-recommends \
	libssl1.1 libsctp1 curl \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /root

# Set exposed ports
EXPOSE 4000
ENV PORT=4000 MIX_ENV=prod TERM=xterm LANG="C.UTF-8" REPLACE_OS_VARS=true

ADD . rel/site
RUN mkdir /root/work

WORKDIR /root/work

CMD ["/root/rel/site/bin/startup", "foreground"]
