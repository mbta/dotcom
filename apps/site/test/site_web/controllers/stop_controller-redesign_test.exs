defmodule SiteWeb.StopControllerRedesignTest do
  use SiteWeb.ConnCase

  setup do
    conn =
      default_conn()
      |> put_req_cookie("stops_redesign", "true")

    {:ok, conn: conn}
  end

  test "shows a stop ID", %{conn: conn} do
    conn = conn |> get(stop_path(conn, :show, "place-sstat"))

    assert conn.assigns.stop_id
  end
end
