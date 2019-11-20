defmodule SiteWeb.ScheduleController.FinderApi do
  @moduledoc """
    API for retrieving journeys for a route, and for
    showing trip details for each journey.
  """
  use SiteWeb, :controller

  alias Routes.Route

  import SiteWeb.ScheduleController.ScheduleApi, only: [format_time: 1]

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

  defp format_schedule_time(%Journey{departure: departure} = journey) do
    scheduled_time = format_time(departure.schedule.time)
    updated_schedule = Map.put(departure.schedule, :time, scheduled_time)
    updated_departure = Map.put(departure, :schedule, updated_schedule)

    Map.put(journey, :departure, updated_departure)
  end
end
