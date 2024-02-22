defmodule TestCache do
  @moduledoc """
  This local Nebulex instance allows us to run tests w/out the need for Redis.
  """

  use Nebulex.Cache, otp_app: :cms, adapter: Nebulex.Adapters.Local
end
