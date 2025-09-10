# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
import Config

# Used by several applications to turn off a subset of child processes in the
# test environment.
config :dotcom, start_data_processes: config_env() == :prod

config :dotcom, Dotcom.BodyTag, mticket_header: "x-mticket"

config :dotcom,
  util_router_helper_module: {:ok, DotcomWeb.Router.Helpers},
  util_endpoint: {:ok, DotcomWeb.Endpoint}

config :dotcom,
  allow_indexing: false

config :dotcom, route_populate_caches?: config_env() == :prod

predictions_broadcast_interval_ms = if config_env() == :test, do: 50, else: 10_000

config :dotcom, predictions_broadcast_interval_ms: predictions_broadcast_interval_ms
