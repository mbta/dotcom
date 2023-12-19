# Deployment

## Production deployment

This can be done on GitHub Actions via the following:

- Create a tag following this format
  - Pull the latest master locally
  - Create a tag `git tag year.month.day.release_number` (ex. `2023.12.18.01`)
  - Push the tag `git push origin --tags`
- [Create a release](https://github.com/mbta/dotcom/releases). Select a relevant tag, follow the naming convention, click "generate release notes", and publish. This will trigger the [Deploy: release](.github/workflows/deploy-release.yml) workflow that will kick off a deploy to production.
- [Manually](https://github.com/mbta/dotcom/actions/workflows/deploy-manual.yml). The [Deploy: manual](.github/workflows/deploy-manual.yml) workflow can be used to deploy to production by selecting the "prod" environment.

![](run_workflow.png)

## Staging deployment

Deploying to our staging servers can also be done through GitHub Actions. In addition to the [manual](https://github.com/mbta/dotcom/actions/workflows/deploy-manual.yml) option mentioned under "Production deployment", deployment to our staging environments can be done within a pull request by adding the `dev-green` or `dev-blue` labels, which will trigger a deploy to the indicated environment via the [Deploy: PR](.github/workflows/deploy-pr.yml) workflow.

The deployment will be held in a "waiting" state until approved by an active developer. Active developers may approve their own requests.

## Building the distribution package locally

When deploying to our servers, the `docker/build-push-action@v3` action builds the application for us. But for testing or development purposes it is possible to build locally as well.

1. (once) Install Docker: https://docs.docker.com/engine/install/
2. Build the Docker image:

   - `docker build -t dotcom .`

This will build the release in a Docker container.

The root (three-stage) `Dockerfile` is responsible for building and running the application:

- Build:
  Because most of us develop on a Mac but the servers are Linux, we need to run the build inside a Docker (Elixir) container so that everything is compiled correctly. The build uses `distillery` to make the Erlang release, along with all our dependencies.
  For the frontend assets, we use a Node container.

- Run:
  The part of the Dockerfile used to run the application (last stage) runs the script that `distillery` provides for us to run the server (`/root/rel/site/bin/site foreground`). At startup, the `relx` application looks for configuration values that look like `${VARIABLE}` and replaces them with the `VARIABLE` environment variable. This allows us to make a single build, but use it for different environments by changing the environment variables.
