defmodule Dotcom.Utils.TimeTest do
  use ExUnit.Case
  use ExUnitProperties

  import Dotcom.Utils.Time
  import Test.Support.Generators.DateTime

  setup _ do
    Mox.stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "between?/0" do
    property "returns false when the date_time is before the beginning of the range" do
      check all(date_time <- date_time_generator()) do
        start = random_date_time_after(date_time)
        stop = random_date_time_after(start)
        refute between?(date_time, start, stop)
        refute between?(date_time, start, nil)
      end
    end

    property "returns false when the date_time is after the end of the range" do
      check all(date_time <- date_time_generator()) do
        stop = random_date_time_before(date_time)
        start = random_date_time_before(stop)
        refute between?(date_time, start, stop)
        refute between?(date_time, nil, stop)
      end
    end

    property "returns true when the date_time is within the range" do
      check all(date_time <- date_time_generator()) do
        start = random_date_time_before(date_time)
        stop = random_date_time_after(date_time)
        assert between?(date_time, start, stop)
        assert between?(date_time, nil, stop)
        assert between?(date_time, start, nil)
      end
    end

    property "returns true when date_time is at the beginning of the range when inclusive is true or :start" do
      check all(date_time <- date_time_generator()) do
        stop = random_date_time_after(date_time)
        assert between?(date_time, date_time, stop, inclusive: true)
        assert between?(date_time, date_time, nil, inclusive: true)
        assert between?(date_time, date_time, stop, inclusive: :start)
        assert between?(date_time, date_time, nil, inclusive: :start)
      end
    end

    property "returns false when date_time is at the beginning of the range when inclusive is false or :end" do
      check all(date_time <- date_time_generator()) do
        stop = random_date_time_after(date_time)
        refute between?(date_time, date_time, stop, inclusive: false)
        refute between?(date_time, date_time, nil, inclusive: false)
        refute between?(date_time, date_time, stop, inclusive: :end)
        refute between?(date_time, date_time, nil, inclusive: :end)
      end
    end

    property "returns true when date_time is at the end of the range when inclusive is true or :end" do
      check all(date_time <- date_time_generator()) do
        start = random_date_time_before(date_time)
        assert between?(date_time, start, date_time, inclusive: true)
        assert between?(date_time, nil, date_time, inclusive: true)
        assert between?(date_time, start, date_time, inclusive: :end)
        assert between?(date_time, nil, date_time, inclusive: :end)
      end
    end

    property "returns false when date_time is at the end of the range when inclusive is false or :start" do
      check all(date_time <- date_time_generator()) do
        start = random_date_time_before(date_time)
        refute between?(date_time, start, date_time, inclusive: false)
        refute between?(date_time, nil, date_time, inclusive: false)
        refute between?(date_time, start, date_time, inclusive: :start)
        refute between?(date_time, nil, date_time, inclusive: :start)
      end
    end

    test "raises error for invalid inputs" do
      assert_raise ArgumentError, fn ->
        between?(random_date_time(), random_date_time(), "2025-12-12")
      end

      assert_raise ArgumentError, fn ->
        between?(random_date_time(), "2025-12-12", random_date_time())
      end

      assert_raise Protocol.UndefinedError, fn ->
        between?("2025-12-12", random_date_time(), random_date_time())
      end
    end
  end
end
