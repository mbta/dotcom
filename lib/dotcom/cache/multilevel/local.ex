defmodule Dotcom.Cache.Multilevel.Local do
  @moduledoc """
  The first level of caching, in-memory.
  """
  use Nebulex.Cache, otp_app: :dotcom, adapter: Nebulex.Adapters.Local
end
