defmodule SiteWeb.EventDateRangeTest do
  use ExUnit.Case
  alias SiteWeb.EventDateRange

  describe "build/2" do
    test "returns a date range for the given month" do
      params = %{"month" => "2017-02-01"}
      current_month = ~D[2017-04-15]

      assert EventDateRange.build(params, current_month) == %{
               start_time_gt: "2017-02-01",
               start_time_lt: "2017-03-01"
             }
    end

    test "returns a date range for the current month when given an invalid date" do
      params = %{"month" => "nope"}
      current_month = ~D[2017-04-15]

      assert EventDateRange.build(params, current_month) == %{
               start_time_gt: "2017-04-01",
               start_time_lt: "2017-05-01"
             }
    end

    test "returns a date range for the current month when given a partial date" do
      params = %{"month" => "2017-01"}
      current_month = ~D[2017-04-15]

      assert EventDateRange.build(params, current_month) == %{
               start_time_gt: "2017-04-01",
               start_time_lt: "2017-05-01"
             }
    end

    test "returns a date range for the current month when given a partial date" do
      params = %{"month" => "2017-01"}
      current_month = ~D[2017-04-15]

      assert EventDateRange.build(params, current_month) == %{
               start_time_gt: "2017-04-01",
               start_time_lt: "2017-05-01"

    test "returns a date range for the given year" do
      params = %{"year" => "2017-02-01"}
      current_year = ~D[2020-04-15]

      assert EventDateRange.build(params, current_year) == %{
               start_time_gt: "2017-01-01",
               start_time_lt: "2018-01-01"
             }
    end
             }
    end
  end

  describe "for_month/1" do
    test "returns query params for the beginning and end of the given month" do
      date = ~D[2017-04-10]

      assert EventDateRange.for_month(date) == %{
               start_time_gt: "2017-04-01",
               start_time_lt: "2017-05-01"
             }
    end
  end

  describe "for_year/1" do
    test "returns query params for the beginning and end of the given month" do
      date = ~D[2017-04-10]

      assert EventDateRange.for_year(date) == %{
               start_time_gt: "2017-01-01",
               start_time_lt: "2018-01-01"
             }
    end
  end
end
