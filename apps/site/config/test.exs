use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :site, SiteWeb.Endpoint,
  http: [port: 4002],
  server: true

# Print only warnings and errors during test
config :logger, level: :warn

# Don't fetch tz data in test mode; can cause a race if we're doing TZ
# operations while it updates.
config :tzdata, :autoupdate, :disabled

config :wallaby,
  screenshot_on_failure: false,
  driver: Wallaby.Experimental.Chrome,
  max_wait_time: 5_000,
  chrome: [
    headless: true
  ],
  js_errors: true

config :site, :react, source_path: nil
