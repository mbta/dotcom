# Deployment

## Production deployment

Prerequisites:

1. Use `aws configure` to configure your AWS credentials. (This only needs to be done once to set up a computer.)
1. The commit you wish to deploy must have already been built and deploy to the Dev environment. Semaphore will do this automatically for everything that is merged into `master`.
1. Test the build on the [Dev server](https://dev.mbtace.com).
1. Make a [Release in GitHub](https://github.com/mbta/dotcom/releases).

Run the production deploy using our deploy script:

    ./bin/deploy dotcom-prod <commit-hash>

Monitor the deploy in AWS Elastic Beanstalk:

- [Health Dashboard](https://console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/environment/health?applicationName=dotcom&environmentId=e-63b6ycpxu2)
- [Events](https://console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/environment/events?applicationName=dotcom&environmentId=e-63b6ycpxu2)
- [Application Versions](https://console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/application/versions?applicationName=dotcom)

## Building the distribution package locally

When deploying to our servers, Semaphore performs these steps for us. But for testing or development purposes it is possible to build locally as well.

1. (once) Install Docker: https://docs.docker.com/engine/installation/
2. Build the .ZIP package:
  * `sh build.sh`

This will build the release in a Docker container, and put the files in `site-build.zip`.  This file contains all of our code, an Erlang distribution, and a Dockerfile to run the application.

The root `Dockerfile` is responsible the build. Because most of us develop on a Mac but the servers are Linux, we need to run the build inside a Docker container so that everything is compiled correctly. The build uses `distillery` to make the Erlang release, along with all our dependencies. We then copy all those files out of the Docker build container, .zip them up, and send them along to Amazon.

The Dockerfile used to run the application lives in `rel/Dockerfile`. It runs the script that `exrm` provides for us to run the server (`/root/rel/site/bin/site foreground`). At startup, the `relx` application looks for configuration values that look like `${VARIABLE}` and replaces them with the `VARIABLE` environment variable. This allows us to make a single build, but use it for different environments by changing the environment variables.
