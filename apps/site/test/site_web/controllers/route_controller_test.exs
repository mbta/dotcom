defmodule SiteWeb.RouteControllerTest do
  use SiteWeb.ConnCase, async: false
  import Mock
  alias Routes.{Route, Shape}
  alias RoutePatterns.RoutePattern

  setup_with_mocks([
    {Routes.Repo, [:passthrough],
     [
       by_stop: fn _ -> [%Route{id: "route", color: "ADFF2F"}] end
     ]},
    {RoutePatterns.Repo, [],
     [
       by_route_id: fn _, _ ->
         [
           %RoutePattern{shape_id: "1", representative_trip_polyline: "safsadfasds"},
           %RoutePattern{shape_id: "2", representative_trip_polyline: "werwqetrewq"}
         ]
       end
     ]},
    {Polyline, [], [decode: fn _ -> [{1, 2}, {3, 4}, {5, 6}] end]}
  ]) do
    :ok
  end

  describe "get_by_stop_id/2" do
    test "returns routes with polyline data", %{conn: conn} do
      conn = get(conn, route_path(conn, :get_by_stop_id, "stop_id"))
      response = json_response(conn, 200)
      assert [[route, polylines]] = response
      assert %{"id" => "route", "color" => "ADFF2F"} = route

      assert [
               %{
                 "color" => "#ADFF2F",
                 "positions" => _,
                 "weight" => _
               }
               | _
             ] = polylines
    end
  end
end
