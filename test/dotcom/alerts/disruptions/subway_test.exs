defmodule Dotcom.Alerts.Disruptions.SubwayTest do
  use ExUnit.Case

  import Dotcom.Alerts, only: [service_impacting_effects: 0]
  import Dotcom.Alerts.Disruptions.Subway
  import Dotcom.Utils.ServiceDateTime, only: [
    service_range_day: 0,
    service_range_current_week: 0,
    service_range_following_week: 0,
    service_range_later: 0
  ]

  import Mox

  alias Test.Support.Factories

  describe "future_disruptions/0" do
    test "returns an empty map when there are no alerts" do
      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        []
      end)

      # Exercise/Verify
      # assert %{} = future_disruptions()
    end

    test "returns alerts for this week, next week, and later" do
      # Setup
      alert_today = service_range_day() |> disruption_alert()
      alert_current_week = service_range_current_week()|> disruption_alert()
      alert_following_week = service_range_following_week()|> disruption_alert()

      {alert_later_start, _} = service_range_later()
      alert_later = {alert_later_start, Timex.shift(alert_later_start, days: 1)} |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [alert_today, alert_current_week, alert_following_week, alert_later]
      end)

      # Exercise/Verify
      assert %{this_week: [^alert_current_week], next_week: [^alert_following_week], later: [^alert_later]} = future_disruptions()
    end
  end

  describe "todays_disruptions/0" do
    test "returns an empty map when there are no alerts" do
      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        []
      end)

      # Exercise/Verify
      # assert %{} = todays_disruptions()
    end

    test "returns alerts for today only" do
      # Setup
      alert_today = service_range_day() |> disruption_alert()
      alert_following_week = service_range_following_week()|> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [alert_today, alert_following_week]
      end)

      # Exercise/Verify
      assert %{today: [^alert_today]} = todays_disruptions()
    end
  end

  defp disruption_alert(active_period) do
    Factories.Alerts.Alert.build(:alert,
      active_period: [active_period],
      effect: service_impacting_effects() |> Faker.Util.pick()
    )
  end
end
