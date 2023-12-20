defmodule CMS.Cache do
  @moduledoc """
  A standard implementation of Nebulex.
  """

  use Nebulex.Cache, otp_app: :cms, adapter: NebulexRedisAdapter
end
