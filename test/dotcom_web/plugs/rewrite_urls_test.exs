defmodule DotcomWeb.Plugs.RewriteUrlsTest do
  @moduledoc false
  use DotcomWeb.ConnCase, async: true
  import DotcomWeb.Plugs.RewriteUrls

  describe "call/2" do
    test "redirects if we're going to /schedules/Boat-F3", %{conn: conn} do
      conn = %{conn | path_info: ["schedules", "Boat-F3"], request_path: "/schedules/Boat-F3"}
      conn = call(conn, [])
      assert redirected_to(conn, 302) == "/schedules/Boat-F1"
      assert conn.halted
    end

    test "redirects if we're going to the old schedule finder", %{conn: conn} do
      route_id = Faker.Pokemon.name()
      direction_id = Faker.Util.pick(["0", "1"])
      stop_id = Faker.Pokemon.name()

      conn = %{
        conn
        | params: %{
            "route" => route_id,
            "schedule_finder" => %{"direction_id" => direction_id, "origin" => stop_id}
          },
          path_info: ["schedules", "red", "line"]
      }

      conn = call(conn, [])

      assert redirected_to(conn, 302) ==
               "/departures?route_id=#{route_id}&direction_id=#{direction_id}&stop_id=#{stop_id}"

      assert conn.halted
    end

    for route_id <- ["Red", "Green"] do
      test "redirects #{route_id} schedule finder URLs using schedule_direction", %{conn: conn} do
        route_id = unquote(route_id)

        params = %{
          "schedule_direction" => %{"direction_id" => "0"},
          "schedule_finder" => %{"origin" => "place-sstat"}
        }

        params = if route_id == "Green", do: params, else: Map.put(params, "route", route_id)

        conn =
          call(
            %{conn | params: params, path_info: ["schedules", route_id, "line"]},
            []
          )

        assert redirected_to(conn, 302) ==
                 "/departures?route_id=#{route_id}&direction_id=0&stop_id=place-sstat"

        assert conn.halted
      end
    end

    test "prefers the schedule finder direction when both directions are present", %{conn: conn} do
      conn =
        call(
          %{
            conn
            | params: %{
                "route" => "Red",
                "schedule_direction" => %{"direction_id" => "1"},
                "schedule_finder" => %{"direction_id" => "0", "origin" => "place-sstat"}
              },
              path_info: ["schedules", "Red", "line"]
          },
          []
        )

      assert redirected_to(conn, 302) ==
               "/departures?route_id=Red&direction_id=0&stop_id=place-sstat"

      assert conn.halted
    end

    test "does not redirect a schedule direction without an origin", %{conn: conn} do
      conn =
        call(
          %{
            conn
            | params: %{
                "route" => "Red",
                "schedule_direction" => %{"direction_id" => "0"}
              },
              path_info: ["schedules", "Red", "line"]
          },
          []
        )

      refute conn.state == :set
      refute conn.halted
    end

    test "includes a query string if present", %{conn: conn} do
      conn = %{
        conn
        | path_info: ["schedules", "Boat-F3", "schedules"],
          request_path: "/schedules/Boat-F3/schedules",
          query_string: "query=string"
      }

      conn = call(conn, [])
      assert redirected_to(conn, 302) == "/schedules/Boat-F1/schedules?query=string"
      assert conn.halted
    end

    test "ignores other URLs", %{conn: conn} do
      conn = call(conn, [])
      refute conn.state == :set
      refute conn.halted
    end
  end
end
