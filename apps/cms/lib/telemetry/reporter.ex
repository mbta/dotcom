defmodule CMS.Telemetry.Reporter do
  @moduledoc """
  This custom reporter logs hit rate information for the CMS.Repo.
  """

  use GenServer

  require Logger

  alias Telemetry.Metrics

  def start_link(metrics: metrics) do
    GenServer.start_link(__MODULE__, metrics)
  end

  @impl true
  def init(metrics) do
    Process.flag(:trap_exit, true)

    groups = Enum.group_by(metrics, & &1.event_name)

    for {event, metrics} <- groups do
      :telemetry.attach({__MODULE__, event, self()}, event, &__MODULE__.handle_event/4, metrics)
    end

    {:ok, Map.keys(groups)}
  end

  @impl true
  def terminate(_, events) do
    for event <- events do
      :telemetry.detach({__MODULE__, event, self()})
    end

    :ok
  end

  def handle_event(_event_name, measurements, metadata, metrics) do
    metrics
    |> Enum.map(&handle_metric(&1, measurements, metadata))
  end

  defp handle_metric(%Metrics.LastValue{}, %{hits: hits, misses: misses}, _metadata) do
    total = hits + misses

    if total > 0 do
      Logger.notice(
        "cms.repo.stats hits=#{hits} misses=#{misses} total=#{total} hit_rate=#{hits / total}"
      )
    end
  end

  defp handle_metric(metric, _measurements, _metadata) do
    Logger.warning("cms.repo.unsupported_metric metric=#{metric.__struct__}")
  end
end
