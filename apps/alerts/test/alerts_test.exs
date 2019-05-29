defmodule AlertsTest do
  use ExUnit.Case, async: true
  use Timex

  import Alerts.Alert
  alias Alerts.Alert

  @now Util.to_local_time(~N[2018-01-15T12:00:00])

  describe "new/1" do
    test "with no params, returns a default struct" do
      assert new() == %Alert{}
    end

    test "with params, sets values (include informed_entity)" do
      entities = [%Alerts.InformedEntity{}]

      assert new(effect: :detour, informed_entity: entities) == %Alert{
               effect: :detour,
               informed_entity: Alerts.InformedEntitySet.new(entities)
             }
    end
  end

  describe "update/2" do
    test "updates an existing alert, keeping the old values" do
      alert = new(effect: :detour)
      entities = [%Alerts.InformedEntity{}]
      expected = new(effect: :detour, informed_entity: entities)
      actual = update(alert, informed_entity: entities)
      assert expected == actual
    end
  end

  describe "get_entity/2" do
    test "can retrieve all InformedEntity types" do
      for type <- [:route, :route_type, :stop, :trip, :direction_id] do
        entity = Alerts.InformedEntity.from_keywords([{type, "entity"}])
        alert = Alert.new(informed_entity: [entity])
        assert Alert.get_entity(alert, type) == MapSet.new(["entity"])
      end
    end
  end

  describe "all_types/0" do
    test "contains no duplicates" do
      assert Enum.uniq(all_types()) == all_types()
    end
  end

  describe "human_effect/1" do
    test "returns a string representing the effect of the alert" do
      assert human_effect(%Alert{}) == "Unknown"
      assert human_effect(%Alert{effect: :snow_route}) == "Snow Route"
    end
  end

  describe "human_lifecycle/1" do
    test "returns a string representing the lifecycle of the alert" do
      assert human_lifecycle(%Alert{}) == "Unknown"
      assert human_lifecycle(%Alert{lifecycle: :new}) == "New"
      assert human_lifecycle(%Alert{lifecycle: :ongoing_upcoming}) == "Upcoming"
    end
  end

  describe "human_label/1" do
    @future_active_period [{Timex.shift(@now, days: 8), Timex.shift(@now, days: 20)}]

    test "returns correct delay string" do
      assert human_label(%Alert{effect: :delay, severity: 0}) == ""
      assert human_label(%Alert{effect: :delay, severity: 1}) == ""
      assert human_label(%Alert{effect: :delay, severity: 2}) == ""
      assert human_label(%Alert{effect: :delay, severity: 3}) == "up to 10 minutes"
      assert human_label(%Alert{effect: :delay, severity: 4}) == "up to 15 minutes"
      assert human_label(%Alert{effect: :delay, severity: 5}) == "up to 20 minutes"
      assert human_label(%Alert{effect: :delay, severity: 6}) == "up to 25 minutes"
      assert human_label(%Alert{effect: :delay, severity: 7}) == "up to 30 minutes"
      assert human_label(%Alert{effect: :delay, severity: 8}) == "30+ minutes"
      assert human_label(%Alert{effect: :delay, severity: 9}) == "more than an hour"
    end

    test "returns Ongoing when lifecycle is ongoing and time not in active period" do
      assert human_label(%Alert{
               effect: :cancellation,
               active_period: @future_active_period,
               lifecycle: :ongoing
             }) == "Ongoing"
    end

    test "returns Upcoming when lifecycle is ongoing and time not in active period" do
      assert human_label(%Alert{
               effect: :cancellation,
               active_period: @future_active_period,
               lifecycle: :upcoming
             }) == "Upcoming"
    end

    test "returns empty string when lifecycle is new and time not in active period" do
      assert human_label(%Alert{
               effect: :cancellation,
               active_period: @future_active_period,
               lifecycle: :new
             }) == ""
    end

    test "returns Upcoming when lifecycle is upcoming and active period is empty" do
      assert human_label(%Alert{
               effect: :cancellation,
               active_period: [],
               lifecycle: :upcoming
             }) == "Upcoming"
    end
  end

  describe "icon/1" do
    test "return :none, :cancel, :snow, :shuttle or :alert" do
      assert icon(%Alert{effect: :detour, priority: :low}) == :none
      assert icon(%Alert{effect: :suspension, priority: :high}) == :cancel
      assert icon(%Alert{effect: :cancellation, priority: :high}) == :cancel
      assert icon(%Alert{effect: :snow_route, priority: :high}) == :snow
      assert icon(%Alert{effect: :shuttle, priority: :high}) == :shuttle
      assert icon(%Alert{effect: :delay, priority: :high}) == :alert
    end
  end
end
