defmodule SiteWeb.TransitNearMeController.StopsWithRoutes do
  @moduledoc """
  Builds a list of stops near a location, with the routes that go through that stop.
  """

  alias GoogleMaps
  alias Site.JsonHelpers
  alias Routes.Route
  alias Site.TransitNearMe
  alias SiteWeb.PartialView.LocationCard
  alias SiteWeb.ViewHelpers
  alias Stops.Stop

  @type route_group :: {
          Route.gtfs_route_type() | Route.subway_lines_type(),
          [Route.t()]
        }

  @type stop_with_routes :: %{
          distance: float(),
          routes: [route_group],
          stop: Stop.t()
        }

  @spec stops_with_routes(TransitNearMe.t()) ::
          [map] | []
  def stops_with_routes(%TransitNearMe{stops: []}), do: []

  def stops_with_routes(data) do
    data
    |> from_routes_and_stops()
    |> Enum.reject(&Enum.empty?(&1.routes))
    |> Enum.map(&routes_to_map(&1))
    |> Enum.map(fn stop_with_route ->
      stop_with_route
      |> Map.update!(:stop, fn stop ->
        TransitNearMe.build_stop_map(stop, data.distances)
      end)
      |> Map.update!(:distance, &ViewHelpers.round_distance(&1))
    end)
  end

  @spec from_routes_and_stops(TransitNearMe.t()) :: [stop_with_routes]
  def from_routes_and_stops(%TransitNearMe{stops: stops} = data) do
    stops
    |> Task.async_stream(&build_stop_with_routes(&1, data))
    |> Enum.map(fn {:ok, map} -> map end)
  end

  @spec routes_to_map(stop_with_routes) :: map
  def routes_to_map(stop_with_routes) do
    Map.update!(stop_with_routes, :routes, fn value ->
      Enum.map(value, fn {route_group, routes} ->
        %{
          group_name: route_group,
          routes: Enum.map(routes, &build_route_map(&1, route_group, stop_with_routes.stop))
        }
      end)
    end)
  end

  @spec build_route_map(Route.t(), Routes.Group.t(), Stop.t()) :: map
  def build_route_map(route, route_group, stop) do
    route_path = LocationCard.route_path(route, stop, route_group)

    route
    |> Map.from_struct()
    |> Map.put(:href, route_path)
    |> Map.update!(:name, &ViewHelpers.break_text_at_slash(&1))
    |> Map.update!(:direction_names, &JsonHelpers.update_map_for_encoding(&1))
    |> Map.update!(:direction_destinations, &JsonHelpers.update_map_for_encoding(&1))
  end

  @spec build_stop_with_routes(Stop.t(), TransitNearMe.t()) :: stop_with_routes
  defp build_stop_with_routes(
         %Stop{} = stop,
         %TransitNearMe{} = data
       ) do
    grouped_routes =
      data
      |> TransitNearMe.routes_for_stop(stop.id)
      |> get_route_groups()

    %{
      stop: stop,
      distance: TransitNearMe.distance_for_stop(data, stop.id),
      routes: grouped_routes
    }
  end

  @spec get_route_groups([Route.t()]) :: [Routes.Group.t()]
  defp get_route_groups(route_list) do
    route_list
    |> Enum.group_by(&Route.type_atom/1)
    |> Keyword.new()
    |> separate_subway_lines()
    |> Keyword.delete(:subway)
  end

  @doc """
    Returns the grouped routes list with subway lines elevated to the top level, eg:

      separate_subway_lines([commuter: [_], bus: [_], subway: [orange_line, red_line])
      # =>   [commuter: [commuter_lines], bus: [bus_lines], orange: [orange_line], red: [red_line]]

  """
  @spec separate_subway_lines([Routes.Group.t()]) :: [
          {Routes.Route.gtfs_route_type() | Route.subway_lines_type(), [Route.t()]}
        ]
  def separate_subway_lines(routes) do
    routes
    |> Keyword.get(:subway, [])
    |> Enum.reduce(routes, &subway_reducer/2)
  end

  @spec subway_reducer(Route.t(), [Routes.Group.t()]) :: [
          {Routes.Route.subway_lines_type(), [Route.t()]}
        ]
  defp subway_reducer(%Route{id: id, type: 1} = route, routes) do
    Keyword.put(routes, id |> Kernel.<>("_line") |> String.downcase() |> String.to_atom(), [route])
  end

  defp subway_reducer(%Route{name: "Green" <> _} = route, routes) do
    Keyword.put(routes, :green_line, [Route.to_naive(route)])
  end

  defp subway_reducer(%Route{id: "Mattapan"} = route, routes) do
    Keyword.put(routes, :mattapan_trolley, [route])
  end
end
