defmodule Dotcom.GtfsLookups do
  @moduledoc """
  Parses GTFS into lookup tables for quick access, and updates when GTFS changes
  """

  use GenServer

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  @impl GenServer
  def init(arg) do
    build_lookup_tables()
    {:ok, arg}
  end

  @impl GenServer
  def handle_info(:gtfs_updated, state) do
    populate_in_seat_transfer_lookup()
    {:noreply, state}
  end

  def handle_info(_, state), do: {:noreply, state}

  defp build_lookup_tables do
    :ets.new(:gtfs_transfers, [:named_table, :bag, :public, read_concurrency: true])
  end

  defp populate_in_seat_transfer_lookup do
    case RiderUtils.Gtfs.get("transfers.txt") do
      {:ok, rows} ->
        rows
        |> Enum.filter(&(&1["transfer_type"] == "4"))
        |> Enum.map(&{&1["from_trip_id"], &1["to_trip_id"]})
        |> then(&:ets.insert(:gtfs_transfers, &1))

      _ ->
        :ok
    end
  end

  @doc """

  Leveraging in-seat transfers, find the next trip IDs for the given trip ID.

  Most will have none. Some will have 1-2.
  # Usage
  Dotcom.GtfsLookups.next_trip_ids("Boat-F10-1555-Commonwealth-BF10-A-PM-Weekday-PreAug17-Summer-26")
  ["Boat-F10-1650-Commonwealth-BF10-A-PM-Weekday-PreAug17-Summer-26",
   "Boat-F10-1745-Commonwealth-BF10-A-PM-Weekday-PreAug17-Summer-26",
   "Boat-F10-1840-Commonwealth-BF10-A-PM-Weekday-PreAug17-Summer-26",
   "Boat-F10-1935-Commonwealth-BF10-A-PM-Weekday-PreAug17-Summer-26"]
  """
  @spec next_trip_ids(String.t(), non_neg_integer()) :: [String.t()]
  def next_trip_ids(trip_id, n \\ 3)
  def next_trip_ids(_, 0), do: []

  def next_trip_ids(trip_id, n) do
    case :ets.select(:gtfs_transfers, [{{trip_id, :"$1"}, [], [:"$1"]}]) do
      [] ->
        []

      [next_trip_id] ->
        [next_trip_id | next_trip_ids(next_trip_id, n - 1)]
    end
  end
end
