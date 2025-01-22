defmodule DotcomWeb.Plugs.CommonFares do
  @moduledoc false
  @behaviour Plug

  @summary_filters [
    bus_subway: [
      [name: :subway, duration: :single_trip, reduced: nil],
      [name: :local_bus, duration: :single_trip, reduced: nil],
      [name: :subway, duration: :month, reduced: nil]
    ],
    commuter_rail: [
      [mode: :commuter_rail, duration: :single_trip, reduced: nil]
    ]
  ]

  @impl true
  def init([]) do
    # split up the filtering to avoid the cache (runtime-only)
    all_fares = Fares.Repo.all()

    Enum.flat_map(@summary_filters, fn {summary_type, filters} ->
      filters
      |> Enum.flat_map(&Fares.Repo.filter(all_fares, &1))
      |> Fares.Format.summarize(summary_type)
    end)
  end

  @impl true
  def call(conn, summaries) do
    Plug.Conn.assign(conn, :common_fare_summaries, summaries)
  end
end
