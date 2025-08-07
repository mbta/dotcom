defmodule DotcomWeb.CacheController do
  @moduledoc """
  A controller that allows us to interact with the cache.
  Currently, we only support deleting keys from the cache.
  """

  use DotcomWeb, :controller

  require Logger

  @cache Application.compile_env!(:dotcom, :cache)

  @doc """
  Gets all of the values in every node for the given key.
  """
  def get_cache_values(conn, %{"path" => path}) do
    uuid = UUID.uuid4(:hex) |> String.upcase() |> String.to_atom()
    key = Enum.join(path, "|")

    GenServer.start_link(Dotcom.Cache.Get.Publisher, uuid, name: uuid)

    GenServer.call(uuid, {:load, key})

    :timer.sleep(1000)

    values = GenServer.call(uuid, :get)

    GenServer.stop(uuid)

    send_resp(conn, 200, inspect(values)) |> halt()
  end

  @doc """
  Flushes the cache given a key in the path.
  Simply use a / in the path where you would use a | in the key.
  Wildcards are supported.

  Examples:

  /cache/stops.repo/stop/* -> stops.repo|stop|*
  /cache/stops.repo/stop/1 -> stops.repo|stop|1
  """
  def flush_cache_keys(conn, %{"path" => path}) do
    key = Enum.join(path, "|")

    try do
      Kernel.apply(@cache, flush_cache_function(@cache), [key])
    rescue
      e in Redix.ConnectionError ->
        Logger.warning("dotcom_web.cache_controller.error error=redis-#{e.reason}")

      e in Redix.Error ->
        Logger.warning("dotcom_web.cache_controller.error error=redis-#{e.message}")
    end

    send_resp(conn, 202, "") |> halt()
  end

  defp flush_cache_function(cache) do
    if cache.__info__(:functions) |> Keyword.has_key?(:flush_keys) do
      :flush_keys
    else
      :delete
    end
  end
end
