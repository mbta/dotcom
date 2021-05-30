#!/bin/bash
set -e -x
# trigger change
VERSION=$(grep -o 'version: .*"' apps/site/mix.exs  | grep -E -o '([0-9]+\.)+[0-9]+')
BUILD_ARTIFACT=site-build.zip
TEMP_DIR=tmp_unzip
CACHE_CONTROL="public,max-age=31536000"
STATIC_DIR=$TEMP_DIR/lib/site-$VERSION/priv/static

unzip $BUILD_ARTIFACT "lib/site-$VERSION/priv/static/*" -d $TEMP_DIR

# sync the digested files with a cache control header
aws s3 sync $STATIC_DIR/css s3://mbta-dotcom/css --size-only --exclude "*" --include "*-*" --cache-control=$CACHE_CONTROL
aws s3 sync $STATIC_DIR/js s3://mbta-dotcom/js --size-only --exclude "*" --include "*-*" --cache-control=$CACHE_CONTROL
aws s3 sync $STATIC_DIR/images s3://mbta-dotcom/images --size-only --exclude "*" --include "*-*" --cache-control=$CACHE_CONTROL

# font content-types need to be specified manually
aws s3 sync $STATIC_DIR/fonts s3://mbta-dotcom/fonts --size-only --exclude "*" --include "*.eot" --cache-control=$CACHE_CONTROL --content-type "application/vnd.ms-fontobject"
aws s3 sync $STATIC_DIR/fonts s3://mbta-dotcom/fonts --size-only --exclude "*" --include "*.svg" --cache-control=$CACHE_CONTROL --content-type "image/svg+xml"
aws s3 sync $STATIC_DIR/fonts s3://mbta-dotcom/fonts --size-only --exclude "*" --include "*.ttf" --cache-control=$CACHE_CONTROL --content-type "font/ttf"
aws s3 sync $STATIC_DIR/fonts s3://mbta-dotcom/fonts --size-only --exclude "*" --include "*.woff" --cache-control=$CACHE_CONTROL --content-type "font/woff"
aws s3 sync $STATIC_DIR/fonts s3://mbta-dotcom/fonts --size-only --exclude "*" --include "*.woff2" --cache-control=$CACHE_CONTROL --content-type "font/woff2"

# sync everything else normally
aws s3 sync $STATIC_DIR/css s3://mbta-dotcom/css --size-only
aws s3 sync $STATIC_DIR/js s3://mbta-dotcom/js --size-only
aws s3 sync $STATIC_DIR/fonts s3://mbta-dotcom/fonts --size-only
aws s3 sync $STATIC_DIR/images s3://mbta-dotcom/images --size-only

rm -rf $TEMP_DIR
