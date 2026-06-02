import Config

config :dotcom, :cache, Dotcom.Cache.Multilevel

# Local development using custom SSL certs
config :dotcom, :cms_api, connect_options: [transport_opts: [verify: :verify_none]]

config :dotcom,
  dev_server?: true

config :dotcom, DotcomWeb.Endpoint,
  code_reloader: true,
  debug_errors: true,
  # Bind to 0.0.0.0 to expose the server to the docker host machine.
  # This makes make the service accessible from any network interface.
  # Change to `ip: {127, 0, 0, 1}` to allow access only from the server machine.
  http: [ip: {0, 0, 0, 0}],
  # Watch static and templates for browser reloading.
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{lib/dotcom_web/components/.*(ex)$},
      ~r{lib/dotcom_web/views/.*(ex)$},
      ~r{lib/dotcom_web/templates/.*(heex|eex)$},
      ~r{lib/dotcom_web/live/.*(heex|ex)$}
    ]
  ],
  log_access_url: true,
  # Watch assets for browser reloading.
  watchers: [npm: ["run", "webpack:watch", cd: Path.expand("../assets/", __DIR__)]]

config :phoenix_live_view,
  debug_heex_annotations: true,
  debug_attributes: true,
  enable_expensive_runtime_checks: true

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime
