defmodule Dotcom.Alerts.CommuterRail do
  @moduledoc """
  Implements `Dotcom.Alerts.Group` for Commuter Rail alerts.
  """

  use Dotcom.Alerts.Group

  import import Dotcom.Alerts, only: [service_impacting_effects: 0]

  @impl Dotcom.Alerts.Group
  def effects do
    %{
      "Bike" => [bike_issue: 1],
      "Elevator & Escalator" => [
        elevator_closure: 1,
        escalator_closure: 1
      ],
      "Other" => [],
      "Parking" => [parking_issue: 1],
      "Service" => service_impacting_effects(),
      "Track Change" => [track_change: 1]
    }
  end

  @impl Dotcom.Alerts.Group
  def group_order do
    ["Service", "Track Change", "Elevator & Escalator", "Bike", "Parking", "Other"]
  end
end
