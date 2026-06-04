defmodule Dotcom.UpcomingDepartures do
  @moduledoc """
  This module serves as an entrypoint for other parts of Dotcom to
  get information about realtime upcoming departures.
  """

  alias Dotcom.UpcomingDepartures.{Processor, Server}

  defdelegate upcoming_departures(args), to: Processor

  defdelegate trip_details(args), to: Processor

  @spec subscribe(map()) :: :ok
  def subscribe(params) do
    {:ok, topic} = topic_name(params)
    :ok = DotcomWeb.Endpoint.subscribe(topic)

    topic
    |> get_or_start_worker()
    |> GenServer.cast({:subscribe, self()})
  end

  @spec unsubscribe(map()) :: :ok
  def unsubscribe(params) do
    {:ok, topic} = topic_name(params)
    :ok = DotcomWeb.Endpoint.unsubscribe(topic)

    worker = get_worker(topic)

    if worker do
      GenServer.cast(worker, {:unsubscribe, self()})
    end
  end

  defp topic_name(%{route_id: route_id, direction_id: direction_id, stop_id: stop_id}) do
    {:ok, "departures:#{route_id}:#{direction_id}:#{stop_id}"}
  end

  defp get_or_start_worker(topic) do
    get_worker(topic) || start_worker(topic)
  end

  defp get_worker(topic) do
    GenServer.whereis({:global, topic})
  end

  defp start_worker(topic) do
    case DynamicSupervisor.start_child(UpcomingDeparturesSupervisor, {Server, topic}) do
      {:ok, pid} -> pid
      {:error, {:already_started, pid}} -> pid
    end
  end
end
