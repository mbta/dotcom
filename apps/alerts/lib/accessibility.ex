defmodule Alerts.Accessibility do
  @moduledoc "Alert accessibility utilities"

  alias Alerts.Alert

  @type effect_type :: :elevator_closure | :escalator_closure | :access_issue

  def effect_types, do: [:elevator_closure, :escalator_closure, :access_issue]

  @spec is_accessibility_alert?(Alert.t()) :: boolean()
  def is_accessibility_alert?(alert) do
    case alert.effect do
      :elevator_closure -> true
      :escalator_closure -> true
      :access_issue -> true
      _ -> false
    end
  end

  @spec effect_type_to_group_title(effect_type()) :: String.t()
  def effect_type_to_group_title(:access_issue), do: "Access Issues"
  def effect_type_to_group_title(:elevator_closure), do: "Elevator Closures"
  def effect_type_to_group_title(:escalator_closure), do: "Escalator Closures"
end
