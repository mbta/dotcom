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

    test "adds route to cookie if user visits a schedule page", %{conn: conn} do
      Mox.stub(Routes.Repo.Mock, :get, fn _ -> nil end)

      with_cookie = get(conn, "/schedules/Red/line")
      assert Map.get(with_cookie.cookies, route_cookie_name()) == "Red"

      with_cookie = get(conn, "/schedules/CR-Lowell/timetable")
      assert Map.get(with_cookie.cookies, route_cookie_name()) == "CR-Lowell"
    end

    test "sets green line branch cookies correctly", %{conn: conn} do
      Mox.stub(Routes.Repo.Mock, :get, fn _ -> nil end)

      with_cookie = get(conn, "/schedules/Green-B/line")
      assert Map.get(with_cookie.cookies, route_cookie_name()) == "Green-B"
    end

    test "appends new route to cookie if user visits another schedule page", %{conn: conn} do
      Mox.stub(Routes.Repo.Mock, :get, fn _ -> nil end)

      conn =
        conn
        |> get("/schedules/Red/line")
        |> get("/schedules/Orange/line")

      assert conn.cookies
             |> Map.get(route_cookie_name())
             |> URI.decode() == "Orange|Red"
    end

    test "route cookie is sorted by most recently visited", %{conn: conn} do
      Mox.stub(Routes.Repo.Mock, :get, fn _ -> nil end)

      conn =
        conn
        |> get("/schedules/Red/line")
        |> get("/schedules/Blue/line")
        |> get("/schedules/Orange/line")
        |> get("/schedules/Red/line")
        |> get("/schedules/Blue/line")

      assert conn.cookies
             |> Map.get(route_cookie_name())
             |> URI.decode() == "Blue|Red|Orange"
    end

    test "only saves 4 most recent cookies", %{conn: conn} do
      Mox.stub(Routes.Repo.Mock, :get, fn _ -> nil end)

      conn =
        conn
        |> get("/schedules/Red/line")
        |> get("/schedules/Blue/line")
        |> get("/schedules/Orange/line")
        |> get("/schedules/CR-Lowell/timetable")
        |> get("/schedules/1/line")
        |> get("/schedules/Boat-F4/timetable")

      assert conn.cookies
             |> Map.get(route_cookie_name())
             |> URI.decode() == "Boat-F4|1|CR-Lowell|Orange"
    end

    test "route cookie is not set when user visits a non-schedule page", %{conn: conn} do
      Mox.stub(MBTA.Api.Mock, :get_json, fn _, _ -> {:error, nil} end)
      Mox.stub(Routes.Repo.Mock, :get, fn _ -> nil end)
      Mox.stub(Routes.Repo.Mock, :by_type, fn _ -> [] end)

      assert conn
             |> get("/schedules/bus")
             |> Map.get(:cookies)
             |> Map.get(route_cookie_name()) == nil

      assert conn
             |> get("/fares")
             |> Map.get(:cookies)
             |> Map.get(route_cookie_name()) == nil

      assert conn
             |> get("/schedules/map_api")
             |> Map.get(:cookies)
             |> Map.get(route_cookie_name()) == nil
    end
  end
end
