
## Run Open Trip Planner locally

One way would be to clone the mbta/OpenTripPlanner repo, install the dependencies, build the graphs, and run the application locally. This way is easier, but has these prerequisites:

* you have the AWS CLI installed and are authenticated
* you have Docker installed (and running)


1. Download an already built image from our ECR repository. You'll need to have:
    1.  our docker repository URL (of the format `[our account number].dkr.ecr.us-east-1.amazonaws.com`)
    1. the tag for the image you're going to download (a short string, for example `git-f7a49a4` - log into the Amazon Elastic Container Registry, find the open-trip-planner repository, pick a recent image)

      ```bash
      aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin docker_repo_url
      # will return a "Login succeeded" confirmation

      # pull the image - need to specify image_tag
      docker pull docker_repo_url/open-trip-planner:image_tag
      ```
1. Run it at `localhost:5000`!
    ```bash
    docker run --publish 5000:5000 docker_repo_url/open-trip-planner:image_tag
    ```

---
TODO: Add instructions on how to run Dotcom in the same manner.
