defmodule Dotcom.ScheduleFinder.UpcomingDepartures do
  alias Predictions.Prediction

  alias Vehicles.Vehicle
  alias __MODULE__.UpcomingDeparture.OtherStop
  alias __MODULE__.UpcomingDeparture.TripDetails

  @predictions_repo Application.compile_env!(:dotcom, :repo_modules)[:predictions]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @vehicles_repo Application.compile_env!(:dotcom, :repo_modules)[:vehicles]

  defmodule UpcomingDeparture do
    defstruct [
      :vehicle_status,
      :arrival_status,
      :arrival_seconds,
      :departure_seconds,
      :trip_id,
      :headsign,
      :vehicle_stop_id,
      :prediction_stop_id,
      :trip_details,
      :vehicle,
      :prediction
    ]

    defmodule TripDetails do
      defstruct [
        :stops_before,
        :stop,
        :stops_after
      ]
    end

    defmodule OtherStop do
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

    predictions_by_trip_id =
      all_predictions
      |> Enum.group_by(& &1.trip.id)

    all_predictions
    |> Enum.filter(&(&1.stop.id == stop_id))
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

    arrival_seconds = DateTime.diff(prediction.arrival_time, now, :second)
    departure_seconds = DateTime.diff(prediction.departure_time, now, :second)

    vehicle_stop_id = vehicle |> vehicle_stop_id()

    other_stops = other_stops(predictions_by_trip_id |> Map.get(prediction.trip.id))

    {stops_before, [stop | stops_after]} =
      other_stops |> Enum.split_while(&(&1.stop_id != stop_id))

    %UpcomingDeparture{
      # vehicle: vehicle,
      # prediction: prediction,
      trip_id: prediction.trip.id,
      headsign: prediction.trip.headsign,
      arrival_status:
        arrival_status(%{
          arrival_seconds: arrival_seconds,
          departure_seconds: departure_seconds,
          stop_id_matches?: vehicle_stop_id == stop_id
        }),
      vehicle_status: vehicle |> vehicle_status(),
      vehicle_stop_id: vehicle_stop_id,
      prediction_stop_id: prediction.platform_stop_id,
      trip_details: %TripDetails{
        stops_before: stops_before,
        stop: stop,
        stops_after: stops_after
      }
    }
  end

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
       when arrival_seconds <= 0 and departure_seconds <= 90,
       do: :boarding

  defp arrival_status(%{arrival_seconds: seconds}) when seconds <= 30, do: :arriving
  defp arrival_status(%{arrival_seconds: seconds}) when seconds <= 60, do: :approaching

  defp arrival_status(%{arrival_seconds: seconds}), do: {:minutes, div(seconds, 60)}

  def vehicle(%Prediction{trip: %{id: trip_id}}) do
    @vehicles_repo.trip(trip_id)
  end

  def vehicle_status(%Vehicle{status: status}), do: status
  def vehicle_status(_), do: nil

  def vehicle_stop_id(%Vehicle{stop_id: stop_id}),
    do: stop_id |> @stops_repo.get_parent() |> Kernel.then(& &1.id)

  def vehicle_stop_id(_), do: nil
end
