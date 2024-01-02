defmodule Alerts.Accessibility do
  @moduledoc "Alert accessibility utilities"

  alias Alerts.Alert

  @type effect_type :: :elevator_closure | :escalator_closure | :access_issue

  def effect_types, do: [:elevator_closure, :escalator_closure, :access_issue]

  @spec is_accessibility_alert?(Alert.t()) :: boolean()
  def is_accessibility_alert?(%Alert{effect: effect}), do: effect in effect_types()

  @spec effect_type_to_group_title(effect_type()) :: String.t()
  def effect_type_to_group_title(effect), do: Alert.human_effect(%Alert{effect: effect}) <> "s"
end
