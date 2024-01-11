# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
import Config

# Used by several applications to turn off a subset of child processes in the
# test environment.
config :dotcom, start_data_processes: config_env() != :test

config :dotcom, Dotcom.BodyTag, mticket_header: "x-mticket"

tile_server_url =
  if config_env() == :prod,
    do: "https://cdn.mbta.com",
    else: "https://mbta-map-tiles-dev.s3.amazonaws.com"

config :dotcom, tile_server_url: tile_server_url

response_fn =
  if config_env() == :prod,
    do: {DotcomWeb.StaticFileController, :redirect_through_cdn},
    else: {DotcomWeb.StaticFileController, :send_file}

config :dotcom, StaticFileController, response_fn: response_fn

config :dotcom,
  util_router_helper_module: {:ok, DotcomWeb.Router.Helpers},
  util_endpoint: {:ok, DotcomWeb.Endpoint}

config :dotcom,
  allow_indexing: false

config :dotcom, route_populate_caches?: config_env() == :prod

routes_repo = if config_env() == :test, do: Routes.MockRepoApi, else: Routes.Repo
config :dotcom, :routes_repo_api, routes_repo

repo_module = if config_env() == :test, do: RoutePatterns.MockRepo, else: RoutePatterns.Repo

config :dotcom, :route_patterns_repo_api, repo_module

predictions_broadcast_interval_ms = if config_env() == :test, do: 50, else: 10_000

config :dotcom, predictions_broadcast_interval_ms: predictions_broadcast_interval_ms
