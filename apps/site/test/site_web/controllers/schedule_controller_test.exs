defmodule SiteWeb.ScheduleControllerTest do
  use SiteWeb.ConnCase

  alias CMS.Partial.Teaser
  alias Plug.Conn
  alias Routes.{Repo, Shape}
  alias Schedules.Sort
  alias Stops.RouteStops

  @moduletag :external
  @test_origin "66"

  describe "Bus" do
    test "all stops is assigned for a route", %{conn: conn} do
      conn = get(conn, trip_view_path(conn, :show, "1"))
      html_response(conn, 200)
      assert conn.assigns.all_stops != nil
    end

    test "origin is unassigned for a route when you first view the page", %{conn: conn} do
      conn = get(conn, trip_view_path(conn, :show, "1"))
      html_response(conn, 200)
      assert conn.assigns.origin == nil
    end

    test "has the origin when it has been selected", %{conn: conn} do
      conn =
        get(
          conn,
          trip_view_path(conn, :show, "1",
            schedule_direction: %{origin: @test_origin, direction_id: "1"}
          )
        )

      html_response(conn, 200)
      assert conn.assigns.origin.id == @test_origin
    end

    test "finds a trip when origin has been selected", %{conn: conn} do
      conn =
        get(
          conn,
          trip_view_path(conn, :show, "1",
            schedule_direction: %{origin: @test_origin, direction_id: "1"}
          )
        )

      html_response(conn, 200)
      assert conn.assigns.origin.id == @test_origin
      assert conn.assigns.trip_info
    end

    test "finds a trip list with origin and destination", %{conn: conn} do
      conn =
        get(
          conn,
          trip_view_path(conn, :show, "1",
            schedule_direction: %{
              origin: @test_origin,
              destination: "82",
              direction_id: "1"
            }
          )
        )

      html_response(conn, 200)
      assert conn.assigns.origin.id == @test_origin
      assert conn.assigns.destination.id == "82"
      assert conn.assigns.trip_info
      assert conn.assigns.schedules != nil
      assert conn.assigns.predictions != nil
    end

    test "assigns tab to \"trip-view\"", %{conn: conn} do
      conn = get(conn, trip_view_path(conn, :show, "1"))
      assert conn.assigns.tab == "trip-view"
    end

    test "uses a direction id to determine which stops to show", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "1", "schedule_direction[direction_id]": 0))

      assert conn.assigns.branches
             |> List.first()
             |> Map.get(:stops)
             |> Enum.map(& &1.id)
             |> Enum.member?("109")

      conn = get(conn, line_path(conn, :show, "1", "schedule_direction[direction_id]": 1))

      refute conn.assigns.branches
             |> List.first()
             |> Map.get(:stops)
             |> Enum.map(& &1.id)
             |> Enum.member?("109")
    end
  end

  describe "commuter rail" do
    test "show timetable if no tab is specified", %{conn: conn} do
      conn = get(conn, schedule_path(conn, :show, "CR-Worcester"))
      assert redirected_to(conn, 302) =~ "timetable"
    end

    test "assigns information for the trip view", %{conn: conn} do
      conn =
        get(
          conn,
          trip_view_path(conn, :show, "CR-Worcester",
            schedule_direction: %{origin: "place-WML-0340"}
          )
        )

      assert conn.assigns.tab == "trip-view"
      refute conn.assigns.schedules == nil
      refute conn.assigns.predictions == nil
      assert conn.assigns.trip_info
    end

    test "assigns information for the timetable", %{conn: conn} do
      conn = get(conn, timetable_path(conn, :show, "CR-Lowell", direction_id: 0))
      assert conn.assigns.tab == "timetable"
      assert conn.assigns.offset
      assert conn.assigns.alerts
      assert conn.assigns.trip_schedules
      assert conn.assigns.trip_messages
    end

    test "assigns trip messages for a few route/directions", %{conn: conn} do
      for {route_id, direction_id, expected_size} <- [
            {"CR-Lowell", 0, 0},
            {"CR-Lowell", 1, 4},
            {"CR-Haverhill", 0, 4},
            {"CR-Haverhill", 1, 4},
            {"CR-Franklin", 0, 5},
            {"CR-Franklin", 1, 0}
          ] do
        path =
          timetable_path(conn, :show, route_id, schedule_direction: %{direction_id: direction_id})

        conn = get(conn, path)
        assert map_size(conn.assigns.trip_messages) == expected_size
      end
    end

    test "header schedules are sorted correctly", %{conn: conn} do
      conn = get(conn, timetable_path(conn, :show, "CR-Lowell"))

      assert conn.assigns.header_schedules ==
               conn.assigns.timetable_schedules
               |> Sort.sort_by_first_times()
               |> Enum.map(&List.first/1)
    end

    test "assigns a map of stop ID to zone", %{conn: conn} do
      conn = get(conn, trip_view_path(conn, :show, "CR-Lowell"))
      zone_map = conn.assigns.zone_map

      assert "place-NHRML-0218" in Map.keys(zone_map)
      assert zone_map["place-NHRML-0218"] == "5"
    end
  end

  describe "subway" do
    test "assigns schedules, frequency table, origin, and destination", %{conn: conn} do
      conn =
        get(
          conn,
          trip_view_path(
            conn,
            :show,
            "Red",
            schedule_direction: %{
              origin: "place-sstat",
              destination: "place-brdwy",
              direction_id: 0
            }
          )
        )

      assert conn.assigns.schedules
      refute conn.assigns.schedules == []
      assert conn.assigns.journeys
      assert conn.assigns.frequency_table
      assert conn.assigns.origin
      assert conn.assigns.destination
    end

    test "assigns schedules, frequency table, and origin", %{conn: conn} do
      conn =
        get(
          conn,
          trip_view_path(conn, :show, "Red", schedule_direction: %{origin: "place-sstat"})
        )

      assert conn.assigns.schedules
      assert conn.assigns.frequency_table
      assert conn.assigns.journeys
      assert conn.assigns.origin
      refute conn.assigns.destination
    end

    test "frequency table not assigned when no origin is selected", %{conn: conn} do
      conn = get(conn, trip_view_path(conn, :show, "Red"))
      refute :frequency_table in Map.keys(conn.assigns)
      refute conn.assigns.origin
      refute :schedules in Map.keys(conn.assigns)
    end

    test "assigns schedules, frequency table, and origin for green line", %{conn: conn} do
      conn = get(conn, trip_view_path(conn, :show, "Green-D", origin: "place-pktrm"))
      assert conn.assigns.schedules
      assert conn.assigns.journeys.journeys
      assert conn.assigns.frequency_table
      assert conn.assigns.origin
      refute conn.assigns.destination
    end

    test "assigns schedules, frequency table, origin, destination for green line", %{conn: conn} do
      conn =
        get(
          conn,
          trip_view_path(
            conn,
            :show,
            "Green-B",
            schedule_direction: %{
              origin: "place-bland",
              destination: "place-pktrm",
              direction_id: "1"
            }
          )
        )

      assert conn.assigns.schedules
      refute conn.assigns.schedules == []
      assert conn.assigns.journeys.journeys
      assert conn.assigns.frequency_table
      assert conn.assigns.origin
      assert conn.assigns.destination
    end

    @tag skip:
           "Commenting out this test temporarily. As of Summer 2020 there is shuttle service on the Mattapan line."
    test "assigns trip info and journeys for mattapan line", %{conn: conn} do
      conn =
        get(
          conn,
          trip_view_path(conn, :show, "Mattapan", origin: "place-butlr", direction_id: "1")
        )

      assert conn.assigns.trip_info
      refute Enum.empty?(conn.assigns.journeys)
    end
  end

  describe "all modes" do
    test "assigns breadcrumbs", %{conn: conn} do
      conn = get(conn, trip_view_path(conn, :show, "1"))
      assert conn.assigns.breadcrumbs
    end

    test "shows a checkmark next to the last stop", %{conn: conn} do
      conn = get(conn, trip_view_path(conn, :show, "Red", origin: "place-pktrm"))
      response = html_response(conn, 200)
      actual = Floki.find(response, ".terminus-circle .fa-check")

      if conn.assigns.trip_info do
        assert [_checkmark] = actual
      else
        assert actual == []
      end
    end
  end

  describe "line tabs" do
    test "renders react content server-side", %{conn: conn} do
      assert [{"div", _, content}] =
               conn
               |> get(line_path(conn, :show, "Red", "schedule_direction[direction_id]": 0))
               |> html_response(200)
               |> Floki.find("#react-root")

      assert [_ | _] = content
    end

    test "Commuter Rail data", %{conn: conn} do
      conn =
        get(conn, line_path(conn, :show, "CR-Needham", "schedule_direction[direction_id]": 1))

      assert html_response(conn, 200) =~ "Needham Line"
      assert [%RouteStops{stops: stops}] = conn.assigns.branches

      # make sure each stop has a zone
      for stop <- stops do
        assert stop.zone
      end

      # stops are in inbound order
      assert List.first(stops).id == "place-NB-0137"
      assert List.last(stops).id == "place-sstat"

      # includes the stop features
      assert List.last(stops).stop_features == [
               :red_line,
               :bus,
               :commuter_rail,
               :access,
               :parking_lot
             ]

      # builds a map
      assert conn.assigns.map_img_src =~ "maps.googleapis.com"

      # assigns 3 holidays
      assert Enum.count(conn.assigns.holidays) == 3
    end

    test "Ferry data", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "Boat-F4", "schedule_direction[direction_id]": 0))
      assert html_response(conn, 200) =~ "Charlestown Ferry"
      assert %Conn{assigns: %{branches: [%RouteStops{stops: stops}]}} = conn

      # inbound order
      assert List.first(stops).id == "Boat-Long-South"
      assert List.last(stops).id == "Boat-Charlestown"

      # Map
      assert conn.assigns.map_img_src =~ "/sites/default/files/maps/2018-08-ferry-map.png"
    end

    test "Bus data", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "86", "schedule_direction[direction_id]": 1))
      assert %Conn{assigns: %{branches: [%RouteStops{stops: stops}]}} = conn
      assert conn.status === 200
      assert List.first(stops).name === "Sullivan Square"
      assert List.last(stops).name === "Reservoir"

      # Map
      assert conn.assigns.map_img_src =~ "maps.googleapis.com"
    end

    test "Red Line data", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "Red", "schedule_direction[direction_id]": 0))
      assert %Conn{assigns: %{branches: branches}} = conn
      assert html_response(conn, 200) =~ "Red Line"

      assert [
               %RouteStops{branch: nil, stops: unbranched_stops},
               %RouteStops{branch: "Alewife - Braintree", stops: braintree},
               %RouteStops{branch: "Alewife - Ashmont", stops: ashmont}
             ] = branches

      # stops are in southbound order
      assert List.first(unbranched_stops).id == "place-alfcl"
      assert List.last(unbranched_stops).id == "place-jfk"

      assert List.last(ashmont).id == "place-asmnl"

      assert List.last(braintree).id == "place-brntn"

      # includes the stop features
      assert unbranched_stops |> List.first() |> Map.get(:stop_features) == [
               :bus,
               :access,
               :parking_lot
             ]

      # spider map
      assert conn.assigns.map_img_src =~ "maps.googleapis.com"
    end

    test "Green Line data", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "Green", "schedule_direction[direction_id]": 0))
      assert html_response(conn, 200) =~ "Green Line"

      # As of June 2020, Lechmere has been closed so the commented lines will make the test fail.
      # We are temporarily adding the fix but this will need to be undone later on.

      # stops are in West order, North Station (prev. Lechmere) -> Boston College (last stop on B)
      {_, first_stop} = List.first(conn.assigns.all_stops)
      {_, last_stop} = List.last(conn.assigns.all_stops)

      # To be uncommented later:
      # assert first_stop.id == "place-lech"
      assert first_stop.id == "place-north"

      assert last_stop.id == "place-lake"

      # includes the stop features
      # assert first_stop.stop_features == [:bus, :access]
      assert first_stop.stop_features == [
               :orange_line,
               :green_line_c,
               :commuter_rail,
               :access,
               :parking_lot
             ]

      # spider map
      assert conn.assigns.map_img_src =~ "maps.googleapis.com"
    end

    defp stop_ids(conn) do
      Enum.flat_map(conn.assigns.branches, fn %RouteStops{stops: stops} ->
        Enum.map(stops, & &1.id)
      end)
    end

    test "Green line shows all branches", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "Green"))
      assert conn.status == 200
      stop_ids = stop_ids(conn)

      assert "place-symcl" in stop_ids
      # Green-B
      assert "place-sougr" in stop_ids
      # Green-C
      assert "place-kntst" in stop_ids
      # Green-D
      assert "place-rsmnl" in stop_ids
      # Green-E
      assert "place-nuniv" in stop_ids
    end

    test "assigns 3 holidays", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "CR-Fitchburg"))

      assert Enum.count(conn.assigns.holidays) == 3
    end

    test "Bus line with variant", %{conn: conn} do
      variant = List.last(Repo.get_shapes("9", direction_id: 1)).id

      conn =
        get(
          conn,
          line_path(conn, :show, "9",
            "schedule_direction[direction_id]": 1,
            "schedule_direction[variant]": variant
          )
        )

      # during the summer, the 9 only has 2 shapes. It has three when school
      # is in session.
      assert Enum.count(conn.assigns.route_shapes) >= 2

      assert %Shape{stop_ids: [_ | _] = stop_ids} =
               Enum.find(conn.assigns.route_shapes, &(&1.id == variant))

      assert variant == conn.assigns.active_shape.id
    end

    test "Bus line with correct default shape", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "9", "schedule_direction[direction_id]": 1))
      default_shape_id = List.first(Repo.get_shapes("9", direction_id: 1)).id
      assert conn.assigns.active_shape.id == default_shape_id
    end
  end

  describe "tab redirects" do
    test "timetable tab", %{conn: conn} do
      conn =
        get(
          conn,
          schedule_path(conn, :show, "CR-Worcester", tab: "timetable", origin: "place-sstat")
        )

      path = redirected_to(conn, 302)
      path =~ timetable_path(conn, :show, "CR-Worcester")
      path =~ "origin=place-sstat"
      refute path =~ "tab="
    end

    test "alerts tab", %{conn: conn} do
      conn =
        get(
          conn,
          schedule_path(conn, :show, "CR-Worcester", tab: "alerts", origin: "place-sstat")
        )

      path = redirected_to(conn, 302)
      path =~ alerts_path(conn, :show, "CR-Worcester")
      path =~ "origin=place-sstat"
      refute path =~ "tab="
    end

    test "trip_view tab", %{conn: conn} do
      conn =
        get(
          conn,
          schedule_path(conn, :show, "1", tab: "trip-view", origin: "64", destination: "6")
        )

      path = redirected_to(conn, 302)
      path =~ trip_view_path(conn, :show, "1")
      path =~ "origin=64"
      path =~ "destination=6"
    end

    test "line tab as default", %{conn: conn} do
      conn = get(conn, schedule_path(conn, :show, "1"))
      assert redirected_to(conn, 302) == line_path(conn, :show, "1")
    end

    test "line tab", %{conn: conn} do
      conn = get(conn, schedule_path(conn, :show, "Red", tab: "line"))
      assert redirected_to(conn, 302) == line_path(conn, :show, "Red")
    end
  end

  test "assigns CMS content for line page", %{conn: conn} do
    conn = get(conn, line_path(conn, :show, "Red"))
    assert conn.status == 200
    assert [%Teaser{} = teaser] = conn.assigns.featured_content
    refute teaser.type == :news_entry
    assert [%Teaser{} | _] = conn.assigns.news
    assert Enum.all?(conn.assigns.news, &(&1.type === :news_entry))
  end

  test "assigns route_patterns and shape map", %{conn: conn} do
    conn = get(conn, line_path(conn, :show, "742"))
    assert conn.status == 200

    route_patterns = conn.assigns.route_patterns
    shape_map = conn.assigns.shape_map

    first_route_pattern_0 = List.first(route_patterns["0"])
    first_route_pattern_1 = List.first(route_patterns["1"])
    shape = shape_map[first_route_pattern_0.shape_id]

    assert first_route_pattern_0.direction_id == 0
    assert first_route_pattern_1.direction_id == 1
    assert shape.id == first_route_pattern_0.shape_id
  end
end
