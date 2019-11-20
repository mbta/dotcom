defmodule SiteWeb.ScheduleController.FinderApi do
  @moduledoc """
    API for retrieving journeys for a route, and for
    showing trip details for each journey.
  """
  use SiteWeb, :controller

  alias Routes.Route
  alias SiteWeb.ScheduleController.TripInfo, as: Trips
  alias SiteWeb.ScheduleController.VehicleLocations, as: Vehicles

  import SiteWeb.ScheduleController.ScheduleApi, only: [format_time: 1, fares_for_service: 4]

  @spec journeys(Plug.Conn.t(), map) :: Plug.Conn.t()
  def journeys(conn, %{
        "id" => route_id,
        "date" => date,
        "direction" => direction_id,
        "stop" => stop_id
      }) do
    {:ok, date} = Date.from_iso8601(date)
    today? = Date.diff(date, conn.assigns.date_time) == 0
    direction_id = String.to_integer(direction_id)

    schedules =
      Schedules.Repo.by_route_ids([route_id],
        date: date,
        direction_id: direction_id,
        stop_ids: [stop_id]
      )

    opts = [route: route_id, stop: stop_id, direction_id: direction_id]
    predictions_fn = &Predictions.Repo.all/1
    predictions = (today? && predictions_fn.(opts)) || []

    journeys =
      schedules
      |> JourneyList.build(predictions, :predictions_then_schedules, true,
        origin_id: stop_id,
        destination_id: nil,
        current_time: conn.assigns.date_time
      )
      |> Map.get(:journeys)
      |> Enum.map(&lift_up_route/1)
      |> Enum.map(&json_safe_journey/1)
      |> Enum.map(&format_schedule_time/1)
      |> Enum.map(&Map.drop(&1, [:arrival]))

    json(conn, journeys)
  end

  @spec departures(Plug.Conn.t(), map) :: Plug.Conn.t()
  def departures(conn, %{
        "id" => route_id,
        "date" => date,
        "direction" => direction_id,
        "stop" => stop_id
      }) do
    {:ok, date} = Date.from_iso8601(date)
    today? = Date.diff(date, conn.assigns.date_time) == 0
    direction_id = String.to_integer(direction_id)

    schedules =
      Schedules.Repo.by_route_ids([route_id],
        date: date,
        direction_id: direction_id,
        stop_ids: [stop_id]
      )

    opts = [route: route_id, stop: stop_id, direction_id: direction_id]
    predictions_fn = &Predictions.Repo.all/1
    predictions = (today? && predictions_fn.(opts)) || []

    journeys =
      schedules
      |> JourneyList.build_predictions_only(predictions, stop_id, nil)
      |> Map.get(:journeys)
      |> Enum.map(&lift_up_route/1)
      |> Enum.map(&json_safe_journey/1)
      |> Enum.map(&format_schedule_time/1)
      |> Enum.map(&Map.drop(&1, [:arrival]))

    json(conn, journeys)
  end

  @spec trip(Plug.Conn.t(), map) :: Plug.Conn.t()
  def trip(conn, %{
        "id" => trip_id,
        "route" => route_id,
        "date" => date,
        "direction" => direction,
        "stop" => origin
      }) do
    {:ok, date} = Date.from_iso8601(date)
    direction_id = String.to_integer(direction)
    route = Routes.Repo.get(route_id)

    trip_info =
      conn
      |> assign(:date, date)
      |> assign(:direction_id, direction_id)
      |> assign(:origin, origin)
      |> assign(:route, route)
      |> Map.put(:query_params, %{"trip" => trip_id})
      |> Vehicles.call(Vehicles.init([]))
      |> Trips.call(Trips.init([]))
      |> Map.get(:assigns)
      |> Map.get(:trip_info)
      |> json_safe_trip_info(trip_id)

    json(conn, trip_info)
  end

  @spec lift_up_route(Journey.t()) :: Journey.t()
  defp lift_up_route(%Journey{departure: %{schedule: %{route: route}}} = journey) do
    Map.put_new(journey, :route, Route.to_json_safe(route))
  end

  @spec json_safe_journey(Journey.t()) :: map
  defp json_safe_journey(%Journey{departure: departure} = journey) do
    clean_schedule = departure.schedule |> Map.drop([:route, :trip]) |> Map.put(:stop, nil)
    clean_departure = Map.put(departure, :schedule, clean_schedule)

    clean_departure =
      case clean_departure.prediction do
        nil ->
          clean_departure

        prediction ->
          clean_prediction = prediction |> Map.drop([:route, :trip]) |> Map.put(:stop, nil)

          Map.put(clean_departure, :prediction, clean_prediction)
      end

    Map.put(journey, :departure, clean_departure)
  end

  defp json_safe_trip_info(%TripInfo{} = trip_info, trip_id) do
    fare_params = %{
      trip: trip_id,
      route: trip_info.route,
      origin: trip_info.origin_id,
      destination: trip_info.destination_id
    }

    clean_schedules_and_predictions =
      trip_info.times
      |> Enum.map(&Map.from_struct/1)
      |> Enum.map(&clean_schedule_or_prediction(&1, :schedule))
      |> Enum.map(&clean_schedule_or_prediction(&1, :prediction))
      |> Enum.map(&add_computed_fare(&1, fare_params))

    trip_info
    |> add_computed_fare(fare_params)
    |> Map.drop([:route, :base_fare])
    |> Map.put(:times, clean_schedules_and_predictions)
  end

  defp clean_schedule_or_prediction(%{prediction: nil} = no_prediction, :prediction) do
    no_prediction
  end

  defp clean_schedule_or_prediction(schedule_or_prediction, key) do
    schedule_or_prediction
    |> update_in([key], &Map.from_struct/1)
    |> update_in([key], &Map.drop(&1, [:route, :trip]))
  end

  defp add_computed_fare(%{schedule: %{stop: %{id: id}}} = container, fare_params) do
    fare_params = Map.put(fare_params, :destination, id)
    update_in(container, [:schedule], &Map.put(&1, :fare, do_add_computed_fare(fare_params)))
  end

  defp add_computed_fare(container, fare_params) do
    Map.put(container, :fare, do_add_computed_fare(fare_params))
  end

  defp do_add_computed_fare(fare_params) do
    fares_for_service(
      fare_params.route,
      fare_params.trip,
      fare_params.origin,
      fare_params.destination
    )
  end

  defp format_schedule_time(%Journey{departure: departure} = journey) do
    scheduled_time = format_time(departure.schedule.time)
    updated_schedule = Map.put(departure.schedule, :time, scheduled_time)
    updated_departure = Map.put(departure, :schedule, updated_schedule)

    Map.put(journey, :departure, updated_departure)
  end
end
