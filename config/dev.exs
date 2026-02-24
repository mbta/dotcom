import Config

config :dotcom, :cache, Dotcom.Cache.Multilevel

# Local development using custom SSL certs
config :dotcom, :cms_api, connect_options: [transport_opts: [verify: :verify_none]]

config :kino_live_component,
  css_path: "http://localhost:8090/app.css",
  endpoint: "http://localhost:4001/kino-live-component",
  js_path: nil

config :phoenix_live_view,
  debug_heex_annotations: true,
  debug_attributes: true,
  enable_expensive_runtime_checks: true

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime
