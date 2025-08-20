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

  require Logger

  import Dotcom.Utils.Enum, only: [group_list: 1]

  defmodule Local do
    use Nebulex.Cache, otp_app: :dotcom, adapter: Nebulex.Adapters.Local
  end

  defmodule Redis do
    use Nebulex.Cache, otp_app: :dotcom, adapter: NebulexRedisAdapter
  end

  defmodule Publisher do
    use Nebulex.Cache, otp_app: :dotcom, adapter: Dotcom.Cache.Publisher
  end

  @cache Application.compile_env!(:dotcom, :cache)
  @redix Application.compile_env!(:dotcom, :redix)

  @doc """
  If the pattern contains an asterisk, we flush multiple keys.
  We have to do so by scanning Redis for all keys that match the pattern.

  If the pattern is just a single key, we can flush it directly.
  """
  def flush_keys(pattern \\ "*") do
    if String.contains?(pattern, "*") do
      flush_multiple_keys(pattern)
    else
      flush_single_key(pattern)
    end
  end

  @doc """
  Flush a single key from the cache.

  This is especially helpful when the key doesn't exist in Redis, but does in the Local cache.
  """
  def flush_single_key(key) do
    @cache.delete(key)
  end

  @doc """
  Get all keys in all nodes.
  """
  def get_all_keys() do
    case Application.get_env(:dotcom, :redis_config) |> @redix.start_link() do
      {:ok, conn} -> get_keys_from_nodes(conn)
      {:error, _} -> :error
    end
  end

  @doc """
  Delete all entries where the key matches the pattern.

  First, we make sure we can get a connection to Redis.
  Second, we get all of the nodes in the cluster.

  For each node:

  We get all the keys in Redis that match the pattern.
  Then, we use a cursor to stream the keys in batches of 100 using the SCAN command.
  Finally, we delete all the keys with the default delete/1 function.
  That way we'll delete from the Local, Redis, and publish the delete on the Publisher.
  """
  def flush_multiple_keys(pattern) do
    case Application.get_env(:dotcom, :redis_config) |> @redix.start_link() do
      {:ok, conn} -> (delete_from_nodes(conn, pattern) ++ [@redix.stop(conn)]) |> all_ok()
      {:error, _} -> :error
    end
  end

  defp all_ok(list) do
    if list
       |> List.flatten()
       |> Enum.all?(fn
         :ok -> true
         _ -> false
       end) do
      :ok
    else
      :error
    end
  end

  defp delete_from_node([host, port], pattern) do
    case @redix.start_link(host: host, port: port) do
      {:ok, conn} -> delete_stream_keys(conn, pattern)
      {:error, _} -> :error
    end
  end

  defp delete_from_nodes(conn, pattern) do
    case get_nodes(conn) do
      [] -> :ok
      nodes -> Enum.map(nodes, fn node -> delete_from_node(node, pattern) end)
    end
  end

  defp delete_keys(conn, keys) do
    results = Enum.map(keys, fn key -> @cache.delete(key) end)

    result = @redix.stop(conn)

    [result | results]
  end

  defp delete_stream_keys(conn, pattern) do
    case stream_keys(conn, pattern) |> Enum.to_list() |> List.flatten() do
      [] -> :ok
      keys -> delete_keys(conn, keys)
    end
  end

  defp get_keys_from_nodes(conn) do
    keys =
      conn
      |> stream_keys("*")
      |> grouped_keys()

    :timer.sleep(1)

    {@redix.stop(conn), keys}
  end

  defp get_nodes(conn) do
    case @redix.command(conn, ["CLUSTER", "SLOTS"]) do
      {:ok, slots} ->
        slots
        |> Enum.flat_map(fn slots -> Enum.slice(slots, 2..99) end)
        |> Enum.map(fn slot -> Enum.slice(slot, 0..1) end)
        |> Enum.sort_by(fn [_, port] -> port end)

      {:error, _} ->
        []
    end
  end

  defp grouped_keys(stream) do
    stream
    |> Enum.to_list()
    |> List.flatten()
    |> Enum.map(&String.split(&1, "|"))
    |> group_list()
  end

  defp scan_for_keys(conn, pattern, cursor) do
    case @redix.command(conn, ["SCAN", cursor, "MATCH", pattern, "COUNT", 100]) do
      {:ok, [new_cursor, keys]} -> {keys, if(new_cursor == "0", do: :stop, else: new_cursor)}
      {:error, _} -> {[], :stop}
    end
  end

  defp stream_keys(conn, pattern) do
    Stream.unfold("0", fn
      :stop -> nil
      cursor -> scan_for_keys(conn, pattern, cursor)
    end)
  end
end
