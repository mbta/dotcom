defmodule Dotcom.Cache.Multilevel do
  @moduledoc """
  A multilevel implementation of Nebulex.

  https://hexdocs.pm/nebulex/Nebulex.Adapters.Multilevel.html

  Caches will be checked in the following order:
  - Local (L1)
  - Redis (L2)
  - Publisher (L3)

  The Publisher isn't really a caching layer.
  Because calls filter down through layers, we can publish any command that comes into the cache.
  Currently, we only care about invalidating the cache, so we only publish delete commands.
  """

  use Nebulex.Cache,
    otp_app: :dotcom,
    adapter: Nebulex.Adapters.Multilevel,
    default_key_generator: Dotcom.Cache.KeyGenerator

  defmodule Local do
    use Nebulex.Cache, otp_app: :dotcom, adapter: Nebulex.Adapters.Local
  end

  defmodule Redis do
    use Nebulex.Cache, otp_app: :dotcom, adapter: NebulexRedisAdapter
  end

  defmodule Publisher do
    use Nebulex.Cache, otp_app: :dotcom, adapter: Dotcom.Cache.Publisher
  end
end
