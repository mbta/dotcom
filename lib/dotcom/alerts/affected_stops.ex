defmodule Dotcom.Alerts.AffectedStops do
  @moduledoc """
  Module for determining stops affected by an alert
  """

  alias Alerts.Alert
  alias Dotcom.Alerts.AffectedStops.Behaviour

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @behaviour Behaviour

  @impl Behaviour
  def affected_stops(alerts, route_ids) do
    stop_ids =
      alerts
      |> Enum.map(&(&1 |> Alert.get_entity(:stop)))
      |> Enum.reduce(MapSet.new(), &MapSet.union/2)

    route_ids
    |> Enum.flat_map(&(&1 |> @stops_repo.by_route(0)))
    |> Enum.filter(&(stop_ids |> MapSet.member?(&1.id)))
    |> Enum.uniq_by(& &1.id)
  end
end
