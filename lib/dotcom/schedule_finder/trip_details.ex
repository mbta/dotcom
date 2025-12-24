defmodule Dotcom.ScheduleFinder.TripDetails do
  @moduledoc """
  A struct representing trip details, including a list of stops visited before and after
  the stop specified, along with arrival times (or departure times when relevant).
  """

  defstruct [
    :stops
  ]

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
  end

  def trip_details(%{predicted_schedules: predicted_schedules}) do
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
      |> Enum.sort_by(& &1.time)

    %__MODULE__{
      stops: stops
    }
  end
end
