defmodule Dotcom.Cache.Telemetry.Reporter do
  @moduledoc """
  This custom Telemetry Reporter logs hit rate information for `Dotom.Cache.Multilevel`.
  It also logs exceptions for `Redix.ConnectionError`, `Redix.Error`, and `ArgumentError`.
  And, finally, it logs evictions for `Dotcom.Cache.Multilevel.Publisher`.

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
      [:dotcom, :cache, :multilevel, :l2, :command, :exception],
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
    name = event_name(event_name)

    Logger.warning("#{name} kind=#{kind} reason=#{reason}")
  end

  def handle_exception(
        event_name,
        _measurements,
        %{kind: kind, reason: %Redix.Error{message: message}},
        _config
      ) do
    name = event_name(event_name)

    Logger.warning("#{name} kind=#{kind} reason=#{message}")
  end

  def handle_exception(
        event_name,
        _measurements,
        %{kind: kind, reason: %ArgumentError{message: message}},
        _config
      ) do
    name = event_name(event_name)

    Logger.warning("#{name} kind=#{kind} reason=#{message}")
  end

  defp handle_metric(%Metrics.LastValue{}, %{evictions: evictions}, %{
         cache: Dotcom.Cache.Multilevel.Publisher
       }) do
    name = module_name(Dotcom.Cache.Multilevel.Publisher)

    Logger.notice("#{name}.stats evictions=#{evictions}")
  end

  defp handle_metric(%Metrics.LastValue{}, %{hits: hits, misses: misses}, metadata) do
    name = module_name(metadata.cache)

    total = hits + misses
    rate = if total > 0, do: Float.ceil(hits / total, 4), else: 0

    if rate > 0 do
      Logger.notice("#{name}.stats hits=#{hits} misses=#{misses} total=#{total} hit_rate=#{rate}")
    end
  end

  defp handle_metric(metric, _measurements, metadata) do
    name = module_name(metadata.cache)

    Logger.warning("#{name}.unsupported_metric metric=#{metric.__struct__}")
  end

  defp event_name(event) do
    event
    |> Enum.map(&Atom.to_string/1)
    |> Enum.join(".")
    |> String.downcase()
  end

  defp module_name(module) do
    module
    |> Kernel.to_string()
    |> String.split(".")
    |> (fn [_ | tail] -> tail end).()
    |> Enum.join(".")
    |> String.downcase()
  end
end
