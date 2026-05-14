defmodule Dotcom.UpcomingDepartures.UpcomingTripDetails do
  @moduledoc """
  A struct representing trip details, including a list of stops visited before and after
  the stop specified, along with arrival times (or departure times when relevant).
  """

  alias Dotcom.ScheduleFinder.TripDetails

  defstruct [
    :stop,
    :stops_after,
    :stops_before,
    :vehicle_info
  ]

  @type t :: %__MODULE__{
          stop: nil | TripDetails.TripStop.t(),
          stops_after: [TripDetails.TripStop.t()],
          stops_before: [TripDetails.TripStop.t()],
          vehicle_info: TripDetails.VehicleInfo.t()
        }
end
