defmodule SiteWeb.RouteController do
  @moduledoc """
  Endpoints for getting route data.
  """
  use SiteWeb, :controller
  alias Leaflet.MapData.Polyline
  alias Routes.{Repo, Route}

  @display_fare_classes [
    :local_bus_fare,
    :express_bus_fare,
    :rapid_transit_fare,
    :commuter_rail_fare,
    :ferry_fare
  ]

  @spec get_by_stop_id(Plug.Conn.t(), map) :: Plug.Conn.t()
  def get_by_stop_id(conn, %{"stop_id" => stop_id} = _params) do
    routes = stop_id |> Repo.by_stop()

    routesWithPolylines =
      routes
      |> Enum.map(fn route ->
        route
        |> Route.to_json_safe()
        |> Map.put(:polylines, route_polylines(route, stop_id))
      end)

    fares =
      stop_id
      # Get fare_class for all routes at this stop and at connecting stops
      |> Repo.by_stop(include: "stop.connecting_stops")
      |> Enum.map(&display_fare_class/1)
      |> Enum.uniq()
      # Sort in same order as @display_fare_classes
      |> Enum.sort_by(&Enum.find_index(@display_fare_classes, fn fc -> fc == &1 end))
      |> Enum.map(&Fares.Repo.for_fare_class(&1, duration: :single_trip, reduced: nil))
      |> Enum.map(fn fares_for_class ->
        price = price_range(fares_for_class)
        name = List.first(fares_for_class) |> fare_name()
        {name, price}
      end)

    json(conn, %{routes: routesWithPolylines, fares: fares})
  end

  defp route_polylines(route, stop_id) do
    route.id
    |> RoutePatterns.Repo.by_route_id(stop: stop_id)
    |> Enum.filter(&(!is_nil(&1.representative_trip_polyline)))
    |> Enum.map(&Polyline.new(&1, color: "#" <> route.color, weight: 4))
  end

  # Use the route mode to determine the display fare. e.g. instead of the 23 bus
  # showing the free fare, show the bus fare
  defp display_fare_class(%Route{id: id, fare_class: fare_class} = route)
       when fare_class not in @display_fare_classes do
    if Fares.express?(id) do
      :express_bus_fare
    else
      case Route.type_atom(route) do
        :subway ->
          :rapid_transit_fare

        :bus ->
          :local_bus_fare

        :commuter_rail ->
          :commuter_rail_fare

        :ferry ->
          :ferry_fare

        # probably a shuttle??
        _ ->
          :local_bus_fare
      end
    end
  end

  defp display_fare_class(%Route{fare_class: fare_class}), do: fare_class

  defp price_range(fares) do
    {min_price, max_price} = Enum.min_max_by(fares, & &1.cents)

    if min_price == max_price do
      Fares.Format.price(min_price)
    else
      "#{Fares.Format.price(min_price)} – #{Fares.Format.price(max_price)}"
    end
  end

  defp fare_name(%Fares.Fare{mode: :commuter_rail}) do
    "Commuter rail one-way"
  end

  defp fare_name(%Fares.Fare{mode: :ferry}) do
    "Ferry one-way"
  end

  defp fare_name(fare) do
    Fares.Format.name(fare)
    |> String.capitalize()
    |> String.replace_suffix("", " one-way")
  end
end
