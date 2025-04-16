import Config

config :dotcom, :cache, Dotcom.Cache.Multilevel

# configured separately so that we can have the health check not require
# SSL
config :dotcom, :secure_pipeline,
  force_ssl: [
    host: nil,
    rewrite_on: [:x_forwarded_proto]
  ]
