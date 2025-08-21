defmodule GreenLine do
  @moduledoc """
  Functions for handling the Green Line and its associated schedules.
  """

  alias Routes.Route
  alias Stops.Stop

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @type route_id_stop_id_map :: %{Route.id_t() => MapSet.t()}
  @type stop_routes_pair :: {[Stop.t()] | {:error, any}, route_id_stop_id_map}
  @type branch_name :: String.t()

  @doc """
  Returns the `calculate_stops_on_routes` results from the GreenLine.Cache.
  """
  def stops_on_routes(direction_id, date \\ nil) do
    calculate_stops_on_routes(direction_id, date)
  end

  @doc """
  Returns the list of Green Line stops, as well as a MapSet of {stop_id, route_id} pairs to signify
  that a stop is on the branch in question.  Optionally takes a date for which to fetch the
  schedules.
  """
  def calculate_stops_on_routes(direction_id, date \\ nil) do
    branch_ids()
    |> Task.async_stream(&green_line_stops(&1, direction_id, date))
    |> Enum.reduce({[], %{}}, &merge_green_line_stops/2)
  end

  @doc """
  Terminal stops for each Green Line branch and direction.
  """
  def termini_stops do
    for direction_id <- [0, 1], branch_id <- GreenLine.branch_ids(), into: %{} do
      stop = @stops_repo.by_route(branch_id, direction_id) |> List.last()
      {{branch_id, direction_id}, stop}
    end
  end

  @doc """
  Returns whether or not the given stop is a terminus for the line. Assumes the given stop is
  actually on the line.
  """
  def terminus?(stop_id, branch_name) do
    terminus?(stop_id, branch_name, 0) or terminus?(stop_id, branch_name, 1)
  end

  @doc """
  Returns whether or not the stop is a terminus for the line in the given direction. Assumes
  the stop is actually on the line.
  """
  def terminus?(stop_id, branch_name, direction_id) do
    Map.get(termini_stops(), {branch_name, direction_id}, %{}) |> Map.get(:id) == stop_id
  end

  @doc "A naive guess at the destination of a green line train when no trip is available"
  def naive_headsign(branch_name, direction_id) do
    termini_stops()
    |> Map.get({branch_name, direction_id}, %{})
    |> Map.get(:name)
  end

  @doc """
  Given a stop ID, route ID, and route => stop set map, returns whether the stop is on the route.
  """
  def stop_on_route?(stop_id, branch_name, {_, map}) do
    MapSet.member?(map[branch_name], stop_id)
  end

  @doc """
  Returns stops on the specific branch of the line.
  """
  def route_stops(route_id, {_, map}) do
    map[route_id]
  end

  @doc """
  All the branch IDs of the Green Line.
  """
  def branch_ids do
    ~w(Green-B Green-C Green-D Green-E)s
  end

  @doc """
  The stops on the green line that are on multiple green line branches.
  """
  def shared_stops,
    do: [
      "place-north",
      "place-haecl",
      "place-gover",
      "place-pktrm",
      "place-boyls",
      "place-armnl",
      "place-coecl",
      "place-hymnl",
      "place-kencl"
    ]

  @doc """
  Returns a list of the shared stops that the branch does NOT reach.
  """
  def excluded_shared_stops("Green-B"),
    do: ["place-north", "place-haecl"]

  def excluded_shared_stops("Green-C"), do: ["place-north", "place-haecl"]

  def excluded_shared_stops("Green-D"),
    do: []

  def excluded_shared_stops("Green-E"), do: ["place-kencl", "place-hymnl"]

  @doc """
  The stop at which a branch joins the other branches.
  """
  def merge_id("Green-E"), do: "place-coecl"
  def merge_id(_), do: "place-kencl"

  @doc """
  The first stop that belongs exclusively to each branch.
  """
  def split_id("Green-B"), do: "place-bland"
  def split_id("Green-C"), do: "place-smary"
  def split_id("Green-D"), do: "place-fenwy"
  def split_id("Green-E"), do: "place-prmnl"

  @doc """
  Creates a map %{stop_id => [route_id]}
  where each stop_id key has a value of the Green line routes
  that stops at that Stop
  """
  def routes_for_stops({_, route_sets}) do
    Enum.reduce(route_sets, Map.new(), &do_routes_for_stops/2)
  end

  defp do_routes_for_stops({route_id, stop_set}, map) do
    Enum.reduce(stop_set, map, fn stop_id, acc_map ->
      Map.update(acc_map, stop_id, [route_id], &[route_id | &1])
    end)
  end

  # Returns the stops that are on a given branch of the Green line,
  # along with the route ID.
  defp green_line_stops(route_id, direction_id, date) do
    opts =
      if is_nil(date) do
        []
      else
        [date: date]
      end

    stops =
      route_id
      |> @stops_repo.by_route(direction_id, opts)
      |> filter_lines(route_id)

    {route_id, stops}
  end

  def filter_lines({:error, _} = error, _) do
    error
  end

  def filter_lines(stops, route_id) do
    stops
    |> do_filter_lines(route_id, false, [])
    |> Enum.reverse()
  end

  # Basically a state machine -- when one terminal is encountered it
  # begins adding stops to the accumulator; it then proceeds down the
  # list of stops until the other terminal is seen, at which point it
  # adds it on and returns the full list.
  defp do_filter_lines(stops, route_id, in_line?, acc)

  defp do_filter_lines([], _route_id, _in_line?, acc) do
    acc
  end

  defp do_filter_lines([stop | stops], route_id, false, []) do
    if terminus?(stop.id, route_id) do
      do_filter_lines(stops, route_id, true, [stop])
    else
      do_filter_lines(stops, route_id, false, [])
    end
  end

  defp do_filter_lines([stop | stops], route_id, true, acc) do
    if terminus?(stop.id, route_id) do
      [stop | acc]
    else
      do_filter_lines(stops, route_id, true, [stop | acc])
    end
  end

  # Returns the current full list of stops on the Green line, along with a
  # map of {route_id => [stop_id]} representing all the stops on the route.
  # The {:ok, _} part of the pattern match is due to using Task.async_stream.
  defp merge_green_line_stops(_, {{:error, _}, _} = acc) do
    # stops have an error, don't need to do anything else
    acc
  end

  defp merge_green_line_stops(
         {:ok, {_route_id, {:error, _} = error}},
         {_current_stops, route_id_stop_map}
       ) do
    # new error, return that for stops
    {error, route_id_stop_map}
  end

  defp merge_green_line_stops({:ok, {route_id, line_stops}}, {current_stops, route_id_stop_map}) do
    # Update route_id_stop_map to include the stop
    route_id_stop_map =
      line_stops
      |> Enum.reduce(
        Map.put(route_id_stop_map, route_id, MapSet.new()),
        fn %{id: stop_id}, map ->
          insert_stop_id(map, route_id, stop_id)
        end
      )

    current_stops =
      line_stops
      |> List.myers_difference(current_stops)
      |> Enum.flat_map(fn {_op, stops} -> stops end)

    {current_stops, route_id_stop_map}
  end

  defp insert_stop_id(map, route_id, stop_id) do
    Map.update(
      map,
      route_id,
      MapSet.new(),
      fn stop_ids ->
        MapSet.put(stop_ids, stop_id)
      end
    )
  end
end
