defmodule Dotcom.Cache.Multilevel.Publisher do
  @moduledoc """
  Last level of the multilevel cache, handles cache invalidation across levels.
  """
  use Nebulex.Cache, otp_app: :dotcom, adapter: Dotcom.Cache.Publisher
end
