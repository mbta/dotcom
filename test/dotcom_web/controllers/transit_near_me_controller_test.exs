defmodule DotcomWeb.TransitNearMeControllerTest do
  use DotcomWeb.ConnCase, async: true

  import Mox
  import Test.Support.Factories.MBTA.Api

  alias DotcomWeb.PartialView.FullscreenError
  alias DotcomWeb.TransitNearMeController
  alias Leaflet.MapData
  alias Leaflet.MapData.Marker
  alias LocationService.Address
  alias Stops.Stop

  @orange_line %{
    id: "Orange",
    description: :rapid_transit,
    name: "Orange Line",
    type: 1,
    href: "/ornage-line"
  }
  @cr_worcester %{
    id: "CR-Worcester",
    description: :commuter_rail,
    name: "Framingham/Worcester Line",
    type: 2,
    href: "/cr-worcester"
  }
  @cr_franklin %{
    id: "CR-Franklin",
    description: :commuter_rail,
    name: "Franklin Line",
    type: 2,
    href: "/cr-franklin"
  }
  @cr_needham %{
    id: "CR-Needham",
    description: :commuter_rail,
    name: "Needham Line",
    type: 2,
    href: "/cr-needham"
  }
  @cr_providence %{
    id: "CR-Providence",
    description: :commuter_rail,
    name: "Providence/Stoughton Line",
    type: 2,
    href: "/cr-providence"
  }
  @bus_10 %{id: "10", description: :local_bus, name: "10", type: 3, href: "/bus-10"}
  @bus_39 %{id: "39", description: :frequent_bus_route, name: "39", type: 3, href: "/bus-39"}
  @bus_170 %{id: "170", description: :supplemental_bus, name: "170", type: 3, href: "/bus-170"}

  @back_bay %Stop{
    accessibility: ["accessible", "elevator", "tty_phone", "escalator_up"],
    address: "145 Dartmouth St Boston, MA 02116-5162",
    id: "place-bbsta",
    latitude: 42.34735,
    longitude: -71.075727,
    name: "Back Bay",
    station?: true
  }

  @stop_with_routes %{
    distance: 0.52934802,
    routes: [
      %{group_name: :orange_line, routes: [@orange_line]},
      %{group_name: :bus, routes: [@bus_39, @bus_170, @bus_10]},
      %{
        group_name: :commuter_rail,
        routes: [@cr_franklin, @cr_needham, @cr_providence, @cr_worcester]
      }
    ],
    stop: @back_bay
  }

  @latitude Faker.Address.latitude()
  @longitude Faker.Address.longitude()
  @valid_location_params %{
    "latitude" => "#{@latitude}",
    "longitude" => "#{@longitude}"
  }

  @address Faker.Address.street_address()
  @located_address %Address{
    formatted: @address,
    latitude: @latitude,
    longitude: @longitude
  }

  setup :verify_on_exit!

  describe "with no location params" do
    @tag :flaky
    test "does not attempt to calculate stops with routes", %{conn: conn} do
      conn = get(conn, transit_near_me_path(conn, :index))
      assert conn.status == 200
      assert conn.assigns.location == :no_address
      assert conn.assigns.stops_json == %{stops: []}
      assert conn.assigns.flash == %{}
    end
  end

  describe "with valid location params" do
    test "assigns stops with routes", %{conn: conn} do
      stops = build_list(3, :stop_item)

      expect(LocationService.Mock, :reverse_geocode, fn @latitude, @longitude ->
        {:ok, [@located_address]}
      end)

      expect(MBTA.Api.Mock, :get_json, 3, fn "/stops/", opts ->
        assert opts[:sort] == "distance"
        assert opts[:latitude] == @located_address.latitude
        assert opts[:longitude] == @located_address.longitude
        assert opts[:route_type] in ["0,1", 2, 3]

        %JsonApi{data: stops}
      end)

      # routes gets called twice per stop (once per direction) x 2 per each location param
      expect(Routes.Repo.Mock, :by_stop, length(stops) * 2 * 2, fn stop_id, opts ->
        assert stop_id in Enum.map(stops, & &1.id)
        assert opts[:direction_id] in [0, 1]

        []
      end)

      # attempts to find parent stop for each stop
      expect(Stops.Repo.Mock, :get_parent, length(stops), fn id ->
        %Stop{id: id, latitude: Faker.Address.latitude(), longitude: Faker.Address.longitude()}
      end)

      params = %{"location" => @valid_location_params}

      conn = get(conn, transit_near_me_path(conn, :index, params))

      assert conn.status == 200

      assert {:ok, [%Address{}]} = conn.assigns.location
      assert conn.assigns.stops_json
      assert %MapData{} = conn.assigns.map_data
      # shows markers for each stop + the located address
      assert Enum.count(conn.assigns.map_data.markers) == length(stops) + 1

      for stop <- stops do
        assert %Marker{} = Enum.find(conn.assigns.map_data.markers, &(&1.id == stop.id))
      end

      assert conn.assigns.flash == %{}
    end

    @tag :flaky
    test "flashes an error if location has no stops nearby", %{conn: conn} do
      expect(LocationService.Mock, :geocode, fn address ->
        assert address == @address
        {:ok, [@located_address]}
      end)

      expect(MBTA.Api.Mock, :get_json, 3, fn "/stops/", opts ->
        assert opts[:sort] == "distance"
        assert opts[:latitude] == @located_address.latitude
        assert opts[:longitude] == @located_address.longitude
        assert opts[:route_type] in ["0,1", 2, 3]

        %JsonApi{data: []}
      end)

      params = %{"address" => @address}

      conn = get(conn, transit_near_me_path(conn, :index, params))

      assert conn.status == 200

      assert {:ok, [%Address{}]} = conn.assigns.location
      assert conn.assigns.stops_json.stops == []

      assert conn.assigns.flash == %{
               "info" => %FullscreenError{
                 body:
                   "There doesn't seem to be any stations found near the given address. Please try a different address to continue.",
                 heading: "No MBTA service nearby"
               }
             }
    end
  end

  describe "with invalid location params" do
    test "flashes an error when address cannot be located", %{conn: conn} do
      location_error = {:error, :zero_results}

      expect(LocationService.Mock, :geocode, fn _ ->
        location_error
      end)

      params = %{"address" => "not_found"}

      conn = get(conn, transit_near_me_path(conn, :index, params))

      assert conn.status == 200

      assert conn.assigns.location == location_error
      assert conn.assigns.stops_json.stops == []

      assert conn.assigns.flash == %{
               "info" => %FullscreenError{
                 body: "We are unable to locate that address.",
                 heading: "We’re sorry"
               }
             }
    end

    test "flashes an error for any other error", %{conn: conn} do
      expect(LocationService.Mock, :geocode, fn _ ->
        {:error, :internal_error}
      end)

      params = %{"address" => "nothing"}

      conn = get(conn, transit_near_me_path(conn, :index, params))

      assert conn.status == 200

      assert conn.assigns.location == {:error, :internal_error}
      assert conn.assigns.stops_json == %{stops: []}

      assert conn.assigns.flash == %{
               "info" => %FullscreenError{
                 body: "There was an error locating that address. Please try again.",
                 heading: "We’re sorry"
               }
             }
    end
  end

  describe "assign_map_data/1" do
    test "initializes a map with no markers", %{conn: conn} do
      conn =
        conn
        |> assign(:stops_json, %{stops: []})
        |> assign(:location, nil)
        |> TransitNearMeController.assign_map_data()

      assert %MapData{} = conn.assigns.map_data
      assert conn.assigns.map_data.markers == []
    end

    test "assigns a marker for all stops", %{conn: conn} do
      conn =
        conn
        |> assign(:stops_json, %{stops: [@stop_with_routes]})
        |> assign(:location, nil)
        |> TransitNearMeController.assign_map_data()

      assert %MapData{} = conn.assigns.map_data
      assert [marker] = conn.assigns.map_data.markers
      assert %Marker{} = marker
      assert marker.latitude == @stop_with_routes.stop.latitude
      assert marker.longitude == @stop_with_routes.stop.longitude
      assert marker.tooltip == nil
    end

    test "assigns a marker with a bus icon for stops that aren't stations", %{conn: conn} do
      bus_stop_with_routes =
        put_in(
          @stop_with_routes.routes,
          [
            %{
              group_name: :bus,
              routes: [
                %{
                  description: :frequent_bus_route,
                  direction_destinations: :unknown,
                  direction_names: %{"0" => "Outbound", "1" => "Inbound"},
                  id: "39",
                  long_name: "",
                  name: "39",
                  type: 3,
                  href: "/39"
                },
                %{
                  description: :supplemental_bus,
                  direction_destinations: :unknown,
                  direction_names: %{"0" => "Outbound", "1" => "Inbound"},
                  id: "170",
                  long_name: "",
                  name: "170",
                  type: 3,
                  href: "/170"
                },
                %{
                  description: :local_bus,
                  direction_destinations: :unknown,
                  direction_names: %{"0" => "Outbound", "1" => "Inbound"},
                  id: "10",
                  long_name: "",
                  name: "10",
                  type: 3,
                  href: "/10"
                }
              ]
            }
          ]
        )

      bus_stop_with_routes = put_in(bus_stop_with_routes.stop.id, "bus-stop")

      conn =
        conn
        |> assign(:stops_json, %{stops: [@stop_with_routes, bus_stop_with_routes]})
        |> assign(:location, nil)
        |> TransitNearMeController.assign_map_data()

      assert %MapData{} = conn.assigns.map_data
      assert markers = conn.assigns.map_data.markers
      bus_marker = Enum.find(markers, fn m -> m.id == "bus-stop" end)
      assert %Marker{} = bus_marker
      assert bus_marker.icon == "map-stop-marker"
    end

    test "defaults to a bus icon when no routes", %{conn: conn} do
      bus_stop_with_routes =
        put_in(
          @stop_with_routes.routes,
          [
            %{
              group_name: :bus,
              routes: []
            }
          ]
        )

      bus_stop_with_routes = put_in(bus_stop_with_routes.stop.id, "bus-stop")

      conn =
        conn
        |> assign(:stops_json, %{stops: [@stop_with_routes, bus_stop_with_routes]})
        |> assign(:location, nil)
        |> TransitNearMeController.assign_map_data()

      assert %MapData{} = conn.assigns.map_data
      assert markers = conn.assigns.map_data.markers
      bus_marker = Enum.find(markers, fn m -> m.id == "bus-stop" end)
      assert %Marker{} = bus_marker
      assert bus_marker.icon == "map-stop-marker"
    end

    test "assigns a marker for the provided location", %{conn: conn} do
      conn =
        conn
        |> assign(:stops_json, %{stops: []})
        |> assign(
          :location,
          {:ok,
           [
             %Address{
               formatted: "10 Park Plaza",
               latitude: @stop_with_routes.stop.latitude,
               longitude: @stop_with_routes.stop.longitude
             }
           ]}
        )
        |> TransitNearMeController.assign_map_data()

      assert [marker] = conn.assigns.map_data.markers
      assert marker.id == "current-location"
      assert marker.tooltip == "10 Park Plaza"
    end
  end
end
