defmodule DotcomWeb.ScheduleController.JourneysTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.ScheduleController.Journeys
  import Plug.Conn, only: [assign: 3, fetch_query_params: 1]
  import UrlHelpers, only: [update_url: 2]

  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.Schedule
  alias Schedules.Trip
  alias Stops.Stop

  @route %Route{id: "86", type: 3, name: "86"}
  @date_time ~N[2017-02-11T22:30:00]
  @cal_date ~D[2017-02-11]

  describe "init/1" do
    test "takes no options" do
      assert init([]) == []
    end
  end

  describe "call/2" do
    defp setup_conn(route, schedules, predictions, opts \\ []) do
      now = opts[:now] || @date_time
      selected_date = opts[:selected_date] || @cal_date
      origin = opts[:origin]
      destination = opts[:destination]
      show_all_trips = opts[:show_all_trips] || "false"

      %{build_conn() | params: %{"show_all_trips" => show_all_trips}}
      |> assign(:route, route)
      |> assign(:direction_id, 0)
      |> assign(:schedules, schedules)
      |> assign(:predictions, predictions)
      |> assign(:date_time, now)
      |> assign(:date, selected_date)
      |> assign(:origin, origin)
      |> assign(:destination, destination)
      |> fetch_query_params()
      |> call([])
    end

    test "assigns journeys even without schedules or predictions" do
      values = [
        # no values
        [],
        # error value
        {:error, :error}
      ]

      for route_type <- 0..4, schedules <- values, predictions <- values do
        route = %{@route | type: route_type}
        conn = setup_conn(route, schedules, predictions)

        assert conn.assigns.journeys == %JourneyList{}
      end
    end

    test "Does not initially show all trips for Ferry" do
      conn = setup_conn(%Route{id: "Boat-F4", type: 4, name: "Boaty McBoatface"}, [], [])

      assert conn.assigns.journeys == %JourneyList{}
    end

    test "filters out schedules in the past by default, leaving the last entry before now" do
      now = ~N[2017-02-11T12:00:00]

      stop = %Stop{id: "stop"}

      schedules =
        for hour <- [-3, -2, -1, 1, 2, 3] do
          %Schedule{
            time: Timex.shift(now, hours: hour),
            trip: %Trip{id: "trip-#{hour}"},
            stop: stop
          }
        end

      conn =
        setup_conn(
          %Route{id: "CR-Lowell", type: 2, name: "Lowell"},
          schedules,
          [],
          now: now,
          selected_date: now,
          origin: stop
        )

      current_schedules = Enum.drop(schedules, 2)
      optionals = [origin_id: stop.id, current_time: now]

      journey_list =
        JourneyList.build(current_schedules, [], :last_trip_and_upcoming, true, optionals).journeys

      assert conn.assigns.journeys.journeys == journey_list
    end

    test "if keep_all? is true, doesn't filter schedules" do
      now = @date_time
      stop = %Stop{id: "stop"}

      schedules =
        for hour <- [-3, -2, -1, 1, 2, 3] do
          %Schedule{
            time: Timex.shift(now, hours: hour),
            trip: %Trip{id: "trip-#{hour}"},
            stop: stop
          }
        end

      conn = setup_conn(@route, schedules, [], now: now, origin: stop, show_all_trips: "true")

      journey_list =
        JourneyList.build(
          schedules,
          [],
          :last_trip_and_upcoming,
          true,
          origin_id: stop.id,
          current_time: @date_time
        )

      assert conn.assigns.journeys == journey_list
    end

    test "Future schedules have no expansion" do
      now = @date_time
      stop = %Stop{id: "stop"}

      schedules =
        for hour <- [-3, -2, -1, 1, 2, 3] do
          %Schedule{
            time: Timex.shift(now, hours: hour),
            trip: %Trip{id: "trip-#{hour}"},
            stop: stop
          }
        end

      conn =
        setup_conn(
          @route,
          schedules,
          [],
          now: now,
          selected_date: Timex.shift(@cal_date, years: 2000),
          origin: stop,
          show_all_trips: "true"
        )

      assert conn.assigns.journeys.expansion == :none
    end

    test "assigns journeys for subway", %{conn: conn} do
      conn =
        conn
        |> assign(:route, %Routes.Route{type: 1})
        |> assign(:schedules, [])
        |> assign(:predictions, [])
        |> assign(:origin, nil)
        |> assign(:destination, nil)
        |> fetch_query_params()
        |> call([])

      assert conn.assigns.journeys != nil
    end

    test "assigns prediction-only journeys", %{conn: conn} do
      stop = %Stop{id: "stop"}
      trip = %Trip{id: "trip"}
      schedules = [%Schedule{trip: trip, stop: stop, time: @date_time}]
      predictions = [%Prediction{trip: trip, stop: stop, time: @date_time}]

      conn =
        conn
        |> assign(:route, %Routes.Route{type: 1})
        |> assign(:schedules, schedules)
        |> assign(:predictions, predictions)
        |> assign(:origin, stop)
        |> assign(:destination, nil)
        |> fetch_query_params()
        |> call([])

      assert conn.assigns.journeys ==
               JourneyList.build_predictions_only(schedules, predictions, "stop", nil)
    end

    test "if the assigned direction_id does not match the trip, redirects to the correct direction_id" do
      trip = %Trip{id: "trip", direction_id: 1}
      origin = %Stop{id: "origin"}
      destination = %Stop{id: "destination"}

      schedules = [
        {%Schedule{trip: trip, stop: origin, time: @date_time},
         %Schedule{trip: trip, stop: destination, time: @date_time}}
      ]

      predictions = [
        %Prediction{stop: origin, time: @date_time},
        %Prediction{stop: destination, time: @date_time}
      ]

      conn = setup_conn(@route, schedules, predictions, origin: origin, destination: destination)
      assert redirected_to(conn, 302) == update_url(conn, direction_id: 1)
    end

    test "filters out predictions belonging to a trip that doesn't go to the destination" do
      now = @date_time
      origin = %Stop{id: "origin"}
      destination = %Stop{id: "destination"}
      elsewhere = %Stop{id: "elsewhere"}
      # Schedules that go to the destination
      destination_schedules =
        for hour <- [1, 2, 3] do
          {
            %Schedule{
              time: Timex.shift(now, hours: hour),
              trip: %Trip{id: "trip-#{hour}"},
              stop: origin
            },
            %Schedule{
              time: Timex.shift(now, hours: hour + 1),
              trip: %Trip{id: "trip-#{hour}"},
              stop: destination
            }
          }
        end

      # Schedules that don't go through the destination
      extra_schedules =
        for hour <- [4, 5, 6] do
          {
            %Schedule{
              time: Timex.shift(now, hours: hour),
              trip: %Trip{id: "trip-#{hour}"},
              stop: origin
            },
            %Schedule{
              time: Timex.shift(now, hours: hour + 1),
              trip: %Trip{id: "trip-#{hour}"},
              stop: elsewhere
            }
          }
        end

      all_schedules = destination_schedules ++ extra_schedules

      # Predictions at the destination
      destination_predictions =
        for hour <- [1, 2, 3] do
          %Prediction{trip: %Trip{id: "trip-#{hour}"}, stop: destination}
        end

      # Predictions that should be filtered out
      extra_predictions =
        for hour <- [4, 5, 6] do
          %Prediction{trip: %Trip{id: "trip-#{hour}"}, stop: elsewhere}
        end

      conn =
        setup_conn(
          @route,
          all_schedules,
          destination_predictions ++ extra_predictions,
          now: now,
          origin: origin,
          destination: destination
        )

      journey_opts = [
        origin_id: origin.id,
        destination_id: destination.id,
        current_time: @date_time
      ]

      journeys =
        JourneyList.build(
          all_schedules,
          destination_predictions,
          :predictions_then_schedules,
          true,
          journey_opts
        )

      assert conn.assigns.journeys == journeys
    end
  end

  describe "filter_flag/1" do
    test "Returns :predictions_then_schedules for bus routes" do
      route = %Routes.Route{type: 3, id: "some bus"}

      assert filter_flag(route) == :predictions_then_schedules
    end

    test "Returns :predictions_then_schedules for Mattapan rail" do
      route = %Routes.Route{type: 0, id: "Mattapan"}

      assert filter_flag(route) == :predictions_then_schedules
    end

    test "Returns :last_trip_and_upcoming for non-Mattapan rail" do
      route = %Routes.Route{type: 0, id: "some other rail"}

      assert filter_flag(route) == :last_trip_and_upcoming
    end

    test "Returns :last_trip_and_upcoming for subway" do
      route = %Routes.Route{type: 1, id: "some other rail"}

      assert filter_flag(route) == :last_trip_and_upcoming
    end
  end
end
