defmodule Alerts.Accessibility do
  @moduledoc "Alert accessibility utilities"

  use Dotcom.Gettext.Sigils

  alias Alerts.Alert

  @type effect_type :: :elevator_closure | :escalator_closure | :access_issue

  def effect_types, do: [:elevator_closure, :escalator_closure, :access_issue]

  @spec accessibility?(Alert.t()) :: boolean()
  def accessibility?(%Alert{effect: effect}), do: effect in effect_types()

  @spec effect_type_to_group_title(effect_type()) :: String.t()
  def effect_type_to_group_title(:access_issue), do: ~t"Access Issues"
  def effect_type_to_group_title(:elevator_closure), do: ~t"Elevator Closures"
  def effect_type_to_group_title(:escalator_closure), do: ~t"Escalator Closures"
end
