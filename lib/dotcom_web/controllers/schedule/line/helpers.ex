defmodule DotcomWeb.ScheduleController.Line.Helpers do
  @moduledoc """
  Helpers for the line page
  """

  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias Routes.Shape
  alias Stops.RouteStop
  alias Stops.RouteStops
  alias Stops.Stop

  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @type query_param :: String.t() | nil
  @type direction_id :: 0 | 1
  @typep stops_by_route :: %{String.t() => [Stop.t()]}

  @spec get_route(String.t()) :: {:ok, Route.t()} | :not_found
  def get_route(""), do: :not_found

  def get_route(route_id) do
    route = do_get_route(route_id)

    if route == nil do
      :not_found
    else
      {:ok, route}
    end
  end

  @spec do_get_route(String.t()) :: Route.t() | nil
  defp do_get_route("Green") do
    @routes_repo.green_line()
  end

  defp do_get_route(route_id) do
    @routes_repo.get(route_id)
  end

  @doc """
  Gets a list of RouteStops representing all of the branches on the route. Routes without branches will always be a
  list with a single RouteStops struct.
  """
  @spec get_branch_route_stops(Route.t(), direction_id()) :: [RouteStops.t()]
  @spec get_branch_route_stops(Route.t(), direction_id(), RoutePattern.id_t() | nil) :: [
          RouteStops.t()
        ]
  def get_branch_route_stops(route, direction_id, route_pattern_id \\ nil)

  def get_branch_route_stops(%Route{id: "Green"}, direction_id, route_pattern_id) do
    GreenLine.branch_ids()
    |> Enum.reduce([], fn route_id, acc ->
      case get_route(route_id) do
        {:ok, route} ->
          [route | acc]

        :not_found ->
          acc
      end
    end)
    |> Enum.map(fn route ->
      route
      |> do_get_branch_route_stops(direction_id, route_pattern_id)
      |> RouteStop.list_from_route_patterns(route, direction_id, true)
    end)
    |> nil_out_shared_stop_branches()
    |> RouteStops.from_route_stop_groups()
  end

  def get_branch_route_stops(route, direction_id, route_pattern_id) do
    route
    |> do_get_branch_route_stops(direction_id, route_pattern_id)
    |> Enum.map(&RouteStop.list_from_route_pattern(&1, route))
    |> RouteStops.from_route_stop_groups()
  end

  @spec do_get_branch_route_stops(Route.t(), direction_id(), RoutePattern.id_t() | nil) :: [
          {RoutePattern.t(), [Stop.t()]}
        ]
  defp do_get_branch_route_stops(route, direction_id, route_pattern_id) do
    route
    |> get_line_route_patterns(direction_id, route_pattern_id)
    |> Enum.map(&stops_for_route_pattern/1)
  end

  @spec get_map_route_patterns(Route.id_t(), Route.type_int()) :: [RoutePattern.t()]
  def get_map_route_patterns("Green", type) do
    GreenLine.branch_ids() |> Enum.join(",") |> get_map_route_patterns(type)
  end

  def get_map_route_patterns(route_id, type) do
    route_id
    |> @route_patterns_repo.by_route_id(include: "representative_trip.shape,representative_trip.stops")
    |> filter_map_route_patterns(type)
  end

  @spec filter_map_route_patterns([RoutePattern.t()], Route.type_int()) :: [RoutePattern.t()]
  # For bus, return all patterns
  defp filter_map_route_patterns(route_patterns, 3), do: route_patterns
  # For other rail, we only need the primary route_pattern and branches for each direction
  # Filtering here helps lighten the frontend load, hopefully reducing latency
  defp filter_map_route_patterns(route_patterns, _type) do
    for_result =
      for direction <- 0..1, into: [] do
        route_patterns
        |> Enum.filter(fn pattern -> pattern.direction_id == direction end)
        |> filter_by_min_typicality()
      end

    List.flatten(for_result)
  end

  @doc """
  Filters a list of route patterns down to the route patterns sharing the lowest
  number for the "typicality" property.
  """
  @spec filtered_by_typicality([RoutePattern.t()]) :: [RoutePattern.t()]
  def filtered_by_typicality(route_patterns) do
    filter_by_min_typicality(route_patterns)
  end

  # Filters route patterns by the smallest typicality found in the array
  @spec filter_by_min_typicality([RoutePattern.t()]) :: [RoutePattern.t()]
  defp filter_by_min_typicality(route_patterns) do
    route_patterns
    |> Enum.reduce({nil, []}, &reduce_by_min_typicality/2)
    |> elem(1)
    |> Enum.reverse()
  end

  @spec reduce_by_min_typicality(RoutePattern.t(), {integer, [RoutePattern.t()]}) ::
          {integer, [RoutePattern.t()]}
  defp reduce_by_min_typicality(route_pattern, acc) do
    %RoutePattern{typicality: typicality} = route_pattern
    {min_typicality, patterns_array} = acc

    cond do
      typicality < min_typicality -> {typicality, [route_pattern]}
      typicality == min_typicality -> {min_typicality, [route_pattern | patterns_array]}
      true -> acc
    end
  end

  # Gathers all of the shapes for the route. Green Line has to make a call for each branch separately, because of course
  @spec get_shapes_by_direction(Route.id_t(), Route.type_int(), direction_id) :: [Shape.t()]
  def get_shapes_by_direction(_id, 4, _direction), do: []

  def get_shapes_by_direction(id, 3, direction) do
    case do_get_shapes(id, direction) do
      [head | _] -> [head]
      [] -> []
    end
  end

  def get_shapes_by_direction("Green", _type, direction) do
    GreenLine.branch_ids()
    |> Enum.join(",")
    |> do_get_shapes(direction)
  end

  def get_shapes_by_direction(id, _type, direction), do: do_get_shapes(id, direction)

  @spec do_get_shapes(Route.id_t(), direction_id) :: [Shape.t()]
  def do_get_shapes(route_id, direction_id) do
    @routes_repo.get_shapes(route_id, direction_id: direction_id)
  end

  @spec get_route_stops(Route.id_t(), direction_id) ::
          stops_by_route()
  def get_route_stops("Green", direction_id) do
    GreenLine.branch_ids()
    |> Task.async_stream(&do_get_route_stops(&1, direction_id))
    |> Enum.reduce(%{}, fn {:ok, value}, acc -> Map.merge(acc, value) end)
  end

  def get_route_stops(route_id, direction_id) do
    do_get_route_stops(route_id, direction_id)
  end

  @spec do_get_route_stops(Route.id_t(), direction_id) ::
          stops_by_route()
  defp do_get_route_stops(route_id, direction_id) do
    case @stops_repo.by_route(route_id, direction_id, []) do
      {:error, _} -> %{}
      stops -> %{route_id => stops}
    end
  end

  @doc """
  Gets a list of RouteStops representing all of the branches on the route. Routes without branches will always be a
  list with a single RouteStops struct.
  """
  @spec get_branches([Shape.t()], stops_by_route, Route.t(), direction_id) :: [
          RouteStops.t()
        ]
  def get_branches(_, stops, _, _) when stops == %{}, do: []

  def get_branches(shapes, stops, %Route{id: "Green"}, direction_id) do
    GreenLine.branch_ids()
    |> Enum.map(&get_green_branch(&1, stops[&1], shapes, direction_id))
    |> Enum.reverse()
  end

  def get_branches(shapes, stops, route, direction_id) do
    RouteStops.by_direction(stops[route.id], shapes, route, direction_id)
  end

  @spec get_green_branch(
          GreenLine.branch_name(),
          [Stop.t()],
          [Shape.t()],
          direction_id
        ) :: RouteStops.t()
  defp get_green_branch(branch_id, stops, shapes, direction_id) do
    shape_name =
      branch_id
      |> @routes_repo.get()
      |> Map.get(:direction_destinations)
      |> Map.values()
      |> Enum.join(" - ")

    branch =
      shapes
      |> Enum.reject(&is_nil(&1.name))
      |> Enum.filter(&(&1.name =~ shape_name))
      |> get_branches(%{branch_id => stops}, %Route{id: branch_id, type: 0}, direction_id)
      |> List.first()

    %{
      branch
      | branch: branch_id,
        stops: Enum.map(branch.stops, &update_green_branch_stop(&1, branch_id))
    }
  end

  @spec update_green_branch_stop(RouteStop.t(), GreenLine.branch_name()) :: RouteStop.t()
  defp update_green_branch_stop(stop, branch_id) do
    # Green line shapes use the headway as their name, so each RouteStop comes back from the repo with their
    # branch set to "Heath St." etc. We change the stop's branch name to nil if the stop is shared, or to the branch
    # id if it's not shared.
    GreenLine.shared_stops()
    |> Enum.member?(stop.id)
    |> do_update_green_branch_stop(stop, branch_id)
  end

  @spec do_update_green_branch_stop(boolean, RouteStop.t(), Route.branch_name()) :: RouteStop.t()
  defp do_update_green_branch_stop(true, stop, _branch_id), do: %{stop | branch: nil}
  defp do_update_green_branch_stop(false, stop, branch_id), do: %{stop | branch: branch_id}

  @spec stops_for_route_pattern(RoutePattern.t()) :: {RoutePattern.t(), [Stop.t()]}
  defp stops_for_route_pattern(%RoutePattern{stop_ids: stop_ids} = route_pattern) do
    stops = Enum.map(stop_ids, &@stops_repo.get_parent/1)
    {route_pattern, stops}
  end

  @spec get_line_route_patterns(Route.t(), direction_id(), RoutePattern.id_t() | nil) :: [
          RoutePattern.t()
        ]
  defp get_line_route_patterns(%Route{id: route_id, type: route_type}, direction_id, nil) do
    base_opts = [direction_id: direction_id, include: "representative_trip.stops"]

    opts =
      case route_type do
        type when type in [0, 1, 2] ->
          Keyword.put(base_opts, :canonical, true)

        _ ->
          base_opts
      end

    route_id
    |> @route_patterns_repo.by_route_id(opts)
    |> Enum.filter(&(&1.route_id == route_id))
  end

  defp get_line_route_patterns(_route, _direction_id, route_pattern_id) do
    case @route_patterns_repo.get(route_pattern_id,
           include: "representative_trip.stops"
         ) do
      %RoutePattern{} = route_pattern ->
        [route_pattern]

      nil ->
        []
    end
  end

  @spec nil_out_shared_stop_branches([[RouteStop.t()]]) :: [[RouteStop.t()]]
  defp nil_out_shared_stop_branches(route_stop_groups) do
    shared_ids = shared_ids(route_stop_groups)

    Enum.map(route_stop_groups, &do_nil_out_shared_stop_branches(&1, shared_ids))
  end

  @spec do_nil_out_shared_stop_branches([RouteStop.t()], MapSet.t(Stop.id_t())) :: [RouteStop.t()]
  defp do_nil_out_shared_stop_branches(route_pattern_group, shared_ids) do
    Enum.map(route_pattern_group, fn route_stop ->
      if MapSet.member?(shared_ids, route_stop.id) do
        %RouteStop{
          route_stop
          | branch: nil
        }
      else
        route_stop
      end
    end)
  end

  @spec shared_ids([[RouteStop.t()]]) :: MapSet.t(Stop.id_t())
  defp shared_ids(route_stop_groups) do
    stop_id_sets =
      Enum.map(route_stop_groups, fn group ->
        MapSet.new(group, & &1.id)
      end)

    stop_id_sets
    |> length()
    |> combination_pairs()
    |> Enum.map(&intersection(&1, stop_id_sets))
    |> Enum.reduce(MapSet.new(), fn set, acc -> MapSet.union(set, acc) end)
  end

  @spec intersection([non_neg_integer()], [MapSet.t()]) :: MapSet.t()
  defp intersection(indices, map_sets), do: apply(MapSet, :intersection, Enum.map(indices, &Enum.at(map_sets, &1)))

  @doc """
  Generates every combination of pairs for the given number of possibilities.

  Public solely for testing.

  iex> DotcomWeb.ScheduleController.Line.Helpers.combination_pairs(4)
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3]
  ]
  """
  @spec combination_pairs(non_neg_integer()) :: [[non_neg_integer()]]
  def combination_pairs(count) do
    for i <- 0..(count - 2),
        j <- (i + 1)..(count - 1) do
      [i, j]
    end
  end

  @doc """
  Skip computing the branched tree structure for non-rail route types, because
  the website doesn't show these in a branching format.
  """
  @spec get_stop_tree_or_lists([RouteStops.t()], Route.type_int()) ::
          {UnrootedPolytree.t() | nil, [[RouteStop.t()]] | nil}

  def get_stop_tree_or_lists(_, 4), do: {nil, nil}

  def get_stop_tree_or_lists(route_stops_lists, 3), do: {nil, Enum.map(route_stops_lists, & &1.stops)}

  def get_stop_tree_or_lists([], _), do: {nil, []}

  def get_stop_tree_or_lists(route_stops_lists, _) do
    tree =
      route_stops_lists
      |> Enum.map(&Enum.map(&1.stops, fn route_stop -> {route_stop.id, route_stop} end))
      |> UnrootedPolytree.from_lists()

    {tree, nil}
  end
end
