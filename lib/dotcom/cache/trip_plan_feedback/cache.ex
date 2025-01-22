defmodule Dotcom.Cache.TripPlanFeedback.Cache do
  @moduledoc false
  use Nebulex.Cache,
    otp_app: :dotcom,
    adapter: NebulexRedisAdapter
end
