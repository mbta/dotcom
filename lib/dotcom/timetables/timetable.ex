defmodule Dotcom.Timetables.Timetable do
  @moduledoc """
  A struct representing timetables. See `Dotcom.Timetables` for more information.
  """
  defstruct [:rows, :trips]

  @type t() :: %__MODULE__{
          rows: [__MODULE__.Row.t()],
          trips: [Schedules.Trip.t()]
        }

  defmodule Row do
    @moduledoc """
    A struct representing a timetable row. See `Dotcom.Timetables` for more information.
    """
    defstruct [:cells, :stop]

    @type t() :: %__MODULE__{
            cells: [Dotcom.Timetables.Timetable.Cell.t()],
            stop: Stops.Stop.t()
          }
  end

  defmodule Cell do
    @moduledoc """
    A struct representing timetable cells. See `Dotcom.Timetables` for more information.
    """
    defstruct [:time, :trip, :stop_id]

    @type t() :: %__MODULE__{
            time: String.t(),
            trip: %{id: Schedules.Trip.id_t(), name: String.t()} | Schedules.Trip.t()
          }
  end
end
