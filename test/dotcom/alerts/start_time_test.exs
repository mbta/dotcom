defmodule Dotcom.Alerts.StartTimeTest do
  alias Test.Support.Factories
  use ExUnit.Case, async: true

  import Dotcom.Alerts.StartTime, only: [next_active_time: 2]

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
end
