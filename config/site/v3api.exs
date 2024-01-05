import Config

# Allow more time for API requests on CI and prod
default_timeout = if config_env() == :dev, do: 5_000, else: 10_000
cache_size = if config_env() == :prod, do: 200_000, else: 10_000

config :dotcom,
  v3_api_default_timeout: default_timeout,
  v3_api_cache_size: cache_size,
  v3_api_http_pool: :v3_api_http_pool
