defmodule Dotcom.Alerts.EndpointStops do
  @moduledoc """
  Module for determining endpoint-stop ranges affected by an alert
  """

  alias Alerts.Alert
  alias Dotcom.Alerts.EndpointStops.Behaviour

  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @behaviour Behaviour

  @impl Behaviour
  def endpoint_stops(alerts, route_ids) do
    alerts
    |> Enum.map(&endpoint_stops_for_alert(&1, route_ids))
    |> Enum.reject(&Kernel.is_nil/1)
  end

  defp endpoint_stops_for_alert(alert, route_ids) do
    affected_stop_ids = alert |> Alert.get_entity(:stop)
    affected_direction_id = alert |> affected_direction_id()

    direction_names =
      route_ids
      |> as_actual_route_ids()
      |> List.first()
      |> @routes_repo.get()
      |> Kernel.then(& &1.direction_names)
      |> to_forward_backward_direction_map(affected_direction_id)

    if MapSet.size(affected_stop_ids) < 2 do
      nil
    else
      route_ids
      |> affected_stop_lists_for(affected_direction_id, affected_stop_ids)
      |> to_endpoints(direction_names)
      |> case do
        endpoints -> endpoints
      end
    end
  end

  defp as_actual_route_ids([]), do: []

  defp as_actual_route_ids(["Green" | rest]),
    do: GreenLine.branch_ids() ++ as_actual_route_ids(rest)

  defp as_actual_route_ids([first | rest]), do: [first | as_actual_route_ids(rest)]

  defp to_forward_backward_direction_map(direction_names, 0),
    do: %{forward: direction_names[0], backward: direction_names[1]}

  defp to_forward_backward_direction_map(direction_names, 1),
    do: %{forward: direction_names[1], backward: direction_names[0]}

  defp to_endpoints([], _direction_names), do: nil

  defp to_endpoints(stop_lists, direction_names) do
    stop_tree =
      stop_lists
      |> Enum.map(fn stops -> stops |> Enum.map(&{&1.id, &1}) end)
      |> UnrootedPolytree.from_lists()

    %{
      first_stops: stop_tree |> first_stops(),
      last_stops: stop_tree |> last_stops()
    }
    |> case do
      %{first_stops: [first_stop], last_stops: [last_stop]} ->
        {first_stop, last_stop}

      %{first_stops: [first_stop], last_stops: _last_stops} ->
        {first_stop, "#{direction_names.forward} Stops"}

      %{first_stops: _first_stops, last_stops: [last_stop]} ->
        {last_stop, "#{direction_names.backward} Stops"}

      %{first_stops: _first_stops, last_stops: _last_stops} ->
        {"#{direction_names.backward} Stops", "#{direction_names.forward} Stops"}
    end
  end

  defp first_stops(stop_tree) do
    stop_tree
    |> traverse_from_nodes(stop_tree.starting_nodes, & &1.previous)
    |> Enum.map(& &1.value)
  end

  defp last_stops(stop_tree) do
    stop_tree
    |> traverse_from_nodes(stop_tree.starting_nodes, & &1.next)
    |> Enum.map(& &1.value)
  end

  defp traverse_from_nodes(unrooted_polytree, node_ids, traversal_fun) do
    node_ids
    |> Enum.flat_map(&(unrooted_polytree |> traverse_from_node(&1, traversal_fun)))
    |> Enum.uniq_by(& &1.id)
  end

  defp traverse_from_node(unrooted_polytree, node_id, traversal_fun) do
    unrooted_polytree
    |> UnrootedPolytree.edges_for_id(node_id)
    |> Kernel.then(traversal_fun)
    |> case do
      [] ->
        unrooted_polytree
        |> UnrootedPolytree.node_for_id(node_id)
        |> case do
          {:ok, foo} -> [foo]
          _ -> []
        end

      edges ->
        unrooted_polytree |> traverse_from_nodes(edges, traversal_fun)
    end
  end

  defp affected_stop_lists_for(route_ids, affected_direction_id, affected_stop_ids) do
    route_ids
    |> route_patterns_for_routes(affected_direction_id)
    |> affected_stop_lists_per_route_pattern(affected_stop_ids)
  end

  defp affected_direction_id(alert) do
    alert
    |> Alert.get_entity(:direction_id)
    |> Enum.reject(&Kernel.is_nil/1)
    |> first_or(0)
  end

  defp first_or([first | _], _default), do: first
  defp first_or([], default), do: default

  defp ancestor_stop(%Stops.Stop{parent_id: nil} = stop), do: stop

  defp ancestor_stop(%Stops.Stop{parent_id: parent_id}),
    do: parent_id |> Stops.Repo.get() |> ancestor_stop()

  defp route_patterns_for_routes(route_ids, direction_id) do
    route_ids
    |> Enum.flat_map(&(&1 |> route_patterns_for_route(direction_id)))
  end

  defp route_patterns_for_route(route_id, direction_id) do
    route_id
    |> @route_patterns_repo.by_route_id(
      canonical: true,
      direction_id: direction_id,
      include: "representative_trip.stops"
    )
  end

  defp affected_stop_lists_per_route_pattern(route_patterns, affected_stop_ids) do
    route_patterns
    |> Enum.map(fn rp ->
      rp.stop_ids
      |> Enum.map(&@stops_repo.get/1)
      |> Enum.map(&ancestor_stop/1)
      |> Enum.filter(&MapSet.member?(affected_stop_ids, &1.id))
    end)
  end
end
