defmodule SiteWeb.ScheduleController.Line.DiagramHelpers do
  @moduledoc """
  Helpers for the line diagram
  """

  alias Routes.Route
  alias Site.StopBubble
  alias Stops.{RouteStop, RouteStops}
  alias Util.EnumHelpers

  @type direction_id :: 0 | 1
  @type stop_with_bubble_info :: {[StopBubble.stop_bubble()], RouteStop.t()}

  @doc """
  Builds a list of all stops on a route; stops are represented by tuples of

    { [ {branch_name, bubble_type} ], %RouteStop{} }

  `[ {branch_name, bubble_type} ]` represents all of the stop bubbles to display on that stop's row.

  `branch_name` is used by the green line to display the branch's letter.

  """
  @spec build_stop_list([RouteStops.t()], direction_id) :: [stop_with_bubble_info]
  def build_stop_list(
        [%RouteStops{branch: "Green-" <> _} | _] = branches,
        direction_id
      ) do
    branches
    |> Enum.reverse()
    |> override_green_0_order(direction_id)
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

  # Split out Union Square from the D line to force it to be the last stop
  defp override_green_0_order([b, c, %RouteStops{branch: d_branch, stops: [unsqu | tail]}, e], 0),
    do: [
      b,
      c,
      %RouteStops{branch: d_branch, stops: tail},
      e,
      %RouteStops{branch: d_branch, stops: [unsqu]}
    ]

  defp override_green_0_order(branches, _), do: branches

  # Reduces each green line branch into a tuple of {stops_on_branches, shared_stops}, which gets parsed
  # by &build_green_stop_list/2.
  @spec reduce_green_branch(
          RouteStops.t(),
          {[RouteStop.t()], [RouteStop.t()]},
          direction_id
        ) ::
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
  @spec build_green_stop_list({[stop_with_bubble_info], [RouteStop.t()]}, direction_id) ::
          [stop_with_bubble_info]
  defp build_green_stop_list({branch_stops, shared_stops}, 1) do
    shared_stops
    |> dedupe_green_stop_list
    |> Enum.reduce(
      [],
      &build_branched_stop(&1, &2, {&1.branch, GreenLine.branch_ids()})
    )
    |> Kernel.++(branch_stops)
    |> Enum.reverse()
    |> fix_green_connections()
  end

  defp build_green_stop_list({branch_stops, shared_stops}, 0) do
    shared_stops
    |> dedupe_green_stop_list
    |> Enum.reverse()
    |> Enum.reduce(
      Enum.reverse(branch_stops),
      &build_branched_stop(&1, &2, {&1.branch, GreenLine.branch_ids()})
    )
    |> fix_green_connections()
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

  @spec fix_green_connections([stop_with_bubble_info()]) :: [stop_with_bubble_info()]
  defp fix_green_connections(stops) do
    Enum.map(stops, fn {bubbles, stop} ->
      {bubbles,
       Map.update!(stop, :connections, fn connections ->
         green_indices =
           Enum.with_index(connections)
           |> Enum.filter(fn {connection, _} -> String.starts_with?(connection.id, "Green-") end)
           |> Enum.map(fn {_, index} -> index end)

         List.insert_at(
           connections,
           case {stop.route.id, green_indices} do
             {_, []} -> 0
             {"Green-B", _} -> List.first(green_indices)
             _ -> List.last(green_indices) + 1
           end,
           stop.route
         )
       end)}
    end)
  end

  # Splits green branch into a tuple of shared stops and stops that are unique to that branch.
  @spec split_green_branch(RouteStops.t(), direction_id) :: {[RouteStop.t()], [RouteStop.t()]}

  defp split_green_branch(%RouteStops{stops: []}, _direction_id) do
    {[], []}
  end

  defp split_green_branch(%RouteStops{branch: "Green-E", stops: stops}, _direction_id),
    do: {[], stops}

  defp split_green_branch(%RouteStops{stops: stops, branch: branch_id}, 1) do
    Enum.split_while(stops, fn stop -> stop.id != GreenLine.merge_id(branch_id) end)
  end

  defp split_green_branch(%RouteStops{stops: [stop]}, 0), do: {[], [stop]}

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
  defp parse_green_branch(
         {branch_stops, shared_stops},
         acc,
         direction_id,
         branch_name
       ) do
    branch_stops
    |> Enum.reduce(
      [],
      &build_branched_stop(&1, &2, {branch_name, GreenLine.branch_ids()})
    )
    |> do_parse_green_branch(shared_stops, acc, direction_id)
  end

  @spec do_parse_green_branch(
          [stop_with_bubble_info],
          [RouteStop.t()],
          {[stop_with_bubble_info], [RouteStop.t()]},
          direction_id
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

  # Enriches stops with a boolean indicating whether they are the first or last stop in the current branch
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
      |> Enum.reduce(
        all_stops,
        &build_branched_stop(&1, &2, {current_branch, branch_names}, length(branch_stops))
      )

    {stop_list, branch_names}
  end

  @doc """
  Builds stop bubble information for a stop, and adds the stop to the list of all stops
  as a tuple of {stop_bubbles, %RouteStop{}}.
  """
  @spec build_branched_stop(
          RouteStop.t() | {RouteStop.t(), boolean},
          [stop_with_bubble_info],
          {Route.branch_name(), [Route.branch_name()]},
          pos_integer()
        ) :: [stop_with_bubble_info]
  @spec build_branched_stop(
          RouteStop.t() | {RouteStop.t(), boolean},
          [stop_with_bubble_info],
          {Route.branch_name(), [Route.branch_name()]}
        ) :: [stop_with_bubble_info]
  def build_branched_stop(
        stop,
        branch_stops,
        {_, ["Green" <> _ | _]}
      ) do
    bubble_types = combined_green_stop_bubble_types(stop)

    [{bubble_types, stop} | branch_stops]
  end

  def build_branched_stop(
        {%RouteStop{is_terminus?: true} = stop, _},
        all_stops,
        {nil, branches},
        1
      ) do
    # A terminus on a one-stop trunk is first and foremost a :merge
    [{Enum.map(branches, &{&1, :merge}), stop} | all_stops]
  end

  def build_branched_stop(
        {%RouteStop{is_terminus?: true} = stop, _},
        all_stops,
        {nil, _},
        _branch_length
      ) do
    # Otherwise, a terminus that's not on a branch is always :terminus
    [{[{nil, :terminus}], stop} | all_stops]
  end

  def build_branched_stop(
        {%RouteStop{is_terminus?: false} = stop, true},
        all_stops,
        {nil, branches},
        _branch_length
      ) do
    # If the first or last unbranched stop on a branched route is not a terminus, it's a merge stop.
    # We identify these in order to know where to render the horizontal line connecting a branch to the main line.
    [{Enum.map(branches, &{&1, :merge}), stop} | all_stops]
  end

  def build_branched_stop({%RouteStop{} = stop, _}, all_stops, {nil, _}, _branch_length) do
    # all other unbranched stops are just :stop
    [{[{nil, :stop}], stop} | all_stops]
  end

  def build_branched_stop(
        {%RouteStop{} = stop, _},
        all_stops,
        {current_branch, branches},
        _branch_length
      )
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

  # Alternate bubble generation for the new line diagram, which shows the Green Line as a single
  # branching route instead of four parallel routes.
  #
  # "Merge stop" IDs are hard-coded for the moment since we can't easily get data on *which* lines
  # are merging together at a given stop, and the E line needs a special case since it merges into
  # three other lines we want to represent as a single line.
  defp combined_green_stop_bubble_types(%RouteStop{id: "place-unsqu"}) do
    [{"Green-D", :terminus}]
  end

  defp combined_green_stop_bubble_types(%RouteStop{id: "place-lech"}) do
    [{"Green-E", :terminus}]
  end

  defp combined_green_stop_bubble_types(%RouteStop{id: "place-spmnl"}) do
    [{"Green-E", :stop}]
  end

  defp combined_green_stop_bubble_types(%RouteStop{id: "place-north"}) do
    [{nil, :stop}]
  end

  defp combined_green_stop_bubble_types(%RouteStop{id: "place-coecl"}) do
    [{nil, :merge}, {"Green-E", :merge}]
  end

  defp combined_green_stop_bubble_types(%RouteStop{id: "place-kencl"}) do
    [{"Green-B", :merge}, {"Green-C", :merge}, {"Green-D", :merge}]
  end

  defp combined_green_stop_bubble_types(%RouteStop{id: id, branch: branch}) do
    # Determine which branches should be drawn as lines parallel to this stop's branch.
    parallel_branches =
      case branch do
        nil -> []
        "Green-B" -> []
        "Green-C" -> ["Green-B"]
        "Green-D" -> ["Green-B", "Green-C"]
        "Green-E" -> [nil]
      end

    # Determine whether this stop should be drawn as a terminus on its branch. Since we are
    # presenting everything inbound of Copley as a single combined line, only Union should be
    # considered a terminus on that segment.
    stop_bubble =
      if GreenLine.terminus?(id, branch, 0) or GreenLine.terminus?(id, "Green-D", 1) do
        {branch, :terminus}
      else
        {branch, :stop}
      end

    Enum.map(parallel_branches, &{&1, :line}) ++ [stop_bubble]
  end

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
end
