defmodule Dotcom.ScheduleFinder.UpcomingDepartures do
  @moduledoc """
  This represents realtime data for upcoming departures, including trip details.

  This is built out of prediction data, combined with data from stops and vehicles
  in order to present a single model containing everything needed to convey rider
  info about an upcoming departure.
  """

  alias Predictions.Prediction
  alias Vehicles.Vehicle
  alias __MODULE__.UpcomingDeparture.{OtherStop, TripDetails}

  @predictions_repo Application.compile_env!(:dotcom, :repo_modules)[:predictions]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @vehicles_repo Application.compile_env!(:dotcom, :repo_modules)[:vehicles]

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
        route_id: route_id,
        stop_id: stop_id
      }) do
    all_predictions =
      [
        route: route_id,
        direction_id: direction_id
      ]
      |> @predictions_repo.all()
      |> Enum.sort_by(&prediction_time/1, DateTime)

    predictions_by_trip_id =
      all_predictions
      |> Enum.group_by(& &1.trip.id)

    all_predictions
    |> Enum.filter(&(&1.stop.id == stop_id && &1.departure_time != nil))
    |> Enum.map(fn prediction ->
      prediction
      |> to_upcoming_departure(%{
        now: now,
        stop_id: stop_id,
        predictions_by_trip_id: predictions_by_trip_id
      })
    end)
  end

  def to_upcoming_departure(prediction, %{
        now: now,
        stop_id: stop_id,
        predictions_by_trip_id: predictions_by_trip_id
      }) do
    vehicle = prediction |> vehicle()

    arrival_seconds = seconds_between(prediction.arrival_time, now)
    departure_seconds = seconds_between(prediction.departure_time, now)

    vehicle_stop_id = vehicle |> vehicle_stop_id()

    other_stops = other_stops(predictions_by_trip_id |> Map.get(prediction.trip.id))

    {stops_before, [stop | stops_after]} =
      other_stops |> Enum.split_while(&(&1.stop_id != stop_id))

    %UpcomingDeparture{
      arrival_status:
        arrival_status(%{
          arrival_seconds: arrival_seconds,
          departure_seconds: departure_seconds,
          stop_id_matches?: vehicle_stop_id == stop_id
        }),
      headsign: prediction.trip.headsign,
      trip_details: %TripDetails{stops_before: stops_before, stop: stop, stops_after: stops_after},
      trip_id: prediction.trip.id
    }
  end

  defp seconds_between(nil = _prediction_time, _now), do: nil
  defp seconds_between(prediction_time, now), do: DateTime.diff(prediction_time, now, :second)

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

  defp prediction_time(%Prediction{arrival_time: nil, departure_time: time}), do: time
  defp prediction_time(%Prediction{arrival_time: time}), do: time

  defp arrival_status(%{
         arrival_seconds: arrival_seconds,
         departure_seconds: departure_seconds
       })
       when (arrival_seconds <= 0 or arrival_seconds == nil) and departure_seconds <= 90,
       do: :boarding

  defp arrival_status(%{
         arrival_seconds: nil,
         departure_seconds: seconds
       }),
       do: {:departure_seconds, seconds}

  defp arrival_status(%{arrival_seconds: seconds}) when seconds <= 30, do: :arriving
  defp arrival_status(%{arrival_seconds: seconds}) when seconds <= 60, do: :approaching

  defp arrival_status(%{arrival_seconds: seconds}), do: {:arrival_seconds, seconds}

  def vehicle(%Prediction{trip: %{id: trip_id}}) do
    @vehicles_repo.trip(trip_id)
  end

  def vehicle_status(%Vehicle{status: status}), do: status
  def vehicle_status(_), do: nil

  def vehicle_stop_id(%Vehicle{stop_id: stop_id}),
    do: stop_id |> @stops_repo.get_parent() |> Kernel.then(& &1.id)

  def vehicle_stop_id(_), do: nil
end
