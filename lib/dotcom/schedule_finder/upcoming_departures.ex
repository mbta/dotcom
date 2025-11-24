defmodule Dotcom.ScheduleFinder.UpcomingDepartures do
  alias Predictions.Prediction

  alias Vehicles.Vehicle

  @predictions_repo Application.compile_env!(:dotcom, :repo_modules)[:predictions]
  @vehicles_repo Application.compile_env!(:dotcom, :repo_modules)[:vehicles]

  defmodule UpcomingDeparture do
    defstruct [
      :vehicle_status,
      :arrival_status,
      :seconds,
      :trip_id,
      :headsign,
      :vehicle_stop_id,
      :prediction_stop_id,
      :vehicle,
      :prediction
    ]
  end

  def upcoming_departures(%{
        direction_id: direction_id,
        now: now,
        route_id: route_id,
        stop_id: stop_id
      }) do
    [
      route: route_id,
      direction_id: direction_id
    ]
    |> @predictions_repo.all()
    |> Enum.filter(&(&1.stop.id == stop_id))
    |> Enum.map(fn prediction ->
      prediction |> to_upcoming_departure(now)
    end)
  end

  def to_upcoming_departure(prediction, now) do
    vehicle = prediction |> vehicle()
    predicted_time = prediction.arrival_time

    seconds = DateTime.diff(predicted_time, now, :second)

    %UpcomingDeparture{
      # vehicle: vehicle,
      # prediction: prediction,
      trip_id: prediction.trip.id,
      headsign: prediction.trip.headsign,
      arrival_status: arrival_status(seconds),
      seconds: seconds,
      vehicle_status: vehicle |> vehicle_status(),
      vehicle_stop_id: vehicle |> vehicle_stop_id(),
      prediction_stop_id: prediction.platform_stop_id
    }
  end

  defp arrival_status(seconds) when seconds > 60, do: {:minutes, div(seconds, 60)}
  defp arrival_status(seconds) when seconds > 30, do: :approaching
  defp arrival_status(seconds) when seconds > 0, do: :arriving
  defp arrival_status(seconds), do: {:past_due, seconds}

  def vehicle(%Prediction{trip: %{id: trip_id}}) do
    @vehicles_repo.trip(trip_id)
  end

  def vehicle_status(%Vehicle{status: status}), do: status
  def vehicle_status(_), do: nil

  def vehicle_stop_id(%Vehicle{stop_id: stop_id}), do: stop_id
  def vehicle_stop_id(_), do: nil
end
