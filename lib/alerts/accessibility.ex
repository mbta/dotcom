defmodule Alerts.Accessibility do
  @moduledoc "Alert accessibility utilities"

  alias Alerts.Alert

  @type effect_type :: :elevator_closure | :escalator_closure | :access_issue

  def effect_types, do: [:elevator_closure, :escalator_closure, :access_issue]

  def accessibility?(%Alert{effect: effect}), do: effect in effect_types()

  def effect_type_to_group_title(effect), do: Alert.human_effect(%Alert{effect: effect}) <> "s"
end
