defmodule CMS.RedisRepo do
  @moduledoc """
  This module exists just to test using Redis in higher environments.
  It will be removed and the Nebulex cache will be used in `CMS.Repo`.
  """

  use Nebulex.Cache,
    otp_app: :cms,
    adapter: NebulexRedisAdapter
end
