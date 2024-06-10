import Config

config :dotcom, :cache, Dotcom.Cache.Multilevel
config :dotcom, :trip_plan_feedback_cache, Dotcom.Cache.TripPlanFeedback.Cache

config :dotcom,
       :content_security_policy_definition,
       Enum.join(
         [
           "default-src 'none'",
           "img-src 'self' cdn.mbta.com *.gstatic.com *.s3.amazonaws.com data:",
           "style-src 'self' 'unsafe-inline' www.gstatic.com cdn.mbta.com",
           "script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.mbta.com translate.google.com www.gstatic.com www.googletagmanager.com *.googleapis.com",
           "font-src 'self' cdn.mbta.com",
           "connect-src 'self' translate.googleapis.com",
           "frame-src 'self'"
         ],
         "; "
       )

# configured separately so that we can have the health check not require
# SSL
config :dotcom, :secure_pipeline,
  force_ssl: [
    host: nil,
    rewrite_on: [:x_forwarded_proto]
  ]
