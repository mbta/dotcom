defmodule Dotcom.Alerts.AffectedStops.Behaviour do
  @moduledoc """
  Behaviour for determining stops affected by an alert
  """

  @doc """
  Given a list of alerts and a list of routes, returns the stops on
  the routes given that are affected by any of the alerts given. If
  a stop shows up multiple times, either by being part of multiple
  alerts or by being on multiple routes.

  Stops on the route given are based on the affected direction ID's of
  the alert. If the alert doesn't specify any direction ID's, then it
  will default to just using direction ID 0.
  """

  @callback affected_stops([Alerts.Alert.t()], [Routes.Route.id_t()]) :: [Stops.Stop.t()]
end
