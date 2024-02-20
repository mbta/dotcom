FROM redis:7.2.4

COPY ./deploy/redis/redis.conf /etc/redis/redis.conf

CMD sed -e "s/CLUSTER_ANNOUNCE_IP/$CLUSTER_ANNOUNCE_IP/g" /etc/redis/redis.conf | redis-server -
