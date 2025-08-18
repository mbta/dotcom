defprotocol Algolia.Object do
  def object_id(obj)
  def data(obj)
  def url(obj)
end

defimpl Algolia.Object, for: Stops.Stop do
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  def object_id(stop), do: "stop-" <> stop.id
  def url(stop), do: Util.site_path(:stop_path, [:show, stop])

  def data(stop) do
    routes_for_stop = @routes_repo.by_stop(stop.id)

    %{
      _geoloc: %{
        lat: stop.latitude,
        lng: stop.longitude
      },
      stop: stop,
      zone: stop.zone,
      routes: Algolia.Stop.Routes.for_stop(routes_for_stop),
      features: @stops_repo.stop_features(stop),
      green_line_branches: Algolia.Stop.Routes.green_line_branches(routes_for_stop)
    }
  end
end

defimpl Algolia.Object, for: Routes.Route do
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  def object_id(route), do: "route-" <> route.id
  def url(route), do: Util.site_path(:schedule_path, [:show, route])

  def data(route) do
    stop_names = get_stop_names(route)
    headsigns = route.direction_destinations

    %{
      route: route,
      stop_names: stop_names,
      headsigns: headsigns
    }
  end

  defp get_stop_names(route) do
    @stops_repo.by_route(route.id, 0, include: "")
    |> filter_stations(route.type)
    |> Enum.map(fn stop -> stop.name end)
  end

  defp filter_stations(stops, route_type)
  defp filter_stations(stops, 3), do: Enum.filter(stops, & &1.station?)
  defp filter_stations(stops, _), do: stops
end
