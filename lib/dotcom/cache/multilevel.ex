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

  @doc """
  To flush the cache, we get all *shared* keys in Redis and delete them.
  These deletes will be published to the Publisher, which will then delete the keys in the Local caches.
  """
  def flush_keys(pattern \\ "*") do
    case Application.get_env(:dotcom, :redis) |> Redix.start_link() do
      {:ok, conn} -> flush_redis_keys(conn, pattern)
      {:error, _} -> :error
    end
  end

  defp flush_redis_keys(conn, pattern) do
    case Redix.command(conn, ["KEYS", pattern]) do
      {:ok, keys} -> delete_keys(conn, keys)
      {:error, _} -> :error
    end
  end

  defp delete_keys(conn, keys) do
    Enum.each(keys, fn key -> __MODULE__.delete(key) end)

    Redix.stop(conn)
  end
end
