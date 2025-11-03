defmodule DotcomWeb.FareController do
  @moduledoc """
  Controller for the Fares section of the website.
  """

  use Dotcom.Gettext.Sigils
  use DotcomWeb, :controller

  import DotcomWeb.ViewHelpers, only: [cms_static_page_path: 2]

  alias Plug.Conn

  plug(:meta_description)

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @options %{
    nearby_fn: %{
      retail: &Fares.RetailLocations.get_nearby/1,
      proposed: &Fares.ProposedLocations.get_nearby/1
    }
  }

  @display_fare_classes [
    :local_bus_fare,
    :express_bus_fare,
    :rapid_transit_fare,
    :commuter_rail_fare,
    :ferry_fare
  ]

  def show(conn, %{"id" => "retail-sales-locations"} = params) do
    find_locations(conn, params, :retail)
  end

  def show(conn, _) do
    check_cms_or_404(conn)
  end

  def show_transformation(conn, params) do
    find_locations(conn, params, :proposed)
  end

  @spec find_locations(Conn.t(), map, :proposed | :retail) :: Conn.t()
  def find_locations(
        conn,
        %{
          "location" => %{
            "address" => address,
            "latitude" => latitude,
            "longitude" => longitude
          }
        } = _params,
        proposed_or_retail
      ) do
    case {Float.parse(latitude), Float.parse(longitude)} do
      {{lat, ""}, {lng, ""}} ->
        position = %LocationService.Address{
          formatted: address,
          latitude: lat,
          longitude: lng
        }

        found_locations =
          @options.nearby_fn
          |> Map.get(proposed_or_retail)
          |> apply([position])

        render_with_locations(conn, found_locations, address, position, proposed_or_retail)

      _ ->
        render_with_locations(conn, [], address, %{}, proposed_or_retail)
    end
  end

  def find_locations(conn, %{"latitude" => lat, "longitude" => lon} = params, proposed_or_retail) do
    address =
      case params do
        %{"address" => value} -> value
        %{"name" => value} -> value
        _ -> lat <> "," <> lon
      end

    params =
      Map.put(params, "location", %{
        "address" => address,
        "latitude" => lat,
        "longitude" => lon
      })

    find_locations(conn, params, proposed_or_retail)
  end

  def find_locations(conn, _params, proposed_or_retail) do
    render_with_locations(conn, [], "", %{}, proposed_or_retail)
  end

  defp render_with_locations(conn, found_locations, address, position, proposed_or_retail) do
    opts =
      [address: address, search_position: position]
      |> Keyword.put_new(
        if(proposed_or_retail == :proposed,
          do: :nearby_proposed_locations,
          else: :fare_sales_locations
        ),
        found_locations
      )

    do_render_with_locations(conn, opts, proposed_or_retail)
  end

  defp do_render_with_locations(conn, opts, :proposed) do
    conn
    |> assign(:breadcrumbs, [
      Breadcrumb.build(
        ~t"Fare Transformation",
        cms_static_page_path(conn, "/fare-transformation")
      ),
      Breadcrumb.build(~t"Proposed Sales Locations")
    ])
    |> render("proposed_sales_locations.html", opts)
  end

  defp do_render_with_locations(conn, opts, :retail) do
    conn
    |> assign(:breadcrumbs, [
      Breadcrumb.build(~t"Fares", cms_static_page_path(conn, "/fares")),
      Breadcrumb.build(~t"Retail Sales Locations")
    ])
    |> render("retail_sales_locations.html", opts)
  end

  def one_way_by_stop_id(conn, %{"stop_id" => stop_id} = _params) do
    one_way_fares =
      stop_id
      # Get fare_class for all routes at this stop and at connecting stops
      |> @routes_repo.by_stop(include: "stop.connecting_stops")
      |> Enum.map(&display_fare_class/1)
      |> Enum.uniq()
      # Sort in same order as @display_fare_classes
      |> Enum.sort_by(&Enum.find_index(@display_fare_classes, fn fc -> fc == &1 end))
      |> Enum.flat_map(fn fare_class ->
        fare_class
        |> Fares.Repo.for_fare_class(duration: :single_trip, reduced: nil)
        |> Fares.Format.summarize(Fares.Format.mode_type_for_fare_class(fare_class))
        |> Enum.map(fn summary ->
          changed_name = format_name(summary)
          {changed_name, Fares.Summary.price_range(summary)}
        end)
      end)

    json(conn, one_way_fares)
  end

  defp format_name(summary) do
    name =
      if is_binary(summary.name) do
        summary.name
      else
        Enum.join(summary.name)
      end

    # capitalize lowercases every word after the first word in `name`.  This fixes the one
    # edge case for Commuter Rail
    capitalized_name = String.capitalize(name)
    String.replace(capitalized_name, "Commuter rail", "Commuter Rail")
  end

  # Use the route mode to determine the display fare. e.g. instead of the 23 bus
  # showing the free fare, show the bus fare
  defp display_fare_class(%Routes.Route{id: id, fare_class: fare_class} = route)
       when fare_class not in @display_fare_classes do
    if Fares.express?(id) do
      :express_bus_fare
    else
      case Routes.Route.type_atom(route) do
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

  defp display_fare_class(%Routes.Route{fare_class: fare_class}), do: fare_class

  defp meta_description(conn, _) do
    conn
    |> assign(
      :meta_description,
      ~t"View common fare information for the MBTA bus, subway, Commuter Rail, ferry, and The RIDE. Find online CharlieCard services and learn about bulk ordering programs."
    )
  end
end
