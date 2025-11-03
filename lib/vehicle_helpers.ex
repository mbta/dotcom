defmodule VehicleHelpers do
  @moduledoc """
  Various functions for working on lists of vehicle to show on a map, or render tooltips.
  """

  use Dotcom.Gettext.Sigils

  import Routes.Route, only: [vehicle_name: 1]

  alias DotcomWeb.ScheduleController.VehicleLocations
  alias Predictions.Prediction
  alias Routes.Route
  alias Stops.Stop
  alias Schedules.Trip
  alias Vehicles.Vehicle

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @type tooltip_index_key :: {Trip.id_t() | nil, Stop.id_t()} | Stop.id_t()
  @type tooltip_index :: %{
          optional({Trip.id_t() | nil, Stop.id_t()}) => VehicleTooltip.t(),
          optional(Stop.id_t()) => VehicleTooltip.t()
        }

  @doc """
  There are multiple places where vehicle tooltips are used. This function is called from the controller to
  construct a convenient map that can be used in views / templates to determine if a tooltip is available
  and to fetch all of the required data
  """
  @spec build_tooltip_index(Route.t(), VehicleLocations.t(), [Prediction.t()]) :: tooltip_index
  def build_tooltip_index(route, vehicle_locations, vehicle_predictions) do
    indexed_predictions = index_vehicle_predictions(vehicle_predictions)

    vehicle_locations
    |> Stream.reject(fn {{_trip_id, stop_id}, _status} -> is_nil(stop_id) end)
    |> Enum.reduce(%{}, fn vehicle_location, output ->
      {{trip_id, stop_id}, vehicle} = vehicle_location

      {prediction, trip} =
        if trip_id do
          {
            prediction_for_stop(indexed_predictions, trip_id, vehicle.stop_id),
            Schedules.Repo.trip(trip_id)
          }
        else
          {nil, nil}
        end

      stop_name = @stops_repo.get(vehicle.stop_id) |> stop_name()

      tooltip = %VehicleTooltip{
        vehicle: vehicle,
        prediction: prediction,
        stop_name: stop_name,
        trip: trip,
        route: route
      }

      output
      |> Map.put(stop_id, tooltip)
      |> Map.put({trip_id, stop_id}, tooltip)
    end)
  end

  @spec prediction_for_stop(VehicleLocations.t(), String.t(), String.t()) :: Prediction.t() | nil
  defp prediction_for_stop(vehicle_predictions, trip_id, stop_id) do
    Map.get(vehicle_predictions, {trip_id, stop_id})
  end

  @spec index_vehicle_predictions([Prediction.t()]) :: %{
          {String.t(), String.t()} => Prediction.t()
        }
  defp index_vehicle_predictions(predictions) do
    predictions
    |> Stream.filter(&(&1.trip && &1.stop))
    |> Stream.map(&{{&1.trip.id, &1.stop.id}, &1})
    |> Enum.into(Map.new())
  end

  @spec stop_name(Stops.Stop.t() | nil) :: String.t()
  defp stop_name(nil), do: ""
  defp stop_name(stop), do: stop.name

  @doc """
  Function used to return tooltip text for a VehicleTooltip struct
  """
  @spec tooltip(VehicleTooltip.t() | nil) :: Phoenix.HTML.Safe.t()
  def tooltip(nil) do
    ""
  end

  def tooltip(%VehicleTooltip{
        prediction: prediction,
        vehicle: vehicle,
        trip: trip,
        stop_name: stop_name,
        route: route
      }) do
    status_text = prediction_status_text(prediction)
    stop_text = realtime_stop_text(trip, stop_name, vehicle, route)
    build_tooltip(status_text, stop_text)
  end

  @spec prediction_status_text(Prediction.t() | nil) :: iodata
  defp prediction_status_text(%Prediction{status: status, track: track})
       when not is_nil(track) and not is_nil(status) do
    [String.downcase(status), ~t" on track ", track]
  end

  defp prediction_status_text(_) do
    []
  end

  @spec realtime_stop_text(Trip.t() | nil, String.t(), Vehicle.t() | nil, Route.t()) :: iodata
  defp realtime_stop_text(trip, stop_name, %Vehicle{status: status}, route) do
    [
      display_headsign_text(route, trip),
      String.downcase(vehicle_name(route)),
      display_trip_name(route, trip)
    ] ++
      realtime_status_with_stop(status, stop_name)
  end

  @spec display_headsign_text(Route.t(), Trip.t() | nil) :: iodata
  defp display_headsign_text(_, %{headsign: headsign}), do: [headsign, " "]
  defp display_headsign_text(%{name: name}, _), do: [name, " "]
  defp display_headsign_text(_, _), do: ""

  @spec realtime_status_with_stop(atom, String.t()) :: iodata()
  defp realtime_status_with_stop(_status, "") do
    []
  end

  defp realtime_status_with_stop(status, stop_name) do
    [
      realtime_status_text(status),
      stop_name
    ]
  end

  @spec realtime_status_text(atom) :: String.t()
  defp realtime_status_text(:incoming), do: ~t" is arriving at "
  defp realtime_status_text(:stopped), do: ~t" has arrived at "
  defp realtime_status_text(:in_transit), do: ~t" is on the way to "

  @spec display_trip_name(Route.t(), Trip.t() | nil) :: iodata
  defp display_trip_name(%{type: 2}, %{name: name}) when is_binary(name), do: [" ", name]
  defp display_trip_name(_, _), do: ""

  @spec build_tooltip(iodata, iodata) :: String.t()
  defp build_tooltip([], stop_text), do: to_string(stop_text)

  defp build_tooltip(status_text, stop_text) do
    status_str = to_string(status_text)
    stop_str = to_string(stop_text)

    # Handle the special case where prediction is "departed" but vehicle status shows "arrived"
    final_stop_str =
      if String.contains?(status_str, ~t"departed") and String.contains?(stop_str, ~t"arrived at") do
        String.replace(stop_str, ~t"arrived at", ~t"has left")
      else
        stop_str
      end

    # Use proper translation for comma separator
    final_stop_str <> ~t", " <> status_str
  end
end
