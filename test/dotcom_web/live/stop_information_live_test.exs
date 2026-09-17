defmodule DotcomWeb.StopInformationLiveTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Router.Helpers, only: [live_path: 3, live_path: 4]
  import Mox
  import Phoenix.LiveViewTest

  alias DotcomWeb.StopInformationLive
  alias Test.Support.Factories
  alias Test.Support.FactoryHelpers

  setup :verify_on_exit!

  setup do
    stub(Stops.Repo.Mock, :get, fn id -> Factories.Stops.Stop.build(:stop, id: id) end)
    stub(Stops.Repo.Mock, :has_parent?, fn _ -> false end)
    stub(Routes.Repo.Mock, :by_stop, fn _, _ -> [] end)
    stub(Alerts.Repo.Mock, :by_stop_id, fn _ -> [] end)
    stub(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [] end)
    stub(MBTA.Api.Mock, :get_json, fn "/facilities/", _ -> [] end)
    stub(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _ -> [] end)

    :ok
  end

  test "mounts and fetches stop, facilities, routes, alerts", %{conn: conn} do
    expect(Stops.Repo.Mock, :get, 2, fn id -> Factories.Stops.Stop.build(:stop, id: id) end)
    expect(Stops.Repo.Mock, :has_parent?, 2, fn _ -> false end)
    expect(Routes.Repo.Mock, :by_stop, 2, fn _, _ -> [] end)
    expect(Alerts.Repo.Mock, :by_stop_id, 2, fn _ -> [] end)
    expect(Alerts.Repo.Mock, :by_route_ids, 2, fn _, _ -> [] end)
    expect(MBTA.Api.Mock, :get_json, 1, fn "/facilities/", [{"filter[stop]", _}] -> [] end)
    stop_id = FactoryHelpers.build(:id)
    path = live_path(conn, StopInformationLive, stop_id)
    assert {:ok, _, _} = live(conn, path)
  end

  # I don't think this is a thing now but can keep it here for legacy reasons
  test "handles stations with slashes", %{conn: conn} do
    stop_id = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end) |> Enum.join("/")

    expect(Stops.Repo.Mock, :get, 2, fn id ->
      assert id == stop_id
      Factories.Stops.Stop.build(:stop)
    end)

    path = live_path(conn, StopInformationLive, stop_id)
    assert {:ok, _, _} = live(conn, path)
  end

  test "redirects to a parent stop page for a child stop", %{conn: conn} do
    [stop_id, parent_id] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

    expect(Stops.Repo.Mock, :get, 1, fn id ->
      assert id == stop_id
      Factories.Stops.Stop.build(:stop, id: id, parent_id: parent_id)
    end)

    expect(Stops.Repo.Mock, :has_parent?, fn _ -> true end)
    path = live_path(conn, StopInformationLive, stop_id)
    redirected_path = "/stops/#{parent_id}"
    assert {:error, {:live_redirect, %{to: ^redirected_path}}} = live(conn, path)
  end

  test "404s for an unknown stop", %{conn: conn} do
    stop_id = FactoryHelpers.build(:id)
    expect(Stops.Repo.Mock, :get, fn _ -> nil end)
    deny(Stops.Repo.Mock, :has_parent?, 1)
    path = live_path(conn, StopInformationLive, stop_id)

    assert_raise DotcomWeb.NotFoundError, fn ->
      live(conn, path)
    end
  end

  test "shows a stop ID if it's a bus stop", %{conn: conn} do
    stop_id = FactoryHelpers.build(:id)
    stop = Factories.Stops.Stop.build(:stop, id: stop_id, vehicle_type: 3)
    expect(Stops.Repo.Mock, :get, 2, fn ^stop_id -> stop end)

    {:ok, view, _html} = live(conn, live_path(conn, StopInformationLive, stop_id))

    assert has_element?(view, ".text-sm", "Stop #{stop_id}")

    other_type = Faker.Util.pick([nil, 0, 1, 2, 4])
    stop = Factories.Stops.Stop.build(:stop, id: stop_id, vehicle_type: other_type)
    expect(Stops.Repo.Mock, :get, 2, fn ^stop_id -> stop end)

    {:ok, view, _html} = live(conn, live_path(conn, StopInformationLive, stop_id))

    refute has_element?(view, ".text-sm", "Stop #{stop_id}")
  end

  test "should set the title and meta description of the page", %{conn: conn} do
    stop_id = FactoryHelpers.build(:id)
    stop = Factories.Stops.Stop.build(:stop, id: stop_id)
    expect(Stops.Repo.Mock, :get, 2, fn ^stop_id -> stop end)
    path = live_path(conn, StopInformationLive, stop_id)
    assert {:ok, view, html} = live(conn, path)
    assert page_title(view) =~ ~r/#{Regex.escape(stop.name)}/

    assert html =~
             ~r/<meta\s+name="description"\s+content="\s*Station serving MBTA[^"]*lines at #{Regex.escape(stop.address)}[^"]*"/i
  end

  test "assigns amenity_param", %{conn: conn} do
    stop_id = FactoryHelpers.build(:id)
    amenity = FactoryHelpers.build(:id) |> String.to_atom()

    path = live_path(conn, StopInformationLive, stop_id, %{"amenity" => "#{amenity}"})
    assert {:ok, view, _html} = live(conn, path)

    %{socket: socket} = :sys.get_state(view.pid)
    assert socket.assigns.amenity_param == amenity
  end

  describe "breadcrumbs/2" do
    test "returns station breadcrumbs if the stop is served by more than buses", %{conn: conn} do
      stop_id = FactoryHelpers.build(:id)
      stop = Factories.Stops.Stop.build(:stop, id: stop_id, station?: true)
      route = Factories.Routes.Route.build(:subway_route)
      stub(Stops.Repo.Mock, :get, fn ^stop_id -> stop end)
      stub(Routes.Repo.Mock, :by_stop, fn ^stop_id, _ -> [route] end)

      {:ok, view, _html} = live(conn, live_path(conn, StopInformationLive, stop_id))

      assert breadcrumb_texts(view) == ["Stations", stop.name]
    end

    test "returns simple breadcrumb if the stop is served by only buses", %{conn: conn} do
      stop_id = FactoryHelpers.build(:id)
      stop = Factories.Stops.Stop.build(:stop, id: stop_id, station?: true)
      route = Factories.Routes.Route.build(:bus_route)
      stub(Stops.Repo.Mock, :get, fn ^stop_id -> stop end)
      stub(Routes.Repo.Mock, :by_stop, fn ^stop_id, _ -> [route] end)

      {:ok, view, _html} = live(conn, live_path(conn, StopInformationLive, stop_id))

      assert breadcrumb_texts(view) == [stop.name]
    end

    test "returns simple breadcrumb if we have no route info for the stop", %{conn: conn} do
      stop_id = FactoryHelpers.build(:id)
      stop = Factories.Stops.Stop.build(:stop, id: stop_id)
      stub(Stops.Repo.Mock, :get, fn ^stop_id -> stop end)

      {:ok, view, _html} = live(conn, live_path(conn, StopInformationLive, stop_id))

      assert breadcrumb_texts(view) == [stop.name]
    end
  end

  describe "handles alerts" do
    test "does not assign any banner alerts if there aren't any", %{conn: conn} do
      {_stop, view} = live_with_alerts(conn, [], [])

      assert socket_assigns(view).banner_alerts == []
    end

    test "includes alerts for the stop", %{conn: conn} do
      stop_id = FactoryHelpers.build(:id)

      alert =
        Factories.Alerts.Alert.build(:alert_for_stop,
          stop_id: stop_id,
          effect: :station_closure
        )
        |> Factories.Alerts.Alert.active_now()

      {_stop, view} = live_with_alerts(conn, [alert], [])

      assert alert in socket_assigns(view).alerts
      assert alert in socket_assigns(view).banner_alerts
    end

    test "includes routewide alerts", %{conn: conn} do
      route = Factories.Routes.Route.build(:bus_route)

      alert =
        Alerts.Alert.new(
          effect: :detour,
          banner: nil,
          active_period: [
            {DateTime.shift(Dotcom.Utils.DateTime.now(), hour: -1),
             DateTime.shift(Dotcom.Utils.DateTime.now(), hour: 1)}
          ],
          informed_entity:
            Alerts.InformedEntitySet.new([
              %Alerts.InformedEntity{route: route.id}
            ])
        )

      {_stop, view} = live_with_alerts(conn, [], [alert], [route])

      assert alert in socket_assigns(view).banner_alerts
    end

    test "does not include route alerts that are targeted to different stops", %{conn: conn} do
      route = Factories.Routes.Route.build(:bus_route)

      alert =
        Alerts.Alert.new(
          effect: :detour,
          active_period: [
            {DateTime.shift(Dotcom.Utils.DateTime.now(), hour: -1),
             DateTime.shift(Dotcom.Utils.DateTime.now(), hour: 1)}
          ],
          informed_entity:
            Alerts.InformedEntitySet.new([
              %Alerts.InformedEntity{
                route: route.id,
                stop: FactoryHelpers.build(:id)
              }
            ])
        )

      {_stop, view} = live_with_alerts(conn, [], [alert], [route])

      refute alert in socket_assigns(view).banner_alerts
    end

    test "does not include alerts with non-banner effects", %{conn: conn} do
      stop_id = FactoryHelpers.build(:id)

      alert =
        Factories.Alerts.Alert.build(:alert_for_stop, stop_id: stop_id, effect: :delay)
        |> Factories.Alerts.Alert.active_now()

      {_stop, view} = live_with_alerts(conn, [alert], [])

      assert alert in socket_assigns(view).alerts
      refute alert in socket_assigns(view).banner_alerts
    end

    test "does not include alerts more than seven days out", %{conn: conn} do
      alert =
        Factories.Alerts.Alert.build(:alert_for_stop,
          stop_id: FactoryHelpers.build(:id),
          effect: :notice
        )
        |> Factories.Alerts.Alert.active_upcoming()

      {_stop, view} = live_with_alerts(conn, [alert], [])

      refute alert in socket_assigns(view).banner_alerts
    end

    test "includes future alerts within the next seven days", %{conn: conn} do
      now = Dotcom.Utils.DateTime.now()

      alert =
        Factories.Alerts.Alert.build(:alert_for_stop,
          stop_id: FactoryHelpers.build(:id),
          effect: :notice,
          active_period: [
            {DateTime.shift(now, day: 2), DateTime.shift(now, day: 3)}
          ]
        )

      {_stop, view} = live_with_alerts(conn, [alert], [])

      assert alert in socket_assigns(view).banner_alerts
    end

    test "does not include global-banner alerts", %{conn: conn} do
      alert =
        Factories.Alerts.Alert.build(:alert_for_stop,
          stop_id: FactoryHelpers.build(:id),
          effect: :notice,
          banner: "not nil!"
        )
        |> Factories.Alerts.Alert.active_now()

      {_stop, view} = live_with_alerts(conn, [alert], [])

      assert alert in socket_assigns(view).alerts
      refute alert in socket_assigns(view).banner_alerts
    end
  end

  defp breadcrumb_texts(view) do
    view
    |> socket_assigns()
    |> Map.fetch!(:breadcrumbs)
    |> Enum.map(& &1.text)
  end

  defp socket_assigns(view) do
    %{socket: socket} = :sys.get_state(view.pid)
    socket.assigns
  end

  defp live_with_alerts(conn, stop_alerts, route_alerts, routes \\ []) do
    stop_id = FactoryHelpers.build(:id)
    stop = Factories.Stops.Stop.build(:stop, id: stop_id)

    stub(Stops.Repo.Mock, :get, fn id ->
      if id == stop_id, do: stop, else: Factories.Stops.Stop.build(:stop, id: id)
    end)

    stub(Routes.Repo.Mock, :by_stop, fn ^stop_id, _ -> routes end)
    stub(Alerts.Repo.Mock, :by_stop_id, fn ^stop_id -> stop_alerts end)
    stub(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> route_alerts end)

    {:ok, view, _html} = live(conn, live_path(conn, StopInformationLive, stop_id))
    {stop, view}
  end
end
