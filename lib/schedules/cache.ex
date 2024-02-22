defmodule Schedules.Cache do
  @moduledoc """
  A standard implementation of Nebulex.
  """

  use Nebulex.Cache, otp_app: :dotcom, adapter: NebulexRedisAdapter
end
