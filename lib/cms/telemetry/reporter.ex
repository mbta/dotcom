defmodule CMS.Telemetry.Reporter do
  @moduledoc """
  This custom Telemetry Reporter logs hit rate information for the `CMS.Cache`.

  See https://blog.miguelcoba.com/telemetry-and-metrics-in-elixir#heading-customreporter for more on writing custom reporters.
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

    :telemetry.attach(
      "cache-command-exception",
      [:cms, :cache, :command, :exception],
      &__MODULE__.handle_exception/4,
      nil
    )

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

  def handle_exception(
        event_name,
        _measurements,
        %{kind: kind, reason: %Redix.ConnectionError{reason: reason}},
        _config
      ) do
    key = event_name |> Enum.map(&Atom.to_string/1) |> Enum.join(".")

    Logger.warning("#{key} kind=#{kind} reason=#{reason}")
  end

  def handle_exception(
        event_name,
        _measurements,
        %{kind: kind, reason: %Redix.Error{message: message}},
        _config
      ) do
    key = event_name |> Enum.map(&Atom.to_string/1) |> Enum.join(".")

    Logger.warning("#{key} kind=#{kind} reason=#{message}")
  end

  defp handle_metric(%Metrics.LastValue{}, %{hits: hits, misses: misses}, _metadata) do
    total = hits + misses

    if total > 0 do
      Logger.notice(
        "cms.cache.stats hits=#{hits} misses=#{misses} total=#{total} hit_rate=#{hits / total}"
      )
    end
  end

  defp handle_metric(metric, _measurements, _metadata) do
    Logger.warning("cms.cache.unsupported_metric metric=#{metric.__struct__}")
  end
end
