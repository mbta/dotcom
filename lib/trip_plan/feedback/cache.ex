defmodule TripPlan.Feedback.Cache do
  use Nebulex.Cache,
    otp_app: :dotcom,
    adapter: NebulexRedisAdapter
end
