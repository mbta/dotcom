defmodule SiteWeb.EventDateRangeTest do
  use ExUnit.Case
  import Mock
  alias SiteWeb.EventDateRange

  @current_date ~D[2017-04-15]

  setup_with_mocks([
    {Util, [:passthrough], [today: fn -> @current_date end]}
  ]) do
    :ok
  end

  describe "build/2" do
    test "returns a date range for the given month" do
      assert EventDateRange.build(%{month: 2, year: 2017}) == %{
               start_time_gt: "2017-02-01",
               start_time_lt: "2017-03-01"
             }
    end

    test "returns a date range for the current month when given an invalid date" do
      assert EventDateRange.build(%{month: 22, year: 2017}) == %{
               start_time_gt: "2017-04-01",
               start_time_lt: "2017-05-01"
             }
    end

    test "returns a date range for the current year when given an invalid date" do
      assert EventDateRange.build(%{year: "bad"}) == %{
               start_time_gt: "2017-01-01",
               start_time_lt: "2018-01-01"
             }
    end

    test "returns a date range for the given year" do
      assert EventDateRange.build(%{year: 2019}) == %{
               start_time_gt: "2019-01-01",
               start_time_lt: "2020-01-01"
             }
    end

    test "returns a date range for the current year when a year is not provided" do
      assert EventDateRange.build(%{}) == %{
               start_time_gt: "2017-01-01",
               start_time_lt: "2018-01-01"
             }
    end
  end
end
