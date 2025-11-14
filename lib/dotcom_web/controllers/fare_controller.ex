defmodule DotcomWeb.FareController do
  @moduledoc """
  Controller for the Fares section of the website.
  """

  use Dotcom.Gettext.Sigils
  use DotcomWeb, :controller

  import DotcomWeb.ViewHelpers, only: [cms_static_page_path: 2]

  alias Plug.Conn

  plug(:meta_description)

  @options %{
    nearby_fn: %{
      retail: &Fares.RetailLocations.get_nearby/1,
      proposed: &Fares.ProposedLocations.get_nearby/1
    }
  }

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

  defp meta_description(conn, _) do
    conn
    |> assign(
      :meta_description,
      ~t"View common fare information for the MBTA bus, subway, Commuter Rail, ferry, and The RIDE. Find online CharlieCard services and learn about bulk ordering programs."
    )
  end
end
