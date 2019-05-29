defmodule SiteWeb.ScheduleController.RoutePdfsTest do
  use SiteWeb.ConnCase, async: true

  import SiteWeb.ScheduleController.RoutePdfs

  @date ~D[2018-01-01]

  describe "call/2" do
    test "assigns `route_pdfs`", %{conn: conn} do
      conn = Plug.Conn.assign(conn, :date, @date)
      conn = %{conn | params: Map.put(conn.params, "route", "87")}
      conn = call(conn, [])
      assert [_at_least_one_pdf | _] = conn.assigns.route_pdfs
    end
  end
end
