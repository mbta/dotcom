import Config

config :dotcom, :cache, Dotcom.Cache.Multilevel

# Local development using custom SSL certs
config :dotcom, :cms_api, connect_options: [transport_opts: [verify: :verify_none]]

config :kino_live_component,
  css_path: "http://localhost:8090/app.css",
  endpoint: "http://localhost:4001/kino-live-component",
  js_path: nil
