# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

config :v3_api,
  base_url: {:system, "V3_URL"},
  api_key: {:system, "V3_API_KEY"},
  api_version: {:system, "V3_API_VERSION", "2019-07-01"},
  wiremock_proxy_url: {:system, "WIREMOCK_PROXY_URL"},
  wiremock_proxy: {:system, "WIREMOCK_PROXY", "false"},
  default_timeout: 5_000,
  cache_size: 10_000,
  http_pool: :v3_api_http_pool

import_config "#{Mix.env()}.exs"
