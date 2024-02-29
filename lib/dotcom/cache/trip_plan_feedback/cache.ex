defmodule Dotcom.Cache.TripPlanFeedback.Cache do
  use Nebulex.Cache,
    otp_app: :dotcom,
    adapter: NebulexRedisAdapter
end
