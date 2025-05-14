defmodule DotcomWeb.SystemStatus.CommuterRailStatusTest do
  use ExUnit.Case

  test "renders commuter rail status", %{conn: conn} do
    commuter_rail_status = CommuterRail.commuter_rail_status()

    {:ok, _view, html} =
      live(conn, ~p"/system-status/commuter-rail")
      |> render_component(CommuterRailStatus, commuter_rail_status: commuter_rail_status)

    assert html =~ "Current Status"
    assert html =~ "Commuter Rail"
  end
end
