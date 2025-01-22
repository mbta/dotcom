defmodule DotcomWeb.ScheduleController.TimetableControllerTest do
  @moduledoc false
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.ScheduleController.TimetableController
  import Mox

  alias Dotcom.TimetableBlocking
  alias Routes.Route
  alias Schedules.Schedule
  alias Schedules.Trip
  alias Stops.Stop

  @stops [
    %Stop{id: "1"},
    %Stop{id: "2"},
    %Stop{id: "3"}
  ]
  @schedules [
    %Schedule{
      stop_sequence: 1,
      time: DateTime.from_unix!(500),
      stop: %Stop{id: "1", name: "name1"},
      trip: %Trip{id: "trip-1", name: "123"},
      platform_stop_id: "stop-1-platform-1"
    },
    %Schedule{
      stop_sequence: 2,
      time: DateTime.from_unix!(600),
      stop: %Stop{id: "2", name: "name2"},
      trip: %Trip{id: "trip-1", name: "123"},
      platform_stop_id: "stop-2-platform-1"
    },
    %Schedule{
      stop_sequence: 2,
      time: DateTime.from_unix!(5000),
      stop: %Stop{id: "2", name: "name2"},
      trip: %Trip{id: "trip-2", name: "456"},
      platform_stop_id: "stop-2-platform-1"
    },
    %Schedule{
      stop_sequence: 3,
      time: DateTime.from_unix!(6000),
      stop: %Stop{id: "5", name: "name5"},
      trip: %Trip{id: "trip-2", name: "456"},
      platform_stop_id: "stop-5-platform-1"
    },
    %Schedule{
      stop_sequence: 3,
      time: DateTime.from_unix!(50_000),
      stop: %Stop{id: "3", name: "name3"},
      trip: %Trip{id: "trip-3", name: "789"},
      platform_stop_id: "stop-3-platform-1"
    }
  ]

  @odd_schedules [
    %Schedule{
      stop_sequence: 4,
      time: DateTime.from_unix!(50_000),
      stop: nil,
      trip: %Trip{id: "trip-4", headsign: "shuttle", name: "789"}
    },
    %Schedule{
      stop_sequence: 5,
      time: DateTime.from_unix!(50_000),
      route: %Route{description: :rail_replacement_bus},
      stop: %Stop{id: "5", name: "name3"},
      trip: %Trip{id: "trip-5", headsign: "shuttle", name: "789"}
    }
  ]
  @vehicle_schedules %{
    "name1-trip-1" => %{
      stop_name: "name1",
      stop_sequence: 1,
      trip_id: "trip-1"
    },
    "name2-trip-2" => %{
      stop_name: "name2",
      stop_sequence: 2,
      trip_id: "trip-2"
    },
    "name3-trip-3" => %{
      stop_name: "name3",
      stop_sequence: 3,
      trip_id: "trip-3"
    },
    "name3-trip-5" => %{stop_name: "name3", stop_sequence: 5, trip_id: "trip-5"},
    "shuttle-trip-4" => %{stop_name: "shuttle", stop_sequence: 4, trip_id: "trip-4"},
    "name2-trip-1" => %{stop_name: "name2", stop_sequence: 2, trip_id: "trip-1"},
    "name5-trip-2" => %{stop_name: "name5", stop_sequence: 3, trip_id: "trip-2"}
  }
  @route %Route{id: "route1", type: 1}
  @route_patterns [
    %RoutePatterns.RoutePattern{representative_trip_id: "trip-1"},
    %RoutePatterns.RoutePattern{representative_trip_id: "trip-2"}
  ]

  setup :verify_on_exit!

  setup do
    conn =
      default_conn()
      |> assign(:route, @route)
      |> assign(:direction_id, 1)

    stub(RoutePatterns.Repo.Mock, :by_route_id, fn _, _ ->
      @route_patterns
    end)

    {:ok, %{conn: conn}}
  end

  describe "build_timetable/2" do
    test "trip_schedules: a map from trip_id/stop_id to a schedule", %{conn: conn} do
      expect(Stops.Repo.Mock, :by_trip, length(@route_patterns), fn _ ->
        @stops
      end)

      %{trip_schedules: trip_schedules} = build_timetable(conn, @schedules)

      for {key, value} <- trip_schedules do
        assert %Schedules.Schedule{} = value
        assert {<<_::binary>>, <<_::binary>>} = key
      end

      assert map_size(trip_schedules) <= length(@schedules)
    end

    test "trip_stops: if a stop isn't used, it's removed from the list", %{conn: conn} do
      expect(Stops.Repo.Mock, :by_trip, length(@route_patterns), fn _ ->
        @stops
      end)

      schedules = Enum.take(@schedules, 1)

      %{trip_stops: trip_stops} = build_timetable(conn, schedules)
      # other two stops were removed
      assert [%{id: "1"}] = trip_stops
    end

    test "trip_stops: merges stops from multiple route patterns", %{conn: conn} do
      Stops.Repo.Mock
      |> expect(:by_trip, fn "trip-1" ->
        @stops
      end)
      |> expect(:by_trip, fn "trip-2" ->
        [
          %Stop{id: "4"},
          %Stop{id: "5"},
          %Stop{id: "6"}
        ]
      end)

      schedules =
        @schedules ++
          [
            %Schedule{stop: %Stop{id: "4"}, trip: %Trip{}},
            %Schedule{stop: %Stop{id: "5"}, trip: %Trip{}},
            %Schedule{stop: %Stop{id: "6"}, trip: %Trip{}}
          ]

      %{trip_stops: trip_stops} = build_timetable(conn, schedules)

      assert Enum.map(trip_stops, & &1.id) == ["4", "5", "6", "1", "2", "3"]

      opposite_direction_conn = Plug.Conn.assign(conn, :direction_id, 0)

      Stops.Repo.Mock
      |> expect(:by_trip, fn "trip-1" ->
        @stops
      end)
      |> expect(:by_trip, fn "trip-2" ->
        [
          %Stop{id: "4"},
          %Stop{id: "5"},
          %Stop{id: "6"}
        ]
      end)

      %{trip_stops: trip_stops} = build_timetable(opposite_direction_conn, schedules)

      assert Enum.map(trip_stops, & &1.id) == ["1", "2", "3", "4", "5", "6"]
    end

    test "trip_stops: overrides position of certain shuttle stops", %{conn: conn} do
      # uses special values that are from the TimetableController
      # @shuttle_overrides
      special_stop_id = "place-NHRML-0127"
      special_stop_name = "Ballardvale"

      Stops.Repo.Mock
      |> expect(:by_trip, fn "trip-1" ->
        @stops ++
          [
            %Stop{id: "4", name: special_stop_name},
            %Stop{id: "5"},
            %Stop{id: "6"}
          ]
      end)
      |> expect(:by_trip, fn "trip-2" ->
        [
          %Stop{id: special_stop_id}
        ]
      end)

      schedules =
        @schedules ++
          [
            %Schedule{stop: %Stop{id: "4"}, trip: %Trip{}},
            %Schedule{stop: %Stop{id: "5"}, trip: %Trip{}},
            %Schedule{stop: %Stop{id: "6"}, trip: %Trip{}},
            %Schedule{stop: %Stop{id: special_stop_id}, trip: %Trip{}}
          ]

      %{trip_stops: trip_stops} = build_timetable(conn, schedules)

      assert ["1", "2", "3", "4", ^special_stop_id, "5", "6"] = Enum.map(trip_stops, & &1.id)
    end
  end

  describe "trip_messages/2" do
    test "returns proper messages for a CR Franklin train running via Fairmount" do
      assert %Routes.Route{id: "CR-Franklin"}
             |> trip_messages(0)
             |> Map.keys()
             |> Enum.map(&elem(&1, 0))
             |> Enum.uniq()
             |> Enum.sort()
             |> Enum.member?("735")
    end

    test "returns proper messages for others" do
      assert trip_messages(%Routes.Route{id: "CR-Worcester"}, 1) == %{}
    end
  end

  describe "vehicle_schedules/1" do
    test "constructs vehicle data for channel consumption" do
      vehicles =
        vehicle_schedules(
          %{assigns: %{date: Util.service_date()}},
          Enum.concat(@schedules, @odd_schedules)
        )

      assert @vehicle_schedules == vehicles
    end

    test "doesn't constructs vehicle data for channel consumption if the date is not today" do
      vehicles =
        vehicle_schedules(%{assigns: %{date: Date.add(Util.service_date(), 1)}}, @schedules)

      assert vehicles == %{}
    end
  end

  describe "prior_stops/1" do
    test "creates a map of stop identifiers to stop sequences for a schedule" do
      stops = prior_stops(@vehicle_schedules)

      assert %{
               "trip-1-1" => "name1-trip-1",
               "trip-2-2" => "name2-trip-2",
               "trip-3-3" => "name3-trip-3",
               "trip-4-4" => "shuttle-trip-4",
               "trip-5-5" => "name3-trip-5",
               "trip-1-2" => "name2-trip-1",
               "trip-2-3" => "name5-trip-2"
             } ==
               stops
    end
  end

  describe "track_change_for_schedule/2" do
    test "when there are no canonical routes, then no track change" do
      [schedule_1 | _others] = @schedules

      assert nil ==
               track_change_for_schedule(schedule_1, [], fn _platform_stop_id ->
                 %Stop{id: 101, platform_code: "new-platform", platform_name: "New Platform"}
               end)
    end

    test "when the scheduled platform stop matches the canonical pattern stops, then no track change detected" do
      [schedule_1 | _others] = @schedules
      scheduled_platform_stop_id = schedule_1.platform_stop_id

      platform_stop = %Stop{
        id: scheduled_platform_stop_id,
        platform_code: "new-platform",
        platform_name: "New Platform"
      }

      assert nil ==
               track_change_for_schedule(
                 schedule_1,
                 [schedule_1.platform_stop_id],
                 fn _platform_stop_id -> platform_stop end
               )
    end

    test "when the scheduled platform stop doesn't match the canonical pattern stops, then track change detected" do
      [schedule_1 | _others] = @schedules
      scheduled_platform_stop_id = schedule_1.platform_stop_id

      platform_stop = %Stop{
        id: scheduled_platform_stop_id,
        platform_code: "new-platform",
        platform_name: "New Platform"
      }

      assert platform_stop ==
               track_change_for_schedule(
                 schedule_1,
                 [Faker.Internet.slug()],
                 fn _platform_stop_id -> platform_stop end
               )
    end

    test "when the scheduled platform stop isn't canonical but doesn't have a platform code, then no track change detected" do
      [schedule_1 | _others] = @schedules
      scheduled_platform_stop_id = schedule_1.platform_stop_id

      platform_stop = %Stop{
        id: scheduled_platform_stop_id,
        platform_code: nil,
        platform_name: "Generic Platform Name"
      }

      assert nil ==
               track_change_for_schedule(
                 schedule_1,
                 [Faker.Internet.slug()],
                 fn _platform_stop_id -> platform_stop end
               )
    end
  end

  describe "alert_blocks/2" do
    setup %{conn: conn} do
      conn =
        conn
        |> assign(:date, ~D[2025-01-01])
        |> assign(:route, %Routes.Route{id: "CR-route"})

      {:ok, %{conn: conn}}
    end

    test "assigns @blocking_alert if there's a specially tagged alert", %{conn: conn} do
      alert =
        Alerts.Alert.new(
          header: "No timetable. #{TimetableBlocking.no_pdf_text()}",
          informed_entity: [%Alerts.InformedEntity{route: conn.assigns.route.id}],
          active_period: [{~U[2025-01-01T00:00:00Z], nil}]
        )

      conn =
        conn
        |> assign(:alerts, [alert])
        |> alert_blocks([])

      assert conn.assigns.blocking_alert == alert
    end

    test "assigns @blocking_alert to nil if there's no special alert", %{conn: conn} do
      ie = %Alerts.InformedEntity{route: conn.assigns.route.id}
      active_period = {~U[2025-01-01T00:00:00Z], ~U[2025-01-01T23:59:59Z]}

      alerts = [
        Alerts.Alert.new(
          header: "Regular alert.",
          informed_entity: [ie],
          active_period: [active_period]
        ),
        Alerts.Alert.new(
          header: "Not active. #{TimetableBlocking.no_pdf_text()}",
          informed_entity: [ie],
          active_period: [{~U[2025-06-06T00:00:00Z], nil}]
        ),
        Alerts.Alert.new(
          header: "Different route. #{TimetableBlocking.no_pdf_text()}",
          informed_entity: [%Alerts.InformedEntity{route: "bus"}],
          active_period: [active_period]
        )
      ]

      conn =
        conn
        |> assign(:alerts, alerts)
        |> alert_blocks([])

      assert conn.assigns.blocking_alert == nil
    end
  end
end
