defmodule DotcomWeb.RouteControllerTest do
  use DotcomWeb.ConnCase, async: false

  import Mock

  alias Routes.Repo
  alias Routes.Route

  describe "get_by_route_ids/2" do
    test "returns routes", %{conn: conn} do
      with_mock Repo, get: fn id -> %Route{id: id} end do
        conn = get(conn, route_path(conn, :get_by_route_ids, "route_id1,route_id2"))
        response = json_response(conn, 200)

        assert [
                 %{"id" => "route_id1"},
                 %{"id" => "route_id2"}
               ] = response
      end
    end
  end
end
