defmodule Telemetry.Stats do
  @moduledoc """
  Shared aggregation and dispatch logic for telemetry stats.
  """

  @doc """
  Updates the nested map state with the given duration.
  """
  def record_stat(state, key1, key2, status, duration) do
    if Kernel.get_in(state, [key1, key2, status]) do
      Kernel.update_in(state, [key1, key2, status], fn count_and_sum ->
        {count, sum} = count_and_sum
        {count + 1, sum + duration}
      end)
    else
      Kernel.put_in(state, [Access.key(key1, %{}), Access.key(key2, %{}), status], {1, duration})
    end
  end

  @doc """
  Traverses the aggregated stats and executes the telemetry event for each.
  """
  def dispatch_stats(state, event, key1_label) do
    Enum.each(state, fn entry ->
      {key1, stats} = entry
      dispatch_key1(stats, event, key1_label, key1)
    end)
  end

  defp dispatch_key1(stats, event, key1_label, key1) do
    Enum.each(stats, fn path_entry ->
      {path, statuses} = path_entry
      dispatch_path(statuses, event, key1_label, key1, path)
    end)
  end

  defp dispatch_path(statuses, event, key1_label, key1, path) do
    Enum.each(statuses, fn status_entry ->
      {status, count_and_sum} = status_entry
      {count, sum} = count_and_sum
      dispatch_stat(event, key1_label, key1, path, status, count, sum)
    end)
  end

  defp dispatch_stat(event, key1_label, key1, path, status, count, sum) do
    avg =
      sum
      |> Kernel.div(count)
      |> System.convert_time_unit(:native, :millisecond)

    :telemetry.execute(event, %{count: count, avg: avg}, %{
      key1_label => key1,
      path: path,
      status: status
    })
  end
end
