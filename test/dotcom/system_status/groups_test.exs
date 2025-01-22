defmodule Dotcom.SystemStatus.GroupsTest do
  use ExUnit.Case, async: true

  alias Dotcom.SystemStatus.Groups
  alias Test.Support.Factories.Alerts.Alert
  alias Test.Support.Factories.Alerts.InformedEntity

  @heavy_rail_lines ["Blue", "Orange", "Red"]
  @all_rail_lines ["Blue", "Green", "Orange", "Red"]
  @green_line_branches ["Green-B", "Green-C", "Green-D", "Green-E"]

  describe "heavy rail groups" do
    test "lists the lines in a consistent sort order" do
      assert Groups.groups([], Timex.now("America/New_York"))
             |> Enum.map(fn group -> group.route_id end) == [
               "Blue",
               "Orange",
               "Red",
               "Green"
             ]
    end

    test "when there are no alerts, lists each line as normal" do
      groups = Groups.groups([], Timex.now("America/New_York"))

      @all_rail_lines
      |> Enum.each(fn route_id ->
        assert [
                 %{
                   route_id: ^route_id,
                   sub_routes: [],
                   statuses: [%{description: "Normal Service", time: nil}]
                 }
               ] = groups |> statuses_for(route_id)
      end)
    end

    test "when there's an alert for a heavy rail line, shows an entry for that line" do
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      alert_start_time = time_before(time)
      alert_end_time = time_after(time)

      assert [
               %{
                 route_id: ^affected_route_id,
                 sub_routes: [],
                 statuses: [%{description: "Delays", time: nil}]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :delay,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{alert_start_time, alert_end_time}]
                   )
                 ],
                 time
               )
               |> statuses_for(affected_route_id)
    end

    test "when there's an alert for a heavy rail line, shows 'Normal Service' for the other lines" do
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      alert_start_time = time_before(time)
      alert_end_time = time_after(time)

      groups =
        Groups.groups(
          [
            Alert.build(:alert,
              effect: :delay,
              informed_entity: [InformedEntity.build(:informed_entity, route: affected_route_id)],
              active_period: [{alert_start_time, alert_end_time}]
            )
          ],
          time
        )

      @heavy_rail_lines
      |> List.delete(affected_route_id)
      |> Enum.each(fn route_id ->
        assert [
                 %{
                   statuses: [%{time: nil, description: "Normal Service"}],
                   sub_routes: [],
                   route_id: ^route_id
                 }
               ] = groups |> statuses_for(route_id)
      end)
    end

    test "shows future active time for alerts that will become active later in the day" do
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      alert_start_time = time_after(time)
      alert_end_time = time_after(alert_start_time)

      alert_start_time_display =
        alert_start_time |> Timex.format!("{kitchen}") |> String.downcase()

      assert [
               %{
                 route_id: ^affected_route_id,
                 sub_routes: [],
                 statuses: [
                   %{
                     description: "Suspension",
                     time: ^alert_start_time_display
                   }
                 ]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{alert_start_time, alert_end_time}]
                   )
                 ],
                 time
               )
               |> statuses_for(affected_route_id)
    end

    test "works for indefinite alerts (end-time is nil)" do
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      alert_start_time = time_after(time)
      alert_end_time = nil

      alert_start_time_display =
        alert_start_time |> Timex.format!("{kitchen}") |> String.downcase()

      assert [
               %{
                 route_id: ^affected_route_id,
                 sub_routes: [],
                 statuses: [
                   %{
                     description: "Suspension",
                     time: ^alert_start_time_display
                   }
                 ]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{alert_start_time, alert_end_time}]
                   )
                 ],
                 time
               )
               |> statuses_for(affected_route_id)
    end

    test "shows a future time for alerts that have an expired time as well" do
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      alert_start_time = time_after(time)
      alert_end_time = time_after(alert_start_time)

      expired_alert_end_time = time_before(time)
      expired_alert_start_time = time_before(expired_alert_end_time)

      alert_start_time_display =
        alert_start_time |> Timex.format!("{kitchen}") |> String.downcase()

      assert [
               %{
                 route_id: ^affected_route_id,
                 sub_routes: [],
                 statuses: [%{description: "Suspension", time: ^alert_start_time_display}]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [
                       {expired_alert_start_time, expired_alert_end_time},
                       {alert_start_time, alert_end_time}
                     ]
                   )
                 ],
                 time
               )
               |> statuses_for(affected_route_id)
    end

    test "shows multiple alerts for a given route, sorted alphabetically" do
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      alert_start_time = time_before(time)
      alert_end_time = time_after(time)

      assert [
               %{
                 route_id: ^affected_route_id,
                 sub_routes: [],
                 statuses: [
                   %{description: "Delays", time: nil},
                   %{description: "Suspension", time: nil}
                 ]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{alert_start_time, alert_end_time}]
                   ),
                   Alert.build(:alert,
                     effect: :delay,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{alert_start_time, alert_end_time}]
                   )
                 ],
                 time
               )
               |> statuses_for(affected_route_id)
    end

    test "puts 'Now' text on current alerts when there are also future alerts, and sorts 'Now' first" do
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      current_alert_start_time = time_before(time)
      current_alert_end_time = time_after(time)
      future_alert_start_time = time_after(time)
      future_alert_end_time = time_after(future_alert_start_time)

      future_alert_start_time_display =
        future_alert_start_time |> Timex.format!("{kitchen}") |> String.downcase()

      assert [
               %{
                 route_id: ^affected_route_id,
                 sub_routes: [],
                 statuses: [
                   %{description: "Suspension", time: "Now"},
                   %{description: "Delays", time: ^future_alert_start_time_display}
                 ]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :delay,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{future_alert_start_time, future_alert_end_time}]
                   ),
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{current_alert_start_time, current_alert_end_time}]
                   )
                 ],
                 time
               )
               |> statuses_for(affected_route_id)
    end

    test "sorts future alerts by time, not lexically" do
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      # The first alert's start time will be between 2pm and
      # 9:59pm. The second's will be between 10pm and
      # 11:59pm. Lexically, the second alert would get sorted before
      # the first, but we want the first to get sorted before the
      # second.
      alert_1_start_time =
        Faker.DateTime.between(
          Timex.shift(beginning_of_day(), hours: 14),
          Timex.shift(beginning_of_day(), hours: 22)
        )

      alert_1_end_time = time_after(alert_1_start_time)

      alert_1_start_time_display =
        alert_1_start_time |> Timex.format!("{kitchen}") |> String.downcase()

      alert_2_start_time =
        Faker.DateTime.between(
          Timex.shift(beginning_of_day(), hours: 22),
          Timex.shift(beginning_of_day(), hours: 24)
        )

      alert_2_end_time = time_after(alert_2_start_time)

      alert_2_start_time_display =
        alert_2_start_time |> Timex.format!("{kitchen}") |> String.downcase()

      time = time_before(alert_1_start_time)

      assert [
               %{
                 route_id: ^affected_route_id,
                 sub_routes: [],
                 statuses: [
                   %{description: "Station Closure", time: ^alert_1_start_time_display},
                   %{description: "Suspension", time: ^alert_2_start_time_display}
                 ]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :station_closure,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{alert_1_start_time, alert_1_end_time}]
                   ),
                   Alert.build(
                     :alert,
                     effect: :suspension,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{alert_2_start_time, alert_2_end_time}]
                   )
                 ],
                 time
               )
               |> statuses_for(affected_route_id)
    end

    test "consolidates alerts if they have the same effect and time" do
      affected_route_id = Faker.Util.pick(@heavy_rail_lines)

      time = time_today()
      current_alert_start_time = time_before(time)
      current_alert_end_time = time_after(time)
      future_alert_start_time = time_after(time)
      future_alert_end_time = time_after(future_alert_start_time)

      future_alert_start_time_display =
        future_alert_start_time |> Timex.format!("{kitchen}") |> String.downcase()

      assert [
               %{
                 route_id: ^affected_route_id,
                 sub_routes: [],
                 statuses: [
                   %{description: "Suspensions", time: "Now"},
                   %{description: "Station Closures", time: ^future_alert_start_time_display}
                 ]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :station_closure,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{future_alert_start_time, future_alert_end_time}]
                   ),
                   Alert.build(:alert,
                     effect: :station_closure,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{future_alert_start_time, future_alert_end_time}]
                   ),
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{current_alert_start_time, current_alert_end_time}]
                   ),
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_route_id)
                     ],
                     active_period: [{current_alert_start_time, current_alert_end_time}]
                   )
                 ],
                 time
               )
               |> statuses_for(affected_route_id)
    end
  end

  describe "green line groups" do
    test "combines all green line branches into a single one if they have the same alerts" do
      time = time_today()
      alert_start_time = time_before(time)
      alert_end_time = time_after(time)

      assert [
               %{
                 route_id: "Green",
                 sub_routes: [],
                 statuses: [%{description: "Shuttle Buses", time: nil}]
               }
             ] =
               Groups.groups(
                 ["Green-B", "Green-C", "Green-D", "Green-E"]
                 |> Enum.map(fn route_id ->
                   Alert.build(:alert,
                     effect: :shuttle,
                     informed_entity: [InformedEntity.build(:informed_entity, route: route_id)],
                     active_period: [{alert_start_time, alert_end_time}]
                   )
                 end),
                 time
               )
               |> statuses_for("Green")
    end

    test "splits separate branches of the green line out as sub_routes if the alerts are different and sorts 'Normal Service' last" do
      affected_branch_id = Faker.Util.pick(@green_line_branches)
      normal_branch_ids = @green_line_branches |> List.delete(affected_branch_id)

      time = time_today()
      alert_start_time = time_before(time)
      alert_end_time = time_after(time)

      assert [
               %{
                 route_id: "Green",
                 sub_routes: [^affected_branch_id],
                 statuses: [%{description: "Shuttle Buses", time: nil}]
               },
               %{
                 route_id: "Green",
                 sub_routes: ^normal_branch_ids,
                 statuses: [%{description: "Normal Service", time: nil}]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :shuttle,
                     informed_entity: [
                       InformedEntity.build(:informed_entity, route: affected_branch_id)
                     ],
                     active_period: [{alert_start_time, alert_end_time}]
                   )
                 ],
                 time
               )
               |> statuses_for("Green")
    end
  end

  describe "red line groups" do
    test "only shows Red line if Mattapan doesn't have any alerts" do
      time = time_today()
      alert_start_time = time_before(time)
      alert_end_time = time_after(time)

      assert [
               %{
                 route_id: "Red",
                 sub_routes: [],
                 statuses: [%{description: "Delays", time: nil}]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :delay,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Red")],
                     active_period: [{alert_start_time, alert_end_time}]
                   )
                 ],
                 time
               )
               |> statuses_for("Red")
    end

    test "shows Mattapan as a sub_route of Red if it has an alert" do
      time = time_today()
      alert_start_time = time_before(time)
      alert_end_time = time_after(time)

      assert [
               %{
                 route_id: "Red",
                 sub_routes: [],
                 statuses: [%{description: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Red",
                 sub_routes: ["Mattapan"],
                 statuses: [%{description: "Station Closure", time: nil}]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :station_closure,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Mattapan")],
                     active_period: [{alert_start_time, alert_end_time}]
                   )
                 ],
                 time
               )
               |> statuses_for("Red")
    end
  end

  defp statuses_for(groups, route_id) do
    groups
    |> Enum.filter(fn
      %{route_id: ^route_id} -> true
      %{} -> false
    end)
  end

  defp beginning_of_day() do
    Timex.beginning_of_day(Timex.now("America/New_York"))
  end

  defp end_of_day() do
    Timex.end_of_day(Timex.now("America/New_York"))
  end

  defp time_today() do
    Faker.DateTime.between(beginning_of_day(), end_of_day())
  end

  defp time_before(time) do
    Faker.DateTime.between(beginning_of_day(), time)
  end

  defp time_after(time) do
    Faker.DateTime.between(time, end_of_day())
  end
end
