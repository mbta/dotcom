import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :site, SiteWeb.Endpoint,
  http: [port: System.get_env("PORT") || 4002],
  server: true

# Let test requests get routed through the :secure pipeline
config :site, :secure_pipeline,
  force_ssl: [
    host: nil,
    rewrite_on: [:x_forwarded_proto]
  ]

config :logger, level: :notice

# Don't fetch tz data in test mode; can cause a race if we're doing TZ
# operations while it updates.
config :tzdata, :autoupdate, :disabled

# Allow more time for API requests on CI
config :site, v3_api_default_timeout: 10_000

config :recaptcha, http_client: Recaptcha.Http.MockClient

config :wallaby,
  screenshot_on_failure: false,
  driver: Wallaby.Chrome,
  max_wait_time: 5_000,
  chromedriver: [
    headless: true
  ],
  js_errors: true

config :site, :react, source_path: nil

config :routes, :routes_repo_api, Routes.MockRepoApi

config :site, TripPlanApi, module: TripPlan.Api.MockPlanner

config :site, TripPlanGeocode, module: TripPlan.Geocode.MockGeocode
