defmodule DotcomWeb.Live.CommuterRailAlertsTest do
  use DotcomWeb.ConnCase, async: true

  import Dotcom.Alerts, only: [service_impacting_effects: 0]
  import DotcomWeb.Router.Helpers, only: [live_path: 2]
  import Mox
  import Phoenix.LiveViewTest

  alias Alerts.Alert
  alias Dotcom.Utils
  alias DotcomWeb.Live.CommuterRailAlerts
  alias Test.Support.Factories
  alias Test.Support.FactoryHelpers

  @no_alerts_message "There are no other commuter rail alerts at this time."
  @cr_route_type 2

  @service_impacting_effects service_impacting_effects() |> Enum.map(fn {effect, _} -> effect end)
  @non_service_effects Alert.all_types() -- @service_impacting_effects

  setup :verify_on_exit!

  setup _ do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Alerts.Repo.Mock, :all, fn _ -> [] end)
    stub(Alerts.Repo.Mock, :banner, fn -> nil end)
    stub(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [] end)
    stub(Routes.Repo.Mock, :by_type, fn _ -> [] end)
    stub(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _ -> [] end)

    stub(Routes.Repo.Mock, :all, fn ->
      [Factories.Routes.Route.build(:route, type: @cr_route_type)]
    end)

    stub(Schedules.RepoCondensed.Mock, :by_route_ids, fn _ ->
      [
        %Schedules.ScheduleCondensed{
          time: Dotcom.Utils.DateTime.now()
        }
      ]
    end)

    Dotcom.SystemStatus.CommuterRailCache.Mock
    |> stub(:commuter_rail_status, fn ->
      []
    end)
    |> stub(:subscribe, fn -> :ok end)

    :ok
  end

  describe "commuter rail alerts page" do
    test "shows a message when there are no alerts", %{conn: conn} do
      {:ok, view, _html} = live(conn, live_path(conn, CommuterRailAlerts))

      assert render_async(view)
             |> Floki.parse_document!()
             |> Floki.get_by_id("station_and_service")
             |> Floki.text() =~ @no_alerts_message
    end

    test "does not show a 'no alerts' message when an alert is present", %{conn: conn} do
      route = Factories.Routes.Route.build(:route, %{type: @cr_route_type})

      stub(Alerts.Repo.Mock, :all, fn date ->
        Factories.Alerts.Alert.build_list(1, :alert, %{
          active_period: [Utils.ServiceDateTime.service_range_day(date)],
          effect: Faker.Util.pick(@non_service_effects),
          informed_entity:
            Alerts.InformedEntitySet.new([
              %Alerts.InformedEntity{
                route_type: @cr_route_type,
                route: route.id
              }
            ])
        })
      end)

      stub(Routes.Repo.Mock, :by_type, fn @cr_route_type -> [route] end)

      {:ok, view, _html} = live(conn, live_path(conn, CommuterRailAlerts))

      rendered_section =
        render_async(view)
        |> Floki.parse_document!()
        |> Floki.get_by_id("station_and_service")

      refute rendered_section |> Floki.text() =~ @no_alerts_message
    end

    test "does not put service-impacting alerts in the station_and_service section", %{conn: conn} do
      route = Factories.Routes.Route.build(:route, %{type: @cr_route_type})

      stub(Alerts.Repo.Mock, :all, fn date ->
        Factories.Alerts.Alert.build_list(1, :alert, %{
          active_period: [Utils.ServiceDateTime.service_range_day(date)],
          effect: Faker.Util.pick(@service_impacting_effects),
          informed_entity:
            Alerts.InformedEntitySet.new([
              %Alerts.InformedEntity{
                route_type: @cr_route_type,
                route: route.id
              }
            ]),
          severity: 3
        })
      end)

      stub(Routes.Repo.Mock, :by_type, fn @cr_route_type -> [route] end)

      {:ok, view, _html} = live(conn, live_path(conn, CommuterRailAlerts))

      assert render_async(view)
             |> Floki.parse_document!()
             |> Floki.get_by_id("station_and_service")
             |> Floki.text() =~ @no_alerts_message
    end

    test "puts service-impacting alerts in the station_and_service section if they are upcoming",
         %{conn: conn} do
      route = Factories.Routes.Route.build(:route, %{type: @cr_route_type})

      stub(Alerts.Repo.Mock, :all, fn date ->
        Factories.Alerts.Alert.build_list(1, :alert, %{
          active_period: [
            date |> DateTime.shift(day: 2) |> Utils.ServiceDateTime.service_range_day()
          ],
          effect: Faker.Util.pick(@service_impacting_effects),
          informed_entity:
            Alerts.InformedEntitySet.new([
              %Alerts.InformedEntity{
                route_type: @cr_route_type,
                route: route.id
              }
            ]),
          severity: 3
        })
      end)

      stub(Routes.Repo.Mock, :by_type, fn @cr_route_type -> [route] end)

      {:ok, view, _html} = live(conn, live_path(conn, CommuterRailAlerts))

      refute render_async(view)
             |> Floki.parse_document!()
             |> Floki.get_by_id("station_and_service")
             |> Floki.text() =~ @no_alerts_message
    end

    test "does not put banner alerts in the station_and_service section", %{conn: conn} do
      route = Factories.Routes.Route.build(:route, %{type: @cr_route_type})

      banner_id = FactoryHelpers.build(:id)

      stub(Alerts.Repo.Mock, :banner, fn ->
        %Alerts.Banner{
          id: banner_id
        }
      end)

      stub(Alerts.Repo.Mock, :all, fn date ->
        Factories.Alerts.Alert.build_list(1, :alert, %{
          id: banner_id,
          active_period: [Utils.ServiceDateTime.service_range_day(date)],
          effect: Faker.Util.pick(@non_service_effects),
          informed_entity:
            Alerts.InformedEntitySet.new([
              %Alerts.InformedEntity{
                route_type: @cr_route_type,
                route: route.id
              }
            ])
        })
      end)

      stub(Routes.Repo.Mock, :by_type, fn @cr_route_type -> [route] end)

      {:ok, view, _html} = live(conn, live_path(conn, CommuterRailAlerts))

      assert render_async(view)
             |> Floki.parse_document!()
             |> Floki.get_by_id("station_and_service")
             |> Floki.text() =~ @no_alerts_message
    end
  end
end
