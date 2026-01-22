defmodule Dotcom.Cache.Multilevel.Redis do
  @moduledoc """
  Local caches will retrieve values from Redis if possible.
  """
  use Nebulex.Cache, otp_app: :dotcom, adapter: NebulexRedisAdapter
end
