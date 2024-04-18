defmodule DotcomWeb.Plugs.ScheduleRedirectorTest do
  use DotcomWeb.ConnCase, async: true

  alias DotcomWeb.Plugs.ScheduleRedirector

  test "call", %{conn: conn} do
    conn = ScheduleRedirector.call(%{conn | path_info: ["schedules", "79", "schedule"]}, [])
    assert redirected_to(conn, :found) == "/schedules/79"
    assert conn.halted
  end
end
