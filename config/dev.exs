import Config

config :dotcom, :cache, Dotcom.Cache.Multilevel

config :kino_live_component,
  css_path: "http://localhost:8090/app.css",
  endpoint: "http://localhost:4001/kino-live-component",
  js_path: nil
