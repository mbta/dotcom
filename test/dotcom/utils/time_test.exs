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
    property "returns false when the date_time is not within the range" do
      check all(date_time <- date_time_generator()) do
        start = DateTime.shift(date_time, second: 1)
        stop = DateTime.shift(start, year: 1)
        refute between?(date_time, start, stop)
      end
    end

    property "returns true when the date_time is within the range" do
      check all(date_time <- date_time_generator()) do
        start = DateTime.shift(date_time, day: -400)
        stop = DateTime.shift(start, day: 400)

        cond do
          date_time == stop ->
            refute between?(date_time, start, stop, inclusive: :start)
            assert between?(date_time, start, stop, inclusive: true)

          date_time == start ->
            refute between?(date_time, start, stop, inclusive: :end)
            assert between?(date_time, start, stop, inclusive: true)

          true ->
            assert between?(date_time, start, stop, inclusive: true)
            assert between?(date_time, start, stop)
            assert between?(date_time, start, nil)
            assert between?(date_time, nil, stop)
            assert between?(date_time, nil, nil)
        end
      end
    end

    test "raises error for invalid inputs" do
      assert_raise Protocol.UndefinedError, fn ->
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
