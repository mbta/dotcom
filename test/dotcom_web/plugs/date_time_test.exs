defmodule DotcomWeb.Plugs.DateTimeTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.DateTime

  @now ~N[2016-01-01T00:00:00]

  def now_fn do
    @now
  end

  describe "init/1" do
    test "defaults to Dotcom.Utils.DateTime.now/0" do
      assert init([]) == [now_fn: &Dotcom.Utils.DateTime.now/0]
    end
  end

  describe "call/2" do
    test "with no params, assigns date_time to the result of now_fn", %{conn: conn} do
      conn =
        %{conn | params: %{}}
        |> call(now_fn: &now_fn/0)

      assert conn.assigns.date_time == @now
    end

    test "with a valid date_time param, parses that into date_time", %{conn: conn} do
      conn =
        %{conn | params: %{"date_time" => "2016-12-12T12:12:12-05:00"}}
        |> call(now_fn: &now_fn/0)

      assert conn.assigns.date_time ==
               Timex.to_datetime(~N[2016-12-12T12:12:12], "America/New_York")
    end

    test "with an invalid date_time param, returns the result of now_fn", %{conn: conn} do
      conn =
        %{conn | params: %{"date_time" => "not_a_time"}}
        |> call(now_fn: &now_fn/0)

      assert conn.assigns.date_time == @now
    end
  end
end
