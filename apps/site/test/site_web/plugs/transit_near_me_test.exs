defmodule SiteWeb.Plugs.TransitNearMeTest do
  use SiteWeb.ConnCase

  import SiteWeb.Plugs.TransitNearMe

  alias LocationService.Address
  alias Routes.{Repo, Route}
  alias SiteWeb.Plugs.TransitNearMe.Options
  alias Stops.Stop

  @tnm_address "10 park plaza, boston ma"
  @stop_ids [
    # commuter
    "place-sstat",
    # subway
    "place-tumnl",
    # bus
    "8279"
  ]

  describe "call/2" do
    test "separates subway lines in response", %{conn: conn} do
      %{assigns: %{stops_with_routes: stops}} = search_near_office(conn)
      assert [%{routes: route_list, stop: %Stops.Stop{}} | _] = stops
      refute Keyword.get(route_list, :commuter_rail) == nil
      refute Keyword.get(route_list, :red_line) == nil
      assert Keyword.get(route_list, :subway) == nil
    end

    test "assigns address and stops with routes", %{conn: conn} do
      options =
        init(
          nearby_fn: &mock_response/1,
          geocode_fn: &geocode_fn/1
        )

      conn =
        conn
        |> bypass_through(SiteWeb.Router, :browser)
        |> get("/")
        |> assign_query_params(%{"location" => %{"address" => @tnm_address}})
        |> call(options)

      assert :stops_with_routes in Map.keys(conn.assigns)
      assert :tnm_address in Map.keys(conn.assigns)
      assert get_flash(conn) == %{}
    end

    test "assigns address and stops with routes when address param is not nested", %{conn: conn} do
      options =
        init(
          nearby_fn: &mock_response/1,
          geocode_fn: &geocode_fn/1
        )

      conn =
        conn
        |> bypass_through(SiteWeb.Router, :browser)
        |> get("/")
        |> assign_query_params(%{
          "address" => @tnm_address,
          "latitude" => "42.0",
          "longitude" => "-71.0"
        })
        |> call(options)

      assert :stops_with_routes in Map.keys(conn.assigns)
      assert conn.assigns.tnm_address == @tnm_address
      assert get_flash(conn) == %{}
    end

    test "assigns address and stops with routes when address param is nested and lat/lng is provided",
         %{conn: conn} do
      options =
        init(
          nearby_fn: &mock_response/1,
          geocode_fn: &geocode_fn/1
        )

      conn =
        conn
        |> bypass_through(SiteWeb.Router, :browser)
        |> get("/")
        |> assign_query_params(%{
          "location" => %{"address" => @tnm_address},
          "latitude" => "42.0",
          "longitude" => "-71.0"
        })
        |> call(options)

      assert :stops_with_routes in Map.keys(conn.assigns)
      assert conn.assigns.tnm_address == @tnm_address
      assert get_flash(conn) == %{}
    end

    test "assigns no stops and empty address if none is provided", %{conn: conn} do
      conn =
        conn
        |> assign_query_params(%{})
        |> bypass_through(SiteWeb.Router, :browser)
        |> get("/")
        |> call(init([]))

      assert conn.assigns.stops_with_routes == []
      assert conn.assigns.tnm_address == ""
    end

    test "flashes message if no results are returned", %{conn: conn} do
      options =
        init(
          geocode_fn: fn @tnm_address -> {:ok, [%Address{formatted: "formatted"}]} end,
          nearby_fn: fn _ -> [] end
        )

      conn =
        conn
        |> bypass_through(SiteWeb.Router, :browser)
        |> get("/")
        |> assign_query_params(%{"location" => %{"address" => @tnm_address}})
        |> call(options)

      assert conn.assigns.stops_with_routes == []
      assert conn.assigns.tnm_address == "formatted"
      test_val = get_flash(conn)["info"]

      assert test_val =~ "seem to be any stations"
    end

    test "can take a lat/long as query parameters", %{conn: conn} do
      options =
        init(
          nearby_fn: &mock_response/1,
          geocode_fn: &geocode_fn/1
        )

      lat = 42.3515322
      lng = -71.0668452

      conn =
        conn
        |> bypass_through(SiteWeb.Router, :browser)
        |> get("/")
        |> assign_query_params(%{"latitude" => "#{lat}", "longitude" => "#{lng}"})
        |> call(options)

      assert %{assigns: %{stops_with_routes: stops, tnm_address: _}} = conn
      assert length(stops) == 3
      assert get_flash(conn) == %{}
    end

    test "assigns google maps requirement", %{conn: conn} do
      conn =
        conn
        |> assign_query_params(%{})
        |> bypass_through(SiteWeb.Router, :browser)
        |> get("/")
        |> call(init([]))

      assert conn.assigns.requires_location_service?
    end
  end

  describe "init/1" do
    test "it returns a default options map" do
      assert init([]) == Map.from_struct(%Options{})
    end
  end

  describe "get_stops_nearby/2" do
    test "with a good geocode result, calls function with first result" do
      geocode_result = {:ok, [%Address{}]}
      nearby = fn %Address{} -> [%Stop{}] end

      actual = get_stops_nearby(geocode_result, nearby)
      expected = [%Stop{}]

      assert actual == expected
    end

    test "when there are errors, returns an empty list" do
      geocode_result = {:error, :internal_error}
      nearby = fn %Address{} -> [%Stop{}] end

      actual = get_stops_nearby(geocode_result, nearby)
      expected = []

      assert actual == expected
    end
  end

  describe "get_route_groups/1" do
    test "regroups subway into indiviual entries" do
      red_line = %Route{id: "Red", name: "Red", type: 1}
      green_line = %Route{id: "Green-B", name: "Green-B", type: 0}
      route_list = [green_line, red_line]

      assert route_list |> get_route_groups() |> Enum.sort() == [
               green_line: [
                 Repo.green_line()
               ],
               red_line: [red_line]
             ]
    end

    test "does not group Mattapan in with the Red line" do
      red_line = %Route{id: "Red", name: "Red", type: 1}
      mattapan_trolley = %Route{id: "Mattapan", name: "Red", type: 0}
      route_list = [mattapan_trolley, red_line]

      assert get_route_groups(route_list) == [
               red_line: [red_line],
               mattapan_trolley: [mattapan_trolley]
             ]
    end
  end

  describe "put_flash_if_error/2" do
    test "does nothing if there are stops_with_routes", %{conn: conn} do
      conn =
        conn
        |> assign(:stops_with_routes, [{%Stops.Stop{}, []}])
        |> bypass_through(SiteWeb.Router, :browser)
        |> get("/")
        |> flash_if_error

      assert get_flash(conn) == %{}
    end

    test "shows message if there's no stops_with_routes and there is an address", %{conn: conn} do
      conn =
        conn
        |> assign(:stops_with_routes, [])
        |> assign(:tnm_address, "123 main st")
        |> bypass_through(SiteWeb.Router, :browser)
        |> get("/")
        |> flash_if_error

      test_val = get_flash(conn)["info"]

      assert test_val =~ "seem to be any stations"
    end

    test "flashes errors if there are any", %{conn: conn} do
      conn =
        conn
        |> assign(:tnm_address_error, "bad address")
        |> bypass_through(SiteWeb.Router, :browser)
        |> get("/")
        |> flash_if_error

      test_val = get_flash(conn)["info"]

      assert test_val =~ "bad address"
    end
  end

  describe "assign_address/2" do
    test "it assigns address when there are no errors", %{conn: conn} do
      location_service_result = {:ok, [%{formatted: "10 park plaza"}]}

      conn =
        conn
        |> assign_address(location_service_result)

      assert conn.assigns.tnm_address == "10 park plaza"
    end

    test "when geocoding fails, it tells the user they had a bad address", %{conn: conn} do
      location_service_result = {:error, :zero_results}

      conn =
        conn
        |> assign_address(location_service_result)

      assert conn.assigns.tnm_address == ""

      assert conn.assigns.tnm_address_error ==
               "The address you've listed appears to be invalid. Please try a new address to continue."
    end
  end

  def mock_response(_) do
    @stop_ids
    |> Enum.map(&Stops.Repo.get/1)
  end

  def geocode_fn("10 park plaza, boston ma") do
    {:ok,
     [
       %Address{
         latitude: 42.351818,
         longitude: -71.067006,
         formatted: "10 Park Plaza, Boston, MA"
       }
     ]}
  end

  def search_near_office(conn) do
    search_near_address(conn, @tnm_address)
  end

  def search_near_address(conn, address) do
    options =
      init(
        geocode_fn: &geocode_fn/1,
        nearby_fn: &mock_response/1
      )

    conn
    |> assign_query_params(%{"location" => %{"address" => address}})
    |> bypass_through(SiteWeb.Router, :browser)
    |> SiteWeb.Plugs.TransitNearMe.call(options)
  end

  def assign_query_params(conn, params) do
    %{conn | params: params}
  end
end
