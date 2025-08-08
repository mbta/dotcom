import Config

if config_env() == :prod do
  config :ehmon, :report_mf, {:ehmon, :info_report}
end

if config_env() == :test do
  # Don't fetch tz data in test mode; can cause a race if we're doing TZ
  # operations while it updates.
  config :tzdata, :autoupdate, :disabled
  config :recaptcha, http_client: Recaptcha.Http.MockClient

  config :wallaby,
    screenshot_on_failure: false,
    driver: Wallaby.Chrome,
    max_wait_time: 5_000,
    chromedriver: [
      headless: true
    ],
    js_errors: true
end

config :open_trip_planner_client,
  timezone: "America/New_York"
