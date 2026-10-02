defmodule DotcomWeb.StopControllerTest do
  use DotcomWeb.ConnCase, async: true

  import Mox

  alias Stops.Stop

  setup :verify_on_exit!

  test "redirects to subway stops on index", %{conn: conn} do
    conn = conn |> get(stop_path(conn, :index))
    assert redirected_to(conn) == subway_stops_path(conn, :list)
  end

  @tag :external
  test "shows stations by mode", %{conn: conn} do
    conn =
      conn
      |> get(subway_stops_path(conn, :list))

    response = html_response(conn, 200)

    for line <- ["Green", "Red", "Blue", "Orange", "Mattapan"] do
      assert response =~ line
    end
  end

  @tag :external
  test "assigns stop_info for each mode", %{conn: conn} do
    for mode <- [:subway, :ferry, "commuter-rail"] do
      conn = conn |> get("/stops/#{mode}")
      assert conn.assigns.stop_info
    end
  end

  describe "endpoints" do
    @tag :flaky
    test "grouped_route_patterns returns stop's route patterns by route & headsign", %{
      conn: conn
    } do
      MBTA.Api.Mock
      |> expect(:get_json, fn "/schedules/", opts ->
        assert opts[:stop] == "place-here"

        %JsonApi{
          data: [
            %JsonApi.Item{
              attributes: %{},
              relationships: %{}
            }
          ]
        }
      end)
      |> expect(:get_json, fn "/services/", _ ->
        %JsonApi{
          data: [
            %JsonApi.Item{
              id: "",
              attributes: %{
                "schedule_type" => "Weekday",
                "valid_days" => [1, 2, 3, 4, 5, 6, 7]
              },
              relationships: %{},
              type: "service"
            }
          ]
        }
      end)

      expect(Stops.Repo.Mock, :get, fn stop_id ->
        assert stop_id == "place-here"
        %Stop{}
      end)

      expect(RoutePatterns.Repo.Mock, :by_stop_id, fn stop_id ->
        assert stop_id == "place-here"

        [
          %RoutePatterns.RoutePattern{
            route_id: "Purple-A",
            headsign: "Tree Hill",
            name: "Here Square - Tree Hill",
            direction_id: 0
          }
        ]
      end)

      response =
        get(conn, stop_path(conn, :grouped_route_patterns, "place-here")) |> json_response(200)

      assert %{
               "Purple-A" => %{
                 "Tree Hill" => %{
                   "direction_id" => 0,
                   "route_patterns" => [
                     %{
                       "headsign" => "Tree Hill",
                       "name" => "Here Square - Tree Hill"
                     }
                     | _
                   ]
                 }
               }
             } = response
    end
  end
end
