defmodule Dotcom.Alerts.AffectedStops do
  @moduledoc """
  Module for determining stops affected by an alert
  """

  alias Alerts.Alert
  alias Dotcom.Alerts.AffectedStops.Behaviour

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @behaviour Behaviour

  @impl Behaviour
  def affected_stops(alerts) do
    route_ids = alerts |> get_all_entities(:route) |> Enum.to_list()

    affected_stops(alerts, route_ids)
  end

  @impl Behaviour
  def affected_stops(alerts, route_ids) do
    stop_ids = alerts |> get_all_entities(:stop)

    direction_ids = alerts |> get_all_direction_ids()

    direction_names =
      route_ids
      |> List.first()
      |> @routes_repo.get()
      |> Kernel.then(& &1.direction_names)

    route_ids
    |> outer_product(direction_ids)
    |> Enum.flat_map(fn {route_id, direction_id} ->
      @stops_repo.by_route(route_id, direction_id)
      |> Enum.filter(&(stop_ids |> MapSet.member?(&1.id)))
      |> Enum.map(&%{stop: &1, direction: {:direction, direction_names |> Map.get(direction_id)}})
    end)
    |> Enum.group_by(& &1.stop.id)
    |> Enum.map(fn {_stop_id, affected_stops} -> affected_stops |> combine_directions() end)
  end

  defp combine_directions(affected_stops) do
    affected_stops
    |> Enum.uniq_by(& &1.direction)
    |> case do
      [affected_stop] -> affected_stop
      [affected_stop | _] -> %{affected_stop | direction: :all}
    end
  end

  @spec get_all_direction_ids([Alerts.Alert.t()]) :: [0 | 1]
  defp get_all_direction_ids(alerts) do
    alerts
    |> get_all_entities(:direction_id)
    |> Enum.reject(&Kernel.is_nil/1)
    |> case do
      [] -> [0, 1]
      direction_ids -> direction_ids
    end
  end

  defp get_all_entities(alerts, type) do
    alerts
    |> Enum.map(&(&1 |> Alert.get_entity(type)))
    |> Enum.reduce(MapSet.new(), &MapSet.union/2)
  end

  defp outer_product(enum_a, enum_b) do
    enum_a |> Enum.flat_map(fn a -> enum_b |> Enum.map(fn b -> {a, b} end) end)
  end
end
