defmodule Journey do
  @moduledoc """
  Represents a schedule at a stop (origin or destination) or a pair of stops (origin and destination).
  """

  defstruct [:departure, :arrival, :trip]

  @type t :: %__MODULE__{
          departure: PredictedSchedule.t() | nil,
          arrival: PredictedSchedule.t() | nil,
          trip: Schedules.Trip.t() | nil
        }
end
