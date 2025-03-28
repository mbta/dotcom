defmodule DotcomWeb.Plugs.CookiesTest do
  use DotcomWeb.ConnCase

  import DotcomWeb.Plugs.Cookies

  describe "call/2" do
    test "creates a mbta_id cookie", %{conn: conn} do
      conn = %{conn | cookies: %{}}
      conn = call(conn, [])

      assert Map.has_key?(conn.cookies, id_cookie_name())
    end

    test "does not create a new mbta_id cookie if it exists", %{conn: conn} do
      conn = %{conn | cookies: %{id_cookie_name() => "123"}}
      conn = call(conn, [])

      assert Map.has_key?(conn.cookies, id_cookie_name())
      assert conn.cookies[id_cookie_name()] == "123"
    end

    @tag :external
    test "adds route to cookie if user visits a schedule page", %{conn: conn} do
      # needed by DotcomWeb.ScheduleController.VehicleLocations plug
      _ = start_supervised({Phoenix.PubSub, name: Vehicles.PubSub})
      _ = start_supervised(Vehicles.Repo)
      with_cookie = get(conn, schedule_path(conn, :show, %Routes.Route{id: "Red"}))
      assert Map.get(with_cookie.cookies, route_cookie_name()) == "Red"

      timetable_path =
        conn
        |> schedule_path(:show, %Routes.Route{id: "CR-Lowell"})
        |> Path.join("timetable")

      assert timetable_path == "/schedules/CR-Lowell/timetable"

      with_cookie = get(conn, timetable_path)
      assert Map.get(with_cookie.cookies, route_cookie_name()) == "CR-Lowell"
    end

    @tag :external
    test "sets green line branch cookies correctly", %{conn: conn} do
      green_b_path = schedule_path(conn, :show, "Green-B")
      assert green_b_path == "/schedules/Green-B"
      with_cookie = get(conn, green_b_path)
      assert Map.get(with_cookie.cookies, route_cookie_name()) == "Green-B"
    end

    @tag :external
    test "appends new route to cookie if user visits another schedule page", %{conn: conn} do
      conn =
        conn
        |> get(schedule_path(conn, :show, %Routes.Route{id: "Red"}))
        |> get(schedule_path(conn, :show, %Routes.Route{id: "Orange"}))

      assert conn.cookies
             |> Map.get(route_cookie_name())
             |> URI.decode() == "Orange|Red"
    end

    @tag :external
    test "route cookie is sorted by most recently visited", %{conn: conn} do
      conn =
        conn
        |> get(schedule_path(conn, :show, %Routes.Route{id: "Red"}))
        |> get(schedule_path(conn, :show, %Routes.Route{id: "Blue"}))
        |> get(schedule_path(conn, :show, %Routes.Route{id: "Orange"}))
        |> get(schedule_path(conn, :show, %Routes.Route{id: "Red"}))
        |> get(schedule_path(conn, :show, %Routes.Route{id: "Blue"}))

      assert conn.cookies
             |> Map.get(route_cookie_name())
             |> URI.decode() == "Blue|Red|Orange"
    end

    @tag :external
    test "only saves 4 most recent cookies", %{conn: conn} do
      conn =
        conn
        |> get(schedule_path(conn, :show, %Routes.Route{id: "Red"}))
        |> get(schedule_path(conn, :show, %Routes.Route{id: "Blue"}))
        |> get(schedule_path(conn, :show, %Routes.Route{id: "Orange"}))
        |> get(schedule_path(conn, :show, %Routes.Route{id: "CR-Lowell"}))
        |> get(schedule_path(conn, :show, %Routes.Route{id: "1"}))
        |> get(schedule_path(conn, :show, %Routes.Route{id: "Boat-F4"}))

      assert conn.cookies
             |> Map.get(route_cookie_name())
             |> URI.decode() == "Boat-F4|1|CR-Lowell|Orange"
    end

    @tag :external
    test "route cookie is not set when user visits a non-schedule page", %{conn: conn} do
      assert conn
             |> get(schedule_path(conn, :show, "bus"))
             |> Map.get(:cookies)
             |> Map.get(route_cookie_name()) == nil

      assert conn
             |> get("/")
             |> Map.get(:cookies)
             |> Map.get(route_cookie_name()) == nil
    end
  end
end
