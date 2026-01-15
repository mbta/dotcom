defmodule Dotcom.Alerts.StartTimeTest do
  alias Test.Support.Factories
  use ExUnit.Case, async: true

  import Dotcom.Alerts.StartTime, only: [active?: 2, next_active_time: 2, past?: 2]

  alias Factories.Alerts.Alert

  setup _ do
    Mox.stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

  describe "next_active_time/2" do
    test "returns :current if the active period includes the time given" do
      time = Test.Support.Generators.DateTime.random_date_time()
      start_time = Test.Support.Generators.DateTime.random_date_time_before(time)
      end_time = Test.Support.Generators.DateTime.random_date_time_after(time)

      alert = Alert.build(:alert, active_period: [{start_time, end_time}])

      assert next_active_time(alert, time) == {:current, start_time}
    end

    test "treats a nil end_time as active indefinitely" do
      time = Test.Support.Generators.DateTime.random_date_time()
      start_time = Test.Support.Generators.DateTime.random_date_time_before(time)
      end_time = nil

      alert = Alert.build(:alert, active_period: [{start_time, end_time}])

      assert next_active_time(alert, time) == {:current, start_time}
    end

    test "returns :future and the start time if the active period starts after the time given" do
      time = Test.Support.Generators.DateTime.random_date_time()
      start_time = Test.Support.Generators.DateTime.random_date_time_after(time)
      end_time = Test.Support.Generators.DateTime.random_date_time_after(start_time)

      alert = Alert.build(:alert, active_period: [{start_time, end_time}])

      assert next_active_time(alert, time) == {:future, start_time}
    end

    test "drops active periods that are fully in the past" do
      time = Test.Support.Generators.DateTime.random_date_time()
      end_time1 = Test.Support.Generators.DateTime.random_date_time_before(time)
      start_time1 = Test.Support.Generators.DateTime.random_date_time_before(end_time1)

      start_time2 = Test.Support.Generators.DateTime.random_date_time_after(time)
      end_time2 = Test.Support.Generators.DateTime.random_date_time_after(start_time2)

      alert =
        Alert.build(:alert, active_period: [{start_time1, end_time1}, {start_time2, end_time2}])

      assert next_active_time(alert, time) ==
               {:future, start_time2}
    end

    test "returns :past if all active periods are fully in the past" do
      time = Test.Support.Generators.DateTime.random_date_time()
      end_time = Test.Support.Generators.DateTime.random_date_time_before(time)
      start_time = Test.Support.Generators.DateTime.random_date_time_before(end_time)

      alert = Alert.build(:alert, active_period: [{start_time, end_time}])

      assert next_active_time(alert, time) == :past
    end
  end

  describe "active?/2" do
    test "returns true if the active period includes the time given" do
      time = Test.Support.Generators.DateTime.random_date_time()
      start_time = Test.Support.Generators.DateTime.random_date_time_before(time)
      end_time = Test.Support.Generators.DateTime.random_date_time_after(time)

      alert = Alert.build(:alert, active_period: [{start_time, end_time}])

      assert active?(alert, time)
    end

    test "returns true if the active period's end time is nil" do
      time = Test.Support.Generators.DateTime.random_date_time()
      start_time = Test.Support.Generators.DateTime.random_date_time_before(time)
      end_time = nil

      alert = Alert.build(:alert, active_period: [{start_time, end_time}])

      assert active?(alert, time)
    end

    test "returns false if the active period starts after the time given" do
      time = Test.Support.Generators.DateTime.random_date_time()
      start_time = Test.Support.Generators.DateTime.random_date_time_after(time)
      end_time = Test.Support.Generators.DateTime.random_date_time_after(start_time)

      alert = Alert.build(:alert, active_period: [{start_time, end_time}])

      refute active?(alert, time)
    end

    test "returns false if all active period ends before the time given" do
      time = Test.Support.Generators.DateTime.random_date_time()
      end_time = Test.Support.Generators.DateTime.random_date_time_before(time)
      start_time = Test.Support.Generators.DateTime.random_date_time_before(end_time)

      alert = Alert.build(:alert, active_period: [{start_time, end_time}])

      refute active?(alert, time)
    end

    test "returns true if the time given is within any active period, not just the first one" do
      time = Test.Support.Generators.DateTime.random_date_time()
      end_time1 = Test.Support.Generators.DateTime.random_date_time_before(time)
      start_time1 = Test.Support.Generators.DateTime.random_date_time_before(end_time1)

      start_time2 = Test.Support.Generators.DateTime.random_date_time_before(time)
      end_time2 = Test.Support.Generators.DateTime.random_date_time_after(time)

      alert =
        Alert.build(:alert, active_period: [{start_time1, end_time1}, {start_time2, end_time2}])

      assert active?(alert, time)
    end
  end

  describe "past?/2" do
    test "returns false if the active period has a future end time" do
      time = Test.Support.Generators.DateTime.random_date_time()
      end_time = Test.Support.Generators.DateTime.random_date_time_after(time)
      start_time = Test.Support.Generators.DateTime.random_date_time_before(end_time)

      alert = Alert.build(:alert, active_period: [{start_time, end_time}])

      refute past?(alert, time)
    end

    test "returns false if the active period has a nil end time" do
      time = Test.Support.Generators.DateTime.random_date_time()
      start_time = Test.Support.Generators.DateTime.random_date_time_before(time)
      end_time = nil

      alert = Alert.build(:alert, active_period: [{start_time, end_time}])

      refute past?(alert, time)
    end

    test "returns false if there are any active periods with future end times" do
      time = Test.Support.Generators.DateTime.random_date_time()
      end_time1 = Test.Support.Generators.DateTime.random_date_time_before(time)
      start_time1 = Test.Support.Generators.DateTime.random_date_time_before(end_time1)

      end_time2 = Test.Support.Generators.DateTime.random_date_time_after(time)
      start_time2 = Test.Support.Generators.DateTime.random_date_time_before(end_time2)

      alert =
        Alert.build(:alert, active_period: [{start_time1, end_time1}, {start_time2, end_time2}])

      refute past?(alert, time)
    end

    test "returns true if all active periods are fully in the past" do
      time = Test.Support.Generators.DateTime.random_date_time()
      end_time = Test.Support.Generators.DateTime.random_date_time_before(time)
      start_time = Test.Support.Generators.DateTime.random_date_time_before(end_time)

      alert = Alert.build(:alert, active_period: [{start_time, end_time}])

      assert past?(alert, time)
    end
  end
end
