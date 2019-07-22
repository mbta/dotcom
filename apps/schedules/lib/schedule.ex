defmodule Schedules.Schedule do
  defstruct route: nil,
            trip: nil,
            stop: nil,
            time: nil,
            flag?: false,
            early_departure?: false,
            last_stop?: false,
            stop_sequence: 0,
            pickup_type: 0

  @type t :: %Schedules.Schedule{
          route: Routes.Route.t(),
          trip: Schedules.Trip.t(),
          stop: Stops.Stop.t(),
          time: DateTime.t(),
          flag?: boolean,
          early_departure?: boolean,
          last_stop?: boolean,
          stop_sequence: non_neg_integer,
          pickup_type: integer
        }

  def flag?(%Schedules.Schedule{flag?: value}), do: value
end

defmodule Schedules.Trip do
  defstruct [
    :id,
    :name,
    :headsign,
    :direction_id,
    :shape_id,
    :route_pattern_id,
    bikes_allowed?: false
  ]

  @type id_t :: String.t()
  @type headsign :: String.t()
  @type t :: %Schedules.Trip{
          id: id_t,
          name: String.t(),
          headsign: headsign,
          direction_id: 0 | 1,
          shape_id: String.t() | nil,
          route_pattern_id: String.t(),
          bikes_allowed?: boolean
        }
end

defmodule Schedules.Frequency do
  defstruct time_block: nil,
            min_headway: :infinity,
            max_headway: :infinity

  @type t :: %Schedules.Frequency{
          time_block: atom,
          min_headway: integer | :infinity,
          max_headway: integer | :infinity
        }

  @doc """
  True if the block has headways during the timeframe.
  """
  @spec has_service?(t) :: boolean
  def has_service?(%Schedules.Frequency{min_headway: :infinity}) do
    false
  end

  def has_service?(%Schedules.Frequency{}) do
    true
  end
end
