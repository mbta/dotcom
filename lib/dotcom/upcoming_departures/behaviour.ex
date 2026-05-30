defmodule Dotcom.UpcomingDepartures.Behaviour do
  @moduledoc """
  Behaviour for the upcoming departures module.
  """

  alias Dotcom.UpcomingDepartures.{UpcomingDeparture, UpcomingTripDetails}

  @callback upcoming_departures(map()) ::
              [UpcomingDeparture.t()]
              | :no_realtime
              | :no_service
              | :service_ended
              | {:before_service, UpcomingDeparture.t()}
              | {:no_realtime, [UpcomingDeparture.t()]}

  @callback trip_details(map()) :: UpcomingTripDetails.t()
end
