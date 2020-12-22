#!/bin/bash
set -e -u

# bash script should be called with AWS environment (dev / dev-green / dev-blue / prod)
# Other required configuration:
# * APP
# * DOCKER_REPO
awsenv=$1

# build docker image and tag it with git hash and AWS environment

# log into docker hub if needed
if [ -n "$DOCKER_USERNAME" ]; then
    echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
fi

githash=$(git rev-parse --short HEAD)
docker build -t $APP:latest .
docker tag $APP:latest $DOCKER_REPO:$awsenv
docker tag $APP:latest $DOCKER_REPO:git-$githash

# retrieve the`docker login` command from AWS ECR and execute it
logincmd=$(aws ecr get-login --no-include-email --region us-east-1)
eval $logincmd

# push images to ECS (Elastic Container Service) image repo
docker push $DOCKER_REPO:$awsenv
docker push $DOCKER_REPO:git-$githash
