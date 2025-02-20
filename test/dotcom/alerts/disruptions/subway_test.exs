defmodule Dotcom.Alerts.Disruptions.SubwayTest do
  use ExUnit.Case

  import Dotcom.Alerts, only: [service_impacting_effects: 0]
  import Dotcom.Alerts.Disruptions.Subway

  import Dotcom.Utils.ServiceDateTime,
    only: [
      service_range_day: 0,
      service_range_later_this_week: 0,
      service_range_next_week: 0,
      service_range_after_next_week: 0
    ]

  import Mox

  alias Test.Support.Factories

  setup :verify_on_exit!

  setup _ do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "future_disruptions/0" do
    test "returns an empty map when there are no alerts" do
      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        []
      end)

      # Exercise/Verify
      assert %{} = future_disruptions()
    end

    test "returns alerts for later this week, next week, and after next week" do
      # Setup
      alert_today = service_range_day() |> disruption_alert()
      alert_later_this_week = service_range_later_this_week() |> disruption_alert()
      alert_next_week = service_range_next_week() |> disruption_alert()

      {alert_after_next_week_start, _} = service_range_after_next_week()

      alert_after_next_week =
        {alert_after_next_week_start, Timex.shift(alert_after_next_week_start, days: 1)}
        |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [alert_today, alert_later_this_week, alert_next_week, alert_after_next_week]
      end)

      # Exercise/Verify
      assert %{
               later_this_week: [^alert_later_this_week],
               next_week: [^alert_next_week],
               after_next_week: [^alert_after_next_week]
             } = future_disruptions()
    end

    test "handles single active_period spanning many service ranges" do
      # Setup
      {alert_today_start, _} = service_range_day()
      {alert_after_next_week_start, _} = service_range_after_next_week()

      long_alert =
        [{alert_today_start, Timex.shift(alert_after_next_week_start, days: 1)}]
        |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [long_alert]
      end)

      # Exercise/Verify
      assert %{
               later_this_week: [^long_alert],
               next_week: [^long_alert],
               after_next_week: [^long_alert]
             } = future_disruptions()
    end

    test "handles alert with more than one active_period" do
      # Setup
      long_alert =
        [service_range_later_this_week(), service_range_next_week()] |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [long_alert]
      end)

      # Exercise/Verify
      assert %{
               later_this_week: [^long_alert],
               next_week: [^long_alert]
             } = future_disruptions()
    end
  end

  describe "todays_disruptions/0" do
    test "returns an empty map when there are no alerts" do
      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        []
      end)

      # Exercise/Verify
      assert %{} = todays_disruptions()
    end

    test "returns alerts for today only" do
      # Setup
      alert_today = service_range_day() |> disruption_alert()
      alert_next_week = service_range_next_week() |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [alert_today, alert_next_week]
      end)

      # Exercise/Verify
      assert %{today: [^alert_today]} = todays_disruptions()
    end

    test "returns alerts for today when applicable to other service ranges" do
      # Setup
      {start, _} = service_range_day()
      {_, stop} = service_range_next_week()
      alert_today_and_beyond = disruption_alert({start, stop})

      alert_today_and_other_dates =
        [
          service_range_day(),
          service_range_later_this_week(),
          service_range_next_week()
        ]
        |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [alert_today_and_beyond, alert_today_and_other_dates]
      end)

      # Exercise/Verify
      assert %{
               today: [^alert_today_and_beyond, ^alert_today_and_other_dates]
             } = todays_disruptions()
    end

    test "sorts alerts by start time" do
      # Setup
      {start, stop} = service_range_day()
      alert_today = disruption_alert({start, stop})
      alert_later = disruption_alert({Timex.shift(start, seconds: 1), stop})

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [alert_later, alert_today]
      end)

      # Exercise/Verify
      assert %{
               today: [^alert_today, ^alert_later]
             } = todays_disruptions()
    end
  end

  defp disruption_alert(active_period) do
    active_period = if(is_list(active_period), do: active_period, else: [active_period])

    Factories.Alerts.Alert.build(:alert,
      active_period: active_period,
      effect: service_impacting_effects() |> Faker.Util.pick()
    )
  end
end
