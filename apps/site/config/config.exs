# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :site, SiteWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "yK6hUINZWlq04EPu3SJjAHNDYgka8MZqgXZykF+AQ2PvWs4Ua4IELdFl198aMvw0",
  render_errors: [accepts: ~w(html), layout: {SiteWeb.LayoutView, "app.html"}],
  pubsub: [name: Site.PubSub, adapter: Phoenix.PubSub.PG2]

config :phoenix, :gzippable_exts, ~w(.txt .html .js .css .svg)

# Configures Elixir's Logger
config :logger, :console,
  format: "$date $time $metadata[$level] $message\n",
  metadata: [:request_id]

# Include referrer in Logster request log
config :logster, :allowed_headers, ["referer"]

config :site, SiteWeb.ViewHelpers, google_tag_manager_id: System.get_env("GOOGLE_TAG_MANAGER_ID")

config :laboratory,
  features: [
    {:stops_redesign, "Stops Page Redesign (Q1/Q2 2023)",
     "Revamping of the Stop pages as part of the 🚉 Website - Stops Page Redesign epic"},
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

config :util,
  router_helper_module: {:ok, SiteWeb.Router.Helpers},
  endpoint: {:ok, SiteWeb.Endpoint}

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

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
