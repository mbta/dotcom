defmodule Dotcom.UpcomingDepartures do
  @moduledoc """
  This module serves as an entrypoint for other parts of Dotcom to
  get information about realtime upcoming departures.
  """

  alias Dotcom.UpcomingDepartures.{Processor, Server}

  defdelegate upcoming_departures(predicted_schedules, args), to: Processor

  defdelegate trip_details(args), to: Processor

  @spec subscribe(map()) :: :ok
  def subscribe(params) do
    topic = topic_name(params)
    :ok = DotcomWeb.Endpoint.subscribe(topic)
    _ = DotcomWeb.Presence.track(self(), topic, "upcoming_departures", %{})

    params
    |> get_or_start_worker()
    |> GenServer.cast({:subscribe, self()})
  end

  @spec unsubscribe(map()) :: :ok
  def unsubscribe(params) do
    topic = topic_name(params)
    _ = DotcomWeb.Presence.untrack(self(), topic, "upcoming_departures")

    :ok = DotcomWeb.Endpoint.unsubscribe(topic)
  end

  def topic_name(%{route_id: route_id, direction_id: direction_id, stop_id: stop_id}) do
    "departures:#{route_id}:#{direction_id}:#{stop_id}"
  end

  defp get_or_start_worker(params) do
    get_worker(params) || start_worker(params)
  end

  defp get_worker(params) do
    GenServer.whereis({:global, params})
  end

  defp start_worker(params) do
    case DynamicSupervisor.start_child(Dotcom.UpcomingDepartures.Supervisor, {Server, params}) do
      {:ok, pid} -> pid
      {:error, {:already_started, pid}} -> pid
    end
  end
end
