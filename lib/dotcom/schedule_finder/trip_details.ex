defmodule Dotcom.ScheduleFinder.TripDetails do
  @moduledoc """
  A struct representing trip details, including a list of stops
  visited (stop name, stop id, and arrival time), as well as
  the vehicle's status.
  """

  defstruct [
    :stops,
    :vehicle_info
  ]

  @type t :: %__MODULE__{
          stops: [__MODULE__.TripStop.t()],
          vehicle_info: nil | __MODULE__.VehicleInfo.t()
        }

  defmodule TripStop do
    @moduledoc """
    A simple struct representing the stops visited and arrival times as part of a `TripDetails`.
    """

    defstruct [
      :cancelled?,
      :platform_name,
      :stop_id,
      :stop_name,
      :stop_sequence,
      :time
    ]

    @type time_t() :: {:time, DateTime.t()} | {:status, String.t()}

    @type t :: %__MODULE__{
            cancelled?: boolean(),
            platform_name: nil | String.t(),
            stop_id: Stops.Stop.id_t(),
            stop_name: String.t(),
            stop_sequence: non_neg_integer(),
            time: time_t()
          }
  end

  defmodule VehicleInfo do
    @moduledoc """
    A struct representing the status of a vehicle associated with the trip
    """

    defstruct [
      :crowding,
      :departure_time,
      :platform_name,
      :status,
      :stop_id,
      :stop_name,
      :stop_sequence,
      :vehicle_name
    ]

    @type trip_vehicle_status_t() ::
            Vehicles.Vehicle.status()
            | :location_not_available

    @type t :: %__MODULE__{
            crowding: Vehicles.Vehicle.crowding(),
            departure_time: DateTime.t(),
            platform_name: nil | String.t(),
            status: trip_vehicle_status_t(),
            stop_id: Stops.Stop.id_t(),
            stop_name: String.t(),
            stop_sequence: non_neg_integer(),
            vehicle_name: nil | String.t()
          }
  end

  import Dotcom.Utils.Time, only: [truncate: 2]

  alias Dotcom.ScheduleFinder
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias Vehicles.Vehicle

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @spec trip_details(%{
          predicted_schedules: [PredictedSchedule.t()],
          trip_vehicle: Vehicles.Vehicle.t() | nil
        }) :: __MODULE__.t()
  def trip_details(%{predicted_schedules: predicted_schedules, trip_vehicle: vehicle}) do
    vehicle_info = vehicle_info(vehicle, predicted_schedules) |> add_vehicle_name(vehicle)

    stops =
      predicted_schedules
      |> Enum.map(fn ps ->
        stop = ps |> PredictedSchedule.stop()
        platform_name = ps |> platform_name()

        %TripStop{
          cancelled?: PredictedSchedule.cancelled?(ps),
          platform_name: platform_name,
          stop_id: stop.id,
          stop_name: stop.name,
          stop_sequence: PredictedSchedule.stop_sequence(ps),
          time: trip_stop_time(ps)
        }
      end)
      |> Enum.sort_by(& &1.stop_sequence)
      |> drop_predictions_before_current_station(vehicle_info)

    %__MODULE__{
      stops: stops,
      vehicle_info: vehicle_info
    }
  end

  defp add_vehicle_name(vehicle_info, nil), do: vehicle_info

  defp add_vehicle_name(vehicle_info, vehicle) do
    vehicle_id = Map.get(vehicle, :id, nil)

    mode =
      if is_nil(vehicle.route_id) do
        nil
      else
        vehicle.route_id |> @routes_repo.get() |> Route.type_atom()
      end

    # Only add vehicle names for ferries (for now?) Turns out busses have vehicle IDs too.
    # While it is cool to see that "The Y1795" is approaching, I'm not sure that's what we want
    if mode == :ferry do
      vehicle_info
      |> Map.put(:vehicle_name, boat_name(vehicle_id))
    else
      vehicle_info
    end
  end

  defp trip_stop_time(predicted_schedule) do
    %Route{type: route_type} = PredictedSchedule.route(predicted_schedule)
    status = PredictedSchedule.status(predicted_schedule)

    if route_type in [0, 1] && status do
      {:status, status}
    else
      {:time, predicted_schedule |> PredictedSchedule.display_time() |> truncate(:minute)}
    end
  end

  defp platform_name(predicted_schedule) do
    %Route{type: route_type} = PredictedSchedule.route(predicted_schedule)

    stop_id =
      predicted_schedule
      |> PredictedSchedule.stop()
      |> Map.get(:id)

    predicted_schedule
    |> PredictedSchedule.platform_stop_id()
    |> @stops_repo.get()
    |> Kernel.then(& &1.platform_name)
    |> ScheduleFinder.platform_name_for_stop(route_type, stop_id)
  end

  defp vehicle_info(nil, [
         %PredictedSchedule{
           schedule: %Schedule{arrival_time: nil, departure_time: departure_time, stop: stop},
           prediction: nil
         } = ps
         | _
       ]) do
    %VehicleInfo{
      departure_time: departure_time |> truncate(:minute),
      platform_name: platform_name(ps),
      status: :scheduled_to_depart,
      stop_id: stop.id,
      stop_name: stop.name
    }
  end

  defp vehicle_info(nil, _), do: %VehicleInfo{status: :location_unavailable}

  defp vehicle_info(%Vehicle{stop_id: nil}, _), do: %VehicleInfo{status: :location_unavailable}

  defp vehicle_info(
         %Vehicle{
           crowding: crowding,
           status: :stopped,
           stop_id: stop_id,
           stop_sequence: stop_sequence,
           trip_id: vehicle_trip_id
         },
         [
           %PredictedSchedule{
             prediction: %Prediction{
               arrival_time: nil,
               departure_time: departure_time,
               trip: %Trip{id: prediction_trip_id}
             }
           } = ps
           | _
         ]
       )
       when prediction_trip_id == vehicle_trip_id do
    stop = @stops_repo.get(stop_id)

    %VehicleInfo{
      crowding: crowding,
      departure_time: departure_time,
      platform_name: platform_name(ps),
      status: :waiting_to_depart,
      stop_id: stop.parent_id || stop.id,
      stop_name: stop.name,
      stop_sequence: stop_sequence
    }
  end

  defp vehicle_info(
         %Vehicle{
           crowding: crowding,
           status: status,
           stop_id: stop_id,
           stop_sequence: stop_sequence,
           trip_id: vehicle_trip_id
         },
         [
           %PredictedSchedule{prediction: %Prediction{trip: %Trip{id: prediction_trip_id}}} = ps
           | _
         ]
       )
       when prediction_trip_id == vehicle_trip_id do
    stop = @stops_repo.get(stop_id)

    %VehicleInfo{
      crowding: crowding,
      platform_name: platform_name(ps),
      status: status,
      stop_id: stop.parent_id || stop.id,
      stop_name: stop.name,
      stop_sequence: stop_sequence
    }
  end

  defp vehicle_info(_, _),
    do: %VehicleInfo{status: :finishing_another_trip}

  # Sometimes predictions might not keep up with vehicles
  # If we have a vehicle status, use it to omit past stops
  defp drop_predictions_before_current_station(
         trip_stops,
         %VehicleInfo{} = vehicle_info
       ) do
    current = current_stop_index(trip_stops, vehicle_info) || 0

    upcoming_stops = Enum.take(trip_stops, current - length(trip_stops))

    # Omit current trip_stop if the vehicle is stopped
    if vehicle_info.status in [:stopped, :scheduled_to_depart, :waiting_to_depart] do
      Enum.drop(upcoming_stops, 1)
    else
      upcoming_stops
    end
  end

  defp current_stop_index(trip_stops, vehicle_info) do
    Enum.find_index(trip_stops, &vehicle_at_stop?(&1, vehicle_info))
  end

  defp vehicle_at_stop?(stop, vehicle) do
    stop.stop_id == vehicle.stop_id && stop.stop_sequence == vehicle.stop_sequence
  end

  defp boat_name(nil = _name) do
    nil
  end

  defp boat_name(name) do
    ("The " <> name)
    |> String.split(" ")
    |> Enum.map_join(
      " ",
      &String.capitalize/1
    )
  end
end
