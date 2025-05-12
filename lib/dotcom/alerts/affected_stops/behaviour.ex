defmodule Dotcom.Alerts.AffectedStops.Behaviour do
  @moduledoc """
  Behaviour for determining stops affected by an alert
  """

  @callback affected_stops([Alerts.Alert.t()], [Routes.Route.id_t()]) :: [Stops.Stop.t()]
end
