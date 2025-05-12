defmodule Dotcom.Alerts.AffectedStops do
  @moduledoc """
  Module for determining stops affected by an alert
  """

  alias Alerts.Alert
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @spec affected_stops(Alerts.Alert.t(), [Routes.Route.id_t()]) :: [Stops.Stop.t()]
  def affected_stops(alert, route_ids) do
    stop_ids = alert |> Alert.get_entity(:stop)

    route_ids
    |> Enum.flat_map(&(&1 |> @stops_repo.by_route(0)))
    |> Enum.filter(&(stop_ids |> MapSet.member?(&1.id)))
    |> Enum.uniq_by(& &1.id)
  end
end
