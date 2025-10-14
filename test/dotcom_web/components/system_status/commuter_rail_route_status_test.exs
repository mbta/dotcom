defmodule DotcomWeb.SystemStatus.CommuterRailRouteStatusTest do
  use ExUnit.Case

  import Dotcom.SystemStatus.CommuterRail, only: [commuter_rail_route_status: 1]
  import Mox
  import Phoenix.LiveViewTest

  alias DotcomWeb.Components.SystemStatus.CommuterRailRouteStatus
  alias Test.Support.Factories

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

  describe "commuter_rail_route_status/1" do
    test "shows a delays row if there are delays" do
      # SETUP
      route_id = Faker.Color.fancy_name()

      delay_count = Faker.random_between(2, 10)

      delays =
        Factories.Alerts.Alert.build_list(delay_count, :alert_for_trip,
          effect: :delay,
          severity: 3,
          trip_id: Faker.Lorem.word()
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        delays
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)
        |> Enum.shuffle()
      end)

      # EXERCISE / VERIFY

      assert status_row_headers_for_route(route_id) == [
               "#{delay_count} Delays"
             ]
    end

    test "shows a cancellations row if there are cancellations" do
      # SETUP
      route_id = Faker.Color.fancy_name()

      cancellation_count = Faker.random_between(2, 10)

      cancellations =
        Factories.Alerts.Alert.build_list(cancellation_count, :alert_for_trip,
          effect: :cancellation,
          severity: 3,
          trip_id: Faker.Lorem.word()
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        cancellations
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)
        |> Enum.shuffle()
      end)

      # EXERCISE / VERIFY

      assert status_row_headers_for_route(route_id) == [
               "#{cancellation_count} Cancellations"
             ]
    end

    test "shows separate status row headers for cancellations and delays" do
      # SETUP
      route_id = Faker.Color.fancy_name()

      delay_count = Faker.random_between(2, 10)
      cancellation_count = Faker.random_between(2, 10)

      delays =
        Factories.Alerts.Alert.build_list(delay_count, :alert_for_trip,
          effect: :delay,
          severity: 3,
          trip_id: Faker.Lorem.word()
        )

      cancellations =
        Factories.Alerts.Alert.build_list(cancellation_count, :alert_for_trip,
          effect: :cancellation,
          severity: 3,
          trip_id: Faker.Lorem.word()
        )

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        (delays ++ cancellations)
        |> Enum.map(&Factories.Alerts.Alert.active_now/1)
        |> Enum.shuffle()
      end)

      # EXERCISE / VERIFY

      assert status_row_headers_for_route(route_id) == [
               "#{cancellation_count} Cancellations",
               "#{delay_count} Delays"
             ]
    end
  end

  defp status_row_headers_for_route(route_id) do
    html =
      render_component(&CommuterRailRouteStatus.commuter_rail_route_status/1, %{
        status: commuter_rail_route_status(route_id)
      })

    html
    |> Floki.parse_document()
    |> Kernel.then(fn {:ok, document} -> document end)
    |> Floki.find("[data-test=\"status_label_text\"]")
    |> Enum.map(&Floki.text/1)
    |> Enum.map(&String.trim/1)
  end
end
