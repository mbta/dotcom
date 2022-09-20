defmodule Predictions.StreamSupervisor do
  @moduledoc """
  DynamicSupervisor managing per-route streams of predictions from the API.
  """

  use DynamicSupervisor

  alias Routes.Route

  @spec start_link(keyword()) :: Supervisor.on_start()
  def start_link(opts), do: DynamicSupervisor.start_link(__MODULE__, opts, name: __MODULE__)

  @impl DynamicSupervisor
  def init(_) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  @spec ensure_stream_is_started(Route.id_t()) :: {:ok, pid()} | :bypassed
  def ensure_stream_is_started(route_id),
    do: ensure_stream_is_started(route_id, System.get_env("USE_SERVER_SENT_EVENTS"))

  defp ensure_stream_is_started(_route_id, "false"), do: :bypassed

  defp ensure_stream_is_started(route_id, _) do
    case lookup(route_id) do
      nil ->
        start_stream(route_id)

      pid ->
        {:ok, pid}
    end
  end

  @spec lookup(Route.id_t()) :: pid() | nil
  defp lookup(route_id) do
    case Registry.lookup(:prediction_streams_registry, route_id) do
      [{pid, _}] -> if Process.alive?(pid), do: pid
      _ -> nil
    end
  end

  @spec start_stream(Route.id_t()) :: {:ok, pid()}
  defp start_stream(route_id) do
    with {:ok, sses_pid} <-
           DynamicSupervisor.start_child(__MODULE__, {ServerSentEventStage, sses_opts(route_id)}),
         {:ok, _api_stream_pid} <-
           DynamicSupervisor.start_child(
             __MODULE__,
             {V3Api.Stream,
              name: api_stream_name(route_id), subscribe_to: sses_stream_name(route_id)}
           ),
         {:ok, _predictions_stream_pid} <-
           DynamicSupervisor.start_child(
             __MODULE__,
             {Predictions.Stream, subscribe_to: api_stream_name(route_id)}
           ) do
      Registry.register(:prediction_streams_registry, route_id, sses_pid)
      {:ok, sses_pid}
    else
      {:error, {:already_started, pid}} ->
        {:ok, pid}
    end
  end

  @spec sses_opts(Route.id_t()) :: Keyword.t()
  defp sses_opts(route_id) do
    path =
      "/predictions?filter[route]=#{route_id}&fields[prediction]=status,departure_time,arrival_time,direction_id,schedule_relationship,stop_sequence&include=route,trip,trip.occupancies,stop&fields[route]=long_name,short_name,type&fields[trip]=direction_id,headsign,name,bikes_allowed&fields[stop]=platform_code"

    sses_opts =
      V3Api.Stream.build_options(
        name: sses_stream_name(route_id),
        path: path
      )

    sses_opts
  end

  @spec sses_stream_name(Route.id_t()) :: atom()
  defp sses_stream_name(route_id), do: :"predictions_sses_stream_#{route_id}"

  @spec api_stream_name(Route.id_t()) :: atom()
  defp api_stream_name(route_id), do: :"predictions_api_stream_#{route_id}"
end
