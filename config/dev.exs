import Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with Webpack to recompile .js and .css sources.

port = String.to_integer(System.get_env("PORT") || "4001")
host = System.get_env("HOST") || "localhost"
webpack_port = String.to_integer(System.get_env("WEBPACK_PORT") || "8090")

static_url =
  case System.get_env("STATIC_URL") do
    nil -> [host: System.get_env("STATIC_HOST") || host, port: port]
    static_url -> [url: static_url]
  end

webpack_path = "http://#{System.get_env("STATIC_HOST") || host}:#{webpack_port}"

config :site, SiteWeb.Endpoint,
  # Binding to loopback ipv4 address prevents access from other machines.
  # Change to `ip: {0, 0, 0, 0}` to allow access from other machines.
  http: [ip: {127, 0, 0, 1}, port: port],
  static_url: static_url,
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [npm: ["run", "webpack:watch", cd: Path.expand("../assets/", __DIR__)]]

config :site,
  dev_server?: true,
  webpack_path: webpack_path

# Watch static and templates for browser reloading.
config :site, SiteWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{lib/site_web/views/.*(ex)$},
      ~r{lib/site_web/templates/.*(heex|eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

config :logger,
  level: :warning,
  colors: [enabled: true]

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

config :site,
  exaws_config_fn: &Feedback.MockAws.config/1,
  exaws_perform_fn: &Feedback.MockAws.perform/2

unless System.get_env("DRUPAL_ROOT") do
  # To see CMS content locally, please read the README on how to setup Kalabox.
  # These instructions will help you run the CMS locally and configure the
  # correct endpoint for the drupal root.
  System.put_env("DRUPAL_ROOT", "http://temp-drupal.invalid")
end
