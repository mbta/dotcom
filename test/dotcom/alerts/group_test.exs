defmodule Dotcom.Alerts.GroupTest do
  use ExUnit.Case

  import Dotcom.Alerts.Subway
  import Mox

  import Test.Support.Generators.DateTime,
    only: [random_date_time: 0, random_time_range_date_time: 1]

  alias Alerts.Alert
  alias Test.Support.Factories

  setup :verify_on_exit!

  setup do
    stub(Dotcom.Utils.DateTime.Mock, :coerce_ambiguous_date_time, fn date_time ->
      Dotcom.Utils.DateTime.coerce_ambiguous_date_time(date_time)
    end)

    stub(Dotcom.Utils.DateTime.Mock, :now, fn ->
      Dotcom.Utils.DateTime.now()
    end)

    :ok
  end

  describe "group_alerts/1" do
    test "all effect_groups are present" do
      # Setup
      group_order = group_order()
      alerts = []

      # Exercise
      grouped_alerts = group_alerts(alerts)

      # Verify
      Enum.each(group_order, fn group ->
        assert Map.has_key?(grouped_alerts, group)
      end)
    end

    test "alerts default to an empty list" do
      # Setup
      alerts = []

      # Exercise
      group_counts = group_alerts(alerts)

      # Verify
      assert Enum.all?(group_counts, fn {_group, alerts} -> Enum.empty?(alerts) end)
    end

    test "alerts get grouped by effect and severity" do
      # Setup
      effect_groups = effect_groups()
      random_group = Enum.random(effect_groups) |> Kernel.elem(0)

      effects =
        Enum.find(effect_groups, fn {group, _effects} -> group == random_group end)
        |> Kernel.elem(1)

      {random_effect, random_severity} =
        if Enum.empty?(effects), do: {:foo, 0}, else: Enum.random(effects)

      alert =
        Factories.Alerts.Alert.build(:alert, effect: random_effect, severity: random_severity)

      alerts = [alert]

      # Exercise
      grouped_alerts = group_alerts(alerts)

      # Verify
      assert grouped_alerts |> Map.get(random_group) == alerts
    end
  end

  describe "group_counts/1" do
    test "all effect_groups are present" do
      # Setup
      group_order = group_order()
      alerts = []

      # Exercise
      grouped_alerts = group_alerts(alerts)

      # Verify
      Enum.each(group_order, fn group ->
        assert Map.has_key?(grouped_alerts, group)
      end)
    end

    test "counts default to 0" do
      # Setup
      alerts = []

      # Exercise
      group_counts = group_counts(alerts)

      # Verify
      assert Enum.all?(group_counts, fn {_group, count} -> count == 0 end)
    end

    test "alerts get counted by effect" do
      # Setup
      effect_groups = effect_groups()
      random_group = Enum.random(effect_groups) |> Kernel.elem(0)

      effects =
        Enum.find(effect_groups, fn {group, _effects} -> group == random_group end)
        |> Kernel.elem(1)

      {random_effect, random_severity} =
        if Enum.empty?(effects), do: {:foo, 0}, else: Enum.random(effects)

      alert =
        Factories.Alerts.Alert.build(:alert, effect: random_effect, severity: random_severity)

      alerts = [alert]

      # Exercise
      grouped_counts = group_counts(alerts)

      # Verify
      assert grouped_counts |> Map.get(random_group) == 1
    end
  end

  describe "group_order/0" do
    test "returns a list" do
      # Exercise/Verify
      assert group_order() |> is_list()
    end
  end

  describe "effect_groups/0" do
    test "returns an ordered list" do
      # Setup
      group_order = group_order()

      # Exercise
      effect_groups = effect_groups()

      # Verify
      assert effect_groups |> List.first() |> Kernel.elem(0) == Enum.at(group_order, 0)
      assert effect_groups |> List.last() |> Kernel.elem(0) == Enum.at(group_order, -1)
    end
  end

  describe "find_group/1" do
    test "returns 'Other' when the group is not found" do
      # Setup
      unknown_effect = :foobarbaz
      random_severity = :rand.uniform(10)
      alert = %Alert{effect: unknown_effect, severity: random_severity}

      # Exercise
      group = find_group(alert)

      # Verify
      assert group == "Other"
    end

    test "returns the correct group for grouped effects" do
      # Setup
      effect_groups = effect_groups() |> Enum.reject(fn {group, _effects} -> group == "Other" end)
      random_group = Enum.random(effect_groups) |> Kernel.elem(0)

      effects =
        Enum.find(effect_groups, fn {group, _effects} -> group == random_group end)
        |> Kernel.elem(1)

      {random_effect, random_severity} = Enum.random(effects)

      alert = %Alert{effect: random_effect, severity: random_severity}

      # Exercise
      group = find_group(alert)

      # Verify
      assert group == random_group
    end
  end

  describe "sort_alerts/1" do
    test "alerts are sorted by start time and then station" do
      # Setup
      earlier = random_date_time()
      later = random_time_range_date_time({earlier, nil})

      a_station = Factories.Stops.Stop.build(:stop, station?: true, name: "A")
      b_station = Factories.Stops.Stop.build(:stop, station?: true, name: "B")

      stub(Stops.Repo.Mock, :get, fn id ->
        case id do
          "A" -> a_station
          "B" -> b_station
        end
      end)

      a_stop = MapSet.new(["A"])
      b_stop = MapSet.new(["B"])

      a_informed_entity =
        Factories.Alerts.InformedEntitySet.build(:informed_entity_set, stop: a_stop)

      b_informed_entity =
        Factories.Alerts.InformedEntitySet.build(:informed_entity_set, stop: b_stop)

      # 'A' is first because its start time is first and its station is first.
      a_alert =
        Factories.Alerts.Alert.build(:alert,
          active_period: [{earlier, nil}],
          informed_entity: a_informed_entity
        )

      # 'B' is second because of its start time is first and its station is second.
      b_alert =
        Factories.Alerts.Alert.build(:alert,
          active_period: [{earlier, nil}],
          informed_entity: b_informed_entity
        )

      # 'C' is last because its start time is last even though its station is first.
      c_alert =
        Factories.Alerts.Alert.build(:alert,
          active_period: [{later, nil}],
          informed_entity: a_informed_entity
        )

      alerts = [c_alert, b_alert, a_alert]

      # Exercise
      sorted_alerts = sort_alerts(alerts)

      # Verify
      assert [a_alert, b_alert, c_alert] == sorted_alerts
    end
  end
end
