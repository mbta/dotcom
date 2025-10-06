defmodule Dotcom.Alerts.Subway.DisruptionsTest do
  use ExUnit.Case

  import Dotcom.Alerts, only: [service_impacting_effects: 0]
  import Dotcom.Alerts.Subway.Disruptions

  import Dotcom.Utils.ServiceDateTime,
    only: [
      service_range_day: 0,
      service_range_this_week: 0,
      service_range_next_week: 0,
      service_range_after_next_week: 0
    ]

  import Mox

  alias Dotcom.Utils.ServiceDateTime
  alias Test.Support.Factories
  alias Test.Support.Generators

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
      alert_this_week = service_range_this_week() |> disruption_alert()
      alert_next_week = service_range_next_week() |> disruption_alert()

      {alert_after_next_week_start, _} = service_range_after_next_week()

      alert_after_next_week =
        {alert_after_next_week_start, DateTime.shift(alert_after_next_week_start, day: 1)}
        |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [alert_today, alert_this_week, alert_next_week, alert_after_next_week]
      end)

      # Exercise/Verify
      assert %{
               this_week: [^alert_this_week],
               next_week: [^alert_next_week],
               after_next_week: [^alert_after_next_week]
             } = future_disruptions()
    end

    test "handles single active_period spanning many service ranges" do
      # Setup
      {alert_today_start, _} = service_range_day()
      {alert_after_next_week_start, _} = service_range_after_next_week()

      long_alert =
        [{alert_today_start, DateTime.shift(alert_after_next_week_start, day: 1)}]
        |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [long_alert]
      end)

      # Exercise/Verify
      assert %{
               this_week: [^long_alert],
               next_week: [^long_alert],
               after_next_week: [^long_alert]
             } = future_disruptions()
    end

    test "handles alert with more than one active_period" do
      # Setup
      long_alert = [service_range_this_week(), service_range_next_week()] |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [long_alert]
      end)

      # Exercise
      disruptions = future_disruptions()

      # Verify
      [alert_this_week] = disruptions.this_week
      [alert_next_week] = disruptions.next_week

      assert alert_this_week.id == long_alert.id
      assert alert_next_week.id == long_alert.id
    end

    test "splits the active_periods of alerts with more than one into different buckets" do
      # Setup
      {beginning_of_next_week, end_of_next_week} = service_range_next_week()

      active_period_1_start =
        Generators.DateTime.random_time_range_date_time(
          {beginning_of_next_week, DateTime.shift(end_of_next_week, day: -2)}
        )

      active_period_1_end =
        Generators.DateTime.random_time_range_date_time(
          {active_period_1_start, DateTime.shift(end_of_next_week, day: -1)}
        )

      {beginning_of_week_after_next, _} = service_range_after_next_week()

      active_period_2_start =
        Generators.DateTime.random_time_range_date_time({beginning_of_week_after_next, nil})

      active_period_2_end =
        Generators.DateTime.random_time_range_date_time({active_period_2_start, nil})

      long_alert =
        [
          {active_period_1_start, active_period_1_end},
          {active_period_2_start, active_period_2_end}
        ]
        |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [long_alert]
      end)

      # Exercise
      disruptions = future_disruptions()

      # Verify
      [alert_next_week] = disruptions.next_week
      assert alert_next_week.id == long_alert.id
      assert alert_next_week.active_period == [{active_period_1_start, active_period_1_end}]

      [alert_after_next_week] = disruptions.after_next_week
      assert alert_after_next_week.id == long_alert.id
      assert alert_after_next_week.active_period == [{active_period_2_start, active_period_2_end}]
    end

    test "combines consecutive active periods if the boundary is on the same day" do
      # Setup
      {beginning_of_week, end_of_week} = service_range_next_week()

      active_period_1_end =
        Generators.DateTime.random_time_range_date_time(
          {beginning_of_week, DateTime.shift(end_of_week, day: -2)}
        )

      active_period_2_start =
        Generators.DateTime.random_time_range_date_time(
          {active_period_1_end, ServiceDateTime.end_of_service_day(active_period_1_end)}
        )

      multi_active_period_alert =
        [{beginning_of_week, active_period_1_end}, {active_period_2_start, end_of_week}]
        |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [multi_active_period_alert]
      end)

      # Exercise
      disruptions = future_disruptions()

      # Verify
      assert Enum.count(disruptions.next_week) == 1
      [combined_active_period_alert] = disruptions.next_week
      assert combined_active_period_alert.active_period == [{beginning_of_week, end_of_week}]
    end

    test "combines consecutive active periods if the boundary is on consecutive days" do
      # Setup
      {beginning_of_week, end_of_week} = service_range_next_week()

      active_period_1_end =
        Generators.DateTime.random_time_range_date_time(
          {beginning_of_week, DateTime.shift(end_of_week, day: -2)}
        )

      active_period_2_start =
        Generators.DateTime.random_time_range_date_time(
          {active_period_1_end |> ServiceDateTime.beginning_of_next_service_day(),
           active_period_1_end
           |> ServiceDateTime.beginning_of_next_service_day()
           |> ServiceDateTime.end_of_service_day()}
        )

      multi_active_period_alert =
        [{beginning_of_week, active_period_1_end}, {active_period_2_start, end_of_week}]
        |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [multi_active_period_alert]
      end)

      # Exercise
      disruptions = future_disruptions()

      # Verify
      assert Enum.count(disruptions.next_week) == 1
      [combined_active_period_alert] = disruptions.next_week
      assert combined_active_period_alert.active_period == [{beginning_of_week, end_of_week}]
    end

    test "combines consecutive active periods in the middle of the active period list" do
      # Setup
      {beginning_of_week, end_of_week} = service_range_next_week()

      active_period_0_start =
        Generators.DateTime.random_time_range_date_time(
          {beginning_of_week, DateTime.shift(beginning_of_week, day: 1)}
        )

      active_period_0_end =
        Generators.DateTime.random_time_range_date_time(
          {active_period_0_start, DateTime.shift(active_period_0_start, day: 1)}
        )

      active_period_1_start =
        Generators.DateTime.random_time_range_date_time(
          {DateTime.shift(active_period_0_end, day: 2), DateTime.shift(end_of_week, day: -2)}
        )

      active_period_1_end =
        Generators.DateTime.random_time_range_date_time(
          {active_period_1_start, DateTime.shift(end_of_week, day: -2)}
        )

      active_period_2_start =
        Generators.DateTime.random_time_range_date_time(
          {active_period_1_end, ServiceDateTime.end_of_service_day(active_period_1_end)}
        )

      active_period_2_end = end_of_week

      multi_active_period_alert =
        [
          {active_period_0_start, active_period_0_end},
          {active_period_1_start, active_period_1_end},
          {active_period_2_start, active_period_2_end}
        ]
        |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [multi_active_period_alert]
      end)

      # Exercise
      disruptions = future_disruptions()

      # Verify
      assert Enum.count(disruptions.next_week) == 2
      [first_active_period_alert, combined_later_active_period_alert] = disruptions.next_week

      assert first_active_period_alert.active_period == [
               {active_period_0_start, active_period_0_end}
             ]

      assert combined_later_active_period_alert.active_period == [
               {active_period_1_start, active_period_2_end}
             ]
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
          service_range_this_week(),
          service_range_next_week()
        ]
        |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [alert_today_and_beyond, alert_today_and_other_dates]
      end)

      # Exercise
      disruptions = todays_disruptions()

      # Verify
      assert disruptions.today |> Enum.map(& &1.id) == [
               alert_today_and_beyond.id,
               alert_today_and_other_dates.id
             ]
    end

    # This use case is a sign that someone entered something
    # incorrectly into Alerts UI, since a recurring alert necessarily
    # should have an end time, but since the UI allows it, we need to
    # handle it
    test "does the right thing for recurring `until further notice` alerts" do
      # Setup
      {start_1, _} = service_range_day()
      {start_2, _} = service_range_next_week()

      # A nil end-time indicates that the alert is `until futher notice`
      alert_indefinite = disruption_alert([{start_1, nil}, {start_2, nil}])

      expect(Alerts.Repo.Mock, :by_route_ids, fn _route_ids, _now ->
        [alert_indefinite]
      end)

      # Exercise
      disruptions = todays_disruptions()

      # Verify
      assert disruptions.today |> Enum.map(& &1.id) == [
               alert_indefinite.id
             ]
    end

    test "sorts alerts by start time" do
      # Setup
      {start, stop} = service_range_day()
      alert_today = disruption_alert({start, stop})
      alert_later = disruption_alert({DateTime.shift(start, second: 1), stop})

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
    {effect, severity} = service_impacting_effects() |> Faker.Util.pick()

    Factories.Alerts.Alert.build(:alert,
      active_period: active_period,
      effect: effect,
      severity: severity
    )
  end
end
