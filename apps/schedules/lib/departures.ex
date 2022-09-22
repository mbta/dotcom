defmodule Schedules.Departures do
  @enforce_keys [:first_departure, :last_departure]
  @derive [Poison.Encoder]
  defstruct [:first_departure, :last_departure]

  @type t :: %__MODULE__{
          first_departure: DateTime.t(),
          last_departure: DateTime.t()
        }
  @doc """
  Given a non-empty list of schedules, returns the first and last times.
  """
  @spec first_and_last_departures(nonempty_list(Schedules.Schedule.t())) :: t
  def first_and_last_departures([_ | _] = schedules) do
    {first, last} = Enum.min_max_by(schedules, & &1.time)

    %__MODULE__{
      first_departure: first.time,
      last_departure: last.time
    }
  end
end
