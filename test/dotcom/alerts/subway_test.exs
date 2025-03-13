defmodule Dotcom.Alerts.SubwayTest do
  use ExUnit.Case

  import Dotcom.Alerts.Subway
  import Mox

  import Test.Support.Generators.DateTime,
    only: [random_date_time: 0, random_time_range_date_time: 1]

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
    test "all groups are present" do
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

    test "alerts get grouped by effect" do
      # Setup
      groups = groups()
      random_group = Enum.random(groups) |> Kernel.elem(0)

      effects =
        Enum.find(groups, fn {group, _effects} -> group == random_group end) |> Kernel.elem(1)

      random_effect = if Enum.empty?(effects), do: :foobarbaz, else: Enum.random(effects)

      alert = Factories.Alerts.Alert.build(:alert, effect: random_effect)
      alerts = [alert]

      # Exercise
      grouped_alerts = group_alerts(alerts)

      # Verify
      assert grouped_alerts |> Map.get(random_group) == alerts
    end
  end

  describe "group_counts/1" do
    test "all groups are present" do
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
      groups = groups()
      random_group = Enum.random(groups) |> Kernel.elem(0)

      effects =
        Enum.find(groups, fn {group, _effects} -> group == random_group end) |> Kernel.elem(1)

      random_effect = if Enum.empty?(effects), do: :foobarbaz, else: Enum.random(effects)

      alert = Factories.Alerts.Alert.build(:alert, effect: random_effect)
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

  describe "groups/0" do
    test "returns an ordered list" do
      # Setup
      group_order = group_order()

      # Exercise
      groups = groups()

      # Verify
      assert groups |> List.first() |> Kernel.elem(0) == Enum.at(group_order, 0)
      assert groups |> List.last() |> Kernel.elem(0) == Enum.at(group_order, -1)
    end
  end

  describe "find_group/1" do
    test "returns 'Other' when the group is not found" do
      # Setup
      effect = :foobarbaz

      # Exercise
      group = find_group(effect)

      # Verify
      assert group == "Other"
    end

    test "returns the correct group for grouped effects" do
      # Setup
      groups = groups() |> Enum.reject(fn {group, _effects} -> group == "Other" end)
      random_group = Enum.random(groups) |> Kernel.elem(0)

      effects =
        Enum.find(groups, fn {group, _effects} -> group == random_group end) |> Kernel.elem(1)

      random_effect = Enum.random(effects)

      # Exercise
      group = find_group(random_effect)

      # Verify
      assert group == random_group
    end
  end

  describe "sort_alerts/1" do
    test "alerts are sorted by ongoing, station, and then start time" do
      # Setup
      earlier = random_date_time()
      later = random_time_range_date_time({earlier, nil})

      a_station = Factories.Stops.Stop.build(:stop, station?: true, name: "A")
      b_station = Factories.Stops.Stop.build(:stop, station?: true, name: "B")

      expect(Stops.Repo.Mock, :get, fn _ -> a_station end)
      expect(Stops.Repo.Mock, :get, fn _ -> b_station end)
      expect(Stops.Repo.Mock, :get, fn _ -> b_station end)

      a_stops = MapSet.new(["A"])
      b_stops = MapSet.new(["B"])

      a_informed_entity =
        Factories.Alerts.InformedEntitySet.build(:informed_entity_set, stop: a_stops)

      b_informed_entity =
        Factories.Alerts.InformedEntitySet.build(:informed_entity_set, stop: b_stops)

      # 'A' is first because it is ongoing. This is despite the station being last and the active period being later.
      a_alert =
        Factories.Alerts.Alert.build(:alert,
          active_period: [{later, nil}],
          informed_entity: b_informed_entity,
          lifecycle: :ongoing
        )

      # 'B' is second because of its station. It is not ongoing and its active period is later.
      b_alert =
        Factories.Alerts.Alert.build(:alert,
          active_period: [{later, nil}],
          informed_entity: a_informed_entity,
          lifecycle: :not_ongoing
        )

      # 'C' is last even though its active period is first. It is not ongoing and its station is last.
      c_alert =
        Factories.Alerts.Alert.build(:alert,
          active_period: [{earlier, nil}],
          informed_entity: b_informed_entity,
          lifecycle: :not_ongoing
        )

      alerts = [c_alert, b_alert, a_alert]

      # Exercise
      sorted_alerts = sort_alerts(alerts)

      # Verify
      assert [a_alert, b_alert, c_alert] == sorted_alerts
    end
  end
end
