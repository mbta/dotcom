defmodule SiteWeb.ScheduleController.Line do
  @behaviour Plug
  import Plug.Conn, only: [assign: 3]
  import SiteWeb.ScheduleController.ClosedStops, only: [add_wollaston: 4]

  alias Plug.Conn
  alias RoutePatterns.Repo, as: RoutePatternRepo
  alias RoutePatterns.RoutePattern
  alias Routes.Repo, as: RoutesRepo
  alias Routes.{Route, Shape}
  alias Schedules.Repo, as: SchedulesRepo
  alias Site.StopBubble
  alias Site.TransitNearMe
  alias SiteWeb.ScheduleController.Line.Maps
  alias SiteWeb.ScheduleController.Line.Dependencies, as: Dependencies
  alias Stops.Repo, as: StopsRepo
  alias Stops.{RouteStops, RouteStop, Stop}
  alias Util.EnumHelpers

  defmodule Dependencies do
    defstruct stops_by_route_fn: &StopsRepo.by_route/3

    @type t :: %__MODULE__{stops_by_route_fn: StopsRepo.stop_by_route()}
  end

  @type query_param :: String.t() | nil
  @type direction_id :: 0 | 1
  @typep stop_with_bubble_info :: {[StopBubble.stop_bubble()], RouteStop.t()}
  @typep stops_by_route :: %{String.t() => [Stop.t()]}

  @impl true
  def init([]), do: []

  @impl true
  def call(conn, opts) do
    Util.log_duration(__MODULE__, :do_call, [conn, opts])
  end

  def do_call(
        %Conn{assigns: %{route: %Route{} = route, direction_id: direction_id}} = conn,
        args
      ) do
    deps = Keyword.get(args, :deps, %Dependencies{})
    update_conn(conn, route, direction_id, deps)
  end

  @spec update_conn(Conn.t(), Route.t(), direction_id, Dependencies.t()) :: Conn.t()
  defp update_conn(conn, route, direction_id, deps) do
    variant = conn.query_params["variant"]
    expanded = conn.query_params["expanded"]
    route_shapes = get_route_shapes(route.id, direction_id)
    route_stops = get_route_stops(route.id, direction_id, deps.stops_by_route_fn)
    route_patterns = get_route_patterns(route.id)
    shape_map = get_route_shape_map(route.id)
    vehicles = conn.assigns[:vehicle_locations]
    vehicle_tooltips = conn.assigns[:vehicle_tooltips]
    vehicle_polylines = VehicleHelpers.get_vehicle_polylines(vehicles, route_shapes)
    active_shapes = get_active_shapes(route_shapes, route, variant)
    shapes = filter_route_shapes(route_shapes, active_shapes, route)
    branches = get_branches(shapes, route_stops, route, direction_id)
    map_stops = Maps.map_stops(branches, {route_shapes, active_shapes}, route.id)

    time_data_by_stop =
      TransitNearMe.time_data_for_route_by_stop(route.id, direction_id,
        now: conn.assigns.date_time
      )

    {map_img_src, dynamic_map_data} =
      Maps.map_data(route, map_stops, vehicle_polylines, vehicle_tooltips)

    conn
    |> assign(:route_patterns, route_patterns)
    |> assign(:shape_map, shape_map)
    |> assign(:direction_id, direction_id)
    |> assign(:all_stops, build_stop_list(branches, direction_id))
    |> assign(:branches, branches)
    |> assign(:route_shapes, route_shapes)
    |> assign(:active_shape, active_shape(active_shapes, route.type))
    |> assign(:map_img_src, map_img_src)
    |> assign(:dynamic_map_data, dynamic_map_data)
    |> assign(:expanded, expanded)
    |> assign(:reverse_direction_all_stops, reverse_direction_all_stops(route.id, direction_id))
    |> assign(:connections, connections(branches))
    |> assign(:time_data_by_stop, time_data_by_stop)
  end

  @spec active_shape(shapes :: [Shape.t()], route_type :: 0..4) :: Shape.t() | nil
  defp active_shape([active | _], 3), do: active
  defp active_shape(_shapes, _route_type), do: nil

  # For bus routes, we only want to show the stops for the active route variant.
  @spec filter_route_shapes([Shape.t()], [Shape.t()], Route.t()) :: [
          Shape.t()
        ]
  def filter_route_shapes(_, [active_shape], %Route{type: 3}), do: [active_shape]
  def filter_route_shapes(all_shapes, _active_shapes, _Route), do: all_shapes

  @spec get_route_patterns(Route.id_t()) :: map
  defp get_route_patterns("Green") do
    GreenLine.branch_ids() |> Enum.join(",") |> get_route_patterns()
  end

  @spec get_route_patterns(Route.id_t()) :: map
  defp get_route_patterns(route_id) do
    route_id
    |> RoutePatternRepo.by_route_id()
    |> Enum.map(&Task.async(fn -> get_route_pattern_shape(&1) end))
    |> Enum.map(&Task.await/1)
    |> Enum.group_by(& &1.direction_id)
  end

  @spec get_route_pattern_shape(RoutePattern.t()) :: map
  defp get_route_pattern_shape(route_pattern) do
    shape_id =
      route_pattern.representative_trip_id
      |> SchedulesRepo.trip()
      |> case do
        nil -> nil
        trip -> trip.shape_id
      end

    Map.put(route_pattern, :shape_id, shape_id)
  end

  @spec get_route_shape_map(Route.id_t()) :: map
  def get_route_shape_map(route_id) do
    route_id
    |> get_route_shapes()
    |> Map.new(fn shape -> {shape.id, shape} end)
  end

  # Gathers all of the shapes for the route. Green Line has to make a call for each branch separately, because of course
  @spec get_route_shapes(Route.id_t(), direction_id | nil) :: [Shape.t()]
  def get_route_shapes(route_id, direction_id \\ nil)

  def get_route_shapes("Green", direction_id) do
    GreenLine.branch_ids()
    |> Enum.join(",")
    |> get_route_shapes(direction_id)
  end

  def get_route_shapes(route_id, direction_id) do
    opts = if direction_id == nil, do: [], else: [direction_id: direction_id]
    RoutesRepo.get_shapes(route_id, opts)
  end

  @spec get_route_stops(Route.id_t(), direction_id, StopsRepo.stop_by_route()) ::
          stops_by_route
  def get_route_stops("Green", direction_id, stops_by_route_fn) do
    GreenLine.branch_ids()
    |> Task.async_stream(&do_get_route_stops(&1, direction_id, stops_by_route_fn))
    |> Enum.reduce(%{}, fn {:ok, value}, acc -> Map.merge(acc, value) end)
  end

  def get_route_stops(route_id, direction_id, stops_by_route_fn) do
    do_get_route_stops(route_id, direction_id, stops_by_route_fn)
  end

  @spec do_get_route_stops(Route.id_t(), direction_id, StopsRepo.stop_by_route()) ::
          stops_by_route
  defp do_get_route_stops(route_id, direction_id, stops_by_route_fn) do
    case stops_by_route_fn.(route_id, direction_id, []) do
      {:error, _} -> %{}
      stops -> %{route_id => stops}
    end
  end

  @spec get_active_shapes([Shape.t()], Route.t(), Route.branch_name()) :: [
          Shape.t()
        ]
  defp get_active_shapes(shapes, %Route{type: 3}, variant) do
    shapes
    |> get_requested_shape(variant)
    |> get_default_shape(shapes)
  end

  defp get_active_shapes(_shapes, %Route{id: "Green"}, _variant) do
    # not used by the green line code
    []
  end

  defp get_active_shapes(shapes, _route, _variant), do: shapes

  @spec get_requested_shape([Shape.t()], query_param) :: Shape.t() | nil
  defp get_requested_shape(_shapes, nil), do: nil
  defp get_requested_shape(shapes, variant), do: Enum.find(shapes, &(&1.id == variant))

  @spec get_default_shape(Shape.t() | nil, [Shape.t()]) :: [Shape.t()]
  defp get_default_shape(nil, [default | _]), do: [default]
  defp get_default_shape(%Shape{} = shape, _shapes), do: [shape]
  defp get_default_shape(_, _), do: []

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
    headsign =
      branch_id
      |> RoutesRepo.get()
      |> Map.get(:direction_destinations)
      |> Map.get(direction_id)

    branch =
      shapes
      |> Enum.reject(&is_nil(&1.name))
      |> Enum.filter(&(&1.name =~ headsign))
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

  @doc """
  Builds a list of all stops on a route; stops are represented by tuples of

    { [ {branch_name, bubble_type} ], %RouteStop{} }

  `[ {branch_name, bubble_type} ]` represents all of the stop bubbles to display on that stop's row.

  `branch_name` is used by the green line to display the branch's letter.

  """
  @spec build_stop_list([RouteStops.t()], 0 | 1) :: [stop_with_bubble_info]
  def build_stop_list([%RouteStops{branch: "Green-" <> _} | _] = branches, direction_id) do
    branches
    |> Enum.reverse()
    |> Enum.reduce({[], []}, &reduce_green_branch(&1, &2, direction_id))
    |> build_green_stop_list(direction_id)
  end

  def build_stop_list([%RouteStops{stops: stops}], _direction_id) do
    stops
    |> EnumHelpers.with_first_last()
    |> Enum.map(fn {stop, is_terminus?} ->
      bubble_type = if is_terminus?, do: :terminus, else: :stop
      {[{nil, bubble_type}], %{stop | branch: nil}}
    end)
  end

  def build_stop_list(branches, direction_id) do
    branches
    |> do_build_stop_list(direction_id)
    |> sort_stop_list(direction_id)
  end

  def do_build_stop_list(branches, direction_id) do
    branches
    |> sort_branches(direction_id)
    |> Enum.reduce({[], []}, &build_branched_stop_list/2)
  end

  # Reduces each green line branch into a tuple of {stops_on_branches, shared_stops}, which gets parsed
  # by &build_green_stop_list/2.
  @spec reduce_green_branch(RouteStops.t(), {[RouteStop.t()], [RouteStop.t()]}, 0 | 1) ::
          {[stop_with_bubble_info], [RouteStop.t()]}
  defp reduce_green_branch(branch, acc, direction_id) do
    branch
    |> split_green_branch(direction_id)
    |> parse_green_branch(acc, direction_id, branch.branch)
  end

  # Pulls together the results of &reduce_green_branches/3 and compiles the full list of Green Line stops
  # in the expected order based on direction_id. Unshared stops have already had their bubble types generated in
  # &parse_green_branch/4; shared stops get their bubble types generated here, after the shared stops have
  # been reduced to a unique list.
  @spec build_green_stop_list({[stop_with_bubble_info], [RouteStop.t()]}, direction_id) :: [
          stop_with_bubble_info
        ]
  defp build_green_stop_list({branch_stops, shared_stops}, 1) do
    shared_stops
    |> dedupe_green_stop_list
    |> Enum.reduce([], &build_branched_stop(&1, &2, {&1.branch, GreenLine.branch_ids()}))
    |> Kernel.++(branch_stops)
    |> Enum.reverse()
  end

  defp build_green_stop_list({branch_stops, shared_stops}, 0) do
    shared_stops
    |> dedupe_green_stop_list
    |> Enum.reverse()
    |> Enum.reduce(
      Enum.reverse(branch_stops),
      &build_branched_stop(&1, &2, {&1.branch, GreenLine.branch_ids()})
    )
  end

  defp dedupe_green_stop_list(route_stops) do
    beginnings =
      route_stops
      |> Enum.group_by(& &1.id)
      |> Enum.map(fn {id, duplicate_stops} ->
        {id, Enum.any?(duplicate_stops, & &1.is_beginning?)}
      end)
      |> Enum.into(Map.new())

    route_stops
    |> Enum.uniq_by(& &1.id)
    |> Enum.map(fn route_stop ->
      case Map.get(beginnings, route_stop.id) do
        true -> %{route_stop | is_beginning?: true}
        false -> route_stop
      end
    end)
  end

  # Splits green branch into a tuple of shared stops and stops that are unique to that branch.
  @spec split_green_branch(RouteStops.t(), 0 | 1) :: {[RouteStop.t()], [RouteStop.t()]}
  defp split_green_branch(%RouteStops{branch: "Green-E", stops: stops}, _direction_id),
    do: {[], stops}

  defp split_green_branch(%RouteStops{stops: stops, branch: branch_id}, 1) do
    Enum.split_while(stops, fn stop -> stop.id != GreenLine.merge_id(branch_id) end)
  end

  defp split_green_branch(%RouteStops{stops: stops, branch: branch_id}, 0) do
    {shared, [merge | branch]} =
      Enum.split_while(stops, fn stop -> stop.id != GreenLine.merge_id(branch_id) end)

    {branch, shared ++ [merge]}
  end

  # Adds stops on a green line branch to the tuple that represents all Green Line stops.
  # If a stop is not shared, its stop bubble info gets generated here.
  # Shared stops are simply added to the list of all shared stops -- their stop bubble info is generated later,
  # so that we don't duplicate efforts.
  @spec parse_green_branch(
          {[RouteStop.t()], [RouteStop.t()]},
          {[stop_with_bubble_info], [RouteStop.t()]},
          direction_id,
          Route.branch_name()
        ) :: {[stop_with_bubble_info], [RouteStop.t()]}
  defp parse_green_branch({branch_stops, shared_stops}, acc, direction_id, branch_name) do
    branch_stops
    |> Enum.reduce([], &build_branched_stop(&1, &2, {branch_name, GreenLine.branch_ids()}))
    |> do_parse_green_branch(shared_stops, acc, direction_id)
  end

  @spec do_parse_green_branch(
          [stop_with_bubble_info],
          [RouteStop.t()],
          {[stop_with_bubble_info], [RouteStop.t()]},
          0 | 1
        ) :: {[stop_with_bubble_info], [RouteStop.t()]}
  defp do_parse_green_branch(
         [],
         [%RouteStop{branch: "Green-E"} | _] = e_stops,
         {all_branch_stops, all_shared_stops},
         1
       ) do
    # this clunkiness is the best way I could think of to insert
    # the E line stops at the right location when direction_id is 1 :(
    {kenmore_hynes, rest} = Enum.split_while(all_shared_stops, &(&1.id != "place-coecl"))
    {all_branch_stops, List.flatten([kenmore_hynes, e_stops, rest])}
  end

  defp do_parse_green_branch(branch_stops, shared_stops, {all_branch_stops, all_shared_stops}, 1) do
    {branch_stops ++ all_branch_stops, all_shared_stops ++ shared_stops}
  end

  defp do_parse_green_branch(branch_stops, shared_stops, {all_branch_stops, all_shared_stops}, 0) do
    {all_branch_stops ++ branch_stops, shared_stops ++ all_shared_stops}
  end

  @doc """
  Appends a branch's stops to the full list of stops for the route. Each stop gets stop bubble information for all
  branches that the stop needs to have a graphic for. Returns a tuple of {stops_with_bubble_info, previous_branches}
  so that the next stop can map over the list of branches in order to generate the correct number of bubbles for a stop.

  Stops will be in reverse order. Not used by the Green Line.
  """
  @spec build_branched_stop_list(RouteStops.t(), {[stop_with_bubble_info], [Route.branch_name()]}) ::
          {[stop_with_bubble_info], [Route.branch_name()]}
  def build_branched_stop_list(
        %RouteStops{branch: branch, stops: branch_stops},
        {all_stops, previous_branches}
      ) do
    previous_branches
    |> update_bubble_branches(branch)
    |> do_build_branched_stop_list(branch, branch_stops, all_stops)
  end

  @spec do_build_branched_stop_list(
          [Route.branch_name()],
          Route.branch_name(),
          [RouteStop.t()],
          [stop_with_bubble_info]
        ) :: {[stop_with_bubble_info], [Route.branch_name()]}
  defp do_build_branched_stop_list(branch_names, current_branch, branch_stops, all_stops) do
    stop_list =
      branch_stops
      |> EnumHelpers.with_first_last()
      |> Enum.reduce(all_stops, &build_branched_stop(&1, &2, {current_branch, branch_names}))
      |> add_wollaston_on_red_line(current_branch)

    {stop_list, branch_names}
  end

  defp extract_fn({_bubbles, stop}), do: stop

  defp build_fn({bubbles, _stop}, new_stop), do: {bubbles, new_stop}

  @spec add_wollaston_on_red_line([RouteStops.t()], Route.branch_name()) :: [RouteStops.t()]
  defp add_wollaston_on_red_line(
         [{_, %RouteStop{route: %Route{id: "Red"}}} | _tail] = stop_list,
         nil
       ) do
    add_wollaston(stop_list, 0, &extract_fn/1, &build_fn/2)
  end

  defp add_wollaston_on_red_line(stop_list, _current_branch) do
    stop_list
  end

  @doc """
  Builds stop bubble information for a stop, and adds the stop to the list of all stops
  as a tuple of {stop_bubbles, %RouteStop{}}.
  """
  @spec build_branched_stop(
          RouteStop.t() | {RouteStop.t(), boolean},
          [stop_with_bubble_info],
          {Route.branch_name(), [Route.branch_name()]}
        ) :: [stop_with_bubble_info]
  def build_branched_stop(this_stop, all_stops, current_and_previous_branches)

  def build_branched_stop(stop, branch_stops, {_, ["Green" <> _ | _] = green_branches}) do
    # Green Line always evaluates all branches on all stops. If the stop should have a bubble for a branch,
    # &stop_bubble_type/3 returns a valid tuple, otherwise it returns false. The bubble list then gets filtered to
    # remove anything that's not a tuple.
    bubble_types =
      green_branches
      |> Enum.map(&stop_bubble_type(&1, stop))
      |> Enum.filter(&is_tuple/1)

    [{bubble_types, stop} | branch_stops]
  end

  def build_branched_stop({%RouteStop{is_terminus?: true} = stop, _}, all_stops, {nil, _}) do
    # a terminus that's not on a branch is always :terminus
    [{[{nil, :terminus}], stop} | all_stops]
  end

  def build_branched_stop(
        {%RouteStop{is_terminus?: false} = stop, true},
        all_stops,
        {nil, branches}
      ) do
    # If the first or last unbranched stop on a branched route is not a terminus, it's a merge stop.
    # We identify these in order to know where to render the horizontal line connecting a branch to the main line.
    [{Enum.map(branches, &{&1, :merge}), stop} | all_stops]
  end

  def build_branched_stop({%RouteStop{} = stop, _}, all_stops, {nil, _}) do
    # all other unbranched stops are just :stop
    [{[{nil, :stop}], stop} | all_stops]
  end

  def build_branched_stop({%RouteStop{} = stop, _}, all_stops, {current_branch, branches})
      when is_binary(current_branch) do
    # when the branch name is not nil, that means that the stop is on a branch. The stop needs to show a bubble for
    # each branch that has already been parsed. We evaluate each branch to determine which bubble type to show:
    # - :terminus if this stop IS on that branch and this stop IS a terminus
    # - :stop if this stop IS on that branch and this stop IS NOT a terminus
    # - :line if this stop IS NOT on that branch
    bubble_types = Enum.map(branches, &stop_bubble_type(&1, stop))
    [{bubble_types, stop} | all_stops]
  end

  @doc """
  Adds or removes a branch name to the list of branch names used to build the stop bubbles. Not used by Green Line.
  """
  @spec update_bubble_branches([Route.branch_name()], Route.branch_name()) :: [
          Route.branch_name()
        ]
  def update_bubble_branches(previous_branches, nil), do: previous_branches
  def update_bubble_branches(previous_branches, branch), do: previous_branches ++ [branch]

  @doc """
  Returns a tuple with the stop bubble type, and the name of the branch that the bubble represents.
  """
  @spec stop_bubble_type(String.t(), RouteStop.t()) :: StopBubble.stop_bubble()
  def stop_bubble_type(bubble_branch_name, stop)

  def stop_bubble_type(branch_id, %RouteStop{branch: branch_id, is_terminus?: true}),
    do: {branch_id, :terminus}

  def stop_bubble_type(branch_id, %RouteStop{branch: branch_id, is_terminus?: false}),
    do: {branch_id, :stop}

  def stop_bubble_type("Green-E", %RouteStop{id: id}) when id in ["place-kencl", "place-hymnl"],
    do: nil

  def stop_bubble_type(branch_id, %RouteStop{branch: "Green-E"}) when branch_id != "Green-E",
    do: {branch_id, :line}

  def stop_bubble_type("Green-" <> branch_letter, %RouteStop{branch: "Green-" <> stop_letter})
      when branch_letter < stop_letter,
      do: {"Green-" <> branch_letter, :line}

  def stop_bubble_type("Green-" <> _ = branch_id, stop) do
    cond do
      GreenLine.terminus?(stop.id, branch_id) ->
        {branch_id, :terminus}

      Enum.member?(GreenLine.excluded_shared_stops(branch_id), stop.id) && branch_id != "Green-E" ->
        {branch_id, :empty}

      Enum.member?(GreenLine.shared_stops(), stop.id) ->
        {branch_id, :stop}

      # if nothing has matched by this point, the stop should not have any graphic for this branch.
      true ->
        nil
        # The full list of bubble types for each stop gets filtered later to remove these values.
    end
  end

  def stop_bubble_type(branch_id, _stop), do: {branch_id, :line}

  @doc """
  Sorts branches and their stops into the correct order to prepare them to be parsed.
  """
  @spec sort_branches([RouteStops.t()], direction_id) :: [RouteStops.t()]
  def sort_branches(branches, 0),
    do: Enum.reduce(branches, [], &[%{&1 | stops: Enum.reverse(&1.stops)} | &2])

  def sort_branches(branches, 1), do: branches

  @doc """
  Takes the final generated list of all stops for the route and sorts them into the correct order based on direction id.
  """
  @spec sort_stop_list(
          {[RouteStop.t()], [Route.branch_name()]} | [RouteStop.t()],
          direction_id
        ) :: [RouteStop.t()]
  def sort_stop_list({all_stops, _branches}, direction_id),
    do: sort_stop_list(all_stops, direction_id)

  def sort_stop_list(all_stops, 1) when is_list(all_stops), do: Enum.reverse(all_stops)
  def sort_stop_list(all_stops, 0) when is_list(all_stops), do: all_stops

  @doc """
  Calculates the list of stops for the reverse direction.

  Used by "Schedules from here" to determine whether we should link to the
  stop going in the opposite direction.

  """
  @spec reverse_direction_all_stops(Route.id_t(), 0 | 1) :: [Stop.t()]
  def reverse_direction_all_stops(route_id, direction_id) do
    reverse_direction_id =
      case direction_id do
        1 -> 0
        0 -> 1
      end

    case StopsRepo.by_route(route_id, reverse_direction_id) do
      {:error, _} -> []
      stops -> stops
    end
  end

  def connections(route_stops) do
    route_stops
    |> Enum.reduce(MapSet.new(), &get_connections/2)
    |> MapSet.to_list()
  end

  defp get_connections(%RouteStops{stops: stops}, acc) do
    Enum.reduce(stops, acc, &do_get_connections/2)
  end

  defp do_get_connections(%RouteStop{connections: connections}, acc) do
    Enum.reduce(connections, acc, &MapSet.put(&2, &1))
  end
end
