defmodule Dotcom.SystemStatus.GroupingTest do
  use ExUnit.Case, async: true

  alias Dotcom.SystemStatus.Grouping
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

  defp statuses_for(grouping, route_id) do
    grouping
    |> Enum.filter(fn
      %{route_id: ^route_id} -> true
      %{} -> false
    end)
  end

  describe "grouping/2" do
    test "when there are no alerts, lists each line as normal" do
      assert [
               %{
                 route_id: "Blue",
                 sub_routes: [],
                 statuses: [%{status: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [%{status: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Red",
                 sub_routes: [],
                 statuses: [%{status: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Green",
                 sub_routes: [],
                 statuses: [%{status: "Normal Service", time: nil}]
               }
             ] = Grouping.grouping([], now())
    end

    test "when there's an alert for a heavy rail line, lists only that line as having that alert" do
      assert [
               %{
                 route_id: "Blue",
                 sub_routes: [],
                 statuses: [%{status: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [%{status: "Delays", time: nil}]
               },
               %{
                 route_id: "Red",
                 sub_routes: [],
                 statuses: [%{status: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Green",
                 sub_routes: [],
                 statuses: [%{status: "Normal Service", time: nil}]
               }
             ] =
               Grouping.grouping(
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
                 statuses: [%{status: "Shuttle Buses", time: nil}]
               },
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [%{status: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Red",
                 sub_routes: [],
                 statuses: [%{status: "Normal Service", time: nil}]
               },
               %{
                 route_id: "Green",
                 sub_routes: [],
                 statuses: [%{status: "Normal Service", time: nil}]
               }
             ] =
               Grouping.grouping(
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

    test "if the alert has a future active_period, then show that time" do
      assert [
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [%{status: "Suspension", time: "7:30pm"}]
               }
             ] =
               Grouping.grouping(
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

    test "if the alert has a past and a future active_period, then show only the future time" do
      assert [
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [%{status: "Suspension", time: "7:30pm"}]
               }
             ] =
               Grouping.grouping(
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

    test "if there's more than one alert for a given line, show both, sorted alphabetically" do
      assert [
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [
                   %{status: "Delays", time: nil},
                   %{status: "Suspension", time: nil}
                 ]
               }
             ] =
               Grouping.grouping(
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

    test "if there are current and future alerts, include explicit 'Now' and sort current alerts first" do
      assert [
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [
                   %{status: "Suspension", time: "Now"},
                   %{status: "Delays", time: "8:30pm"}
                 ]
               }
             ] =
               Grouping.grouping(
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

    test "sort future alerts by time, not lexically" do
      assert [
               %{
                 route_id: "Orange",
                 sub_routes: [],
                 statuses: [
                   %{status: "Delays", time: "8:30pm"},
                   %{status: "Suspension", time: "10:00pm"}
                 ]
               }
             ] =
               Grouping.grouping(
                 [
                   Alert.build(:alert,
                     effect: :delay,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [future_active_period(~N[2025-01-09 20:30:00])]
                   ),
                   Alert.build(:alert,
                     effect: :suspension,
                     informed_entity: [InformedEntity.build(:informed_entity, route: "Orange")],
                     active_period: [future_active_period(~N[2025-01-09 22:00:00])]
                   )
                 ],
                 now()
               )
               |> statuses_for("Orange")
    end
  end
end
