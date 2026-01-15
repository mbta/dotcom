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
      :stop_id,
      :stop_name,
      :time
    ]

    @type t :: %__MODULE__{
            cancelled?: boolean(),
            stop_id: Stops.Stop.id_t(),
            stop_name: String.t(),
            time: DateTime.t()
          }
  end

  defmodule VehicleInfo do
    @moduledoc """
    A struct representing the status of a vehicle associated with the trip
    """

    defstruct [
      :crowding,
      :status,
      :stop_id,
      :stop_name
    ]

    @type t :: %__MODULE__{
            crowding: Vehicles.Vehicle.crowding(),
            status: Vehicles.Vehicle.status(),
            stop_id: Stops.Stop.id_t(),
            stop_name: String.t()
          }
  end

  alias Vehicles.Vehicle

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @vehicles_repo Application.compile_env!(:dotcom, :repo_modules)[:vehicles]

  @spec trip_details(%{
          predicted_schedules: [PredictedSchedule.t()],
          trip_id: Schedules.Trip.id_t()
        }) :: __MODULE__.t()
  def trip_details(%{predicted_schedules: predicted_schedules, trip_id: trip_id}) do
    vehicle_info =
      trip_id
      |> @vehicles_repo.trip()
      |> vehicle_info()

    stops =
      predicted_schedules
      |> Enum.map(fn ps ->
        stop = ps |> PredictedSchedule.stop()

        %TripStop{
          cancelled?: PredictedSchedule.cancelled?(ps),
          stop_id: stop.id,
          stop_name: stop.name,
          time: PredictedSchedule.display_time(ps)
        }
      end)
      |> Enum.sort_by(& &1.time, DateTime)
      |> drop_prediction_for_current_station(vehicle_info)

    %__MODULE__{
      stops: stops,
      vehicle_info: vehicle_info
    }
  end

  defp vehicle_info(nil), do: nil

  defp vehicle_info(%Vehicle{crowding: crowding, status: status, stop_id: stop_id}) do
    stop = @stops_repo.get(stop_id)

    %VehicleInfo{
      crowding: crowding,
      status: status,
      stop_id: stop.parent_id || stop.id,
      stop_name: stop.name
    }
  end

  defp drop_prediction_for_current_station(stops, %{status: :stopped, stop_id: stop_id}) do
    case stops do
      [%{stop_id: ^stop_id} | remaining_stops] -> remaining_stops
      _ -> stops
    end
  end

  defp drop_prediction_for_current_station(stops, _), do: stops
end
