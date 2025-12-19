defmodule Dotcom.ScheduleFinder.UpcomingDepartures do
  @moduledoc """
  This represents realtime data for upcoming departures, including trip details.

  This is built out of prediction data, combined with data from stops and vehicles
  in order to present a single model containing everything needed to convey rider
  info about an upcoming departure.
  """

  alias Dotcom.Utils.ServiceDateTime
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.Schedule
  alias __MODULE__.UpcomingDeparture.{OtherStop, TripDetails}

  @predictions_repo Application.compile_env!(:dotcom, :repo_modules)[:predictions]
  @schedules_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules]

  defmodule UpcomingDeparture do
    @moduledoc """
    A struct representing an upcoming departure.
    """

    defstruct [
      :arrival_status,
      :headsign,
      :trip_details,
      :trip_id
    ]

    defmodule TripDetails do
      @moduledoc """
      A struct representing trip details, including a list of stops visited before and after
      the stop specified, along with arrival times (or departure times when relevant).
      """

      defstruct [
        :stops_before,
        :stop,
        :stops_after
      ]
    end

    defmodule OtherStop do
      @moduledoc """
      A simple struct representing the stops visited and arrival times as part of a `TripDetails`.
      """

      defstruct [
        :stop_id,
        :stop_name,
        :time
      ]
    end
  end

  def upcoming_departures(%{
        direction_id: direction_id,
        now: now,
        route: route,
        stop_id: stop_id
      }) do
    predictions_by_trip_id =
      [
        route: route.id,
        direction_id: direction_id,
        include_terminals: true
      ]
      |> @predictions_repo.all()
      |> reject_timeless_predictions()
      |> Enum.sort_by(&prediction_time/1, DateTime)
      |> Enum.group_by(& &1.trip.id)

    schedules_by_trip_id =
      @schedules_repo.by_route_ids([route.id],
        direction_id: direction_id,
        date: now |> ServiceDateTime.service_date()
      )
      |> Enum.sort_by(&prediction_time/1, DateTime)
      |> Enum.group_by(& &1.trip.id)

    route_type = Route.type_atom(route)

    PredictedSchedule.get(route.id, stop_id,
      direction_id: direction_id,
      now: now,
      include_terminals: true
    )
    |> reject_timeless_predictions()
    |> Enum.filter(&(departure_time(&1) != nil))
    |> Enum.sort_by(&prediction_time/1, DateTime)
    |> Enum.map(fn predicted_schedule ->
      to_upcoming_departure(%{
        now: now,
        predicted_schedule: predicted_schedule,
        predictions_by_trip_id: predictions_by_trip_id,
        route_type: route_type,
        schedules_by_trip_id: schedules_by_trip_id,
        stop_id: stop_id
      })
    end)
    |> Enum.reject(&(&1.arrival_status == :hidden))
  end

  defp reject_timeless_predictions(predictions) do
    predictions
    |> Enum.reject(fn
      %Prediction{arrival_time: nil, departure_time: nil} -> true
      _ -> false
    end)
  end

  def to_upcoming_departure(%{
        now: now,
        predicted_schedule: predicted_schedule,
        predictions_by_trip_id: predictions_by_trip_id,
        route_type: route_type,
        schedules_by_trip_id: schedules_by_trip_id,
        stop_id: stop_id
      }) do
    trip = predicted_schedule |> PredictedSchedule.trip()

    realtime? = predicted_schedule.prediction != nil

    trip_details =
      trip_details(
        if(realtime?, do: predictions_by_trip_id, else: schedules_by_trip_id),
        trip.id,
        stop_id
      )

    %UpcomingDeparture{
      arrival_status:
        arrival_status(%{
          predicted_schedule: predicted_schedule,
          route_type: route_type,
          now: now
        }),
      headsign: trip.headsign,
      trip_details: trip_details,
      trip_id: trip.id
    }
  end

  defp seconds_between(nil, _now), do: nil
  defp seconds_between(prediction_time, now), do: DateTime.diff(prediction_time, now, :second)

  defp trip_details(predictions_by_trip_id, trip_id, stop_id) do
    other_stops = other_stops(predictions_by_trip_id |> Map.get(trip_id))

    {stops_before, stop, stops_after} =
      other_stops
      |> Enum.split_while(&(&1.stop_id != stop_id))
      |> case do
        {bef, []} -> {bef, nil, []}
        {bef, [st | aft]} -> {bef, st, aft}
      end

    %TripDetails{stops_before: stops_before, stop: stop, stops_after: stops_after}
  end

  defp other_stops(nil), do: []

  defp other_stops(predictions) do
    predictions
    |> Enum.map(
      &%OtherStop{
        stop_id: &1.stop.id,
        stop_name: &1.stop.name,
        time: prediction_time(&1)
      }
    )
    |> Enum.sort_by(& &1.time)
  end

  defp departure_time(%PredictedSchedule{prediction: %Prediction{departure_time: time}}), do: time
  defp departure_time(%PredictedSchedule{schedule: %Schedule{departure_time: time}}), do: time

  defp prediction_time(%{arrival_time: time}) when time != nil, do: time
  defp prediction_time(%{departure_time: time}), do: time

  defp prediction_time(%PredictedSchedule{prediction: prediction}) when prediction != nil,
    do: prediction_time(prediction)

  defp prediction_time(%PredictedSchedule{schedule: schedule}) when schedule != nil,
    do: prediction_time(schedule)

  defp arrival_status(%{
         predicted_schedule: %PredictedSchedule{prediction: nil},
         route_type: :subway
       }),
       do: :hidden

  defp arrival_status(%{
         predicted_schedule: %PredictedSchedule{prediction: prediction},
         route_type: route_type,
         now: now
       })
       when prediction != nil do
    arrival_seconds = seconds_between(prediction.arrival_time, now)
    departure_seconds = seconds_between(prediction.departure_time, now)

    realtime_arrival_status(%{
      # predicted_schedule: predicted_schedule,
      arrival_seconds: arrival_seconds,
      departure_seconds: departure_seconds,
      route_type: route_type
    })
  end

  defp arrival_status(%{
         predicted_schedule: %PredictedSchedule{schedule: schedule},
         route_type: _route_type
       })
       when schedule != nil do
    {:scheduled, prediction_time(schedule)}
  end

  defp realtime_arrival_status(%{
         arrival_seconds: arrival_seconds,
         departure_seconds: departure_seconds,
         route_type: :subway
       })
       when (arrival_seconds <= 0 or arrival_seconds == nil) and departure_seconds <= 90,
       do: :boarding

  defp realtime_arrival_status(%{
         arrival_seconds: arrival_seconds,
         departure_seconds: departure_seconds,
         route_type: :bus
       })
       when (arrival_seconds <= 0 or arrival_seconds == nil) and departure_seconds <= 90,
       do: :now

  defp realtime_arrival_status(%{
         arrival_seconds: nil,
         departure_seconds: seconds
       }),
       do: {:departure_seconds, seconds}

  defp realtime_arrival_status(%{arrival_seconds: seconds, route_type: :bus}) when seconds <= 30,
    do: :now

  defp realtime_arrival_status(%{arrival_seconds: seconds, route_type: :subway})
       when seconds <= 30,
       do: :arriving

  defp realtime_arrival_status(%{arrival_seconds: seconds, route_type: :subway})
       when seconds <= 60,
       do: :approaching

  defp realtime_arrival_status(%{arrival_seconds: seconds}), do: {:arrival_seconds, seconds}
end
