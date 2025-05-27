defmodule Dotcom.SystemStatus.CommuterRailTest do
  use ExUnit.Case

  import Mox

  alias Test.Support.Factories

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

    stub(Routes.Repo.Mock, :all, fn ->
      [
        Factories.Routes.Route.build(:route, type: 2)
      ]
    end)

    stub(Schedules.RepoCondensed.Mock, :by_route_ids, fn _ -> [] end)

    :ok
  end

  describe "commuter_rail_status/0" do
    test "only returns commuter rail routes" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()
      subway_id = Faker.Color.fancy_name()

      expect(Routes.Repo.Mock, :all, fn ->
        [
          # Commuter Rail
          Factories.Routes.Route.build(:route, id: commuter_rail_id, type: 2),
          # Subway
          Factories.Routes.Route.build(:route, id: subway_id, type: 1)
        ]
      end)

      # EXERCISE
      result = Dotcom.SystemStatus.CommuterRail.commuter_rail_status()

      # VERIFY
      assert result |> Map.keys() |> List.first() == commuter_rail_id
    end

    test "only uses service impacting alerts" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      random_service_impacting_effect =
        Dotcom.Alerts.service_impacting_effects()
        |> Enum.random()
        |> Kernel.elem(0)

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [
          # Service impacting alert
          Factories.Alerts.Alert.build(:alert,
            active_period: active_period,
            effect: random_service_impacting_effect
          ),
          # Non-service impacting alert
          Factories.Alerts.Alert.build(:alert, effect: :summary)
        ]
      end)

      # EXERCISE
      result = Dotcom.SystemStatus.CommuterRail.commuter_rail_status()

      # VERIFY
      assert result
             |> Map.values()
             |> List.first()
             |> Kernel.get_in([:alert_counts, random_service_impacting_effect]) == 1
    end

    test "only uses alerts that are in effect today" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 24),
         Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 25)}
      ]

      random_service_impacting_effect =
        Dotcom.Alerts.service_impacting_effects()
        |> Enum.random()
        |> Kernel.elem(0)

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [
          Factories.Alerts.Alert.build(:alert,
            active_period: active_period,
            effect: random_service_impacting_effect
          )
        ]
      end)

      # EXERCISE
      result = Dotcom.SystemStatus.CommuterRail.commuter_rail_status()

      # VERIFY
      assert result
             |> Map.values()
             |> List.first()
             |> Kernel.get_in([:alert_counts, random_service_impacting_effect]) == nil
    end

    test "groups alerts into the correct counts" do
      # SETUP
      active_period = [
        {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
      ]

      stub(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [
          Factories.Alerts.Alert.build(:alert, active_period: active_period, effect: :delay),
          Factories.Alerts.Alert.build(:alert, active_period: active_period, effect: :delay),
          Factories.Alerts.Alert.build(:alert, active_period: active_period, effect: :shuttle)
        ]
      end)

      # EXERCISE
      result = Dotcom.SystemStatus.CommuterRail.commuter_rail_status()

      # VERIFY
      assert result |> Map.values() |> List.first() |> Map.get(:alert_counts) == %{
               delay: 2,
               shuttle: 1
             }
    end

    test "indicates whether or not the route is running service today" do
      # SETUP
      commuter_rail_id = Faker.Color.fancy_name()

      expect(Routes.Repo.Mock, :all, fn ->
        [
          Factories.Routes.Route.build(:route, id: commuter_rail_id, type: 2)
        ]
      end)

      expect(Schedules.RepoCondensed.Mock, :by_route_ids, fn _ ->
        [
          %Schedules.ScheduleCondensed{
            time: Dotcom.Utils.DateTime.now() |> Timex.shift(days: 1)
          }
        ]
      end)

      # EXERCISE
      result = Dotcom.SystemStatus.CommuterRail.commuter_rail_status()

      # VERIFY
      refute result |> Map.values() |> List.first() |> Map.get(:service_today?)
    end
  end
end
