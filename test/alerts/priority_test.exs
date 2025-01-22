defmodule Alerts.PriorityTest do
  use ExUnit.Case, async: true
  use Timex

  import Alerts.Priority

  alias Alerts.Alert
  alias Alerts.InformedEntity

  @now Util.to_local_time(~N[2018-01-15T12:00:00])

  describe "priority_levels/0" do
    test "returns a list" do
      assert is_list(priority_levels())
    end
  end

  describe "priority/2" do
    test "Delay alerts are low if severity is under 5 and the route type is bus and the cause is traffic" do
      alert = %Alert{
        effect: :delay,
        cause: :traffic,
        severity: 4,
        informed_entity: [
          %InformedEntity{
            direction_id: 1,
            facility: nil,
            route: "CR-Newburyport",
            route_type: 2,
            stop: nil,
            trip: "CR-597929-148"
          },
          %InformedEntity{
            direction_id: 1,
            facility: nil,
            route: "CR-Newburyport",
            route_type: 3,
            stop: nil,
            trip: "CR-597929-148"
          }
        ]
      }

      assert priority(alert, @now) == :low
    end

    test "Delay alerts are high if severity is under 5 and the route type is bus and the cause is NOT traffic" do
      alert = %Alert{
        effect: :delay,
        cause: :unknown_cause,
        severity: 4,
        informed_entity: [
          %InformedEntity{
            direction_id: 1,
            facility: nil,
            route: "CR-Newburyport",
            route_type: 2,
            stop: nil,
            trip: "CR-597929-148"
          },
          %InformedEntity{
            direction_id: 1,
            facility: nil,
            route: "CR-Newburyport",
            route_type: 3,
            stop: nil,
            trip: "CR-597929-148"
          }
        ]
      }

      assert priority(alert, @now) == :high
    end

    test "Delay alerts are high if type is bus but severity is 6 or over, regardless of cause" do
      alert = %Alert{
        effect: :delay,
        cause: :traffic,
        severity: 6,
        informed_entity: [
          %InformedEntity{
            direction_id: 1,
            facility: nil,
            route: "CR-Newburyport",
            route_type: 3,
            stop: nil,
            trip: "CR-597929-148"
          }
        ]
      }

      assert priority(alert, @now) == :high
    end

    test "Delay alerts are high for any severity if route type is not bus" do
      alert = %Alert{
        effect: :delay,
        cause: :unknown_cause,
        severity: 4,
        informed_entity: [
          %InformedEntity{
            direction_id: 1,
            facility: nil,
            route: "CR-Newburyport",
            route_type: 2,
            stop: nil,
            trip: "CR-597929-148"
          }
        ]
      }

      assert priority(alert, @now) == :high
    end

    test "Suspension alerts are high" do
      assert priority(%{effect: :suspension}, @now) == :high
    end

    test "severe alerts updated within the last week are always high" do
      updated = Timex.shift(@now, days: -6, hours: -23)
      period_start = Timex.shift(@now, days: -8)
      period_end = Timex.shift(@now, days: 8)
      assert within_one_week(@now, updated) == true

      for type <- types_which_can_be_notices() do
        params = %{
          effect: type,
          severity: 7,
          updated_at: updated,
          active_period: [{period_start, period_end}]
        }

        assert {type, priority(params, @now)} == {type, :high}

        assert {type, priority(%{params | active_period: [{nil, period_end}]}, @now)} ==
                 {type, :high}

        assert {type, priority(%{params | active_period: [{period_start, nil}]}, @now)} ==
                 {type, :high}
      end
    end

    test "severe alerts not updated in the last week are high within a week of the start date" do
      updated = Timex.shift(@now, days: -10)
      period_start = Timex.shift(@now, days: -5)
      period_end = Timex.shift(@now, days: 15)

      for type <- types_which_can_be_notices() do
        params = %{
          effect: type,
          severity: 7,
          updated_at: updated,
          active_period: [{period_start, period_end}]
        }

        assert {type, priority(params, @now)} == {type, :high}
      end
    end

    test "severe alerts not updated in the last week are high within a week of the end date" do
      updated = Timex.shift(@now, days: -8)
      period_start = Timex.shift(@now, days: -20)
      period_end = Timex.shift(@now, days: 6)

      for type <- types_which_can_be_notices() do
        params = %{
          effect: type,
          severity: 7,
          updated_at: updated,
          active_period: [{period_start, period_end}]
        }

        assert {type, priority(params, @now)} == {type, :high}
      end
    end

    test "severe alerts are high if within first week of active period (nil alert end date)" do
      for type <- types_which_can_be_notices() do
        params = %{
          effect: type,
          severity: 7,
          updated_at: Timex.shift(@now, days: -7, hours: -1),
          active_period: [{Timex.shift(@now, days: -6, hours: -20), nil}]
        }

        assert {type, priority(params, @now)} == {type, :high}
      end
    end

    test "severe alerts are high if within last week of active period" do
      for type <- types_which_can_be_notices() do
        params = %{
          effect: type,
          severity: 7,
          updated_at: Timex.shift(@now, days: -7, hours: -1),
          active_period: [{Timex.shift(@now, days: -14), Timex.shift(@now, days: 6, hours: 23)}]
        }

        assert {type, priority(params, @now)} == {type, :high}
      end
    end

    test "severe alerts are high if within last week of active period (nil alert start date)" do
      for type <- types_which_can_be_notices() do
        params = %{
          effect: type,
          severity: 7,
          updated_at: Timex.shift(@now, days: -7, hours: -1),
          active_period: [{nil, Timex.shift(@now, days: 6, hours: 23)}]
        }

        assert {type, priority(params, @now)} == {type, :high}
      end
    end

    test "severe alerts not within a week of start or end date are low (except cancellation)" do
      for type <- types_which_can_be_notices() do
        params = %{
          effect: type,
          severity: 7,
          updated_at: Timex.shift(@now, days: -7, hours: -1),
          active_period: [
            {Timex.shift(@now, days: -7, hours: -1), Timex.shift(@now, days: 7, hours: 1)}
          ]
        }

        expected = if type == :cancellation, do: :high, else: :low

        assert {type, priority(params, @now)} == {type, expected}
      end
    end

    test "severe alerts not within a week of start or end date are high if updated in the last week" do
      for type <- types_which_can_be_notices() do
        params = %{
          effect: type,
          severity: 7,
          updated_at: Timex.shift(@now, days: -6, hours: -20),
          active_period: [
            {Timex.shift(@now, days: -7, hours: -1), Timex.shift(@now, days: 7, hours: 1)}
          ]
        }

        assert {type, priority(params, @now)} == {type, :high}
      end
    end

    test "one active_period meeting criteria for making it high will result in high" do
      for type <- types_which_can_be_notices() do
        params = %{
          effect: type,
          severity: 7,
          updated_at: Timex.shift(@now, days: -6, hours: -1),
          active_period: [
            {Timex.shift(@now, days: -7, hours: -1), Timex.shift(@now, days: 7, hours: 1)},
            {Timex.shift(@now, days: -6, hours: -23), Timex.shift(@now, days: 6, hours: 23)}
          ]
        }

        assert {type, priority(params, @now)} == {type, :high}
      end
    end

    test "all active_periods meeting criteria for making it a low will result in a low" do
      for type <- types_which_can_be_notices() do
        params = %{
          effect: type,
          severity: 7,
          updated_at: Timex.shift(@now, days: -7, hours: -1),
          active_period: [
            {Timex.shift(@now, days: 10, hours: -1), Timex.shift(@now, days: 11, hours: 1)},
            {nil, Timex.shift(@now, days: -10, hours: 1)},
            {Timex.shift(@now, days: 10, hours: 1), nil}
          ]
        }

        assert {type, priority(params, @now)} == {type, :low}
      end
    end

    test "Track Change is low" do
      assert priority(%{effect: :track_change}, @now) == :low
    end

    test "Minor Service Change is low" do
      assert priority(%{effect: :service_change, severity: 3}, @now) == :low
    end

    test "Current non-minor Service Change is high" do
      params = %{
        effect: :service_change,
        active_period: [{Timex.shift(@now, days: -1), nil}]
      }

      assert priority(params, @now) == :high
    end

    test "Future non-minor Service Change is low" do
      params = %{
        effect: :service_change,
        active_period: [{Timex.shift(@now, days: 5), nil}]
      }

      assert priority(params, @now)
    end

    test "Shuttle is high if it's active and not Ongoing" do
      today = Timex.now("America/New_York")

      shuttle = %{
        effect: :shuttle,
        active_period: [{Timex.shift(today, days: -1), nil}],
        lifecycle: :new
      }

      assert priority(shuttle, today) == :high
      assert priority(shuttle, Timex.shift(today, days: -2)) == :low
      assert priority(shuttle, today |> Timex.shift(days: -2) |> DateTime.to_date()) == :low
    end

    test "Shuttle is low if it's Ongoing" do
      today = Timex.now("America/New_York")

      shuttle = %{
        effect: :shuttle,
        active_period: [{Timex.shift(today, days: -1), nil}],
        lifecycle: :ongoing
      }

      assert priority(shuttle, @now)
    end

    test "Non on-going alerts are notices if they arent happening now" do
      today = ~N[2017-01-01T12:00:00]
      tomorrow = Timex.shift(today, days: 1)
      shuttle = %{effect: :shuttle, active_period: [{tomorrow, nil}], lifecycle: :upcoming}
      assert priority(shuttle, today) == :low
    end

    test "Cancellation is high if it's today" do
      # NOTE: this will fail around 11:55pm, since future will switch to a different day
      future = Timex.shift(@now, minutes: 5)

      cancellation = %{
        effect: :cancellation,
        active_period: [{future, future}],
        lifecycle: :new
      }

      today = DateTime.to_date(future)
      yesterday = future |> Timex.shift(days: -1) |> DateTime.to_date()
      assert priority(cancellation, today) == :high
      assert priority(cancellation, yesterday) == :low
    end

    test "Cancellation with multiple periods are notices if today is within on of the periods" do
      # NOTE: this will fail around 11:55pm, since future will switch to a different day
      future = Timex.shift(@now, minutes: 5)
      today = DateTime.to_date(future)
      yesterday = future |> Timex.shift(days: -1) |> DateTime.to_date()
      tomorrow = future |> Timex.shift(days: 1) |> DateTime.to_date()

      cancellation = %{
        effect: :cancellation,
        active_period: [{future, future}, {tomorrow, tomorrow}],
        lifecycle: :new
      }

      assert priority(cancellation, today) == :high
      assert priority(cancellation, yesterday) == :low
    end
  end

  test "within_one_week/2" do
    assert within_one_week(~N[2018-01-01T12:00:00], ~N[2018-01-08T12:00:00]) == false
    assert within_one_week(~N[2018-01-08T12:00:00], ~N[2018-01-01T12:00:00]) == false
    assert within_one_week(~N[2018-01-01T12:00:00], ~N[2018-01-07T11:59:00]) == true
    assert within_one_week(~N[2018-01-07T11:59:00], ~N[2018-01-01T12:00:00]) == true
  end

  describe "urgent_period?/2" do
    test "returns true when given no information" do
      assert urgent_period?({nil, nil}, @now) == true
    end

    test "severe alerts within 1 week of end date are urgent" do
      now = Util.to_local_time(~N[2018-01-15T12:00:00])
      start_date = Timex.shift(now, days: -10)
      end_date = Timex.shift(now, days: 6)
      assert urgent_period?({nil, end_date}, now) == true
      assert urgent_period?({start_date, end_date}, now) == true
    end

    test "severe alerts beyond 1 week of end date are not urgent" do
      now = Util.to_local_time(~N[2018-01-15T12:00:00])
      start_date = Timex.shift(now, days: -10)
      end_date = Timex.shift(now, days: 14)
      assert urgent_period?({nil, end_date}, now) == false
      assert urgent_period?({start_date, end_date}, now) == false
    end

    test "severe alerts within 1 week of start date are urgent" do
      now = Util.to_local_time(~N[2018-01-15T12:00:00])
      start_date = Timex.shift(now, days: -6)
      end_date = Timex.shift(now, days: 10)
      assert urgent_period?({start_date, nil}, now) == true
      assert urgent_period?({start_date, end_date}, now) == true
    end

    test "severe alerts beyond 1 week of start date are not urgent" do
      now = Util.to_local_time(~N[2018-01-15T12:00:00])
      start_date = Timex.shift(now, days: -14)
      end_date = Timex.shift(now, days: 10)
      assert urgent_period?({start_date, nil}, now) == false
      assert urgent_period?({start_date, end_date}, now) == false
    end
  end

  describe "urgent?/2" do
    test "alerts below level 7 are never urgent" do
      for type <- Alert.all_types() do
        result = {type, urgent?(%{effect: type, severity: 6}, @now)}
        assert result == {type, false}
      end
    end

    test "severe alert with no active period is always urgent regardless of update time" do
      for type <- Alert.all_types() do
        result =
          {type,
           urgent?(
             %{
               effect: type,
               severity: 7,
               updated_at: Timex.shift(@now, days: -30),
               active_period: []
             },
             @now
           )}

        assert result == {type, true}
      end
    end

    test "severe alert with active period is urgent if updated within the last week" do
      for type <- Alert.all_types() do
        params = %{
          effect: type,
          severity: 7,
          updated_at: Timex.shift(@now, days: -6),
          active_period: [{nil, nil}]
        }

        assert {type, urgent?(params, @now)} == {type, true}
      end
    end
  end

  defp types_which_can_be_notices do
    Alert.all_types()
    |> List.delete(:delay)
    |> List.delete(:suspension)
  end
end
