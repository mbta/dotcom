defmodule DotcomWeb.Plugs.GlxNowOpenTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.GlxNowOpen

  defp now_before_fn do
    ~N[2022-03-21 01:00:00]
    |> Util.convert_using_timezone("America/New_York")
  end

  defp now_between_fn do
    ~N[2022-03-21 04:55:00]
    |> Util.convert_using_timezone("America/New_York")
  end

  defp now_after_fn do
    ~N[2022-06-21 04:55:00]
    |> Util.convert_using_timezone("America/New_York")
  end

  describe "init/1" do
    test "defaults to Util.now/0" do
      assert init([]) == [now_fn: &Util.now/0]
    end
  end

  describe "call/2" do
    test "assigns glx_stations_open with nil if current date is before opening date", %{
      conn: conn
    } do
      updated_conn = call(conn, now_fn: &now_before_fn/0)

      assert updated_conn.assigns.glx_stations_open == nil
    end

    test "assigns glx_stations_open with array of stations if current date is between opening date and 3 months post opening",
         %{conn: conn} do
      updated_conn = call(conn, now_fn: &now_between_fn/0)

      assert updated_conn.assigns.glx_stations_open == "place-lech,place-unsqu,place-spmnl"
    end

    test "assigns glx_stations_open with nil if current date is after 3 months post opening date",
         %{conn: conn} do
      updated_conn = call(conn, now_fn: &now_after_fn/0)

      assert updated_conn.assigns.glx_stations_open == nil
    end
  end
end
