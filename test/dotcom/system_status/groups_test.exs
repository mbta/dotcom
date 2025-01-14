defmodule Dotcom.SystemStatus.GroupsTest do
  use ExUnit.Case, async: true

  alias Dotcom.SystemStatus.Groups
  alias Test.Support.Factories.Alerts.Alert
  alias Test.Support.Factories.Alerts.InformedEntity

  defp local_datetime(naive) do
    DateTime.from_naive!(naive, "America/New_York")
  end

  defp now() do
    local_datetime(~N[2025-01-09 13:00:00])
  end

  defp current_active_period() do
    {local_datetime(~N[2025-01-09 10:00:00]), local_datetime(~N[2025-01-09 20:00:00])}
  end

  defp future_active_period(start_time) do
    {local_datetime(start_time), local_datetime(~N[2025-01-09 20:00:00])}
  end

  defp past_active_period() do
    {local_datetime(~N[2025-01-08 10:00:00]), local_datetime(~N[2025-01-08 20:00:00])}
  end

  defp statuses_for(groups, route_id) do
    groups
    |> Enum.filter(fn
      %{route_id: ^route_id} -> true
      %{} -> false
    end)
  end

  describe "heavy rail groups" do
    test "when there are no alerts, lists each line as normal" do
      assert [
               %{
                 route_id: "Blue",
                 sub_routes: [],
                 statuses: [%{description: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [%{description: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Red",
                 sub_routes: [],
                 statuses: [%{description: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Green",
                 sub_routes: [],
                 statuses: [%{description: "Normal Service", time: nil}]
               }
             ] = Groups.groups([], now())
    end

    test "when there's an alert for a heavy rail line, lists only that line as having that alert" do
      assert [
               %{
                 route_id: "Blue",
                 sub_routes: [],
                 statuses: [%{description: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [%{description: "Delays", time: nil}]
               },
               %{
                 route_id: "Red",
                 sub_routes: [],
                 statuses: [%{description: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Green",
                 sub_routes: [],
                 statuses: [%{description: "Normal Service", time: nil}]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :delay,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [current_active_period()]
                   )
                 ],
                 now()
               )

      assert [
               %{
                 route_id: "Blue",
                 sub_routes: [],
                 statuses: [%{description: "Shuttle Buses", time: nil}]
               },
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [%{description: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Red",
                 sub_routes: [],
                 statuses: [%{description: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Green",
                 sub_routes: [],
                 statuses: [%{description: "Normal Service", time: nil}]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :shuttle,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Blue")],
                     active_period: [current_active_period()]
                   )
                 ],
                 now()
               )
    end

    test "shows future active time for alerts that will become active later in the day" do
      assert [
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [%{description: "Suspension", time: "7:30pm"}]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [future_active_period(~N[2025-01-09 19:30:00])]
                   )
                 ],
                 now()
               )
               |> statuses_for("Orange")
    end

    test "shows a future time for alerts that have an expired time as well" do
      assert [
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [%{description: "Suspension", time: "7:30pm"}]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [
                       past_active_period(),
                       future_active_period(~N[2025-01-09 19:30:00])
                     ]
                   )
                 ],
                 now()
               )
               |> statuses_for("Orange")
    end

    test "shows multiple alerts for a given route, sorted alphabetically" do
      assert [
               %{
                 route_id: "Orange",
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
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [current_active_period()]
                   ),
                   Alert.build(:alert,
                     effect: :delay,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [current_active_period()]
                   )
                 ],
                 now()
               )
               |> statuses_for("Orange")
    end

    test "puts 'Now' text on current alerts when there are also future alerts, and sorts 'Now' first" do
      assert [
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [
                   %{description: "Suspension", time: "Now"},
                   %{description: "Delays", time: "8:30pm"}
                 ]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :delay,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [future_active_period(~N[2025-01-09 20:30:00])]
                   ),
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [current_active_period()]
                   )
                 ],
                 now()
               )
               |> statuses_for("Orange")
    end

    test "sorts future alerts by time, not lexically" do
      assert [
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [
                   %{description: "Station Closure", time: "8:30pm"},
                   %{description: "Suspension", time: "10:00pm"}
                 ]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :station_closure,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [future_active_period(~N[2025-01-09 20:30:00])]
                   ),
                   Alert.build(
                     :alert,
                     effect: :suspension,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [future_active_period(~N[2025-01-09 22:00:00])]
                   )
                 ],
                 now()
               )
               |> statuses_for("Orange")
    end

    test "consolidates alerts if they have the same effect and time" do
      assert [
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [
                   %{description: "Suspensions", time: "Now"},
                   %{description: "Station Closures", time: "8:30pm"}
                 ]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :station_closure,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [future_active_period(~N[2025-01-09 20:30:00])]
                   ),
                   Alert.build(:alert,
                     effect: :station_closure,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [future_active_period(~N[2025-01-09 20:30:00])]
                   ),
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [current_active_period()]
                   ),
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [current_active_period()]
                   )
                 ],
                 now()
               )
               |> statuses_for("Orange")
    end
  end

  describe "green line groups" do
    test "combines all green line branches into a single one if they have the same alerts" do
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
                     active_period: [current_active_period()]
                   )
                 end),
                 now()
               )
               |> statuses_for("Green")
    end

    test "splits separate branches of the green line out as sub_routes if the alerts are different and sorts 'Normal Service' last" do
      assert [
               %{
                 route_id: "Green",
                 sub_routes: ["Green-D"],
                 statuses: [%{description: "Shuttle Buses", time: nil}]
               },
               %{
                 route_id: "Green",
                 sub_routes: ["Green-B", "Green-C", "Green-E"],
                 statuses: [%{description: "Normal Service", time: nil}]
               }
             ] =
               Groups.groups(
                 [
                   Alert.build(:alert,
                     effect: :shuttle,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Green-D")],
                     active_period: [current_active_period()]
                   )
                 ],
                 now()
               )
               |> statuses_for("Green")
    end
  end

  describe "red line groups" do
    test "only shows Red line if Mattapan doesn't have any alerts" do
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
                     active_period: [current_active_period()]
                   )
                 ],
                 now()
               )
               |> statuses_for("Red")
    end

    test "shows Mattapan as a sub_route of Red if it has an alert" do
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
                     active_period: [current_active_period()]
                   )
                 ],
                 now()
               )
               |> statuses_for("Red")
    end
  end
end
