defmodule Dotcom.Alerts.EndpointStops.Behaviour do
  @moduledoc """
  Behaviour for determining stops affected by an alert
  """

  alias Stops.Stop

  @type endpoint_t() :: Stop.t() | String.t()

  @doc """
  Given a list of alerts and a list of routes, returns a list of stop
  ranges along the given routes. A stop range is typically represented
  by a first and last affected stop, but when a route has branches,
  and an alert spans across those branches, one of the stops may be
  replaced by a direction string, like "Westbound".

  Most alerts will generate exactly one stop range. The exceptions
  are:

  - An alert with no affected stops or only one affected stop will not
  have a range.
  - Sometimes multiple alerts will have the same stop range, in which
  case the ranges will be de-duplicated.
  """
  @callback endpoint_stops([Alerts.Alert.t()], [Routes.Route.id_t()]) ::
              [{endpoint_t(), endpoint_t()}]
end
