defmodule Dotcom.UpcomingDepartures.UpcomingTripDetails do
  @moduledoc """
  A struct representing trip details, including a list of stops visited before and after
  the stop specified, along with arrival times (or departure times when relevant).

  `stops_after` may include stops on in-seat transfer trips, each of which is
  preceded by a `TripHeading`.
  """

  alias Dotcom.InSeatTransfers.TripHeading
  alias Dotcom.ScheduleFinder.TripDetails

  defstruct [
    :stop,
    :stops_after,
    :stops_before,
    :vehicle_info
  ]

  @type t :: %__MODULE__{
          stop: nil | TripDetails.TripStop.t(),
          stops_after: [TripDetails.TripStop.t() | TripHeading.t()],
          stops_before: [TripDetails.TripStop.t()],
          vehicle_info: TripDetails.VehicleInfo.t()
        }
end
