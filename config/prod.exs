import Config

config :dotcom, :cache, Dotcom.Cache.Multilevel
config :dotcom, :trip_plan_feedback_cache, Dotcom.Cache.TripPlanFeedback.Cache

config :ex_aws,
  access_key_id: :instance_role,
  secret_access_key: :instance_role
