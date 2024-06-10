import Config

# Pantheonsite can be an env variable to ensure stuff
config :dotcom,
       :content_security_policy_definition,
       Enum.join(
         [
           "default-src 'none'",
           "img-src 'self' cdn.mbta.com *.gstatic.com https://live-mbta.pantheonsite.io *.s3.amazonaws.com data:",
           "style-src 'self' 'unsafe-inline' localhost:* www.gstatic.com",
           "script-src 'self' 'unsafe-eval' 'unsafe-inline' localhost:* translate.google.com www.gstatic.com www.googletagmanager.com *.googleapis.com",
           "font-src 'self' localhost:*",
           "connect-src 'self' localhost:* ws://localhost:* translate.googleapis.com",
           "frame-src 'self' localhost:*"
         ],
         "; "
       )

config :dotcom, :cache, Dotcom.Cache.Multilevel
config :dotcom, :trip_plan_feedback_cache, Dotcom.Cache.TripPlanFeedback.Cache
