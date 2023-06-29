defmodule SiteWeb.RouteControllerTest do
  use SiteWeb.ConnCase, async: false
  import Mock
  alias RoutePatterns.RoutePattern
  alias Routes.Route

  setup_with_mocks([
    {Routes.Repo, [:passthrough],
     [
       by_stop: fn _ ->
         [
           %Route{id: "route", color: "ADFF2F"},
           %Route{id: "subway_route", color: "ADFF2F", type: 0},
           %Route{id: "746", name: "SL route", color: "ADFF2F", type: 3}
         ]
       end,
       by_stop: fn _, _ ->
         [
           %Route{fare_class: :ferry_fare},
           %Route{fare_class: :local_bus_fare}
         ]
       end
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
    test "returns routes with polyline data and fares", %{conn: conn} do
      conn = get(conn, route_path(conn, :get_by_stop_id, "stop_id"))
      %{"routes" => routes_response, "fares" => fares_response} = json_response(conn, 200)

      assert [
               %{"id" => "route", "color" => "ADFF2F", "polylines" => polylines},
               %{"id" => "subway_route", "color" => "ADFF2F", "polylines" => subway_polylines},
               %{"id" => "746", "color" => "ADFF2F", "polylines" => sl_polylines}
             ] = routes_response

      assert [
               %{
                 "color" => "#ADFF2F",
                 "positions" => _,
                 "weight" => _
               }
               | _
             ] = polylines

      assert Enum.count(subway_polylines) > 0
      assert Enum.count(sl_polylines) > 0

      assert fares_response == [
               ["Local bus one-way", "$1.70"],
               ["Ferry one-way", "$2.40 – $9.75"]
             ]
    end
  end
end
