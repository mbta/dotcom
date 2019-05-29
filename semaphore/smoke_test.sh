#/usr/bin/env bash
mix escript.install --force https://s3.amazonaws.com/mbta-dotcom/crawler && $HOME/.mix/escripts/crawler https://dev.mbtace.com
