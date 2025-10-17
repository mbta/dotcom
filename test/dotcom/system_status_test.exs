defmodule Dotcom.SystemStatusTest do
  use ExUnit.Case

  import Dotcom.Alerts, only: [service_impacting_effects: 0]
  import Dotcom.SystemStatus
  import Dotcom.Utils.ServiceDateTime, only: [service_range_day: 0]
  import Mox
  import Test.Support.Factories.Alerts.Alert

  setup :verify_on_exit!

  setup _ do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

  describe "subway_status/0" do
    test "requests alerts for all subway lines @ today datetime" do
      today = Test.Support.Generators.DateTime.random_date_time()

      expect(Dotcom.Utils.DateTime.Mock, :now, 3, fn ->
        today
      end)

      expect(Alerts.Repo.Mock, :by_route_ids, fn route_ids, datetime ->
        assert Enum.sort(route_ids) == Dotcom.Routes.subway_route_ids() |> Enum.sort()
        assert datetime == today

        []
      end)

      expect(Alerts.Repo.Mock, :by_route_types, fn [0, 1], _date ->
        []
      end)

      _ = subway_status()
    end

    test "returns status without alerts ending earlier that day" do
      route_id_with_alerts = Dotcom.Routes.subway_route_ids() |> Faker.Util.pick()
      line = Dotcom.Routes.line_name_for_subway_route(route_id_with_alerts)
      {day_start, day_end} = service_range_day()
      earlier_end = Timex.shift(day_start, minutes: 1)
      currently_active_alert = disruption_alert({day_start, day_end}, route_id_with_alerts)
      expired_alert = disruption_alert({day_start, earlier_end}, route_id_with_alerts)

      expect(Alerts.Repo.Mock, :by_route_types, fn [0, 1], _date ->
        []
      end)

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [currently_active_alert, expired_alert]
      end)

      assert %{^line => statuses} = subway_status()

      assert %{alerts: [^currently_active_alert], status: non_normal_status} =
               Enum.find_value(statuses, fn %{status_entries: status_entries} ->
                 Enum.find(status_entries, &(&1.status != :normal))
               end)

      assert non_normal_status == currently_active_alert.effect
    end
  end

  describe "active_now_or_later_on_day?/2" do
    test "returns true if the alert is currently active" do
      start_time = Timex.now("America/New_York") |> Timex.beginning_of_day()
      end_time = Timex.now("America/New_York") |> Timex.end_of_day()

      alert = {start_time, end_time} |> disruption_alert()

      time = Faker.DateTime.between(start_time, end_time)

      assert active_now_or_later_on_day?(alert, time)
    end

    test "returns false if the alert starts on the next service day" do
      start_time =
        Timex.now("America/New_York") |> Timex.end_of_day() |> Timex.shift(hours: 12)

      end_time = Timex.now("America/New_York") |> Timex.end_of_day() |> Timex.shift(days: 1)

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        Faker.DateTime.between(
          Timex.now("America/New_York") |> Timex.beginning_of_day(),
          Timex.now("America/New_York") |> Timex.end_of_day()
        )

      refute active_now_or_later_on_day?(alert, time)
    end

    test "returns true if the alert starts later, but before the end of the day" do
      start_time = Timex.now("America/New_York") |> Timex.end_of_day() |> Timex.shift(hours: -2)
      end_time = Timex.now("America/New_York") |> Timex.end_of_day()

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        Faker.DateTime.between(
          start_time |> Timex.beginning_of_day() |> Timex.shift(hours: 12),
          start_time |> Timex.shift(minutes: -1)
        )

      assert active_now_or_later_on_day?(alert, time)
    end

    test "returns true if the alert starts on the next day, but before end-of-service" do
      start_time = Timex.now("America/New_York") |> Timex.end_of_day() |> Timex.shift(hours: 2)
      end_time = Timex.now("America/New_York") |> Timex.end_of_day() |> Timex.shift(days: 1)

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        Faker.DateTime.between(
          Timex.now("America/New_York") |> Timex.beginning_of_day() |> Timex.shift(hours: 12),
          Timex.now("America/New_York") |> Timex.end_of_day()
        )

      assert active_now_or_later_on_day?(alert, time)
    end

    test "returns false if the alert has already ended" do
      start_time = Timex.now("America/New_York") |> Timex.beginning_of_day()

      end_time =
        Timex.now("America/New_York") |> Timex.beginning_of_day() |> Timex.shift(hours: 12)

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        Faker.DateTime.between(
          end_time |> Timex.shift(minutes: 1),
          Timex.now("America/New_York") |> Timex.end_of_day()
        )

      refute active_now_or_later_on_day?(alert, time)
    end

    test "returns true if the alert has no end time" do
      start_time = Timex.now("America/New_York") |> Timex.beginning_of_day()
      end_time = nil

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        Faker.DateTime.between(start_time, Timex.now("America/New_York") |> Timex.end_of_day())

      assert active_now_or_later_on_day?(alert, time)
    end

    test "returns false if the alert has no end time but hasn't started yet" do
      start_time = Timex.now("America/New_York") |> Timex.end_of_day() |> Timex.shift(hours: 12)
      end_time = nil

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        Faker.DateTime.between(
          Timex.now("America/New_York") |> Timex.beginning_of_day(),
          Timex.now("America/New_York") |> Timex.end_of_day()
        )

      refute active_now_or_later_on_day?(alert, time)
    end

    test "returns true if a later part of the alert's active period is active" do
      start_time_1 = Timex.now("America/New_York") |> Timex.beginning_of_day()
      end_time_1 = Timex.now("America/New_York") |> Timex.end_of_day()
      start_time_2 = start_time_1 |> Timex.shift(days: 1)
      end_time_2 = end_time_1 |> Timex.shift(days: 1)

      alert =
        build(:alert, active_period: [{start_time_1, end_time_1}, {start_time_2, end_time_2}])

      time = Faker.DateTime.between(start_time_2, end_time_2)

      assert active_now_or_later_on_day?(alert, time)
    end
  end

  defp disruption_alert(active_period)
  defp disruption_alert(active_period, route_id \\ nil)

  defp disruption_alert(active_period, "Green") do
    {random_effect, random_severity} = service_impacting_effects() |> Faker.Util.pick()

    build(:alert_for_routes,
      route_ids: GreenLine.branch_ids(),
      active_period: [active_period],
      effect: random_effect,
      severity: random_severity
    )
  end

  defp disruption_alert(active_period, nil) do
    route_id = Faker.Util.pick(Dotcom.Routes.subway_route_ids())

    disruption_alert(active_period, route_id)
  end

  defp disruption_alert(active_period, route_id) do
    {random_effect, random_severity} = service_impacting_effects() |> Faker.Util.pick()

    build(:alert_for_route,
      route_id: route_id,
      active_period: [active_period],
      effect: random_effect,
      severity: random_severity
    )
  end
end
