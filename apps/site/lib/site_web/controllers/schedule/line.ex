defmodule SiteWeb.ScheduleController.Line do
  @behaviour Plug
  import Plug.Conn, only: [assign: 3]

  alias Plug.Conn
  alias RoutePatterns.Repo, as: RoutePatternRepo
  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias Schedules.Repo, as: SchedulesRepo
  alias Site.StopBubble
  alias Site.TransitNearMe
  alias SiteWeb.ScheduleController.Line.Dependencies, as: Dependencies
  alias SiteWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias SiteWeb.ScheduleController.Line.Maps
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
    route_shapes = LineHelpers.get_route_shapes(route.id, direction_id)
    route_stops = LineHelpers.get_route_stops(route.id, direction_id, deps.stops_by_route_fn)
    route_patterns = get_route_patterns(route.id)
    shape_map = get_route_shape_map(route.id)
    active_shapes = LineHelpers.get_active_shapes(route_shapes, route, variant)
    filtered_shapes = LineHelpers.filter_route_shapes(route_shapes, active_shapes, route)
    branches = LineHelpers.get_branches(filtered_shapes, route_stops, route, direction_id)
    map_stops = Maps.map_stops(branches, {route_shapes, active_shapes}, route.id)

    vehicles = conn.assigns[:vehicle_locations]
    vehicle_tooltips = conn.assigns[:vehicle_tooltips]
    vehicle_polylines = VehicleHelpers.get_vehicle_polylines(vehicles, route_shapes)

    time_data_by_stop =
      TransitNearMe.time_data_for_route_by_stop(route.id, direction_id,
        now: conn.assigns.date_time
      )

    {map_img_src, dynamic_map_data} =
      Maps.map_data(route, map_stops, vehicle_polylines, vehicle_tooltips)

    # For <ScheduleFinder />
    unfiltered_branches = LineHelpers.get_branches(route_shapes, route_stops, route, direction_id)
    reverse_direction_id = reverse_direction(direction_id)
    reverse_shapes = LineHelpers.get_route_shapes(route.id, reverse_direction_id)

    reverse_route_stops =
      LineHelpers.get_route_stops(route.id, reverse_direction_id, deps.stops_by_route_fn)

    reverse_branches =
      LineHelpers.get_branches(
        reverse_shapes,
        reverse_route_stops,
        route,
        reverse_direction_id
      )

    conn
    |> assign(:route_patterns, route_patterns)
    |> assign(:shape_map, shape_map)
    |> assign(:direction_id, direction_id)
    |> assign(:all_stops, build_stop_list(branches, direction_id))
    |> assign(:branches, branches)
    |> assign(:route_shapes, route_shapes)
    |> assign(:active_shape, LineHelpers.active_shape(active_shapes, route.type))
    |> assign(:map_img_src, map_img_src)
    |> assign(:dynamic_map_data, dynamic_map_data)
    |> assign(:expanded, expanded)
    |> assign(
      :reverse_direction_all_stops,
      reverse_direction_all_stops(route.id, reverse_direction_id)
    )
    |> assign(
      :reverse_direction_all_stops_from_shapes,
      build_stop_list(reverse_branches, reverse_direction_id)
    )
    |> assign(:all_stops_from_shapes, build_stop_list(unfiltered_branches, direction_id))
    |> assign(:connections, connections(branches))
    |> assign(:time_data_by_stop, time_data_by_stop)
  end

  @spec get_route_patterns(Route.id_t()) :: map
  defp get_route_patterns("Green") do
    GreenLine.branch_ids() |> Enum.join(",") |> get_route_patterns()
  end

  defp get_route_patterns(route_id) do
    route_id
    |> RoutePatternRepo.by_route_id()
    |> Enum.map(&Task.async(fn -> get_route_pattern_shape(&1) end))
    |> Enum.map(&Task.await/1)
    |> Enum.group_by(&(&1.direction_id |> Integer.to_string()))
  end

  @spec get_route_pattern_shape(RoutePattern.t()) :: map
  defp get_route_pattern_shape(route_pattern) do
    {shape_id, headsign} =
      route_pattern.representative_trip_id
      |> SchedulesRepo.trip()
      |> case do
        nil ->
          {nil, nil}

        %{shape_id: shape_id, headsign: headsign} ->
          {shape_id, headsign}
      end

    route_pattern
    |> Map.put(:shape_id, shape_id)
    |> Map.put(:headsign, headsign)
  end

  @spec get_route_shape_map(Route.id_t()) :: map
  def get_route_shape_map(route_id) do
    route_id
    |> LineHelpers.get_route_shapes(nil, false)
    |> Map.new(fn shape -> {shape.id, shape} end)
  end

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

    {stop_list, branch_names}
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

  def reverse_direction(0), do: 1
  def reverse_direction(1), do: 0

  @doc """
  Calculates the list of stops for the reverse direction.

  Used by "Schedules from here" to determine whether we should link to the
  stop going in the opposite direction.

  """
  @spec reverse_direction_all_stops(Route.id_t(), 0 | 1) :: [Stop.t()]
  def reverse_direction_all_stops(route_id, reverse_direction_id) do
    all_stops_without_date(route_id, reverse_direction_id)
  end

  @doc """
  Calculates the list of stops regardless of date.

  """
  @spec all_stops_without_date(Route.id_t(), 0 | 1) :: [Stop.t()]
  def all_stops_without_date(route_id, direction_id) do
    case StopsRepo.by_route(route_id, direction_id) do
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
