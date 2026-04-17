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
               "/departures/?route_id=#{route_id}&direction_id=#{direction_id}&stop_id=#{stop_id}"

      assert conn.halted
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
