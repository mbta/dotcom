defmodule Dotcom.Cache.TestCache do
  @moduledoc """
  This local Nebulex instance allows us to run tests w/out the need for Redis.
  """

  use Nebulex.Cache,
    otp_app: :dotcom,
    adapter: Nebulex.Adapters.Local,
    default_key_generator: Dotcom.Cache.KeyGenerator
end
