defmodule Dotcom.SystemStatus.AlertsTest do
  use ExUnit.Case, async: true

  import Test.Support.Factories.Alerts.Alert

  alias Dotcom.SystemStatus.Alerts

  doctest Dotcom.SystemStatus.Alerts

  describe "active_on_day?/2" do
    test "returns true if the alert is currently active" do
      start_time = "America/New_York" |> Timex.now() |> Timex.beginning_of_day()
      end_time = "America/New_York" |> Timex.now() |> Timex.end_of_day()

      alert = build(:alert, active_period: [{start_time, end_time}])

      time = Faker.DateTime.between(start_time, end_time)

      assert Alerts.active_on_day?(alert, time)
    end

    test "returns false if the alert starts on the next service day" do
      start_time =
        "America/New_York" |> Timex.now() |> Timex.end_of_day() |> Timex.shift(hours: 12)

      end_time = "America/New_York" |> Timex.now() |> Timex.end_of_day() |> Timex.shift(days: 1)

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        "America/New_York"
        |> Timex.now()
        |> Timex.beginning_of_day()
        |> Faker.DateTime.between("America/New_York" |> Timex.now() |> Timex.end_of_day())

      refute Alerts.active_on_day?(alert, time)
    end

    test "returns true if the alert starts later, but before the end of the day" do
      start_time = "America/New_York" |> Timex.now() |> Timex.end_of_day() |> Timex.shift(hours: -2)
      end_time = "America/New_York" |> Timex.now() |> Timex.end_of_day()

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        start_time
        |> Timex.beginning_of_day()
        |> Timex.shift(hours: 12)
        |> Faker.DateTime.between(Timex.shift(start_time, minutes: -1))

      assert Alerts.active_on_day?(alert, time)
    end

    test "returns true if the alert starts on the next day, but before end-of-service" do
      start_time = "America/New_York" |> Timex.now() |> Timex.end_of_day() |> Timex.shift(hours: 2)
      end_time = "America/New_York" |> Timex.now() |> Timex.end_of_day() |> Timex.shift(days: 1)

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        "America/New_York"
        |> Timex.now()
        |> Timex.beginning_of_day()
        |> Timex.shift(hours: 12)
        |> Faker.DateTime.between("America/New_York" |> Timex.now() |> Timex.end_of_day())

      assert Alerts.active_on_day?(alert, time)
    end

    test "returns false if the alert has already ended" do
      start_time = "America/New_York" |> Timex.now() |> Timex.beginning_of_day()

      end_time =
        "America/New_York" |> Timex.now() |> Timex.beginning_of_day() |> Timex.shift(hours: 12)

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        Timex.shift(end_time, minutes: 1)
        |> Faker.DateTime.between("America/New_York" |> Timex.now() |> Timex.end_of_day())

      refute Alerts.active_on_day?(alert, time)
    end

    test "returns true if the alert has no end time" do
      start_time = "America/New_York" |> Timex.now() |> Timex.beginning_of_day()
      end_time = nil

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        Faker.DateTime.between(start_time, "America/New_York" |> Timex.now() |> Timex.end_of_day())

      assert Alerts.active_on_day?(alert, time)
    end

    test "returns false if the alert has no end time but hasn't started yet" do
      start_time = "America/New_York" |> Timex.now() |> Timex.end_of_day() |> Timex.shift(hours: 12)
      end_time = nil

      alert = build(:alert, active_period: [{start_time, end_time}])

      time =
        "America/New_York"
        |> Timex.now()
        |> Timex.beginning_of_day()
        |> Faker.DateTime.between("America/New_York" |> Timex.now() |> Timex.end_of_day())

      refute Alerts.active_on_day?(alert, time)
    end

    test "returns true if a later part of the alert's active period is active" do
      start_time_1 = "America/New_York" |> Timex.now() |> Timex.beginning_of_day()
      end_time_1 = "America/New_York" |> Timex.now() |> Timex.end_of_day()
      start_time_2 = Timex.shift(start_time_1, days: 1)
      end_time_2 = Timex.shift(end_time_1, days: 1)

      alert =
        build(:alert, active_period: [{start_time_1, end_time_1}, {start_time_2, end_time_2}])

      time = Faker.DateTime.between(start_time_2, end_time_2)

      assert Alerts.active_on_day?(alert, time)
    end
  end

  describe "for_day/2" do
    test "includes alerts that are active today" do
      start_time =
        "America/New_York" |> Timex.now() |> Timex.beginning_of_day() |> Timex.shift(hours: 12)

      end_time = "America/New_York" |> Timex.now() |> Timex.end_of_day()

      alert1 = build(:alert, active_period: [{start_time, end_time}])

      alert2 =
        build(:alert,
          active_period: [{Timex.shift(start_time, days: 1), Timex.shift(end_time, days: 1)}]
        )

      assert Alerts.for_day(
               [alert1, alert2],
               Faker.DateTime.between(start_time, end_time)
             ) == [alert1]
    end
  end

  describe "filter_relevant/1" do
    test "includes an alert if its effect is :delay" do
      alert = build(:alert, effect: :delay)
      assert Alerts.filter_relevant([alert]) == [alert]
    end

    test "includes an alert if its effect is :shuttle" do
      alert = build(:alert, effect: :shuttle)
      assert Alerts.filter_relevant([alert]) == [alert]
    end

    test "includes an alert if its effect is :suspension" do
      alert = build(:alert, effect: :suspension)
      assert Alerts.filter_relevant([alert]) == [alert]
    end

    test "includes an alert if its effect is :station_closure" do
      alert = build(:alert, effect: :station_closure)
      assert Alerts.filter_relevant([alert]) == [alert]
    end

    test "does not include alerts with other effects" do
      assert Alerts.filter_relevant([
               build(:alert, effect: :policy_change),
               build(:alert, effect: :extra_service),
               build(:alert, effect: :stop_closure)
             ]) == []
    end
  end
end
