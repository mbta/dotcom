defmodule Dotcom.Timetables.Timetable do
  @moduledoc """
  A struct representing timetables. See `Dotcom.Timetables` for more information.
  """
  defstruct [:rows]

  @type t() :: %__MODULE__{
          rows: [[__MODULE__.Cell.t()]]
        }

  defmodule Cell do
    @moduledoc """
    A struct representing timetable cells. See `Dotcom.Timetables` for more information.
    """
    defstruct [:time, :trip, :stop_id]

    @type t() :: %__MODULE__{
            time: String.t(),
            trip: %{id: Schedules.Trip.id_t(), name: String.t()} | Schedules.Trip.t(),
            stop_id: Stops.Stop.id_t()
          }
  end
end
