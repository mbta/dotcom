defmodule DotcomWeb.Live.SubwayAlertsTest do
  use DotcomWeb.ConnCase, async: true

  import Dotcom.Alerts, only: [service_impacting_effects: 0]
  import DotcomWeb.Router.Helpers, only: [live_path: 2]
  import Mox
  import Phoenix.LiveViewTest

  alias Alerts.Alert
  alias Dotcom.SystemStatus.Subway
  alias Dotcom.Utils
  alias DotcomWeb.Live.SubwayAlerts
  alias Test.Support.Factories
  alias Test.Support.FactoryHelpers

  @no_alerts_message "There are no other subway alerts at this time."

  @service_impacting_effects service_impacting_effects() |> Enum.map(fn {effect, _} -> effect end)
  @non_service_effects Alert.all_types() -- @service_impacting_effects

  setup :verify_on_exit!

  setup _ do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Alerts.Repo.Mock, :all, fn _ -> [] end)
    stub(Alerts.Repo.Mock, :banner, fn -> nil end)
    stub(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [] end)
    stub(Routes.Repo.Mock, :by_type, fn _ -> [] end)

    stub(Dotcom.SystemStatus.SubwayCache.Mock, :subway_status, fn ->
      Dotcom.SystemStatus.subway_status()
    end)

    stub(Dotcom.SystemStatus.SubwayCache.Mock, :subscribe, fn -> :ok end)

    :ok
  end

  describe "subway alerts page" do
    test "shows a message when there are no alerts", %{conn: conn} do
      {:ok, view, _html} = live(conn, live_path(conn, SubwayAlerts))

      assert render_async(view)
             |> Floki.parse_document!()
             |> Floki.get_by_id("station_and_service")
             |> Floki.text() =~ @no_alerts_message
    end

    test "shows a route pill and no 'no alerts' message when an alert is present", %{conn: conn} do
      route_id = Faker.Util.pick(Subway.lines())
      route_type = Faker.Util.pick([0, 1])

      stub(Alerts.Repo.Mock, :all, fn date ->
        Factories.Alerts.Alert.build_list(1, :alert, %{
          active_period: [Utils.ServiceDateTime.service_range_day(date)],
          effect: Faker.Util.pick(@non_service_effects),
          informed_entity:
            Alerts.InformedEntitySet.new([
              %Alerts.InformedEntity{
                route_type: route_type,
                route: route_id
              }
            ])
        })
      end)

      stub(Routes.Repo.Mock, :by_type, fn [0, 1] ->
        Factories.Routes.Route.build_list(1, :route, %{
          id: route_id,
          type: route_type
        })
      end)

      {:ok, view, _html} = live(conn, live_path(conn, SubwayAlerts))

      rendered_section =
        render_async(view)
        |> Floki.parse_document!()
        |> Floki.get_by_id("station_and_service")

      refute rendered_section |> Floki.text() =~ @no_alerts_message

      refute rendered_section
             |> Floki.find("[data-test=\"route_pill:#{route_id}\"]")
             |> Enum.empty?()
    end

    test "does not put service-impacting alerts in the station_and_service section", %{conn: conn} do
      route_id = Faker.Util.pick(Subway.lines())
      route_type = Faker.Util.pick([0, 1])

      stub(Alerts.Repo.Mock, :all, fn date ->
        Factories.Alerts.Alert.build_list(1, :alert, %{
          active_period: [Utils.ServiceDateTime.service_range_day(date)],
          effect: Faker.Util.pick(@service_impacting_effects),
          informed_entity:
            Alerts.InformedEntitySet.new([
              %Alerts.InformedEntity{
                route_type: route_type,
                route: route_id
              }
            ]),
          severity: 3
        })
      end)

      stub(Routes.Repo.Mock, :by_type, fn [0, 1] ->
        Factories.Routes.Route.build_list(1, :route, %{
          id: route_id,
          type: route_type
        })
      end)

      {:ok, view, _html} = live(conn, live_path(conn, SubwayAlerts))

      assert render_async(view)
             |> Floki.parse_document!()
             |> Floki.get_by_id("station_and_service")
             |> Floki.text() =~ @no_alerts_message
    end

    test "does not put banner alerts in the station_and_service section", %{conn: conn} do
      route_id = Faker.Util.pick(Subway.lines())
      route_type = Faker.Util.pick([0, 1])

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
                route_type: route_type,
                route: route_id
              }
            ])
        })
      end)

      stub(Routes.Repo.Mock, :by_type, fn [0, 1] ->
        Factories.Routes.Route.build_list(1, :route, %{
          id: route_id,
          type: route_type
        })
      end)

      {:ok, view, _html} = live(conn, live_path(conn, SubwayAlerts))

      assert render_async(view)
             |> Floki.parse_document!()
             |> Floki.get_by_id("station_and_service")
             |> Floki.text() =~ @no_alerts_message
    end
  end
end
