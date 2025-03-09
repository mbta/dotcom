import Config

config :dotcom, :cache, Dotcom.Cache.Multilevel
config :dotcom, dev_server?: true
config :dotcom, :trip_plan_feedback_cache, Dotcom.Cache.TripPlanFeedback.Cache

config :kino_live_component,
  css_path: "http://localhost:8090/app.css",
  endpoint: "http://localhost:4001/kino-live-component",
  js_path: nil
