#!/bin/bash
set -e -x -u

# bash script that should be called with an AWS environment (dev / dev-green / dev-blue / prod)

# Other required configuration:
# * APP
# * DOCKER_REPO
# * S3_BUCKET_NAME

appenv=$1

githash=$(git rev-parse --short HEAD)
gitmsg=$(git log -1 --pretty=%s)

# Create Dockerrun file pointing to ECR image, and zip it up
mkdir $githash
sed "s/GITHASH/$githash/g" ./semaphore/Dockerrun.aws.json > $githash/Dockerrun.aws.json
pushd $githash
zip -r ../$githash.zip .
popd

rm -r $githash

# Put zip on S3 and use to create application version
aws s3 cp $githash.zip s3://$S3_BUCKET_NAME/$APP/$githash.zip
aws elasticbeanstalk delete-application-version --application-name $APP --version-label $githash --delete-source-bundle
aws elasticbeanstalk create-application-version --application-name $APP --version-label $githash --source-bundle S3Bucket=$S3_BUCKET_NAME,S3Key=$APP/$githash.zip --description "$gitmsg"

rm $githash.zip

# Deploy application version
aws elasticbeanstalk update-environment --environment-name $appenv --version-label $githash

echo "Environment status: `aws elasticbeanstalk describe-environments --environment-names $appenv | grep '"Status"' | cut -d: -f2  | sed -e 's/^[^"]*"//' -e 's/".*$//'`"

echo "Your environment is currently updating"; while [[ `aws elasticbeanstalk describe-environments --environment-names $appenv | grep '"Status"' | cut -d: -f2  | sed -e 's/^[^"]*"//' -e 's/".*$//'` = "Updating" ]]; do sleep 10; printf "."; done

if [[ `aws elasticbeanstalk describe-environments --environment-names $appenv | grep VersionLabel | cut -d: -f2 | sed -e 's/^[^"]*"//' -e 's/".*$//'` = $githash ]]; then echo "The version of application code on Elastic Beanstalk matches the version that Semaphore sent in this deployment."; echo "Your environment info:"; aws elasticbeanstalk describe-environments --environment-names $appenv; else echo "The version of application code on Elastic Beanstalk does not match the version that Semaphore sent in this deployment. Please check your AWS Elastic Beanstalk Console for more information."; echo "Your environment info:"; aws elasticbeanstalk describe-environments --environment-names $appenv; false; fi
sleep 5; a="0"; echo "Waiting for environment health to turn Green"; while [[ `aws elasticbeanstalk describe-environments --environment-names $appenv | grep '"Health":' | cut -d: -f2  | sed -e 's/^[^"]*"//' -e 's/".*$//'` != "Green" && $a -le 30 ]]; do sleep 2; a=$[$a+1]; printf "."; done; if [[ `aws elasticbeanstalk describe-environments --environment-names $appenv | grep '"Health":' | cut -d: -f2 | sed -e 's/^[^"]*"//' -e 's/".*$//'` = "Green" ]]; then echo "Your environment status is Green, congrats!"; else echo "Your environment status is not Green, sorry."; false; fi;

echo "Your environment info:"; aws elasticbeanstalk describe-environments --environment-names $appenv
