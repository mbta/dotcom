#!/bin/bash
set -e -x

BUILD_TAG="${1:-dotcom}"
VERSION=$(grep -o 'version: .*"' mix.exs | grep -E -o '([0-9]+\.)+[0-9]+')
TEMP_DIR=$(mktemp -d)
CACHE_CONTROL="public,max-age=31536000"
STATIC_DIR=$TEMP_DIR/lib/dotcom-$VERSION/priv/static

pushd "$TEMP_DIR" >/dev/null
sh -c "docker run --rm ${BUILD_TAG} tar -c /root/rel/dotcom/lib/dotcom-$VERSION/priv/static" | tar -x --strip-components 3
popd >/dev/null

# sync the digested files with a cache control header
aws s3 sync "$STATIC_DIR/css" s3://mbta-dotcom/css --size-only --exclude "*" --include "*-*" --cache-control=$CACHE_CONTROL
aws s3 sync "$STATIC_DIR/js" s3://mbta-dotcom/js --size-only --exclude "*" --include "*-*" --cache-control=$CACHE_CONTROL
aws s3 sync "$STATIC_DIR/images" s3://mbta-dotcom/images --size-only --exclude "*" --include "*-*" --cache-control=$CACHE_CONTROL

# font content-types need to be specified manually
aws s3 sync "$STATIC_DIR/fonts" s3://mbta-dotcom/fonts --size-only --exclude "*" --include "*.ttf" --cache-control=$CACHE_CONTROL --content-type "font/ttf"
aws s3 sync "$STATIC_DIR/fonts" s3://mbta-dotcom/fonts --size-only --exclude "*" --include "*.woff" --cache-control=$CACHE_CONTROL --content-type "font/woff"
aws s3 sync "$STATIC_DIR/fonts" s3://mbta-dotcom/fonts --size-only --exclude "*" --include "*.woff2" --cache-control=$CACHE_CONTROL --content-type "font/woff2"

# sync everything else normally
aws s3 sync "$STATIC_DIR/css" s3://mbta-dotcom/css --size-only
aws s3 sync "$STATIC_DIR/js" s3://mbta-dotcom/js --size-only
aws s3 sync "$STATIC_DIR/fonts" s3://mbta-dotcom/fonts --size-only
aws s3 sync "$STATIC_DIR/images" s3://mbta-dotcom/images --size-only

rm -rf "$TEMP_DIR"
