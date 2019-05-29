# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

config :v3_api,
  base_url: {:system, "V3_URL", System.get_env("V3_URL")},
  api_key: {:system, "V3_API_KEY"},
  wiremock_proxy_url: System.get_env("WIREMOCK_PROXY_URL"),
  wiremock_proxy: {:system, "WIREMOCK_PROXY", "false"},
  default_timeout: 5_000,
  cache_size: 10_000,
  http_pool: :v3_api_http_pool

import_config "#{Mix.env()}.exs"
