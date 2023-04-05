#!/bin/bash

set -eo pipefail

# Credits to https://github.com/nanasess/setup-chromedriver
# This will download and install the Chromedriver version that
# corresponds with the version of Chrome that is installed.
# On Linux it downloads Chrome if it isn't already available.
if [[ "$OSTYPE" == "darwin"* ]]; then
  ARCH="mac64"
  CHROMEAPP="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
else
  # Assume Linux
  ARCH="linux64"
  CHROMEAPP=google-chrome
  if ! type -a google-chrome > /dev/null 2>&1; then
      sudo apt-get update
      sudo apt-get install -y google-chrome
  fi
fi

CHROME_VERSION=$("$CHROMEAPP" --version | cut -f 3 -d ' ' | cut -d '.' -f 1)
VERSION=$(curl --location --fail --retry 10 http://chromedriver.storage.googleapis.com/LATEST_RELEASE_${CHROME_VERSION})

wget -c -nc --retry-connrefused --tries=0 https://chromedriver.storage.googleapis.com/${VERSION}/chromedriver_${ARCH}.zip
unzip -o -q chromedriver_"${ARCH}".zip
sudo mv chromedriver /usr/local/bin/chromedriver
rm chromedriver_"${ARCH}".zip
echo "chromedriver set up for version ${VERSION}"
