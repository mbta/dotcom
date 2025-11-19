defmodule DotcomWeb.StopControllerTest do
  use DotcomWeb.ConnCase, async: true

  import Mox

  alias DotcomWeb.StopController
  alias Routes.Route
  alias Stops.Stop
  alias Test.Support.Factories
  alias Test.Support.FactoryHelpers
  alias Test.Support.Generators
  alias Util.Breadcrumb

  setup :verify_on_exit!

  @banner_alert_effects_active_or_future [
    :dock_closure,
    :dock_issue,
    :service_change,
    :shuttle,
    :station_closure,
    :station_issue,
    :stop_closure,
    :stop_moved,
    :stop_shoveling,
    :suspension
  ]

  @banner_alert_effects_active_only [
    :access_issue,
    :elevator_closure
  ]

  @banner_alert_effects @banner_alert_effects_active_only ++
                          @banner_alert_effects_active_or_future

  @non_banner_alert_effects Alerts.Alert.all_types() -- @banner_alert_effects

  test "redirects to subway stops on index", %{conn: conn} do
    conn = conn |> get(stop_path(conn, :index))
    assert redirected_to(conn) == stop_path(conn, :show, :subway)
  end

  @tag :external
  test "shows stations by mode", %{conn: conn} do
    conn =
      conn
      |> get(stop_path(conn, :show, :subway))

    response = html_response(conn, 200)

    for line <- ["Green", "Red", "Blue", "Orange", "Mattapan"] do
      assert response =~ line
    end
  end

  @tag :external
  test "assigns stop_info for each mode", %{conn: conn} do
    for mode <- [:subway, :ferry, "commuter-rail"] do
      conn =
        conn
        |> get(stop_path(conn, :show, mode))

      assert conn.assigns.stop_info
    end
  end

  test "redirects stations with slashes to the right URL", %{conn: conn} do
    conn =
      conn
      |> get("/stops/Four%20Corners%20/%20Geneva")

    assert redirected_to(conn) == stop_path(conn, :show, "Four Corners / Geneva")
  end

  @tag :external
  test "shows a stop ID", %{conn: conn} do
    conn = conn |> get(stop_path(conn, :show, "place-sstat"))

    assert conn.assigns.stop_id
  end

  @tag :external
  test "sets a custom meta description for stops", %{conn: conn} do
    conn =
      conn
      |> get(stop_path(conn, :show, "place-sstat"))

    assert conn.assigns.meta_description
  end

  @tag :external
  test "redirects to a parent stop page for a child stop", %{conn: conn} do
    conn =
      conn
      |> get(stop_path(conn, :show, 70_130))

    assert redirected_to(conn) == stop_path(conn, :show, "place-harvd")
  end

  @tag :external
  test "404s for an unknown stop", %{conn: conn} do
    conn =
      conn
      |> get(stop_path(conn, :show, "unknown"))

    assert Map.fetch!(conn, :status) == 404
  end

  describe "breadcrumbs/2" do
    test "returns station breadcrumbs if the stop is served by more than buses" do
      stop = %Stop{name: "Name", station?: true}
      routes = [%Route{id: "CR-Lowell", type: 2}]

      assert StopController.breadcrumbs(stop, routes) == [
               %Breadcrumb{text: "Stations", url: "/stops/commuter-rail"},
               %Breadcrumb{text: "Name", url: ""}
             ]
    end

    test "returns simple breadcrumb if the stop is served by only buses" do
      stop = %Stop{name: "Dudley Station"}
      routes = [%Route{id: "28", type: 3}]

      assert StopController.breadcrumbs(stop, routes) == [
               %Breadcrumb{text: "Dudley Station", url: ""}
             ]
    end

    test "returns simple breadcrumb if we have no route info for the stop" do
      stop = %Stop{name: "Name", station?: true}
      assert StopController.breadcrumbs(stop, []) == [%Breadcrumb{text: "Name", url: ""}]
    end
  end

  describe "api" do
    @tag :external
    test "returns json with departure data", %{conn: conn} do
      path = stop_path(conn, :api, id: "place-sstat")
      assert path == "/stops/api?id=place-sstat"

      response =
        conn
        |> get(path)
        |> json_response(200)

      assert is_list(response)
      refute Enum.empty?(response)

      for item <- response do
        assert %{"group_name" => _, "routes" => _} = item
      end
    end
  end

  describe "show/2" do
    setup _ do
      stub(Alerts.Repo.Mock, :by_route_ids, fn _stop_id, _datetime -> [] end)
      stub(Alerts.Repo.Mock, :by_stop_id, fn _stop_id -> [] end)

      stub(MBTA.Api.Mock, :get_json, fn "/facilities/", [{"filter[stop]", _}] ->
        %JsonApi{links: %{}, data: []}
      end)

      stub(Routes.Repo.Mock, :by_stop, fn _stop_id -> [] end)
      stub(Routes.Repo.Mock, :by_stop, fn _stop_id, _opts -> [] end)
      stub(Stops.Repo.Mock, :get, fn id -> Factories.Stops.Stop.build(:stop, id: id) end)
      stub(Stops.Repo.Mock, :has_parent?, fn _stop -> false end)
      stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

      :ok
    end

    @tag :external
    test "should set the title and meta description of the page", %{conn: conn} do
      conn =
        conn
        |> get(stop_path(conn, :show, "place-wondl"))

      [_stations, station_name] = conn.assigns.breadcrumbs

      assert "Wonderland" = station_name.text

      assert "Station serving MBTA Subway and Bus lines at 1300 North Shore Rd, Revere, MA 02151." =
               conn.assigns.meta_description
    end

    test "does not assign any banner alerts if there aren't any", %{conn: conn} do
      # Exercise
      conn = conn |> get(stop_path(conn, :show, FactoryHelpers.build(:id)))

      # Verify
      assert conn.assigns.banner_alerts == []
    end

    test "includes alerts for the stop", %{conn: conn} do
      # Setup
      stop_id = FactoryHelpers.build(:id)

      alert =
        Factories.Alerts.Alert.build(:alert,
          effect: Faker.Util.pick(@banner_alert_effects_active_or_future)
        )
        |> Factories.Alerts.Alert.active_now()

      expect(Alerts.Repo.Mock, :by_stop_id, fn ^stop_id -> [alert] end)

      # Exercise
      conn = conn |> get(stop_path(conn, :show, stop_id))

      # Verify
      assert conn.assigns.banner_alerts == [alert]
    end

    test "includes routewide alerts", %{conn: conn} do
      # Setup
      stop_id = FactoryHelpers.build(:id)
      route_id = FactoryHelpers.build(:id)

      alert =
        Factories.Alerts.Alert.build(:alert_for_informed_entity,
          informed_entity: %{stop: nil, trip: nil},
          effect: Faker.Util.pick(@banner_alert_effects_active_or_future)
        )
        |> Factories.Alerts.Alert.active_now()

      expect(Routes.Repo.Mock, :by_stop, fn ^stop_id, _opts ->
        [
          Factories.Routes.Route.build(:route, id: route_id)
        ]
      end)

      expect(Alerts.Repo.Mock, :by_route_ids, fn [^route_id], _datetime -> [alert] end)

      # Exercise
      conn = conn |> get(stop_path(conn, :show, stop_id))

      # Verify
      assert conn.assigns.banner_alerts == [alert]
    end

    test "does not include route alerts that are targeted to different stops", %{conn: conn} do
      # Setup
      [stop_id, other_stop_id] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)
      route_id = FactoryHelpers.build(:id)
      alert = Factories.Alerts.Alert.build(:alert_for_stop, stop_id: other_stop_id)

      expect(Routes.Repo.Mock, :by_stop, fn ^stop_id, _opts ->
        [
          Factories.Routes.Route.build(:route, id: route_id)
        ]
      end)

      expect(Alerts.Repo.Mock, :by_route_ids, fn [^route_id], _datetime -> [alert] end)

      # Exercise
      conn = conn |> get(stop_path(conn, :show, stop_id))

      # Verify
      assert conn.assigns.banner_alerts == []
    end

    test "does not include alerts with non-banner effects", %{conn: conn} do
      # Setup
      stop_id = FactoryHelpers.build(:id)

      alert =
        Factories.Alerts.Alert.build(:alert, effect: Faker.Util.pick(@non_banner_alert_effects))

      expect(Alerts.Repo.Mock, :by_stop_id, fn ^stop_id -> [alert] end)

      # Exercise
      conn = conn |> get(stop_path(conn, :show, stop_id))

      # Verify
      assert conn.assigns.banner_alerts == []
    end

    test "does not include alerts more than seven days out", %{conn: conn} do
      # Setup
      stop_id = FactoryHelpers.build(:id)
      now = Dotcom.Utils.DateTime.now()

      start_time =
        Generators.DateTime.random_date_time_after(now |> DateTime.shift(day: 7))

      alert =
        Factories.Alerts.Alert.build(:alert,
          effect: Faker.Util.pick(@banner_alert_effects_active_or_future)
        )
        |> Factories.Alerts.Alert.active_starting_at(start_time)

      expect(Alerts.Repo.Mock, :by_stop_id, fn ^stop_id -> [alert] end)

      # Exercise
      conn = conn |> get(stop_path(conn, :show, stop_id))

      # Verify
      assert conn.assigns.banner_alerts == []
    end

    test "includes future alerts within the next seven days", %{conn: conn} do
      # Setup
      stop_id = FactoryHelpers.build(:id)
      now = Dotcom.Utils.DateTime.now()

      start_time =
        Generators.DateTime.random_time_range_date_time({now, now |> DateTime.shift(day: 7)})

      alert =
        Factories.Alerts.Alert.build(:alert,
          effect: Faker.Util.pick(@banner_alert_effects_active_or_future)
        )
        |> Factories.Alerts.Alert.active_starting_at(start_time)

      expect(Alerts.Repo.Mock, :by_stop_id, fn ^stop_id -> [alert] end)

      # Exercise
      conn = conn |> get(stop_path(conn, :show, stop_id))

      # Verify
      assert conn.assigns.banner_alerts == [alert]
    end

    test "includes active :access_issue or :elevator_closure alerts", %{conn: conn} do
      # Setup
      stop_id = FactoryHelpers.build(:id)

      alert =
        Factories.Alerts.Alert.build(:alert,
          effect: Faker.Util.pick(@banner_alert_effects_active_only)
        )
        |> Factories.Alerts.Alert.active_now()

      expect(Alerts.Repo.Mock, :by_stop_id, fn ^stop_id -> [alert] end)

      # Exercise
      conn = conn |> get(stop_path(conn, :show, stop_id))

      # Verify
      assert conn.assigns.banner_alerts == [alert]
    end

    test "does not include future :access_issue or :elevator_closure alerts", %{conn: conn} do
      # Setup
      stop_id = FactoryHelpers.build(:id)
      now = Dotcom.Utils.DateTime.now()

      start_time =
        Generators.DateTime.random_time_range_date_time({now, now |> DateTime.shift(day: 7)})

      alert =
        Factories.Alerts.Alert.build(:alert,
          effect: Faker.Util.pick(@banner_alert_effects_active_only)
        )
        |> Factories.Alerts.Alert.active_starting_at(start_time)

      expect(Alerts.Repo.Mock, :by_stop_id, fn ^stop_id -> [alert] end)

      # Exercise
      conn = conn |> get(stop_path(conn, :show, stop_id))

      # Verify
      assert conn.assigns.banner_alerts == []
    end

    test "does not include global-banner alerts", %{conn: conn} do
      # Setup
      stop_id = FactoryHelpers.build(:id)

      alert =
        Factories.Alerts.Alert.build(:alert,
          banner: Faker.Lorem.Shakespeare.king_richard_iii(),
          effect: Faker.Util.pick(@banner_alert_effects)
        )
        |> Factories.Alerts.Alert.active_now()

      expect(Alerts.Repo.Mock, :by_stop_id, fn ^stop_id -> [alert] end)

      # Exercise
      conn = conn |> get(stop_path(conn, :show, stop_id))

      # Verify
      assert conn.assigns.banner_alerts == []
    end
  end

  describe "endpoints" do
    @tag :flaky
    test "grouped_route_patterns returns stop's route patterns by route & headsign", %{
      conn: conn
    } do
      MBTA.Api.Mock
      |> expect(:get_json, fn "/schedules/", opts ->
        assert opts[:stop] == "place-here"

        %JsonApi{
          data: [
            %JsonApi.Item{
              attributes: %{},
              relationships: %{}
            }
          ]
        }
      end)
      |> expect(:get_json, fn "/services/", _ ->
        %JsonApi{
          data: [
            %JsonApi.Item{
              id: "",
              attributes: %{
                "schedule_type" => "Weekday",
                "valid_days" => [1, 2, 3, 4, 5, 6, 7]
              },
              relationships: %{},
              type: "service"
            }
          ]
        }
      end)

      expect(Stops.Repo.Mock, :get, fn stop_id ->
        assert stop_id == "place-here"
        %Stop{}
      end)

      expect(RoutePatterns.Repo.Mock, :by_stop_id, fn stop_id ->
        assert stop_id == "place-here"

        [
          %RoutePatterns.RoutePattern{
            route_id: "Purple-A",
            headsign: "Tree Hill",
            name: "Here Square - Tree Hill",
            direction_id: 0
          }
        ]
      end)

      response =
        get(conn, stop_path(conn, :grouped_route_patterns, "place-here")) |> json_response(200)

      assert %{
               "Purple-A" => %{
                 "Tree Hill" => %{
                   "direction_id" => 0,
                   "route_patterns" => [
                     %{
                       "headsign" => "Tree Hill",
                       "name" => "Here Square - Tree Hill"
                     }
                     | _
                   ]
                 }
               }
             } = response
    end
  end
end
