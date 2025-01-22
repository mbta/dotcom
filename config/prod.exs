import Config

# configured separately so that we can have the health check not require
# SSL
config :dotcom, :cache, Dotcom.Cache.Multilevel

config :dotcom, :secure_pipeline,
  force_ssl: [
    host: nil,
    rewrite_on: [:x_forwarded_proto]
  ]

config :dotcom, :trip_plan_feedback_cache, Dotcom.Cache.TripPlanFeedback.Cache
