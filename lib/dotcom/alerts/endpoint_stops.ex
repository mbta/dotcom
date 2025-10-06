defmodule Dotcom.Alerts.EndpointStops do
  @moduledoc """
  Module for determining endpoint-stop ranges affected by an alert
  """

  use Dotcom.Gettext.Sigils

  alias Alerts.Alert
  alias Dotcom.Alerts.EndpointStops.Behaviour

  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @typep direction_id_t() :: 0 | 1
  @typep direction_name_map_t() :: %{forward: String.t(), backward: String.t()}
  @typep traversal_fun_t() :: (UnrootedPolytree.Edges.t() -> [UnrootedPolytree.Node.t()])

  @behaviour Behaviour

  # Retuns a list of endpoint stop-ranges, up to one per alert
  # given. It uses endpoint_stops_for_alert/2 to get zero or one
  # stop-range per alert, and returns the non-nil ones.
  @impl Behaviour
  def endpoint_stops(alerts, route_ids) do
    alerts
    |> Enum.map(&endpoint_stops_for_alert(&1, route_ids))
    |> Enum.reject(&Kernel.is_nil/1)
  end

  # Returns a single endpoint stop-range for the alert given, or nil
  # if one can't be computed.
  @spec endpoint_stops_for_alert(Alerts.Alert.t(), [Routes.Route.id_t()]) ::
          Behaviour.endpoint_t() | nil
  defp endpoint_stops_for_alert(alert, route_ids) do
    affected_stop_ids =
      alert
      |> Alert.get_entity(:stop)
      |> Enum.reject(&Kernel.is_nil/1)
      |> MapSet.new()

    affected_direction_id = alert |> affected_direction_id()

    direction_names =
      route_ids
      |> List.first()
      |> get_route()
      |> Kernel.then(& &1.direction_names)
      |> to_forward_backward_direction_map(affected_direction_id)

    if Enum.empty?(affected_stop_ids) do
      nil
    else
      route_ids
      |> affected_stop_lists_for_routes(affected_direction_id, affected_stop_ids)
      |> to_endpoints(direction_names)
    end
  end

  # Retrieves the route given, with a special case to return the Green
  # Line "Route" if asked for "Green".
  @spec get_route(Routes.Route.id_t()) :: Routes.Route.t() | nil
  defp get_route("Green"), do: @routes_repo.green_line()
  defp get_route(route_id), do: @routes_repo.get(route_id)

  # Converts a route's %{0 => _, 1 => _} direction map into an
  # orientation-aware %{forward: _, backward: _} direction map, based
  # on the direction ID provided.
  @spec to_forward_backward_direction_map(%{0 => String.t(), 1 => String.t()}, direction_id_t()) ::
          direction_name_map_t()
  defp to_forward_backward_direction_map(direction_names, 0),
    do: %{forward: direction_names[0], backward: direction_names[1]}

  defp to_forward_backward_direction_map(direction_names, 1),
    do: %{forward: direction_names[1], backward: direction_names[0]}

  # Given a list of lists of affected stops, converts them to a single
  # endpoint stop-range. If there is an unambiguous first stop in that
  # range, then it returns that as the first stop; ditto for the last
  # stop. Otherwise, in either case, it returns the direction name,
  # e.g. "Westbound Stops".
  #
  # It does this by constructing an UnrootedPolytree out of the
  # affected stop lists, and traversing the tree in both
  # directions. If it gets to one end of the tree and has only one
  # unique stop, then that means that stop is the unambiguous endpoint
  # in that direction - if there are multiple, then there is no
  # unambiguous endpoint in that direction.
  @spec to_endpoints([[Stops.Stop.t()]], direction_name_map_t()) :: Behaviour.endpoint_t() | nil
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
        {first_stop, direction_names.forward <> " " <> ~t"Stops"}

      %{first_stops: _first_stops, last_stops: [last_stop]} ->
        {last_stop, direction_names.backward <> " " <> ~t"Stops"}

      %{first_stops: _first_stops, last_stops: _last_stops} ->
        {
          direction_names.backward <> " " <> ~t"Stops",
          direction_names.forward <> " " <> ~t"Stops"
        }
    end
  end

  # Traverses an UnrootedPolytree of stops using the `previous` field
  # on each node in order to traverse backwards to the first affected
  # stop. See `traverse_from_nodes/3` for more info.
  @spec first_stops(UnrootedPolytree.t()) :: [Stops.Stop.t()]
  defp first_stops(stop_tree) do
    stop_tree
    |> traverse_from_nodes(stop_tree.starting_nodes, & &1.previous)
    |> Enum.map(& &1.value)
  end

  # Traverses an UnrootedPolytree of stops using the `next` field on
  # each node in order to traverse forwards to the last affected
  # stop. See `traverse_from_nodes/3` for more info.
  @spec last_stops(UnrootedPolytree.t()) :: [Stops.Stop.t()]
  defp last_stops(stop_tree) do
    stop_tree
    |> traverse_from_nodes(stop_tree.starting_nodes, & &1.next)
    |> Enum.map(& &1.value)
  end

  # Traverses an UnrootedPolytree using the provided `traversal_fun`
  # to search recursively through the tree until it reaches a node
  # with no edges.
  #
  # It de-duplicates identical node ID's, so even if there are two
  # branches, if they arrive at the same stop in the end, then it only
  # returns that node once.
  @spec traverse_from_nodes(UnrootedPolytree.t(), [Stops.Stop.id_t()], traversal_fun_t()) ::
          [UnrootedPolytree.Node.t()]
  defp traverse_from_nodes(unrooted_polytree, node_ids, traversal_fun) do
    node_ids
    |> Enum.flat_map(&(unrooted_polytree |> traverse_from_node(&1, traversal_fun)))
    |> Enum.uniq_by(& &1.id)
  end

  # Helper function used by `traverse_from_nodes/3` to traverse an
  # UnrootedPolytree from a single node.
  @spec traverse_from_node(UnrootedPolytree.t(), Stops.Stop.id_t(), traversal_fun_t()) ::
          [UnrootedPolytree.Node.t()]
  defp traverse_from_node(unrooted_polytree, node_id, traversal_fun) do
    unrooted_polytree
    |> UnrootedPolytree.edges_for_id(node_id)
    |> Kernel.then(traversal_fun)
    |> case do
      [] ->
        unrooted_polytree
        |> UnrootedPolytree.node_for_id(node_id)
        |> case do
          {:ok, node} -> [node]
          _ -> []
        end

      edges ->
        unrooted_polytree |> traverse_from_nodes(edges, traversal_fun)
    end
  end

  # Uses the provided route ID's and direction ID, to pull a list of
  # lists of stops (a typical route would have a single list, but
  # branched routes may have multiple), and then, within each list of
  # stops, filters to only include stops that are present in
  # affected_stop_ids.
  @spec affected_stop_lists_for_routes([Routes.Route.id_t()], direction_id_t(), MapSet.t()) ::
          [[Stops.Stop.t()]]
  defp affected_stop_lists_for_routes(route_ids, direction_id, affected_stop_ids) do
    route_ids
    |> route_patterns_for_routes(direction_id)
    |> Enum.map(&affected_stops_for_route_pattern(&1, affected_stop_ids))
  end

  # Returns only the stops in the provided route pattern whose ID's
  # are present in affected_stop_ids.
  @spec affected_stops_for_route_pattern(RoutePatterns.RoutePattern.t(), MapSet.t()) ::
          [Stops.Stop.t()]
  defp affected_stops_for_route_pattern(route_pattern, affected_stop_ids) do
    route_pattern.stop_ids
    |> Enum.map(&@stops_repo.get_parent/1)
    |> Enum.filter(&MapSet.member?(affected_stop_ids, &1.id))
  end

  # Given an alert, returns the affected direction ID, if there is one
  # provided in the alert. If there are multiple, returns one at
  # random. If there aren't any, defaults to 0.
  @spec affected_direction_id(Alerts.Alert.t()) :: direction_id_t()
  defp affected_direction_id(alert) do
    alert
    |> Alert.get_entity(:direction_id)
    |> Enum.reject(&Kernel.is_nil/1)
    |> List.first(0)
  end

  # Given a list of routes, returns a flattened list of canonical
  # route patterns for those routes. The multiple-routes feature is
  # mostly there to support the Green Line.
  #
  # The route patterns returned will have `stop_ids` populated, and
  # will just be the canonical route patterns.
  @spec route_patterns_for_routes([Routes.Route.id_t()], direction_id_t()) ::
          [RoutePatterns.RoutePattern.t()]
  defp route_patterns_for_routes(route_ids, direction_id) do
    route_ids
    |> Enum.flat_map(&(&1 |> route_patterns_for_route(direction_id)))
  end

  # Returns the canonical route patterns for the given route/direction
  # combo, with stop_ids populated.
  @spec route_patterns_for_route(Routes.Route.id_t(), direction_id_t()) ::
          [RoutePatterns.RoutePattern.t()]
  defp route_patterns_for_route(route_id, direction_id) do
    route_id
    |> @route_patterns_repo.by_route_id(
      canonical: true,
      direction_id: direction_id,
      include: "representative_trip.stops"
    )
  end
end
