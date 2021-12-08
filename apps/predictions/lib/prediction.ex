defmodule Predictions.Prediction do
  @moduledoc """
  A prediction of when a vehicle will arrive at a stop.
  """

  @derive Jason.Encoder

  defstruct id: nil,
            trip: nil,
            stop: nil,
            route: nil,
            direction_id: nil,
            time: nil,
            stop_sequence: 0,
            schedule_relationship: nil,
            track: nil,
            status: nil,
            departing?: false

  @type id_t :: String.t()
  @type schedule_relationship :: nil | :added | :unscheduled | :cancelled | :skipped | :no_data
  @type t :: %__MODULE__{
          id: id_t,
          trip: Schedules.Trip.t() | nil,
          stop: Stops.Stop.t(),
          route: Routes.Route.t(),
          direction_id: 0 | 1,
          time: DateTime.t() | nil,
          stop_sequence: non_neg_integer,
          schedule_relationship: schedule_relationship,
          track: String.t() | nil,
          status: String.t() | nil,
          departing?: boolean
        }

  @spec is_skipped_or_cancelled?(__MODULE__.t()) :: boolean()
  def is_skipped_or_cancelled?(%__MODULE__{schedule_relationship: schedule_relationship})
      when schedule_relationship in [:cancelled, :skipped],
      do: true

  def is_skipped_or_cancelled?(_), do: false
end
