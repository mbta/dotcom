defmodule Dotcom.ScheduleFinder.Behaviour do
  @moduledoc """
  A behaviour to capture the interface of `Dotcom.ScheduleFinder`.
  """

  alias Alerts.Alert
  alias Dotcom.ScheduleFinder.{DailyDeparture, FutureArrival}
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop

  @doc """
  Service-impacting currently active alerts for a route, including track changes
  at the indicated stop. Excludes commuter rail trip cancellations and delays.
  """
  @callback current_alerts(Stop.t(), Route.t()) :: [Alert.t()]

  @doc """
  Get scheduled departures for a given route/direction/stop/date.
  """
  @callback daily_departures(Route.id_t(), 0 | 1, Stop.id_t(), String.t()) ::
              {:ok, [DailyDeparture.t()]} | {:error, term()}

  @doc """
  Get scheduled arrivals for one trip on a date, starting at a given stop_sequence.
  """
  @callback next_arrivals(Trip.id_t(), non_neg_integer(), String.t()) ::
              {:ok, [FutureArrival.t()]} | {:error, term()}

  @doc """
  Clearly group a list of departures by route and destination. Intended to be used with subway departures.

  In the case of the Red and Green lines, scheduled departures might include multiple destinations, e.g. trains to Ashmont _and_ trains to Braintree, and/or multiple routes, as in the case of the distinct Green Line "branches".
  """
  @callback subway_groups([DailyDeparture.t()], 0 | 1, Stop.id_t()) :: [
              {Route.t(), String.t(), [DateTime.t()]}
            ]
end
