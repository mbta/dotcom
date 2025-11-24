defmodule Dotcom.ScheduleFinder.UpcomingDepartures do
  alias Predictions.Prediction

  alias Vehicles.Vehicle

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
      prediction |> to_upcoming_departure(%{now: now, stop_id: stop_id})
    end)
  end

  def to_upcoming_departure(prediction, %{now: now, stop_id: stop_id}) do
    vehicle = prediction |> vehicle()

    arrival_seconds = DateTime.diff(prediction.arrival_time, now, :second)
    departure_seconds = DateTime.diff(prediction.departure_time, now, :second)

    vehicle_stop_id = vehicle |> vehicle_stop_id()

    %UpcomingDeparture{
      # vehicle: vehicle,
      # prediction: prediction,
      trip_id: prediction.trip.id,
      headsign: prediction.trip.headsign,
      arrival_status:
        arrival_status(%{
          arrival_seconds: arrival_seconds,
          stop_id_matches?: vehicle_stop_id == stop_id
        }),
      arrival_seconds: arrival_seconds,
      departure_seconds: departure_seconds,
      vehicle_status: vehicle |> vehicle_status(),
      vehicle_stop_id: vehicle_stop_id,
      prediction_stop_id: prediction.platform_stop_id
    }
  end

  defp arrival_status(%{arrival_seconds: seconds}) when seconds > 60,
    do: {:minutes, div(seconds, 60)}

  defp arrival_status(%{arrival_seconds: seconds}) when seconds > 30, do: :approaching
  defp arrival_status(%{arrival_seconds: seconds}) when seconds > 0, do: :arriving

  defp arrival_status(%{arrival_seconds: seconds, stop_id_matches?: true}) when seconds <= 0,
    do: :boarding

  defp arrival_status(%{arrival_seconds: seconds}), do: {:past_due, seconds}

  def vehicle(%Prediction{trip: %{id: trip_id}}) do
    @vehicles_repo.trip(trip_id)
  end

  def vehicle_status(%Vehicle{status: status}), do: status
  def vehicle_status(_), do: nil

  def vehicle_stop_id(%Vehicle{stop_id: stop_id}),
    do: stop_id |> @stops_repo.get_parent() |> Kernel.then(& &1.id)

  def vehicle_stop_id(_), do: nil
end
