defmodule Dotcom.Cache.Multilevel do
  @moduledoc """
  A multilevel implementation of Nebulex.

  https://hexdocs.pm/nebulex/Nebulex.Adapters.Multilevel.html
  """

  use Nebulex.Cache, otp_app: :dotcom, adapter: Nebulex.Adapters.Multilevel

  defmodule Local do
    use Nebulex.Cache, otp_app: :dotcom, adapter: Nebulex.Adapters.Local
  end

  defmodule Redis do
    use Nebulex.Cache, otp_app: :dotcom, adapter: NebulexRedisAdapter
  end
end
