defmodule TripPlan.Api do
  @moduledoc """
  Behaviour for planning modules.

  They must implement the `plan/3` function, which takes an origin, destination and options,
  and returns either a list of %Itinerary{} or an error.

  """
  alias TripPlan.Itinerary
  alias Util.Position

  @type plan_opt ::
          {:arrive_by, DateTime.t()}
          | {:depart_at, DateTime.t()}
          | {:wheelchair_accessible?, boolean}
          | {:optimize_for, :less_walking | :fewest_transfers}
          | {:max_walk_distance, float}
  @type plan_opts :: [plan_opt]
  @type connection_opt ::
          {:user_id, integer}
          | {:force_otp1, boolean}
          | {:force_otp2, boolean}
  @type connection_opts :: [connection_opt]

  @type error ::
          :outside_bounds
          | :timeout
          | :no_transit_times
          | :too_close
          | :location_not_accessible
          | :path_not_found
          | :unknown
  @type t :: {:ok, [Itinerary.t()]} | {:error, error}

  @doc """
  Plans a trip between two locations.
  """
  @callback plan(
              from :: Position.t(),
              to :: Position.t(),
              conn_opts :: connection_opts,
              opts :: plan_opts
            ) :: t
end
