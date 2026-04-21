defmodule DotcomWeb.ScheduleFinderLiveTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Router.Helpers, only: [live_path: 2, live_path: 3]
  import Mox
  import Phoenix.LiveViewTest
  import Test.Support.Generators.DateTime, only: [random_date_time: 0]

  alias DotcomWeb.ScheduleFinderLive
  alias Test.Support.Factories
  alias Test.Support.FactoryHelpers

  setup :verify_on_exit!

  setup _ do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  test "loads, fetching route info", %{conn: conn} do
    route_id = FactoryHelpers.build(:id)
    stop_id = FactoryHelpers.build(:id)
    direction_id = FactoryHelpers.build(:direction_id)

    # The LiveView lifecycle calls mount/3 twice, hence these are run twice
    expect(Dotcom.ScheduleFinder.Mock, :current_alerts, 2, fn stop, route ->
      assert stop.id == stop_id
      assert route.id == route_id
      []
    end)

    expect(Routes.Repo.Mock, :get, 2, fn ^route_id ->
      Factories.Routes.Route.build(:route, %{id: route_id})
    end)

    expect(Services.Repo.Mock, :by_route_id, 2, fn ^route_id ->
      Factories.Services.Service.build_list(5, :service)
    end)

    expect(Stops.Repo.Mock, :get, 2, fn ^stop_id ->
      Factories.Stops.Stop.build(:stop, %{id: stop_id})
    end)

    path =
      live_path(conn, ScheduleFinderLive,
        route_id: route_id,
        direction_id: direction_id,
        stop_id: stop_id
      )

    assert {:ok, view, _html} = live(conn, path, on_error: :warn)
    assert has_element?(view, "h2", "Upcoming Departures")
    assert has_element?(view, "h2", "Daily Schedules")
  end

  test "redirects without params", %{conn: conn} do
    path = live_path(conn, ScheduleFinderLive)
    assert {:error, {:live_redirect, %{to: "/schedules", flash: %{}}}} = live(conn, path)
  end

  @tag :capture_log
  test "shows 404 for invalid route param", %{conn: conn} do
    route_id = FactoryHelpers.build(:id)
    stop_id = FactoryHelpers.build(:id)
    direction_id = FactoryHelpers.build(:direction_id)

    path =
      live_path(conn, ScheduleFinderLive,
        route_id: route_id,
        direction_id: direction_id,
        stop_id: stop_id
      )

    expect(Routes.Repo.Mock, :get, 1, fn ^route_id -> nil end)
    deny(Stops.Repo.Mock, :get, 1)

    assert_raise DotcomWeb.NotFoundError, fn ->
      live(conn, path)
    end
  end

  @tag :capture_log
  test "shows 404 for invalid stop param", %{conn: conn} do
    route_id = FactoryHelpers.build(:id)
    stop_id = FactoryHelpers.build(:id)
    direction_id = FactoryHelpers.build(:direction_id)

    path =
      live_path(conn, ScheduleFinderLive,
        route_id: route_id,
        direction_id: direction_id,
        stop_id: stop_id
      )

    expect(Routes.Repo.Mock, :get, 1, fn ^route_id ->
      Factories.Routes.Route.build(:route, id: route_id)
    end)

    expect(Stops.Repo.Mock, :get, 1, fn ^stop_id -> nil end)

    assert_raise DotcomWeb.NotFoundError, fn ->
      live(conn, path)
    end
  end

  describe "displays current route with link" do
    setup do
      %{direction_id: FactoryHelpers.build(:direction_id)}
    end

    test "default case", %{direction_id: direction_id} do
      route = Factories.Routes.Route.build(:route)

      html =
        render_component(&ScheduleFinderLive.route_banner/1,
          direction_id: direction_id,
          route: route
        )

      assert html =~
               ~s(<a href=\"/schedules/#{route.id}?schedule_direction[direction_id]=#{direction_id}\")

      assert html =~ route.name
      assert html =~ route.direction_names[direction_id]
      assert html =~ "towards"
      assert html =~ route.direction_destinations[direction_id]
    end

    test "omits destination for Green Line", %{direction_id: direction_id} do
      green_line = Factories.Routes.Route.build(:route, %{id: "Green"})

      html =
        render_component(&ScheduleFinderLive.route_banner/1,
          direction_id: direction_id,
          route: green_line
        )

      assert html =~
               ~s(<a href=\"/schedules/#{green_line.id}?schedule_direction[direction_id]=#{direction_id}\")

      assert html =~ green_line.name
      assert html =~ green_line.direction_names[direction_id]
      refute html =~ "towards"
      refute html =~ green_line.direction_destinations[direction_id]
    end
  end

  test "displays current stop with link" do
    stop = Factories.Stops.Stop.build(:stop, %{station?: Faker.Util.pick([true, false])})
    html = render_component(&ScheduleFinderLive.stop_banner/1, stop: stop)
    assert html =~ stop.name
    assert html =~ ~s(<a href=\"/stops/#{stop.id}\")

    if stop.station? do
      assert html =~ ~s(id=\"mbta-logo\")
    else
      assert html =~ ~s(<title>\n        stop\n    </title>)
    end
  end

  test "shows alerts", %{conn: conn} do
    expect(Dotcom.ScheduleFinder.Mock, :current_alerts, 2, fn _, _ ->
      Factories.Alerts.Alert.build_list(1, :alert_for_informed_entity,
        informed_entity: %{direction_id: nil}
      )
    end)

    {:ok, view, _html} = visit_with_valid_params(conn)
    assert has_element?(view, "section.c-alert-group")
  end

  test "receives alert updates", %{conn: conn} do
    # No alerts
    expect(Dotcom.ScheduleFinder.Mock, :current_alerts, 2, fn _, _ -> [] end)
    {:ok, view, _html} = visit_with_valid_params(conn)
    refute has_element?(view, "section.c-alert-group")

    # It will get called again!
    expect(Dotcom.ScheduleFinder.Mock, :current_alerts, 1, fn _, _ ->
      Factories.Alerts.Alert.build_list(1, :alert_for_informed_entity,
        informed_entity: %{direction_id: nil}
      )
    end)

    # Send out alert update
    DotcomWeb.Endpoint.broadcast("alerts", "alerts_updated", [])

    _ = render(view)
    assert has_element?(view, "section.c-alert-group")
  end

  describe "Daily Departures" do
    test "indicates no service", %{conn: conn} do
      expect(Services.Repo.Mock, :by_route_id, 3, fn _ -> [] end)

      expect(Dotcom.ScheduleFinder.Mock, :daily_departures, fn _, _, _, _ ->
        {:ok, []}
      end)

      assert {:ok, view, _html} = visit_with_valid_params(conn)
      rendered = render_async(view)
      refute has_element?(view, "#service-picker-form")
      assert rendered =~ ~r/There is currently no scheduled (\w+)./
    end

    test "indicates no service for selected schedule", %{conn: conn} do
      active_services = Factories.Services.Service.build_list(15, :service)
      expect(Services.Repo.Mock, :by_route_id, 2, fn _ -> active_services end)

      expect(Dotcom.ScheduleFinder.Mock, :daily_departures, 2, fn _, _, _, _ ->
        {:ok, []}
      end)

      assert {:ok, view, _html} = visit_with_valid_params(conn)
      rendered = render_async(view)
      assert has_element?(view, "#service-picker-form")
      assert rendered =~ ~r/There is no scheduled (\N+) service at (\N+) for this time period./
    end

    test "handles loading errors & shows custom message", %{conn: conn} do
      actual_error = "nonsense only a computer will understand"

      expect(Dotcom.ScheduleFinder.Mock, :daily_departures, fn _, _, _, _ ->
        {:error, actual_error}
      end)

      assert {:ok, view, _html} = visit_with_valid_params(conn)
      rendered = render_async(view)
      refute has_element?(view, "details")
      assert rendered =~ "There was a problem loading schedules"
      refute rendered =~ actual_error
    end
  end

  describe "Daily Departures (non-subway)" do
    test "loads & shows individual departures", %{conn: conn} do
      departures =
        2
        |> Faker.random_between(20)
        |> Factories.ScheduleFinder.build_list(:daily_departure)

      expect(Dotcom.ScheduleFinder.Mock, :daily_departures, 2, fn _, _, _, _ ->
        {:ok, departures}
      end)

      assert {:ok, view, html} = visit_with_valid_params(conn, [2, 3, 4])
      assert html =~ "Loading schedules for selected service"
      rendered = render_async(view)
      refute rendered =~ "Loading schedules for selected service"
      assert has_element?(view, ~s(details[phx-click="open_trip"]))

      for %{time: t} <- departures do
        assert rendered =~ "<time datetime=\"#{DateTime.to_iso8601(t)}\""
      end
    end
  end

  describe "Daily Departures (subway)" do
    test "shows first/last trains for destinations instead of listing individual departures", %{
      conn: conn
    } do
      departures =
        2
        |> Faker.random_between(20)
        |> Factories.ScheduleFinder.build_list(:daily_departure)

      subway_groups =
        1
        |> Faker.random_between(6)
        |> Faker.Util.sample_uniq(fn ->
          route = Factories.Routes.Route.build(:route)
          destination = Faker.Lorem.word()
          first_time = random_date_time()
          last_time = random_date_time()
          {route, destination, [first_time, last_time]}
        end)

      Dotcom.ScheduleFinder.Mock
      |> expect(:daily_departures, 2, fn _, _, _, _ -> {:ok, departures} end)
      |> expect(:subway_groups, 1, fn ^departures, _, _ -> subway_groups end)

      assert {:ok, view, html} = visit_with_valid_params(conn, [0, 1])
      assert html =~ "Loading schedules for selected service"
      rendered = render_async(view)
      refute rendered =~ "Loading schedules for selected service"
      refute has_element?(view, ~s(details[phx-click="open_trip"]))

      for %{time: t} <- departures do
        refute rendered =~ "<time datetime=\"#{DateTime.to_iso8601(t)}\""
      end

      for {_route, destination, [first_time, last_time]} <- subway_groups do
        assert rendered =~ "to #{destination}"
        assert rendered =~ "First train:"
        assert rendered =~ "<time datetime=\"#{DateTime.to_iso8601(first_time)}\""
        assert rendered =~ "Last train:"
        assert rendered =~ "<time datetime=\"#{DateTime.to_iso8601(last_time)}\""
      end
    end
  end

  defp visit_with_valid_params(conn, route_types \\ [0, 1, 2, 3, 4]) do
    route_id = FactoryHelpers.build(:id)
    direction_id = FactoryHelpers.build(:direction_id)
    stop_id = FactoryHelpers.build(:id)

    stub(Routes.Repo.Mock, :get, fn _ ->
      Factories.Routes.Route.build(:route, %{id: route_id, type: Faker.Util.pick(route_types)})
    end)

    stub(Services.Repo.Mock, :by_route_id, fn _ ->
      Factories.Services.Service.build_list(15, :service)
    end)

    stub(Stops.Repo.Mock, :get, fn _ ->
      Factories.Stops.Stop.build(:stop, %{id: stop_id})
    end)

    Dotcom.ScheduleFinder.Mock
    |> stub(:current_alerts, fn _, _ -> [] end)
    |> stub(:daily_departures, fn _, _, _, _ -> {:ok, []} end)

    # Dotcom.ScheduleFinder.UpcomingDepartures.Mock
    # |> stub(:upcoming_departures, fn _ -> [] end)
    stub(Predictions.Repo.Mock, :all, fn _ -> [] end)
    stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

    stub(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _, _ -> [] end)
    stub(Dotcom.Alerts.EndpointStops.Mock, :endpoint_stops, fn _, _ -> [] end)

    path =
      live_path(conn, ScheduleFinderLive,
        route_id: route_id,
        direction_id: direction_id,
        stop_id: stop_id
      )

    live(conn, path, on_error: :warn)
  end
end
