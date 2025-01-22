defmodule DotcomWeb.ModeControllerTest do
  use DotcomWeb.ConnCase

  alias Routes.Route

  @moduletag :external

  for mode <- ~W(index subway bus ferry commuter_rail)a do
    test_name = "renders the #{mode} mode page"

    test test_name, %{conn: conn} do
      assert conn
             |> get(mode_path(conn, unquote(mode)))
             |> html_response(200)
    end
  end

  describe "Recently Visited" do
    test "/subway doesn't show recently visited routes", %{conn: conn} do
      conn =
        conn
        |> assign(:recently_visited, [%Route{id: "Red", type: 1}])
        |> get(mode_path(conn, :subway))

      assert conn.assigns.recently_visited == []
    end

    test "/commuter-rail only shows CR routes", %{conn: conn} do
      conn =
        conn
        |> assign(:recently_visited, [
          %Route{id: "Red", type: 1},
          %Route{id: "CR-Fitchburg", type: 2}
        ])
        |> get(mode_path(conn, :commuter_rail))

      assert conn.assigns.recently_visited == [%Route{id: "CR-Fitchburg", type: 2}]
    end

    test "/bus only shows bus routes", %{conn: conn} do
      conn =
        conn
        |> assign(:recently_visited, [
          %Route{id: "1", type: 3},
          %Route{id: "CR-Fitchburg", type: 2}
        ])
        |> get(mode_path(conn, :bus))

      assert conn.assigns.recently_visited == [%Route{id: "1", type: 3}]
    end

    test "/ferry doesn't show recently visited routes", %{conn: conn} do
      conn =
        conn
        |> assign(:recently_visited, [%Route{id: "Boat-F4", type: 4}])
        |> get(mode_path(conn, :ferry))

      assert conn.assigns.recently_visited == []
    end
  end

  test "sets a custom meta description", %{conn: conn} do
    conn = get(conn, mode_path(conn, :bus))
    assert conn.assigns.meta_description
  end

  test "test mode redirect route_id", %{conn: conn} do
    assert conn
           |> get(mode_path(conn, :index, route: "CR-Fitchburg"))
           |> redirected_to() == "/schedules/CR-Fitchburg"
  end

  describe "mTicket detection" do
    test "mTicket matched", %{conn: conn} do
      response =
        conn
        |> put_req_header("user-agent", "Java/1.8.0_91")
        |> get(mode_path(conn, :commuter_rail))
        |> html_response(200)

      assert response =~ "mticket-notice"
      assert response =~ "access schedules:"
      assert response =~ "/schedules/commuter-rail"
    end

    test "mTicket not matched", %{conn: conn} do
      response =
        conn
        |> get(mode_path(conn, :commuter_rail))
        |> html_response(200)

      refute response =~ "mticket-notice"
    end
  end
end
