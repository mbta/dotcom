defmodule Dotcom.Alerts.CommuterRail do
  @moduledoc """
  Implements `Dotcom.Alerts.Group` for Commuter Rail alerts.
  """

  use Dotcom.Alerts.Group
  use Dotcom.Gettext.Sigils

  import Dotcom.Alerts, only: [service_impacting_effects: 0]

  @impl Dotcom.Alerts.Group
  def effect_groups do
    [
      {~t"Service", service_impacting_effects()},
      {~t"Track Change", [track_change: 1]},
      {~t"Elevator & Escalator", [elevator_closure: 1, escalator_closure: 1]},
      {~t"Bike", [bike_issue: 1]},
      {~t"Parking", [parking_closure: 1, parking_issue: 1]},
      {~t"Other", []}
    ]
  end
end
