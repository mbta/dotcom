# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
import Config

# Used by several applications to turn off a subset of child processes in the
# test environment.
config :site, start_data_processes: config_env() != :test

config :site, Site.BodyTag, mticket_header: "x-mticket"

tile_server_url =
  if config_env() == :prod,
    do: "https://cdn.mbta.com",
    else: "https://mbta-map-tiles-dev.s3.amazonaws.com"

config :site, tile_server_url: tile_server_url

response_fn =
  if config_env() == :prod,
    do: {SiteWeb.StaticFileController, :redirect_through_cdn},
    else: {SiteWeb.StaticFileController, :send_file}

config :site, StaticFileController, response_fn: response_fn

config :site,
  util_router_helper_module: {:ok, SiteWeb.Router.Helpers},
  util_endpoint: {:ok, SiteWeb.Endpoint}

config :site,
  allow_indexing: false

config :site, populate_caches?: config_env() == :prod

routes_repo = if config_env() == :test, do: Routes.MockRepoApi, else: Routes.Repo
config :site, :routes_repo_api, routes_repo

config :site, :location_http_pool, :google_http_pool

repo_module = if config_env() == :test, do: RoutePatterns.MockRepo, else: RoutePatterns.Repo

config :site, :route_patterns_repo_api, repo_module

predictions_broadcast_interval_ms = if config_env() == :test, do: 50, else: 10_000

config :site, predictions_broadcast_interval_ms: predictions_broadcast_interval_ms
