# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
import Config

# Configures the endpoint
config :site, SiteWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "yK6hUINZWlq04EPu3SJjAHNDYgka8MZqgXZykF+AQ2PvWs4Ua4IELdFl198aMvw0",
  render_errors: [accepts: ~w(html), layout: {SiteWeb.LayoutView, "app.html"}],
  pubsub_server: Site.PubSub,
  live_view: [
    signing_salt: "gsQiz0LdGqVmqDOR4snAgelIAAphhdfm"
  ]

config :phoenix, :gzippable_exts, ~w(.txt .html .js .css .svg)
config :phoenix, :json_library, Poison

# Configures Elixir's Logger
config :logger, :console,
  format: "$date $time $metadata[$level] $message\n",
  metadata: [:request_id]

# Include referrer in Logster request log
config :logster, :allowed_headers, ["referer"]

config :site, SiteWeb.ViewHelpers, google_tag_manager_id: System.get_env("GOOGLE_TAG_MANAGER_ID")

config :laboratory,
  features: [
    {:old_stops_redesign, "Stops Page Redesign (2023)",
     "Enable this to revert back to the old version."},
    {:force_otp1, "Force OpenTripPlanner v1",
     "Override randomized assignment between OTP instances and force OTP1."},
    {:force_otp2, "Force OpenTripPlanner v2",
     "Override randomized assignment between OTP instances and force OTP2 (this takes precedent if both flags are enabled)."}
  ],
  cookie: [
    # one month,
    max_age: 3600 * 24 * 30,
    http_only: true
  ]

config :site, Site.BodyTag, mticket_header: "x-mticket"

# Centralize Error reporting
config :sentry,
  dsn: System.get_env("SENTRY_DSN") || "",
  environment_name: System.get_env("SENTRY_ENVIRONMENT"),
  enable_source_code_context: false,
  root_source_code_path: File.cwd!(),
  included_environments: ~w(prod dev dev-green dev-blue),
  json_library: Poison,
  filter: Site.SentryFilter,
  tags: %{"dotcom.application" => "backend"}

config :site, tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com"

config :site, StaticFileController, response_fn: {SiteWeb.StaticFileController, :send_file}

config :site,
  util_router_helper_module: {:ok, SiteWeb.Router.Helpers},
  util_endpoint: {:ok, SiteWeb.Endpoint}

config :hammer,
  backend: {Hammer.Backend.ETS, [expiry_ms: 60_000 * 60 * 4, cleanup_interval_ms: 60_000 * 10]}

config :recaptcha,
  public_key: {:system, "RECAPTCHA_PUBLIC_KEY"},
  secret: {:system, "RECAPTCHA_PRIVATE_KEY"}

config :site, :react,
  source_path: Path.join(File.cwd!(), "/apps/site/assets/"),
  build_path: Path.join(File.cwd!(), "/apps/site/react_renderer/dist/app.js")

config :site,
  allow_indexing: false,
  enable_experimental_features: {:system, "ENABLE_EXPERIMENTAL_FEATURES", "true"}

config :site, populate_caches?: Mix.env() == :prod

config :site, :routes_repo_api, Routes.Repo

config :site,
  v3_api_base_url: {:system, "V3_URL"},
  v3_api_key: {:system, "V3_API_KEY"},
  v3_api_version: {:system, "V3_API_VERSION", "2019-07-01"},
  v3_api_wiremock_proxy_url: {:system, "WIREMOCK_PROXY_URL"},
  v3_api_wiremock_proxy: {:system, "WIREMOCK_PROXY", "false"},
  v3_api_default_timeout: 5_000,
  v3_api_cache_size: 10_000,
  v3_api_http_pool: :v3_api_http_pool

config :site, :location_http_pool, :google_http_pool

config :site,
  google_api_key: System.get_env("GOOGLE_API_KEY"),
  google_client_id: System.get_env("GOOGLE_MAPS_CLIENT_ID") || "",
  google_signing_key: System.get_env("GOOGLE_MAPS_SIGNING_KEY") || "",
  geocode: {:system, "LOCATION_SERVICE", :aws},
  reverse_geocode: {:system, "LOCATION_SERVICE", :aws},
  autocomplete: {:system, "LOCATION_SERVICE", :aws},
  aws_index_prefix: {:system, "AWS_PLACE_INDEX_PREFIX", "dotcom-dev"}

config :site, TripPlanApi, module: TripPlan.Api.OpenTripPlanner

config :site, TripPlanGeocode, module: TripPlan.Geocode.GoogleGeocode

config :site, OpenTripPlanner,
  timezone: {:system, "OPEN_TRIP_PLANNER_TIMEZONE", "America/New_York"},
  otp1_url: {:system, "OPEN_TRIP_PLANNER_URL"},
  otp2_url: {:system, "OPEN_TRIP_PLANNER_2_URL"},
  otp2_percentage: {:system, "OPEN_TRIP_PLANNER_2_PERCENTAGE"},
  wiremock_proxy: {:system, "WIREMOCK_PROXY", "false"},
  wiremock_proxy_url: System.get_env("WIREMOCK_TRIP_PLAN_PROXY_URL")

repo_module = if config_env() == :test, do: RoutePatterns.MockRepo, else: RoutePatterns.Repo

config :site, :route_patterns_repo_api, repo_module

if config_env() == :test do
  config :site, predictions_broadcast_interval_ms: 50
else
  config :site, predictions_broadcast_interval_ms: 10_000
end

config :site, :algolia_config,
  app_id: {:system, "ALGOLIA_APP_ID"},
  search: {:system, "ALGOLIA_SEARCH_KEY"},
  write: {:system, "ALGOLIA_WRITE_KEY"}

config :site, :algolia_repos,
  stops: Stops.Api,
  routes: Routes.Repo

config :site, :algolia_indexes, [
  Algolia.Stops,
  Algolia.Routes
]

config :site, :algolia_track_clicks?, false

config :site, :algolia_index_suffix, "_test"

config :site, :algolia_http_pool, :algolia_http_pool

config :site, alerts_api_mfa: {V3Api.Alerts, :all, []}

config :site, alerts_bus_stop_change_bucket: "bus-stop-change/local_development"

config :site,
  support_ticket_to_email: System.get_env("SUPPORT_TICKET_TO_EMAIL") || "test@test.com",
  support_ticket_from_email: System.get_env("SUPPORT_TICKET_FROM_EMAIL") || "from@test.com",
  support_ticket_reply_email: System.get_env("SUPPORT_TICKET_REPLY_EMAIL") || "reply@test.com",
  test_mail_file: "/tmp/test_support_email.json",
  time_fetcher: DateTime

config :site,
  cms_http_pool: :content_http_pool,
  drupal: [
    cms_root: {:system, "DRUPAL_ROOT"},
    cms_static_path: "/sites/default/files"
  ]

config :site, :cms_api, CMS.API.HTTPClient
# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
