defmodule Algolia.Routes do
  @behaviour Algolia.Index

  @repo :dotcom
        |> Application.compile_env!(:algolia_repos)
        |> Keyword.fetch!(:routes)

  @impl Algolia.Index
  def all do
    [@repo.green_line() | @repo.all()]
  end

  @impl Algolia.Index
  def index_name, do: "routes"

  def get_stop_names(route) do
    route.id
    |> Algolia.Stops.by_route()
    |> filter_stations(route.type)
    |> Enum.map(fn stop -> stop.name end)
  end

  def filter_stations(stops, route_type)
  def filter_stations(stops, 3), do: Enum.filter(stops, & &1.station?)
  def filter_stations(stops, _), do: stops

  def headsigns("Green") do
    nil
  end

  def headsigns(id) do
    id
    |> @repo.get()
    |> Map.get(:direction_destinations)
    |> Map.values()
  end
end
