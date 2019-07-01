defmodule SiteWeb.ScheduleViewTest do
  use SiteWeb.ConnCase, async: true

  alias Content.RoutePdf
  alias Plug.Conn
  alias Schedules.Trip
  alias Stops.{Stop, RouteStop}
  alias Routes.Route
  alias SiteWeb.ScheduleView

  import SiteWeb.ScheduleView
  import Phoenix.HTML.Tag, only: [content_tag: 3]
  import Phoenix.HTML, only: [safe_to_string: 1]

  @trip %Schedules.Trip{name: "101", headsign: "Headsign", direction_id: 0, id: "1"}
  @stop %Stops.Stop{id: "stop-id", name: "Stop Name"}
  @route %Routes.Route{type: 3, id: "1"}
  @prediction %Predictions.Prediction{
    departing?: true,
    direction_id: 0,
    status: "On Time",
    trip: @trip
  }
  @schedule %Schedules.Schedule{
    route: @route,
    trip: @trip,
    stop: @stop
  }
  @vehicle %Vehicles.Vehicle{direction_id: 0, id: "1819", status: :stopped, route_id: @route.id}
  @predicted_schedule %PredictedSchedule{prediction: @prediction, schedule: @schedule}
  @trip_info %TripInfo{
    route: @route,
    vehicle: @vehicle,
    vehicle_stop_name: @stop.name,
    times: [@predicted_schedule]
  }
  @vehicle_tooltip %VehicleTooltip{
    prediction: @prediction,
    vehicle: @vehicle,
    route: @route,
    trip: @trip,
    stop_name: @stop.name
  }
  @after_july_1_2019 1_561_953_601
  @before_july_1_2019 1_561_953_599

  describe "display_direction/1" do
    test "given no schedules, returns no content" do
      assert display_direction(%JourneyList{}) == ""
    end

    test "given a non-empty list of predicted_schedules, displays the direction of the first one's route" do
      route = %Routes.Route{direction_names: %{1 => "Northbound"}}
      trip = %Trip{direction_id: 1}

      journeys =
        JourneyList.build(
          [%Schedules.Schedule{route: route, trip: trip, stop: %Stop{id: "stop"}}],
          [],
          :last_trip_and_upcoming,
          true,
          origin_id: "stop",
          current_time: ~N[2017-01-01T06:30:00]
        )

      assert journeys |> display_direction |> IO.iodata_to_binary() == "Northbound to"
    end

    test "uses predictions if no schedule are available (as on subways)" do
      route = %Routes.Route{
        direction_names: %{1 => "Northbound"},
        id: "1",
        direction_destinations: %{1 => "End"}
      }

      stop = %Stop{id: "stop"}
      now = Timex.now()

      journeys =
        JourneyList.build_predictions_only(
          [],
          [
            %Predictions.Prediction{
              route: route,
              stop: stop,
              trip: nil,
              direction_id: 1,
              time: Timex.shift(now, hours: -1)
            }
          ],
          stop.id,
          nil
        )

      assert journeys |> display_direction |> IO.iodata_to_binary() == "Northbound to"
    end
  end

  describe "template_for_tab/1" do
    test "returns the template corresponding to a tab value" do
      assert template_for_tab("trip-view") == "_trip_view.html"
      assert template_for_tab("timetable") == "_timetable.html"
      assert template_for_tab("line") == "_line.html"
    end
  end

  describe "route_fare_link/1" do
    test "returns proper link to different fares pages" do
      assert route_fare_link(%Routes.Route{type: 0}) == "/fares/subway-fares"
      assert route_fare_link(%Routes.Route{type: 1}) == "/fares/subway-fares"
      assert route_fare_link(%Routes.Route{type: 2}) == "/fares/commuter-rail-fares"
      assert route_fare_link(%Routes.Route{type: 3}) == "/fares/bus-fares"
      assert route_fare_link(%Routes.Route{type: 4}) == "/fares/ferry-fares"
    end
  end

  describe "reverse_direction_opts/4" do
    test "reverses direction when the stop exists in the other direction" do
      expected = [trip: nil, direction_id: "1", destination: "place-harsq", origin: "place-davis"]

      actual =
        reverse_direction_opts(
          %Stops.Stop{id: "place-harsq"},
          %Stops.Stop{id: "place-davis"},
          "1"
        )

      assert Enum.sort(expected) == Enum.sort(actual)
    end

    test "reverses direction when origin and destination aren't selected" do
      expected = [trip: nil, direction_id: "1", destination: nil, origin: nil]
      actual = reverse_direction_opts(nil, nil, "1")
      assert Enum.sort(expected) == Enum.sort(actual)
    end

    test "maintains origin when there's no destination selected" do
      expected = [trip: nil, direction_id: "1", destination: nil, origin: "place-davis"]
      actual = reverse_direction_opts(%Stops.Stop{id: "place-davis"}, nil, "1")
      assert Enum.sort(expected) == Enum.sort(actual)
    end
  end

  describe "_trip_view.html" do
    test "renders a message if no scheduled trips", %{conn: conn} do
      conn =
        conn
        |> assign(:all_stops, [])
        |> assign(:alerts, [])
        |> assign(:date, ~D[2017-01-01])
        |> assign(:date_time, ~N[2017-03-01T07:29:00])
        |> assign(:date_in_rating?, true)
        |> assign(:destination, nil)
        |> assign(:origin, nil)
        |> assign(:route, %Routes.Route{direction_destinations: %{1 => "End"}})
        |> assign(:direction_id, 1)
        |> assign(:show_date_select?, false)
        |> assign(:headsigns, %{0 => [], 1 => []})
        |> fetch_query_params

      output =
        "_trip_view.html"
        |> SiteWeb.ScheduleView.render(conn.assigns |> Keyword.new() |> Keyword.merge(conn: conn))
        |> safe_to_string

      assert output =~ "There are no scheduled inbound trips on January 1, 2017."
    end
  end

  describe "_frequency.html" do
    test "renders a no service message if the block doesn't have service" do
      frequency_table = %Schedules.FrequencyList{
        frequencies: [%Schedules.Frequency{time_block: :am_rush}]
      }

      schedules = [%Schedules.Schedule{time: Util.now()}]
      date = Util.service_date()

      safe_output =
        SiteWeb.ScheduleView.render(
          "_frequency.html",
          frequency_table: frequency_table,
          schedules: schedules,
          date: date,
          origin: %{name: "Name"},
          route: %Routes.Route{id: "1", type: 3, name: "1"}
        )

      output = safe_to_string(safe_output)
      assert output =~ "No service between these hours"
    end

    test "renders a headway if the block has service" do
      frequency = %Schedules.Frequency{time_block: :am_rush, min_headway: 5, max_headway: 10}
      frequency_table = %Schedules.FrequencyList{frequencies: [frequency]}
      schedules = [%Schedules.Schedule{time: Util.now()}]
      date = Util.service_date()

      safe_output =
        SiteWeb.ScheduleView.render(
          "_frequency.html",
          frequency_table: frequency_table,
          schedules: schedules,
          date: date,
          origin: %{name: "Name"},
          route: %Routes.Route{id: "1", type: 3, name: "1"}
        )

      output = safe_to_string(safe_output)
      assert output =~ "5-10"
    end
  end

  describe "_trip_info.html" do
    test "show duration when it is set", %{conn: conn} do
      route = %Routes.Route{type: 2}

      trip_info = %TripInfo{
        route: route,
        vehicle: %Vehicles.Vehicle{status: :incoming},
        vehicle_stop_name: "Readville",
        duration: 30
      }

      actual =
        SiteWeb.ScheduleView.render(
          "_trip_info.html",
          trip_info: trip_info,
          origin: nil,
          destination: nil,
          direction_id: 0,
          conn: conn,
          route: route,
          expanded: nil,
          schedule_page_data: %{pdfs: []}
        )

      assert safe_to_string(actual) =~ "30 minutes"
    end

    test "hide duration when it is set to nil", %{conn: conn} do
      route = %Routes.Route{type: 2}

      trip_info = %TripInfo{
        route: route,
        vehicle: %Vehicles.Vehicle{status: :incoming},
        vehicle_stop_name: "Readville",
        duration: nil
      }

      actual =
        SiteWeb.ScheduleView.render(
          "_trip_info.html",
          trip_info: trip_info,
          origin: nil,
          destination: nil,
          direction_id: 0,
          conn: conn,
          route: route,
          expanded: nil,
          schedule_page_data: %{pdfs: []}
        )

      refute safe_to_string(actual) =~ "minutes"
    end

    test "make sure page reflects information from full_status function", %{conn: conn} do
      route = %Routes.Route{type: 2}

      trip_info = %TripInfo{
        route: route,
        vehicle: %Vehicles.Vehicle{status: :incoming},
        vehicle_stop_name: "Readville"
      }

      actual =
        SiteWeb.ScheduleView.render(
          "_trip_info.html",
          trip_info: trip_info,
          origin: nil,
          destination: nil,
          direction_id: 0,
          conn: conn,
          route: route,
          expanded: nil,
          schedule_page_data: %{pdfs: []}
        )

      expected = trip_info |> TripInfo.full_status() |> IO.iodata_to_binary()
      assert safe_to_string(actual) =~ expected
    end

    test "the fare link has the same origin and destination params as the page", %{conn: conn} do
      origin = %Stop{id: "place-north"}
      destination = %Stop{id: "Fitchburg"}
      route = %Routes.Route{type: 2}
      trip_info = %TripInfo{route: route, base_fare: %Fares.Fare{}}

      actual =
        SiteWeb.ScheduleView.render(
          "_trip_info.html",
          trip_info: trip_info,
          origin: origin,
          destination: destination,
          direction_id: 0,
          route: route,
          conn: conn,
          expanded: nil,
          schedule_page_data: %{pdfs: []}
        )

      assert safe_to_string(actual) =~
               "/fares/commuter_rail?destination=Fitchburg&amp;origin=place-north"
    end

    test "the fare description is Round trip fare if it's a round-trip fare", %{conn: conn} do
      origin = %Stop{id: "place-south"}
      destination = %Stop{id: "Foxboro"}
      route = %Routes.Route{type: 2}
      trip_info = %TripInfo{route: route, base_fare: %Fares.Fare{duration: :round_trip}}

      actual =
        SiteWeb.ScheduleView.render(
          "_trip_info.html",
          trip_info: trip_info,
          origin: origin,
          destination: destination,
          direction_id: 0,
          route: route,
          conn: conn,
          expanded: nil,
          schedule_page_data: %{pdfs: []}
        )

      assert safe_to_string(actual) =~ "Round trip fare:"
    end

    test "no fare information is rendered without a fare", %{conn: conn} do
      origin = %Stop{id: "place-south"}
      destination = %Stop{id: "Foxboro"}
      route = %Routes.Route{type: 2}
      trip_info = %TripInfo{route: route, base_fare: nil}

      actual =
        SiteWeb.ScheduleView.render(
          "_trip_info.html",
          trip_info: trip_info,
          origin: origin,
          destination: destination,
          direction_id: 0,
          route: route,
          conn: conn,
          expanded: nil,
          schedule_page_data: %{pdfs: []}
        )

      rendered = safe_to_string(actual)
      refute rendered =~ "Fare:"
    end

    test "a branch is expanded if the expanded param is the branch name", %{conn: conn} do
      origin = %Stop{id: "place-south"}
      destination = %Stop{id: "Foxboro"}
      route = %Routes.Route{type: 2, name: "Franklin Line"}
      trip_info = %TripInfo{route: route, base_fare: nil}

      actual =
        SiteWeb.ScheduleView.render(
          "_trip_info.html",
          trip_info: trip_info,
          origin: origin,
          destination: destination,
          direction_id: 0,
          route: route,
          conn: conn,
          expanded: "Franklin Line",
          schedule_page_data: %{pdfs: []}
        )

      rendered = safe_to_string(actual)
      trip_info = Floki.find(rendered, "#trip-info-stops")

      assert Floki.attribute(trip_info, "class") == ["collapse in stop-list"]
    end
  end

  describe "render_trip_info_stops" do
    @assigns %{
      direction_id: 0,
      route: @route,
      conn: %Plug.Conn{},
      vehicle_tooltips: %{{@trip.id, @stop.id} => @vehicle_tooltip},
      trip_info: @trip_info,
      alerts: [
        Alerts.Alert.new(
          informed_entity: [
            %Alerts.InformedEntity{
              route: @route.id,
              direction_id: 0,
              stop: @stop.id
            }
          ]
        )
      ]
    }

    test "real time icon shown when prediction is available" do
      output =
        [@predicted_schedule]
        |> SiteWeb.ScheduleView.render_trip_info_stops(@assigns)
        |> List.first()
        |> safe_to_string

      assert output =~ "icon-realtime"
    end

    test "Alert icon is shown when alerts are not empty" do
      output =
        [@predicted_schedule]
        |> SiteWeb.ScheduleView.render_trip_info_stops(@assigns)
        |> Enum.map(&safe_to_string/1)
        |> IO.iodata_to_binary()

      assert output =~ "icon-alert"
    end

    test "Alert icon is shown with tooltip attributes" do
      output =
        [@predicted_schedule]
        |> SiteWeb.ScheduleView.render_trip_info_stops(@assigns)
        |> Enum.map(&safe_to_string/1)
        |> IO.iodata_to_binary()

      assert [alert] = output |> Floki.find(".icon-alert")
      assert Floki.attribute(alert, "data-toggle") == ["tooltip"]
      assert Floki.attribute(alert, "title") == ["Service alert or delay"]
    end

    test "shows vehicle icon when vehicle location is available" do
      output =
        [@predicted_schedule]
        |> SiteWeb.ScheduleView.render_trip_info_stops(@assigns)
        |> Enum.map(&safe_to_string/1)
        |> IO.iodata_to_binary()

      assert [_vehicle] = output |> Floki.find(".vehicle-bubble")
    end

    test "collapsed stops do not use dotted line" do
      html =
        [@predicted_schedule]
        |> SiteWeb.ScheduleView.render_trip_info_stops(@assigns)
        |> Enum.map(&safe_to_string/1)
        |> IO.iodata_to_binary()

      assert Enum.empty?(Floki.find(html, ".route-branch-stop-bubble.stop.dotted"))
    end

    test "does not show dotted line for last stop when collapse is nil" do
      html =
        [@predicted_schedule]
        |> SiteWeb.ScheduleView.render_trip_info_stops(@assigns)
        |> Enum.map(&safe_to_string/1)
        |> IO.iodata_to_binary()

      assert Enum.count(Floki.find(html, ".route-branch-stop-bubble.stop.dotted")) == 0
    end
  end

  describe "_line.html" do
    @shape %Routes.Shape{id: "test", name: "test", stop_ids: [], direction_id: 0}
    @hours_of_operation %{
      saturday: %{
        0 => %Schedules.Departures{
          first_departure: ~D[2017-01-01],
          last_departure: ~D[2017-01-01]
        },
        1 => %Schedules.Departures{
          first_departure: ~D[2017-01-01],
          last_departure: ~D[2017-01-01]
        }
      },
      sunday: %{
        0 => %Schedules.Departures{
          first_departure: ~D[2017-01-01],
          last_departure: ~D[2017-01-01]
        },
        1 => %Schedules.Departures{
          first_departure: ~D[2017-01-01],
          last_departure: ~D[2017-01-01]
        }
      },
      week: %{
        0 => %Schedules.Departures{
          first_departure: ~D[2017-01-01],
          last_departure: ~D[2017-01-01]
        },
        1 => %Schedules.Departures{
          first_departure: ~D[2017-01-01],
          last_departure: ~D[2017-01-01]
        }
      }
    }

    test "Bus line with variant filter", %{conn: conn} do
      route_stop_1 = %RouteStop{
        id: "stop 1",
        name: "Stop 1",
        zone: "1",
        stop_features: [],
        connections: []
      }

      route_stop_2 = %RouteStop{
        id: "stop 2",
        name: "Stop 2",
        zone: "2",
        stop_features: [],
        connections: []
      }

      output =
        ScheduleView.render(
          "_line.html",
          conn:
            conn
            |> Conn.fetch_query_params()
            |> put_private(:phoenix_endpoint, SiteWeb.Endpoint),
          stop_list_template: "_stop_list.html",
          all_stops: [{[{nil, :terminus}], route_stop_1}, {[{nil, :terminus}], route_stop_2}],
          route_shapes: [@shape, @shape],
          active_shape: @shape,
          alerts: [],
          connections: [],
          channel: "vehicles:1:1",
          expanded: nil,
          show_variant_selector: true,
          map_img_src: nil,
          hours_of_operation: @hours_of_operation,
          holidays: [],
          branches: [%Stops.RouteStops{branch: nil, stops: [route_stop_1, route_stop_2]}],
          origin: nil,
          destination: nil,
          direction_id: 1,
          route: %Routes.Route{type: 3, direction_destinations: %{1 => "End"}},
          date: ~D[2017-01-01],
          date_time: ~N[2017-03-01T07:29:00],
          direction_id: 1,
          reverse_direction_all_stops: [],
          show_date_select?: false,
          headsigns: %{0 => [], 1 => []},
          vehicle_tooltips: %{},
          featured_content: nil,
          news: [],
          dynamic_map_data: %{},
          schedule_page_data: %{pdfs: []}
        )

      assert safe_to_string(output) =~ "shape-filter"
    end

    test "Bus line without variant filter", %{conn: conn} do
      route_stop_1 = %RouteStop{
        id: "stop 1",
        name: "Stop 1",
        zone: "1",
        stop_features: [],
        connections: []
      }

      route_stop_2 = %RouteStop{
        id: "stop 2",
        name: "Stop 2",
        zone: "2",
        stop_features: [],
        connections: []
      }

      output =
        ScheduleView.render(
          "_line.html",
          conn:
            conn
            |> Conn.fetch_query_params()
            |> put_private(:phoenix_endpoint, SiteWeb.Endpoint),
          stop_list_template: "_stop_list.html",
          all_stops: [{[{nil, :terminus}], route_stop_1}, {[{nil, :terminus}], route_stop_2}],
          route_shapes: [@shape],
          alerts: [],
          connections: [],
          channel: "vehicles:1:1",
          upcoming_alerts: [],
          expanded: nil,
          active_shape: nil,
          map_img_src: nil,
          hours_of_operation: @hours_of_operation,
          holidays: [],
          branches: [%Stops.RouteStops{branch: nil, stops: [route_stop_1, route_stop_2]}],
          route: %Routes.Route{type: 3, direction_destinations: %{1 => "End"}},
          date: ~D[2017-01-01],
          date_time: ~N[2017-03-01T07:29:00],
          destination: nil,
          origin: nil,
          direction_id: 1,
          reverse_direction_all_stops: [],
          show_date_select?: false,
          headsigns: %{0 => [], 1 => []},
          vehicle_tooltips: %{},
          featured_content: nil,
          news: [],
          dynamic_map_data: %{},
          schedule_page_data: %{pdfs: []}
        )

      refute safe_to_string(output) =~ "shape-filter"
    end

    test "does not crash if hours of operation isn't set", %{conn: conn} do
      output =
        ScheduleView.render(
          "_line.html",
          conn:
            conn
            |> Conn.fetch_query_params()
            |> put_private(:phoenix_endpoint, SiteWeb.Endpoint),
          stop_list_template: "_stop_list.html",
          all_stops: [],
          alerts: [],
          connections: [],
          channel: "vehicles:1:1",
          route_shapes: [],
          expanded: nil,
          active_shape: nil,
          map_img_src: nil,
          holidays: [],
          branches: [],
          route: %Routes.Route{type: 3},
          date: ~D[2017-01-01],
          date_time: ~N[2017-03-01T07:29:00],
          destination: nil,
          origin: nil,
          direction_id: 1,
          reverse_direction_all_stops: [],
          show_date_select?: false,
          headsigns: %{0 => [], 1 => []},
          vehicle_tooltips: %{},
          featured_content: nil,
          news: [],
          dynamic_map_data: %{},
          schedule_page_data: %{pdfs: []}
        )

      refute safe_to_string(output) =~ "Hours of Operation"
    end

    test "Displays error message when there are no trips in selected direction", %{conn: conn} do
      output =
        ScheduleView.render(
          "_line.html",
          conn:
            conn
            |> Conn.fetch_query_params()
            |> put_private(:phoenix_endpoint, SiteWeb.Endpoint),
          stop_list_template: "_stop_list.html",
          all_stops: [],
          alerts: [],
          connections: [],
          channel: "vehicles:1:1",
          route_shapes: [],
          expanded: nil,
          active_shape: nil,
          map_img_src: nil,
          holidays: [],
          branches: [],
          route: %Routes.Route{type: 3},
          date: ~D[2017-01-01],
          date_time: ~N[2017-03-01T07:29:00],
          destination: nil,
          origin: nil,
          direction_id: 1,
          reverse_direction_all_stops: [],
          show_date_select?: false,
          headsigns: %{0 => [], 1 => []},
          vehicle_tooltips: %{},
          featured_content: nil,
          news: [],
          dynamic_map_data: %{},
          schedule_page_data: %{pdfs: []}
        )

      assert safe_to_string(output) =~ "There are no scheduled"
    end

    test "Doesn't link to last stop if it's excluded", %{conn: conn} do
      route = %Routes.Route{id: "route", type: 3, direction_destinations: %{1 => "End"}}

      route_stop = %RouteStop{
        id: "last",
        name: "last",
        zone: "1",
        route: route,
        connections: [],
        stop_features: [],
        is_terminus?: true,
        is_beginning?: false
      }

      output =
        ScheduleView.render(
          "_line.html",
          conn:
            conn
            |> Conn.fetch_query_params()
            |> put_private(:phoenix_endpoint, SiteWeb.Endpoint),
          stop_list_template: "_stop_list.html",
          all_stops: [{[{nil, :terminus}], route_stop}],
          alerts: [],
          connections: [],
          channel: "vehicles:1:1",
          route_shapes: [@shape],
          expanded: nil,
          active_shape: nil,
          map_img_src: nil,
          hours_of_operation: @hours_of_operation,
          holidays: [],
          branches: [%Stops.RouteStops{branch: nil, stops: [route_stop]}],
          route: route,
          date: ~D[2017-01-01],
          date_time: ~N[2017-03-01T07:29:00],
          destination: nil,
          origin: nil,
          direction_id: 1,
          reverse_direction_all_stops: [%Stops.Stop{id: "last"}],
          show_date_select?: false,
          headsigns: %{0 => [], 1 => []},
          vehicle_tooltips: %{},
          featured_content: nil,
          news: [],
          dynamic_map_data: %{},
          schedule_page_data: %{pdfs: []}
        )

      refute safe_to_string(output) =~
               trip_view_path(SiteWeb.Endpoint, :show, "route", origin: "last", direction_id: 0)
    end
  end

  describe "no_trips_message/5" do
    test "when a no service error is provided" do
      error = %JsonApi.Error{
        code: "no_service",
        meta: %{"version" => "Spring 2017 version 3D", "end_date" => "2018-05-31"}
      }

      result =
        error
        |> no_trips_message(nil, nil, nil, ~D[2017-01-01])
        |> Enum.map(&safe_to_string/1)
        |> IO.iodata_to_binary()

      assert result =~
               "We can only provide trip data for the Spring schedule, valid until May 31, 2018"
    end

    test "when a starting and ending stop are provided" do
      result =
        no_trips_message(
          nil,
          %Stops.Stop{name: "The Start"},
          %Stops.Stop{name: "The End"},
          nil,
          ~D[2017-03-05]
        )

      assert IO.iodata_to_binary(result) ==
               "There are no scheduled trips between The Start and The End on March 5, 2017."
    end

    test "when a direction is provided" do
      result = no_trips_message(nil, nil, nil, "Inbound", ~D[2017-03-05])

      assert IO.iodata_to_binary(result) ==
               "There are no scheduled inbound trips on March 5, 2017."
    end

    test "fallback when nothing is available" do
      result = no_trips_message(nil, nil, nil, nil, nil)
      assert IO.iodata_to_binary(result) == "There are no scheduled trips."
    end

    test "does not downcase non-traditional directions" do
      error = origin = destination = nil
      # CR-Foxboro
      direction = "TF Green Airport"
      date = ~D[2017-11-01]
      result = no_trips_message(error, origin, destination, direction, date)

      assert IO.iodata_to_binary(result) ==
               "There are no scheduled TF Green Airport trips on November 1, 2017."
    end
  end

  describe "route_pdfs/3" do
    test "returns empty array if no pdfs" do
      assert [] = route_pdfs([], %Routes.Route{}, ~D[2019-04-29])
    end

    test "returns map of pdfs" do
      pdfs = [
        %RoutePdf{path: "/basic-current-url", date_start: ~D[2017-12-01]},
        %RoutePdf{path: "/basic-future-url", date_start: ~D[2119-02-01]},
        %RoutePdf{
          path: "/custom-url",
          date_start: ~D[2017-12-01],
          link_text_override: "Custom schedule"
        }
      ]

      maps = route_pdfs(pdfs, %Routes.Route{name: "1", type: 3}, ~D[2019-01-29])
      assert List.first(maps).url =~ ~r"http://.*/basic-current-url"
      assert List.first(maps).title =~ "Current Route 1 schedule PDF"
    end
  end

  describe "route_pdf_link/3" do
    test "returns an empty list if no PDF for that route" do
      route = %Routes.Route{}
      today = ~D[2018-01-01]

      assert {"div", _, []} =
               [] |> route_pdf_link(route, today) |> safe_to_string |> Floki.parse()

      assert {"div", _, []} =
               nil |> route_pdf_link(route, today) |> safe_to_string |> Floki.parse()
    end

    test "shows all PDFs for the route" do
      route_pdfs = [
        %Content.RoutePdf{path: "/basic-current-url", date_start: ~D[2017-12-01]},
        %Content.RoutePdf{path: "/basic-future-url", date_start: ~D[2119-02-01]},
        %Content.RoutePdf{
          path: "/custom-url",
          date_start: ~D[2017-12-01],
          link_text_override: "Custom schedule"
        }
      ]

      route = %Routes.Route{name: "1", type: 3}
      rendered = safe_to_string(route_pdf_link(route_pdfs, route, ~D[2018-01-01]))
      assert rendered =~ "Current Route 1 schedule PDF"
      assert rendered =~ "basic-current-url"
      # full URL
      assert rendered =~ "http://"
      assert rendered =~ "Current Custom schedule PDF"
      assert rendered =~ "Upcoming Route 1 schedule PDF — effective Feb 1"
    end

    test "does not specify 'current' when all schedules are current" do
      route_pdfs = [
        %Content.RoutePdf{path: "/basic-current-url", date_start: ~D[2017-12-01]},
        %Content.RoutePdf{
          path: "/custom-url",
          date_start: ~D[2017-12-01],
          link_text_override: "Custom schedule"
        }
      ]

      route = %Routes.Route{name: "1", type: 3}
      rendered = safe_to_string(route_pdf_link(route_pdfs, route, ~D[2018-01-01]))
      assert rendered =~ "Route 1 schedule PDF"
      assert rendered =~ "Custom schedule PDF"
    end

    test "considers PDFs that start today as current" do
      route_pdfs = [%Content.RoutePdf{path: "/url", date_start: ~D[2018-01-01]}]
      route = %Routes.Route{name: "1", type: 3}
      rendered = safe_to_string(route_pdf_link(route_pdfs, route, ~D[2018-01-01]))
      assert rendered =~ "Route 1 schedule PDF"
    end
  end

  describe "pretty_route_name/1" do
    test "has correct text for bus routes" do
      route = %Routes.Route{id: "741", name: "SL1", type: 3}
      assert pretty_route_name(route) == "Route SL1"
    end

    test "has correct name for subway" do
      route = %Routes.Route{id: "Red", name: "Red Line", type: 1}
      assert pretty_route_name(route) == "Red line"
    end

    test "has correct name for ferries" do
      route = %Routes.Route{id: "Boat-F4", name: "Charlestown Ferry", type: 1}
      assert pretty_route_name(route) == "Charlestown ferry"
    end

    test "has correct name for mattapan" do
      route = %Routes.Route{id: "Mattapan", name: "Mattapan Trolley", type: 1}
      assert pretty_route_name(route) == "Mattapan trolley"
    end

    test "allows line break after slash" do
      route = %Routes.Route{id: "CR-Worcester", name: "Framingham/Worcester Line", type: 1}
      # expected result has a zero-width space bewtween / and W
      assert pretty_route_name(route) == "Framingham/​Worcester line"
    end
  end

  describe "_empty.html" do
    @date ~D[2016-01-01]

    test "shows date reset link when not current date", %{conn: conn} do
      conn = %{conn | query_params: %{}}

      rendered =
        SiteWeb.ScheduleView.render(
          "_empty.html",
          error: nil,
          origin: "origin",
          destination: "dest",
          direction: "inbound",
          date: @date,
          conn: conn
        )

      assert safe_to_string(rendered) =~ "View inbound trips"
    end

    test "Does not show reset link if selected date is service date", %{conn: conn} do
      conn = %{conn | query_params: %{}}

      rendered =
        SiteWeb.ScheduleView.render(
          "_empty.html",
          error: nil,
          origin: "origin",
          destination: "dest",
          direction: "inbound",
          date: Util.service_date(),
          conn: conn
        )

      refute safe_to_string(rendered) =~ "View inbound trips"
    end

    test "Does not list date if none is given", %{conn: conn} do
      conn = %{conn | query_params: %{}}

      rendered =
        SiteWeb.ScheduleView.render(
          "_empty.html",
          error: nil,
          origin: nil,
          destination: nil,
          direction: "inbound",
          date: nil,
          conn: conn
        )

      refute safe_to_string(rendered) =~ "on"
      assert safe_to_string(rendered) =~ "There are no scheduled inbound"
    end
  end

  describe "fare_params/2" do
    @origin %Stop{id: "place-north"}
    @destination %Stop{id: "Fitchburg"}

    test "fare link when no origin/destination chosen" do
      assert fare_params(nil, nil) == %{}
    end

    test "fare link when only origin chosen" do
      assert fare_params(@origin, nil) == %{origin: @origin}
    end

    test "fare link when origin and destination chosen" do
      assert fare_params(@origin, @destination) == %{origin: @origin, destination: @destination}
    end
  end

  describe "route_header_text/2" do
    test "translates the type number to a string or number if non-silver-line bus" do
      assert route_header_text(%Route{type: 0, name: "test route"}) == ["test route"]
      assert route_header_text(%Route{type: 3, name: "SL1", id: "741"}) == ["Silver Line ", "SL1"]

      assert route_header_text(%Route{type: 3, name: "2"}) ==
               content_tag(:div, "2", class: "bus-route-sign")

      assert route_header_text(%Route{type: 1, name: "Red Line"}) == ["Red Line"]
      assert route_header_text(%Route{type: 2, name: "Fitchburg Line"}) == ["Fitchburg"]
    end
  end

  describe "route_header_description/1" do
    test "Uses long name for bus or Bus Route if it's missing" do
      assert route_header_description(%Route{type: 3, name: "short", long_name: "long"}) ==
               content_tag(:h2, "long", class: "schedule__description")

      assert route_header_description(%Route{type: 3, name: "short", long_name: ""}) ==
               content_tag(:h2, "Bus Route", class: "schedule__description")
    end
  end

  describe "route_header_class/1" do
    test "returns a line-specific background class for silver line and subway" do
      assert header_class(%Route{type: 3, id: "741"}) == "u-bg--silver-line"
      assert header_class(%Route{type: 0, id: "Green-B"}) == "u-bg--green-line"
      assert header_class(%Route{type: 1, id: "Red"}) == "u-bg--red-line"
    end

    test "returns a mode-specific background class for other modes" do
      assert header_class(%Route{type: 2, id: "CR-Fitchburg"}) == "u-bg--commuter-rail"
      assert header_class(%Route{type: 3, id: "2"}) == "u-bg--bus"
      assert header_class(%Route{type: 3, id: "2"}) == "u-bg--bus"
      assert header_class(%Route{type: 4, id: "Boat-Hull"}) == "u-bg--ferry"
    end
  end

  describe "route_header_tabs/1" do
    test "returns 5 tabs for commuter rail (1 hidden by css)", %{conn: conn} do
      tabs =
        conn
        |> assign(:route, %Route{type: 2})
        |> assign(:tab, "alerts")
        |> assign(:tab_params, [])
        |> route_header_tabs()
        |> safe_to_string()

      assert tabs =~ "info-tab"
      assert tabs =~ "schedule-tab"
      assert tabs =~ "info-&amp;-maps-tab"
      assert tabs =~ "timetable-tab"
      assert tabs =~ "alerts-tab"
    end

    test "returns 3 tabs for other routes", %{conn: conn} do
      tabs =
        conn
        |> assign(:route, %Route{type: 3})
        |> assign(:tab, "alerts")
        |> assign(:tab_params, [])
        |> route_header_tabs()
        |> safe_to_string()

      assert tabs =~ "schedule-tab"
      assert tabs =~ "info-&amp;-maps-tab"
      assert tabs =~ "alerts-tab"
      refute tabs =~ "info-tab"
      refute tabs =~ "timetable-tab"
    end
  end

  describe "to_fare_atom/1" do
    test "silver line returns subway" do
      assert to_fare_atom(%Route{type: 3, id: "741"}) == :subway
    end

    test "inner express bus returns :inner_express_bus" do
      assert to_fare_atom(%Route{type: 3, id: "170"}) == :inner_express_bus
    end

    test "outer express bus returns :inner_express_bus" do
      assert to_fare_atom(%Route{type: 3, id: "352"}) == :outer_express_bus
    end

    test "other types of routes return specific atoms" do
      assert to_fare_atom(%Route{type: 0, id: "Green-B"}) == :subway
      assert to_fare_atom(%Route{type: 1, id: "Red"}) == :subway
      assert to_fare_atom(%Route{type: 2, id: "CR-Fitchbury"}) == :commuter_rail
      assert to_fare_atom(%Route{type: 3, id: "1"}) == :bus
    end
  end

  describe "sort_connnections/1" do
    test "sorts subway in the correct order, followed by commuter rail alphabetical" do
      routes = [
        %Route{id: "Green-E"},
        %Route{id: "Mattapan"},
        %Route{id: "Green-B"},
        %Route{id: "Green-D"},
        %Route{id: "Red"},
        %Route{id: "Green-C"},
        %Route{id: "Orange"},
        %Route{id: "Blue"},
        %Route{type: 2, name: "Worcester"},
        %Route{type: 2, name: "Fitchburg"}
      ]

      sorted_routes = [
        %Route{id: "Red"},
        %Route{id: "Orange"},
        %Route{id: "Green-B"},
        %Route{id: "Green-C"},
        %Route{id: "Green-D"},
        %Route{id: "Green-E"},
        %Route{id: "Blue"},
        %Route{id: "Mattapan"},
        %Route{type: 2, name: "Fitchburg"},
        %Route{type: 2, name: "Worcester"}
      ]

      assert sort_connections(routes) == sorted_routes
    end
  end

  describe "single_trip_fares/1" do
    test "only return summary for single_trip fares" do
      assert single_trip_fares("commuter_rail") == [{"Zones 1A-10", ["$2.40", " – ", "$13.25"]}]
    end
  end

  describe "fare_change_message/1" do
    test "before july 1, 2019" do
      actual =
        @before_july_1_2019
        |> fare_change_message()
        |> safe_to_string()

      assert actual =~ "Fares are changing"
    end

    test "after july 1, 2019" do
      assert fare_change_message(@after_july_1_2019) == []
    end
  end
end
