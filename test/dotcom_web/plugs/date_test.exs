defmodule DotcomWeb.Plugs.DateTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.Date

  @date ~D[2016-01-01]

  def date_fn do
    @date
  end

  describe "init/1" do
    test "defaults to Util.service_date/0" do
      assert init([]) == [date_fn: &Util.service_date/0]
    end
  end

  describe "call/2" do
    test "with no params, assigns date to the result of date_fn", %{conn: conn} do
      conn = call(%{conn | params: %{}}, date_fn: &date_fn/0)

      assert conn.assigns.date == @date
    end

    test "with a valid date_time param, parses that into date_time", %{conn: conn} do
      conn = call(%{conn | params: %{"date" => "2016-12-12"}}, date_fn: &date_fn/0)

      assert conn.assigns.date == ~D[2016-12-12]
    end

    test "with an invalid date_time param, returns the result of date_fn", %{conn: conn} do
      conn = call(%{conn | params: %{"date" => "not_a_time"}}, date_fn: &date_fn/0)

      assert conn.assigns.date == @date
    end

    test "with an imaginary date_time param, returns the result of date_fn", %{conn: conn} do
      conn = call(%{conn | params: %{"date" => "2018-09-31"}}, date_fn: &date_fn/0)

      assert conn.assigns.date == @date
    end
  end
end
