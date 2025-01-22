defmodule DotcomWeb.Plugs.DateInRatingTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.DateInRating

  @start_date ~D[2016-06-01]
  @end_date ~D[2017-01-01]

  defp dates_fn do
    {@start_date, @end_date}
  end

  describe "init/1" do
    test "defaults to Schedules.Repo.rating_dates/0" do
      assert init([]) == [dates_fn: &Schedules.Repo.rating_dates/0]
    end
  end

  describe "call/2" do
    test "with no params, assigns :date_in_rating? to true", %{conn: conn} do
      conn = %{conn | query_params: %{}}
      conn_with_params = call(conn, dates_fn: &dates_fn/0)

      assert conn_with_params.assigns.date_in_rating? == true
    end

    test "with a valid date param, assigns :date_in_rating? to true", %{conn: conn} do
      for date <- [@start_date, ~D[2016-12-12], @end_date] do
        date_str = Date.to_iso8601(date)
        conn = %{conn | assigns: %{date: date}, query_params: %{"date" => date_str}}
        conn_with_date = call(conn, dates_fn: &dates_fn/0)

        assert conn_with_date.assigns.date_in_rating? === true
      end
    end

    test "if the server returns an error, assigns :date_in_rating? to true", %{conn: conn} do
      conn = %{conn | assigns: %{date: @start_date}, query_params: %{"date" => "2016-06-01"}}
      assert call(conn, dates_fn: fn -> :error end) == assign(conn, :date_in_rating?, true)
    end

    test "with a date in the past or future, assigns :date_in_rating? to false", %{conn: conn} do
      for date <- [~D[2016-05-31], ~D[2017-01-02]] do
        date_str = Date.to_iso8601(date)

        params = %{
          "date" => date_str,
          "other_param" => "value"
        }

        conn_with_date = call(%{conn | assigns: %{date: date}, query_params: params}, dates_fn: &dates_fn/0)

        assert conn_with_date.assigns.date_in_rating? === false
      end
    end
  end
end
