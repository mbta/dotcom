defmodule MBTA.Api.StatusMonitor do
  @moduledoc """
  Watches the MBTA V3 API's /status endpoint values for changes. If changed, we
  flush the corresponding cache(s).
  """

  require Logger

  use GenServer

  import Dotcom.Cache.Multilevel, only: [flush_multiple_keys: 1]

  @repo_cache_keys %{
    "facility" => [
      "facilities.repo|*"
    ],
    "route" => [
      "routes.repo|*",
      "route_patterns.repo|*"
    ],
    "schedule" => [
      "schedules.repo|*",
      "schedules.repo_condensed|*",
      "schedules.hours_of_operation|*"
    ],
    "service" => [
      "services.repo|*"
    ],
    "shape" => [
      "routes.repo|get_shape|*",
      "routes.repo|cached_get_shapes|*"
    ],
    "stop" => [
      "stops.repo|*",
      "routes.repo|cached_by_stop|*",
      "routes.repo|do_by_stop_with_route_pattern|*"
    ],
    "trip" => [
      "schedules.repo|fetch_trip|*",
      "stops.repo|by_trip|*"
    ]
  }
  @status_endpoints Map.keys(@repo_cache_keys)
  @update_interval_ms 600_000

  def start_link(status_map) do
    GenServer.start_link(__MODULE__, status_map, [])
  end

  @impl GenServer
  @doc """
  Initializes a map keyed by each V3 API endpoint we're tracking the status of,
  and triggers the monitoring process.
  """
  def init(_) do
    status_map = Map.from_keys(@status_endpoints, nil)
    send(self(), :update_status)
    {:ok, status_map}
  end

  @impl GenServer
  def handle_info(:update_status, status_map) do
    Process.send_after(self(), :update_status, @update_interval_ms)

    case get_status() do
      {:error, error} ->
        Logger.error("#{inspect(error)}")
        {:noreply, status_map}

      new_status_map ->
        maybe_flush_keys(status_map, new_status_map)
        {:noreply, new_status_map}
    end
  end

  defp get_status do
    case MBTA.Api.get_json("/status", []) do
      %JsonApi{data: [%JsonApi.Item{type: "status", attributes: attributes}]} ->
        attributes

      {:error, _} = error ->
        error

      other ->
        {:error, {:unexpected_response, other}}
    end
  end

  defp maybe_flush_keys(status_map, new_status_map) when status_map == new_status_map, do: :ok

  defp maybe_flush_keys(status_map, new_status_map) do
    for key <- @status_endpoints do
      if status_map[key] == new_status_map[key] do
        :ok
      else
        @repo_cache_keys[key]
        |> Enum.each(&flush_multiple_keys/1)
      end
    end
  end
end
