defmodule Dotcom.Alerts.CommuterRail do
  @moduledoc """
  Implements `Dotcom.Alerts.Group` for Commuter Rail alerts.
  """

  use Dotcom.Alerts.Group

  import Dotcom.Alerts, only: [service_impacting_effects: 0]

  @impl Dotcom.Alerts.Group
  def effect_groups do
    [
      {"Service", service_impacting_effects()},
      {"Track Change", [track_change: 1]},
      {"Elevator & Escalator", [elevator_closure: 1, escalator_closure: 1]},
      {"Bike", [bike_issue: 1]},
      {"Parking", [parking_issue: 1]},
      {"Other", []}
    ]
  end
end
