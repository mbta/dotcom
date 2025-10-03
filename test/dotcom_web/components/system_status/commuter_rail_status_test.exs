defmodule DotcomWeb.SystemStatus.CommuterRailStatusTest do
  use ExUnit.Case

  import Dotcom.SystemStatus.CommuterRail, only: [commuter_rail_status: 0]

  import DotcomWeb.Components.SystemStatus.CommuterRailStatus,
    only: [alerts_commuter_rail_status: 1]

  import Mox
  import Phoenix.LiveViewTest
  import Test.Support.Generators.DateTime, only: [random_time_range_date_time: 1]

  alias Dotcom.Utils.ServiceDateTime
  alias Test.Support.Factories
  alias Test.Support.FactoryHelpers

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

    stub(Routes.Repo.Mock, :all, fn ->
      [
        Factories.Routes.Route.build(:route, type: 2)
      ]
    end)

    stub(Schedules.RepoCondensed.Mock, :by_route_ids, fn _ ->
      [
        %Schedules.ScheduleCondensed{
          time: Dotcom.Utils.DateTime.now()
        }
      ]
    end)

    stub(Schedules.Repo.Mock, :schedule_for_trip, fn _, "filter[stop_sequence]": "first,last" ->
      Factories.Schedules.Schedule.build_list(2, :schedule)
    end)

    :ok
  end

  describe "alerts_commuter_rail_status/1" do
    test "shows no service when a route isn't in service" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()

      expect(Routes.Repo.Mock, :all, fn ->
        [
          Factories.Routes.Route.build(:route, id: commuter_rail_id, type: 2)
        ]
      end)

      expect(Schedules.RepoCondensed.Mock, :by_route_ids, 2, fn _ ->
        [
          %Schedules.ScheduleCondensed{
            time: Dotcom.Utils.DateTime.now() |> Timex.shift(days: 1)
          }
        ]
      end)

      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "No Scheduled Service"
    end

    test "shows normal service when a route has no alert counts" do
      # SETUP
      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "Normal Service"
    end

    test "shows a single cancellation" do
      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [
          Factories.Alerts.Alert.build(:alert,
            effect: :cancellation,
            severity: 3
          )
          |> Factories.Alerts.Alert.active_now()
        ]
      end)

      # SETUP
      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "1 Cancellation"
      refute html =~ "1 Cancellations"
    end

    test "shows multiple cancellations" do
      # SETUP
      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        Factories.Alerts.Alert.build_list(2, :alert,
          effect: :cancellation,
          severity: 3
        )
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)
      end)

      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "2 Cancellations"
    end

    test "shows a single delay" do
      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [
          Factories.Alerts.Alert.build(:alert,
            effect: :delay,
            severity: 3
          )
          |> Factories.Alerts.Alert.active_now()
        ]
      end)

      # SETUP
      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "1 Delay"
      refute html =~ "1 Delays"
    end

    test "shows multiple delays" do
      # SETUP
      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        Factories.Alerts.Alert.build_list(2, :alert,
          effect: :delay,
          severity: 3
        )
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)
      end)

      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "2 Delays"
    end

    test "shows multiple cancellations even if they originate from the same alert" do
      # SETUP
      [trip_id1, trip_id2] = Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [
          Factories.Alerts.Alert.build(:alert_for_trips,
            effect: :cancellation,
            severity: 3,
            trip_ids: [trip_id1, trip_id2]
          )
          |> Factories.Alerts.Alert.active_now()
        ]
      end)

      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "2 Cancellations"
    end

    test "combines cancellations and delays into a single row" do
      # SETUP
      cancellations =
        Factories.Alerts.Alert.build_list(1, :alert,
          effect: :cancellation,
          severity: 3
        )
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)

      delays =
        Factories.Alerts.Alert.build_list(2, :alert,
          effect: :delay,
          severity: 3
        )
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> cancellations ++ delays end)

      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "3 Cancellations / Delays"
    end

    test "shows service alerts and cancellations/delays in separate rows" do
      # SETUP
      cancellations =
        Factories.Alerts.Alert.build_list(1, :alert,
          effect: :cancellation,
          severity: 3
        )
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)

      delays =
        Factories.Alerts.Alert.build_list(2, :alert,
          effect: :delay,
          severity: 3
        )
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)

      shuttles =
        Factories.Alerts.Alert.build_list(1, :alert,
          effect: :shuttle,
          severity: 3
        )
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> cancellations ++ delays ++ shuttles end)

      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "3 Cancellations / Delays"
      assert html =~ "1 Shuttle"
      refute html =~ "1 Shuttles"
    end

    test "does not show a row for 0 cancellations or delays" do
      # SETUP
      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        Factories.Alerts.Alert.build_list(1, :alert,
          effect: :shuttle,
          severity: 3
        )
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)
      end)

      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      refute html =~ "Cancellation"
      refute html =~ "Delay"
    end

    test "does not combine service alerts when there is only one type" do
      # SETUP
      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        Factories.Alerts.Alert.build_list(2, :alert,
          effect: :shuttle,
          severity: 3
        )
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)
      end)

      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "2 Shuttles"
    end

    test "shows the active-period start time for a single service impact starting in the future" do
      # SETUP
      {_, service_day_end} = ServiceDateTime.service_range_day()

      start_time = random_time_range_date_time({Dotcom.Utils.DateTime.now(), service_day_end})

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        Factories.Alerts.Alert.build_list(1, :alert,
          effect: :shuttle,
          severity: 3
        )
        |> Enum.map(&(&1 |> Factories.Alerts.Alert.active_starting_at(start_time)))
      end)

      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "#{Util.narrow_time(start_time)}: Shuttle"
    end

    test "combines service alerts into a single row when there multiple types" do
      # SETUP
      shuttles =
        Factories.Alerts.Alert.build_list(1, :alert,
          effect: :shuttle,
          severity: 3
        )
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)

      station_closures =
        Factories.Alerts.Alert.build_list(2, :alert,
          effect: :station_closure,
          severity: 3
        )
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> shuttles ++ station_closures end)

      assigns = %{commuter_rail_status: commuter_rail_status()}

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "3 Service Alerts"
    end
  end
end
