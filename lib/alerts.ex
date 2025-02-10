defmodule Dotcom.Alerts do
  @moduledoc """

  """

  alias Alerts.Alert

  @service_impacting_effects [:delay, :shuttle, :suspension, :station_closure]

  @doc """
  Does the alert have an effect that is considered service-impacting?
  """
  def service_impacting_alert?(%Alert{effect: effect}) do
    effect in @service_impacting_effects
  end

  @doc """
  Returns a list of the alert effects that are considered service-impacting.
  """
  def service_impacting_effects(), do: @service_impacting_effects
end
