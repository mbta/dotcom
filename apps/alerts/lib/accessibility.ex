defmodule Alerts.Accessibility do
  @moduledoc "Alert accessibility utilities"

  alias Alerts.Alert

  @type effect_type :: :elevator_closure | :escalator_closure | :access_issue

  def effect_types, do: [:elevator_closure, :escalator_closure, :access_issue]

  @spec is_accessibility_alert?(Alert.t()) :: boolean()
  def is_accessibility_alert?(%Alert{effect: :elevator_closure}), do: true
  def is_accessibility_alert?(%Alert{effect: :escalator_closure}), do: true
  def is_accessibility_alert?(%Alert{effect: :access_issue}), do: true
  def is_accessibility_alert?(_), do: false

  @spec effect_type_to_group_title(effect_type()) :: String.t()
  def effect_type_to_group_title(:access_issue), do: "Access Issues"
  def effect_type_to_group_title(:elevator_closure), do: "Elevator Closures"
  def effect_type_to_group_title(:escalator_closure), do: "Escalator Closures"
end
