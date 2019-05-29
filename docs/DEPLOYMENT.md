# Deployment

## Building the distribution package

1. (once) Install Docker: https://docs.docker.com/engine/installation/
2. Build the .ZIP package:
  * `sh build.sh`

This will build the release in a Docker container, and put the files in `site-build.zip`.  This file contains all of our code, an Erlang distribution, and a Dockerfile to run the application.

The root `Dockerfile` is responsible the build. Because most of us develop on a Mac but the servers are Linux, we need to run the build inside a Docker container so that everything is compiled correctly. The build uses `distillery` to make the Erlang release, along with all our dependencies. We then copy all those files out of the Docker build container, .zip them up, and send them along to Amazon.

The Dockerfile used to run the application lives in `rel/Dockerfile`. It runs the script that `exrm` provides for us to run the server (`/root/rel/site/bin/site foreground`). At startup, the `relx` application looks for configuration values that look like `${VARIABLE}` and replaces them with the `VARIABLE` environment variable. This allows us to make a single build, but use it for different environments by changing the environment variables.
