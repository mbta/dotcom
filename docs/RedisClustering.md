# Testing Redis Clustering

The default development environment only runs under a single Redis instance.
Some features (cross-cluster delete) do need a full cluster to test, so this
document describes how to run such as cluster locally for testing.

These instructions assume you've already gotten a normal development environment running.

## Docker Compose

The easiest way to run the Redis Cluster is to use Docker Compose.

```
docker compose -f deploy/dev.yml up -d --build
```

This will set up Redis in cluster mode and run two versions of Dotcom with nginx load balancing requests between them.
Visit http://localhost:4001 to hit the load balancer.
http://localhost:4002 and http://localhost:4003 will take you directly to either of the two nodes.

You can even connect to individual Elixir nodes in order to run commands.
Let's say you want to connect to dotcom2 (the one running at http://localhost:4003).

```
docker exec -it deploy-dotcom-2-1 iex --sname foobarbaz --cookie foobarbaz

iex(foobarbaz@0b061394460f)1> node = :dotcom2@0b061394460f
:dotcom2@0b061394460f
iex(foobarbaz@0b061394460f)2> Node.connect(node)
true
iex(foobarbaz@0b061394460f)3> :rpc.call(node, Dotcom.Cache.Multilevel, :get, ["cms.repo|important-notices"])
...
```

Note that the address (the @... part) will be different every time.


## Running Redis Locally

If you choose not to use Docker Compose, you'll still have to run Redis cluster.
The easiest way to get it running is to download and compile it.

```
cd $HOME
wget https://github.com/redis/redis/archive/7.2.4.tar.gz
tar xvf 7.2.4.tar.gz
cd redis-7.2.4
make
./utils/create-cluster/create-cluster start
./utils/create-cluster/create-cluster create -f
```

Start the server with `iex -S mix phx.server`

Then, visit the site at http://localhost:4001.

When you're done with the cluster:

```
./utils/create-cluster/create-cluster stop
cd $HOME
rm 7.2.4.tar.gz
rm -rf redis-7.2.4
```

