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
    alerts
    |> Stream.flat_map(fn alert -> affected_stops_for_alert(alert, route_ids) end)
    |> Enum.group_by(& &1.stop.id)
    |> Enum.map(fn {_stop_id, affected_stops} -> affected_stops |> combine_directions() end)
  end

  defp affected_stops_for_alert(alert, route_ids) do
    affected_stop_ids = alert |> Alert.get_entity(:stop)

    alert
    |> Alert.get_entity(:direction_id)
    |> Enum.flat_map(&convert_nil_to_all/1)
    |> Enum.uniq()
    |> outer_product(route_ids)
    |> Enum.flat_map(fn {direction_id, route_id} ->
      affected_stops_along_route(route_id, direction_id, affected_stop_ids)
    end)
  end

  defp affected_stops_along_route(route_id, direction_id, affected_stop_ids) do
    direction_names =
      route_id
      |> @routes_repo.get()
      |> Kernel.then(& &1.direction_names)

    @stops_repo.by_route(route_id, direction_id)
    |> Enum.filter(&(affected_stop_ids |> MapSet.member?(&1.id)))
    |> Enum.map(&%{stop: &1, direction: {:direction, direction_names |> Map.get(direction_id)}})
  end

  defp combine_directions(affected_stops) do
    affected_stops
    |> Enum.uniq_by(& &1.direction)
    |> case do
      [affected_stop] -> affected_stop
      [affected_stop | _] -> %{affected_stop | direction: :all}
    end
  end

  defp convert_nil_to_all(nil), do: [0, 1]
  defp convert_nil_to_all(direction_id), do: [direction_id]

  defp get_all_entities(alerts, type) do
    alerts
    |> Enum.map(&(&1 |> Alert.get_entity(type)))
    |> Enum.reduce(MapSet.new(), &MapSet.union/2)
  end

  defp outer_product(enum_a, enum_b) do
    enum_a |> Enum.flat_map(fn a -> enum_b |> Enum.map(fn b -> {a, b} end) end)
  end
end
