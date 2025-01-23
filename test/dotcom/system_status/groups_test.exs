defmodule Dotcom.SystemStatus.GroupsTest do
  use ExUnit.Case, async: true
  doctest Dotcom.SystemStatus.Groups

  alias Dotcom.SystemStatus.Groups
  alias Test.Support.Factories.Alerts.Alert
  alias Test.Support.Factories.Alerts.InformedEntity

  @all_rail_lines ["Blue", "Green", "Orange", "Red"]
  @green_line_branches ["Green-B", "Green-C", "Green-D", "Green-E"]
  @heavy_rail_lines ["Blue", "Orange", "Red"]

  @effects [:delay, :shuttle, :station_closure, :suspension]
  @singular_effect_descriptions %{
    delay: "Delays",
    shuttle: "Shuttle Buses",
    station_closure: "Station Closure",
    suspension: "Suspension"
  }
  @plural_effect_descriptions %{
    delay: "Delays",
    shuttle: "Shuttle Buses",
    station_closure: "Station Closures",
    suspension: "Suspensions"
  }

  describe "heavy rail groups" do
    test "lists the lines in a consistent sort order" do
      # Exercise
      groups = Groups.groups([], Timex.now("America/New_York"))

      # Verify
      route_ids = groups |> Enum.map(fn group -> group.route_id end)
      assert route_ids == ["Blue", "Orange", "Red", "Green"]
    end

    test "when there are no alerts, lists each line as normal" do
      # Exercise
      groups = Groups.groups([], Timex.now("America/New_York"))

      # Verify
      expected_statuses = [%{description: "Normal Service", time: nil}]

      @all_rail_lines
      |> Enum.each(fn route_id ->
        statuses = groups |> group_for(route_id) |> Map.get(:statuses)

        assert statuses == expected_statuses
      end)
    end

    test "when there are no alerts, assigns an empty sub-route list to each group" do
      # Exercise
      groups = Groups.groups([], Timex.now("America/New_York"))

      # Verify
      @all_rail_lines
      |> Enum.each(fn route_id ->
        sub_routes = groups |> group_for(route_id) |> Map.get(:sub_routes)

        assert sub_routes == []
      end)
    end

    test "when there's an alert for a heavy rail line, shows an entry for that line with a human-readable description" do
      # Setup
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)
      time = time_today()
      effect = Faker.Util.pick(@effects)
      alerts = [current_alert(route_id: affected_route_id, time: time, effect: effect)]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      [description] =
        groups
        |> group_for(affected_route_id)
        |> Map.get(:statuses)
        |> Enum.map(& &1.description)

      assert description == @singular_effect_descriptions[effect]
    end

    test "when there's a current alert, sets the `time` to nil" do
      # Setup
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)
      time = time_today()
      alerts = [current_alert(route_id: affected_route_id, time: time)]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      times =
        groups
        |> group_for(affected_route_id)
        |> Map.get(:statuses)
        |> Enum.map(fn s -> s.time end)

      assert times == [nil]
    end

    test "when there's an alert for a heavy rail line, shows 'Normal Service' for the other lines" do
      # Setup
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)
      time = time_today()

      alerts = [current_alert(route_id: affected_route_id, time: time)]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      @heavy_rail_lines
      |> List.delete(affected_route_id)
      |> Enum.each(fn route_id ->
        descriptions =
          groups
          |> group_for(route_id)
          |> Map.get(:statuses)
          |> Enum.map(fn s -> s.description end)

        assert descriptions == ["Normal Service"]
      end)
    end

    test "shows future active time for alerts that will become active later in the day" do
      # Setup
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      alert_start_time = time_after(time)

      alerts = [future_alert(route_id: affected_route_id, start_time: alert_start_time)]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      alert_start_time_display = kitchen_downcase_time(alert_start_time)

      times =
        groups
        |> group_for(affected_route_id)
        |> Map.get(:statuses)
        |> Enum.map(& &1.time)

      assert times == [alert_start_time_display]
    end

    # TODO: Come back to this. Is this the right test for indefinite alerts?
    test "shows future active time for active alerts with no end time" do
      # Setup
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      alert_start_time = time_after(time)

      alerts = [alert(route_id: affected_route_id, active_period: [{alert_start_time, nil}])]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      alert_start_time_display =
        kitchen_downcase_time(alert_start_time)

      times =
        groups
        |> group_for(affected_route_id)
        |> Map.get(:statuses)
        |> Enum.map(& &1.time)

      assert times == [alert_start_time_display]
    end

    test "shows a future time for alerts that have an expired active_period as well" do
      # Setup
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      alert_start_time = time_after(time)
      alert_end_time = time_after(alert_start_time)

      expired_alert_end_time = time_before(time)
      expired_alert_start_time = time_before(expired_alert_end_time)

      alerts = [
        alert(
          route_id: affected_route_id,
          active_period: [
            {expired_alert_start_time, expired_alert_end_time},
            {alert_start_time, alert_end_time}
          ]
        )
      ]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      alert_start_time_display =
        kitchen_downcase_time(alert_start_time)

      times =
        groups
        |> group_for(affected_route_id)
        |> Map.get(:statuses)
        |> Enum.map(& &1.time)

      assert times == [alert_start_time_display]
    end

    test "shows multiple alerts for a given route, sorted alphabetically" do
      # Setup
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()

      # Sorted in reverse order in order to validate that the sorting
      # logic works
      [effect2, effect1] =
        Faker.Util.sample_uniq(2, fn -> Faker.Util.pick(@effects) end) |> Enum.sort(:desc)

      alerts = [
        current_alert(route_id: affected_route_id, time: time, effect: effect1),
        current_alert(route_id: affected_route_id, time: time, effect: effect2)
      ]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      descriptions =
        groups
        |> group_for(affected_route_id)
        |> Map.get(:statuses)
        |> Enum.map(& &1.description)

      assert descriptions == [
               @singular_effect_descriptions[effect1],
               @singular_effect_descriptions[effect2]
             ]
    end

    test "puts 'Now' text on current alerts when there are also future alerts, and sorts 'Now' first" do
      # Setup
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()

      future_alert_start_time = time_after(time)

      alerts = [
        future_alert(route_id: affected_route_id, start_time: future_alert_start_time),
        current_alert(route_id: affected_route_id, time: time)
      ]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      times =
        groups
        |> group_for(affected_route_id)
        |> Map.get(:statuses)
        |> Enum.map(& &1.time)

      assert times == ["Now", kitchen_downcase_time(future_alert_start_time)]
    end

    test "sorts future alerts by time, not lexically" do
      # Setup
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      # The first alert's start time will be between 2pm and
      # 9:59pm. The second's will be between 10pm and
      # 11:59pm. Lexically, the second alert would get sorted before
      # the first, but we want the first to get sorted before the
      # second.
      alert_1_start_time =
        between(
          Timex.shift(beginning_of_day(), hours: 14),
          Timex.shift(beginning_of_day(), hours: 22)
        )

      alert_2_start_time =
        between(
          Timex.shift(beginning_of_day(), hours: 22),
          Timex.shift(beginning_of_day(), hours: 24)
        )

      time = time_before(alert_1_start_time)

      alerts = [
        future_alert(route_id: affected_route_id, start_time: alert_1_start_time),
        future_alert(route_id: affected_route_id, start_time: alert_2_start_time)
      ]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      times =
        groups
        |> group_for(affected_route_id)
        |> Map.get(:statuses)
        |> Enum.map(& &1.time)

      alert_1_start_time_display = alert_1_start_time |> kitchen_downcase_time()
      alert_2_start_time_display = alert_2_start_time |> kitchen_downcase_time()

      assert times == [
               alert_1_start_time_display,
               alert_2_start_time_display
             ]
    end

    test "consolidates current alerts if they have the same effect" do
      # Setup
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()

      effect = Faker.Util.pick(@effects)

      alerts = [
        current_alert(route_id: affected_route_id, time: time, effect: effect),
        current_alert(route_id: affected_route_id, time: time, effect: effect)
      ]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify      
      descriptions =
        groups
        |> group_for(affected_route_id)
        |> Map.get(:statuses)
        |> Enum.map(& &1.description)

      assert descriptions == [@plural_effect_descriptions[effect]]
    end

    test "consolidates future alerts if they have the same effect and time" do
      # Setup
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      start_time = time_after(time)

      effect = Faker.Util.pick(@effects)

      alerts = [
        future_alert(route_id: affected_route_id, start_time: start_time, effect: effect),
        future_alert(route_id: affected_route_id, start_time: start_time, effect: effect)
      ]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify      
      descriptions =
        groups
        |> group_for(affected_route_id)
        |> Map.get(:statuses)
        |> Enum.map(& &1.description)

      assert descriptions == [@plural_effect_descriptions[effect]]
    end
  end

  describe "green line groups" do
    test "combines all green line branches into a single one if they have the same alerts" do
      # Setup
      time = time_today()

      effect = Faker.Util.pick(@effects)

      alerts =
        @green_line_branches
        |> Enum.map(fn route_id ->
          current_alert(route_id: route_id, time: time, effect: effect)
        end)

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      descriptions =
        groups
        |> group_for("Green")
        |> Map.get(:statuses)
        |> Enum.map(& &1.description)

      assert descriptions == [@singular_effect_descriptions[effect]]
    end

    test "splits separate branches of the green line out as sub_routes if some have alerts and others don't" do
      # Setup
      affected_branch_id = Faker.Util.pick(@green_line_branches)

      time = time_today()
      effect = Faker.Util.pick(@effects)

      alerts = [current_alert(route_id: affected_branch_id, effect: effect, time: time)]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      descriptions =
        groups
        |> group_for("Green", [affected_branch_id])
        |> Map.get(:statuses)
        |> Enum.map(& &1.description)

      assert descriptions == [@singular_effect_descriptions[effect]]
    end

    test "includes an 'Normal Service' entry for non-affected green line branches" do
      # Setup
      affected_branch_id = Faker.Util.pick(@green_line_branches)

      time = time_today()
      effect = Faker.Util.pick(@effects)

      alerts = [current_alert(route_id: affected_branch_id, effect: effect, time: time)]

      # Exercise
      groups = Groups.groups(alerts, time)

      # Verify
      normal_branch_ids = @green_line_branches |> List.delete(affected_branch_id)

      descriptions =
        groups
        |> group_for("Green", normal_branch_ids)
        |> Map.get(:statuses)
        |> Enum.map(& &1.description)

      assert descriptions == ["Normal Service"]
    end
  end

  describe "red line groups" do
    test "does not include Mattapan as a sub-route for the red line if Mattapan doesn't have any alerts" do
      # Setup
      time = time_today()

      alerts = [current_alert(route_id: "Red", time: time)]

      # Exercise
      groups = Groups.groups(alerts, time)

      refute groups
             |> Enum.any?(fn
               %{route_id: "Red", sub_routes: ["Mattapan"]} -> true
               _ -> false
             end)
    end

    test "shows Mattapan as a sub_route of Red if it has an alert" do
      # Setup
      time = time_today()
      effect = Faker.Util.pick(@effects)

      # Exercise
      alerts = [current_alert(route_id: "Mattapan", effect: effect, time: time)]
      groups = Groups.groups(alerts, time)

      # Verify
      descriptions =
        groups
        |> group_for("Red", ["Mattapan"])
        |> Map.get(:statuses)
        |> Enum.map(& &1.description)

      assert descriptions == [@singular_effect_descriptions[effect]]
    end

    test "includes a 'Normal Service' entry for Red if Mattapan has an alert" do
      # Setup
      time = time_today()

      # Exercise
      alerts = [current_alert(route_id: "Mattapan", time: time)]
      groups = Groups.groups(alerts, time)

      # Verify
      descriptions = groups |> group_for("Red") |> Map.get(:statuses) |> Enum.map(& &1.description)

      assert descriptions == ["Normal Service"]
    end
  end

  defp group_for(groups, route_id, sub_routes \\ []) do
    [group] =
      groups
      |> Enum.filter(fn
        %{route_id: ^route_id, sub_routes: ^sub_routes} -> true
        %{} -> false
      end)

    group
  end

  defp beginning_of_day() do
    Timex.beginning_of_day(Timex.now("America/New_York"))
  end

  defp end_of_day() do
    Timex.end_of_day(Timex.now("America/New_York"))
  end

  defp time_today() do
    between(beginning_of_day(), end_of_day())
  end

  defp time_before(time) do
    between(beginning_of_day(), time)
  end

  defp time_after(time) do
    between(time, end_of_day())
  end

  defp between(time1, time2) do
    Faker.DateTime.between(time1, time2) |> Timex.to_datetime("America/New_York")
  end

  # TODO: Get rid of this before merging
  defp kitchen_downcase_time(time) do
    time |> Timex.format!("{kitchen}") |> String.downcase()
  end

  defp current_alert(opts) do
    {time, opts} = opts |> Keyword.pop!(:time)

    start_time = time_before(time)
    end_time = time_after(time)

    opts
    |> Keyword.put_new(:active_period, [{start_time, end_time}])
    |> alert()
  end

  defp future_alert(opts) do
    {start_time, opts} = opts |> Keyword.pop!(:start_time)

    opts
    |> Keyword.put_new(:active_period, [{start_time, time_after(start_time)}])
    |> alert()
  end

  defp alert(opts) do
    route_id = opts |> Keyword.fetch!(:route_id)
    effect = opts[:effect] || Faker.Util.pick(@effects)
    active_period = opts |> Keyword.fetch!(:active_period)

    Alert.build(:alert,
      effect: effect,
      informed_entity: [
        InformedEntity.build(:informed_entity, route: route_id)
      ],
      active_period: active_period
    )
  end
end
