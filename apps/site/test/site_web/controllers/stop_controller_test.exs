defmodule SiteWeb.StopControllerTest do
  use SiteWeb.ConnCase, async: false
  alias Routes.Route
  alias SiteWeb.StopController
  alias Stops.Stop
  alias Util.Breadcrumb
  import Mock

  test "redirects to subway stops on index", %{conn: conn} do
    conn = conn |> get(stop_path(conn, :index))
    assert redirected_to(conn) == stop_path(conn, :show, :subway)
  end

  test "shows stations by mode", %{conn: conn} do
    conn =
      conn
      |> get(stop_path(conn, :show, :subway))

    response = html_response(conn, 200)

    for line <- ["Green", "Red", "Blue", "Orange", "Mattapan"] do
      assert response =~ line
    end
  end

  test "assigns stop_info for each mode", %{conn: conn} do
    for mode <- [:subway, :ferry, "commuter-rail"] do
      conn =
        conn
        |> get(stop_path(conn, :show, mode))

      assert conn.assigns.stop_info
    end
  end

  test "redirects stations with slashes to the right URL", %{conn: conn} do
    conn =
      conn
      |> get("/stops/Four%20Corners%20/%20Geneva")

    assert redirected_to(conn) == stop_path(conn, :show, "Four Corners / Geneva")
  end

  test "shows a stop ID", %{conn: conn} do
    conn = conn |> get(stop_path(conn, :show, "place-sstat"))

    assert conn.assigns.stop_id
  end

  test "sets a custom meta description for stops", %{conn: conn} do
    conn =
      conn
      |> get(stop_path(conn, :show, "place-sstat"))

    assert conn.assigns.meta_description
  end

  test "redirects to a parent stop page for a child stop", %{conn: conn} do
    conn =
      conn
      |> get(stop_path(conn, :show, 70_130))

    assert redirected_to(conn) == stop_path(conn, :show, "place-harvd")
  end

  test "404s for an unknown stop", %{conn: conn} do
    conn =
      conn
      |> get(stop_path(conn, :show, "unknown"))

    assert Map.fetch!(conn, :status) == 404
  end

  describe "breadcrumbs/2" do
    test "returns station breadcrumbs if the stop is served by more than buses" do
      stop = %Stop{name: "Name", station?: true}
      routes = [%Route{id: "CR-Lowell", type: 2}]

      assert StopController.breadcrumbs(stop, routes) == [
               %Breadcrumb{text: "Stations", url: "/stops/commuter-rail"},
               %Breadcrumb{text: "Name", url: ""}
             ]
    end

    test "returns simple breadcrumb if the stop is served by only buses" do
      stop = %Stop{name: "Dudley Station"}
      routes = [%Route{id: "28", type: 3}]

      assert StopController.breadcrumbs(stop, routes) == [
               %Breadcrumb{text: "Dudley Station", url: ""}
             ]
    end

    test "returns simple breadcrumb if we have no route info for the stop" do
      stop = %Stop{name: "Name", station?: true}
      assert StopController.breadcrumbs(stop, []) == [%Breadcrumb{text: "Name", url: ""}]
    end
  end

  describe "api" do
    test "returns json with departure data", %{conn: conn} do
      path = stop_path(conn, :api, id: "place-sstat")
      assert path == "/stops/api?id=place-sstat"

      response =
        conn
        |> get(path)
        |> json_response(200)

      assert is_list(response)
      refute Enum.empty?(response)

      for item <- response do
        assert %{"group_name" => _, "routes" => _} = item
      end
    end
  end

  describe "show/2" do
    test "should set the title and meta description of the page", %{conn: conn} do
      conn =
        conn
        |> get(stop_path(conn, :show, "place-wondl"))

      [_stations, station_name] = conn.assigns.breadcrumbs

      assert "Wonderland" = station_name.text

      assert "Station serving MBTA Subway and Bus lines at 1300 North Shore Rd, Revere, MA 02151." =
               conn.assigns.meta_description
    end
  end

  describe "endpoints" do
    test "grouped_route_patterns returns stop's route patterns by route & headsign", %{
      conn: conn
    } do
      with_mock(RoutePatterns.Repo,
        by_stop_id: fn "place-here" ->
          [
            %RoutePatterns.RoutePattern{
              route_id: "Purple-A",
              headsign: "Tree Hill",
              name: "Here Square - Tree Hill"
            }
          ]
        end
      ) do
        response =
          get(conn, stop_path(conn, :grouped_route_patterns, "place-here")) |> json_response(200)

        assert %{
                 "Purple-A" => %{
                   "Tree Hill" => [
                     %{
                       "headsign" => "Tree Hill",
                       "name" => "Here Square - Tree Hill"
                     }
                     | _
                   ]
                 }
               } = response
      end
    end
  end
end
