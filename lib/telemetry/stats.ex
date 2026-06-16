defmodule Telemetry.Stats do
  @moduledoc """
  Shared aggregation and dispatch logic for telemetry stats using ETS.
  """

  @doc """
  Creates a new public ETS table with write concurrency enabled.
  """
  def new_table(name) do
    _ = :ets.new(name, [:named_table, :public, :set, write_concurrency: true])

    :ok
  end

  @doc """
  Updates the ETS table with the given duration.
  """
  def record_stat(table, key1, key2, status, duration) do
    key = {key1, key2, status}

    try do
      :ets.update_counter(table, key, [{2, 1}, {3, duration}], {key, 0, 0})
    rescue
      ArgumentError ->
        # The table is likely being swapped during dispatch. Retry after a tiny sleep.
        Process.sleep(1)

        try do
          :ets.update_counter(table, key, [{2, 1}, {3, duration}], {key, 0, 0})
        rescue
          ArgumentError ->
            # stats aren't required; make sure we don't crash
            :ok
        end
    end
  end

  @doc """
  Swaps the ETS table, retrieves all stats, and dispatches them.
  """
  def dispatch_stats(table, event, key1_label) do
    temp_name = :"#{table}_temp_"

    # Rename current table to temp name
    :ets.rename(table, temp_name)

    # Recreate the active table under the original name
    new_table(table)

    # Allow a brief moment for any ongoing writes to the old table to finish
    Process.sleep(1)

    # Retrieve all objects from the temporary table
    stats = :ets.tab2list(temp_name)

    # Delete the temporary table
    :ets.delete(temp_name)

    # Dispatch the retrieved stats
    Enum.each(stats, fn entry ->
      {{key1, path, status}, count, sum} = entry
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
