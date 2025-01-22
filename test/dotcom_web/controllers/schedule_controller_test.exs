defmodule DotcomWeb.ScheduleControllerTest do
  use DotcomWeb.ConnCase, async: false

  import Mock

  alias CMS.Partial.Teaser
  alias DotcomWeb.ScheduleController
  alias Plug.Conn
  alias RoutePatterns.RoutePattern
  alias Schedules.Sort
  alias Stops.RouteStops

  @moduletag :external

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  setup_all do
    # needed by DotcomWeb.ScheduleController.VehicleLocations plug
    _ = start_supervised({Phoenix.PubSub, name: Vehicles.PubSub})
    _ = start_supervised(Vehicles.Repo)
    # Start parent supervisor
    _ = start_supervised({Dotcom.GreenLine.Supervisor, []})
    :ok
  end

  describe "Bus" do
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

    test "assigns information for the timetable", %{conn: conn} do
      conn = get(conn, timetable_path(conn, :show, "CR-Franklin", direction_id: 0))
      assert conn.assigns.tab == "timetable"
      assert conn.assigns.offset
      assert conn.assigns.alerts
      assert conn.assigns.trip_schedules
      assert conn.assigns.trip_messages
    end

    test "assigns trip messages for a few route/directions", %{conn: conn} do
      franklin_0_path =
        timetable_path(conn, :show, "CR-Franklin", schedule_direction: %{direction_id: 0})

      franklin_1_path =
        timetable_path(conn, :show, "CR-Franklin", schedule_direction: %{direction_id: 1})

      franklin_0_conn = get(conn, franklin_0_path)
      franklin_1_conn = get(conn, franklin_1_path)

      assert map_size(franklin_0_conn.assigns.trip_messages) !=
               map_size(franklin_1_conn.assigns.trip_messages)
    end

    test "header schedules are sorted correctly", %{conn: conn} do
      conn = get(conn, timetable_path(conn, :show, "CR-Lowell"))

      assert conn.assigns.header_schedules ==
               conn.assigns.timetable_schedules
               |> Sort.sort_by_first_times()
               |> Enum.map(&List.first/1)
    end
  end

  describe "line tabs" do
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
               :silver_line,
               :bus,
               :commuter_rail,
               :access,
               :parking_lot
             ]

      # assigns holidays
      assert conn.assigns.holidays
    end

    test "Ferry data", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "Boat-F4", "schedule_direction[direction_id]": 0))
      assert html_response(conn, 200) =~ "Charlestown Ferry"
      assert %Conn{assigns: %{branches: [%RouteStops{stops: stops}]}} = conn

      # inbound order
      assert List.first(stops).id == "Boat-Long-South"
      assert List.last(stops).id == "Boat-Charlestown"

      # Map
      assert is_binary(conn.assigns.map_img_src)
    end

    test "Bus data", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "86", "schedule_direction[direction_id]": 1))
      assert %Conn{assigns: %{branches: [%RouteStops{stops: stops}]}} = conn
      assert conn.status === 200
      assert List.first(stops).name === "Sullivan Square"
      assert List.last(stops).name === "Reservoir"
    end

    test "Red Line data", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "Red", "schedule_direction[direction_id]": 0))
      assert %Conn{assigns: %{branches: branches}} = conn
      assert html_response(conn, 200) =~ "Red Line"

      assert [
               %RouteStops{branch: nil, stops: unbranched_stops},
               %RouteStops{branch: "Alewife - Ashmont", stops: ashmont},
               %RouteStops{branch: "Alewife - Braintree", stops: braintree}
             ] = Enum.sort_by(branches, & &1.branch)

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
    end

    test "Green Line data", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "Green", "schedule_direction[direction_id]": 0))
      assert html_response(conn, 200) =~ "Green Line"

      assert [
               %RouteStops{branch: "Green-E", stops: e_stops},
               %RouteStops{branch: "Green-D", stops: _d_stops},
               %RouteStops{branch: "Green-C", stops: _c_stops},
               %RouteStops{branch: "Green-B", stops: b_stops}
             ] = conn.assigns.branches

      # stops are in West order, Medford/Tufts -> Boston College (last stop on B)
      first_stop = List.first(e_stops)
      last_stop = List.last(b_stops)

      assert first_stop.id == "place-mdftf"

      assert last_stop.id == "place-lake"

      # includes the stop features
      assert first_stop.stop_features == [:bus, :access]
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

    test "assigns holidays", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "CR-Fitchburg"))

      assert conn.assigns.holidays
    end

    @tag :skip
    test "Bus line with variant", %{conn: conn} do
      direction = 1
      variant = List.last(@routes_repo.get_shapes("36", direction_id: direction)).id

      conn =
        get(
          conn,
          line_path(conn, :show, "36",
            "schedule_direction[direction_id]": direction,
            "schedule_direction[variant]": variant
          )
        )

      assert %RoutePattern{stop_ids: [_ | _] = _stop_ids} =
               Enum.find(
                 conn.assigns.route_patterns[Integer.to_string(direction)],
                 &(&1.shape_id == variant)
               )
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

    first_route_pattern_0 = List.first(route_patterns["0"])
    first_route_pattern_1 = List.first(route_patterns["1"])

    assert first_route_pattern_0.direction_id == 0
    assert first_route_pattern_1.direction_id == 1
  end

  describe "schedules_for_stop/2" do
    setup %{conn: conn} do
      conn = assign(conn, :date, ~D[2219-05-18])
      {:ok, conn: conn}
    end

    test "should return an array of schedules", %{conn: conn} do
      with_mock(Schedules.Repo, [:passthrough],
        schedules_for_stop: fn
          "TEST 1234", _ ->
            [
              %Schedules.Schedule{
                route: %Routes.Route{id: "route"},
                stop: %Stops.Stop{id: "TEST 1234"},
                departure_time: ~U[2219-05-18 22:25:06.098765Z]
              }
            ]
        end
      ) do
        conn = ScheduleController.schedules_for_stop(conn, %{"stop_id" => "TEST 1234"})
        body = json_response(conn, 200)
        assert Kernel.length(body) == 1
        assert %{"departure_time" => "2219-05-18T22:25:06.098765Z"} = Enum.at(body, 0)
      end
    end

    test "should not return past schedules", %{conn: conn} do
      with_mock(Schedules.Repo, [:passthrough],
        schedules_for_stop: fn
          "TEST 1234", _ ->
            [
              %Schedules.Schedule{
                route: %Routes.Route{id: "route"},
                stop: %Stops.Stop{id: "TEST 1234"},
                time: ~U[2019-05-18 21:25:06.098765Z]
              },
              %Schedules.Schedule{
                route: %Routes.Route{id: "route"},
                stop: %Stops.Stop{id: "TEST 1234"},
                time: ~U[2219-05-18 22:25:06.098765Z]
              },
              %Schedules.Schedule{
                route: %Routes.Route{id: "route"},
                stop: %Stops.Stop{id: "TEST 1234"},
                time: ~U[2219-05-18 23:25:06.098765Z]
              }
            ]
        end
      ) do
        conn =
          ScheduleController.schedules_for_stop(conn, %{
            "stop_id" => "TEST 1234",
            "future_departures" => "true"
          })

        body = json_response(conn, 200)
        assert Kernel.length(body) == 2
        assert %{"time" => "2219-05-18T22:25:06.098765Z"} = Enum.at(body, 0)
      end
    end

    test "should not return schedules that are the last stop on its route", %{conn: conn} do
      with_mock(Schedules.Repo, [:passthrough],
        schedules_for_stop: fn
          "TEST 1234", _ ->
            [
              %Schedules.Schedule{
                route: %Routes.Route{id: "route"},
                stop: %Stops.Stop{id: "TEST 1234"},
                time: ~U[2219-05-18 22:25:06.098765Z],
                last_stop?: false
              },
              %Schedules.Schedule{
                route: %Routes.Route{id: "route"},
                stop: %Stops.Stop{id: "TEST 1234"},
                time: ~U[2219-05-18 22:25:06.098765Z],
                last_stop?: false
              },
              %Schedules.Schedule{
                route: %Routes.Route{id: "route"},
                stop: %Stops.Stop{id: "TEST 1234"},
                time: ~U[2219-05-18 22:25:06.098765Z],
                last_stop?: true
              }
            ]
        end
      ) do
        conn =
          ScheduleController.schedules_for_stop(conn, %{
            "stop_id" => "TEST 1234",
            "future_departures" => "true",
            "last_stop_departures" => "false"
          })

        body = json_response(conn, 200)
        assert Kernel.length(body) == 2
      end
    end

    test "should report errors", %{conn: conn} do
      with_mock(Schedules.Repo, [:passthrough], schedules_for_stop: fn "TEST 1234", _ -> {:error, :not_found} end) do
        log =
          ExUnit.CaptureLog.capture_log(fn ->
            conn = ScheduleController.schedules_for_stop(conn, %{"stop_id" => "TEST 1234"})

            assert %{
                     "error" => "Internal error"
                   } = json_response(conn, 500)
          end)

        assert log =~ "[error] module=Elixir.DotcomWeb.ScheduleController"
        assert log =~ "fun=schedules_for_stop stop=TEST 1234"
        assert log =~ "error=:not_found"
      end
    end

    test "logs when no schedules returned", %{conn: conn} do
      with_mock(Schedules.Repo, [:passthrough],
        schedules_for_stop: fn "TEST 1234", _ ->
          # will get filtered out
          [
            %Schedules.Schedule{
              route: %Routes.Route{id: "route"},
              stop: %Stops.Stop{id: "TEST 1234"},
              time: ~U[2019-05-18 22:25:06.098765Z],
              last_stop?: true
            }
          ]
        end
      ) do
        log =
          ExUnit.CaptureLog.capture_log(fn ->
            old_level = Logger.level()

            on_exit(fn ->
              Logger.configure(level: old_level)
            end)

            Logger.configure(level: :info)

            conn =
              ScheduleController.schedules_for_stop(conn, %{
                "stop_id" => "TEST 1234",
                "future_departures" => "true",
                "last_stop_departures" => "false"
              })

            assert [] = json_response(conn, 200)
          end)

        assert log =~ "[info] module=Elixir.DotcomWeb.ScheduleController"
        assert log =~ "fun=schedules_for_stop stop=TEST 1234"
        assert log =~ "data_length=1"
        assert log =~ "no_schedules_returned"
      end
    end
  end
end
