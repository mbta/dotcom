defmodule Stops.Nearby do
  @moduledoc "Functions for retrieving and organizing stops relative to a location."
  import Util.Distance

  alias MBTA.Api
  alias Routes.Route
  alias Stops.Stop
  alias Util.Position

  @mile_in_degrees 0.02
  @total 12

  @type route_with_direction :: %{direction_id: 0 | 1 | nil, route: Route.t()}

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  defmodule Options do
    @moduledoc "Defines shared options and defaults for this module's functions."
    defstruct api_fn: &Stops.Nearby.api_around/2,
              keys_fn: &Stops.Nearby.keys/1,
              limit: nil
  end

  @doc """
  Returns a list of %Stops.Stop{} around the given latitude/longitude.

  The algorithm should return 12 or fewer results:

  * Return 4 nearest CR or Subway stops
  ** for CR use 50 mile radius
  ** for subway - 30 mile radius
  ** return at least 1 CR stop and 1 Subway stop
  * Return all Bus stops with 1 mi radius
  ** limit to 2 stops per line-direction
  * Return Subway stops in 5 mi radius
  """
  @spec nearby_with_varying_radius_by_mode(Position.t()) :: [Stop.t()]
  def nearby_with_varying_radius_by_mode(position, opts \\ []) do
    opts = Map.merge(%Options{}, Map.new(opts))

    commuter_rail_stops = api_task(position, opts, radius: @mile_in_degrees * 50, route_type: 2)
    subway_stops = api_task(position, opts, radius: @mile_in_degrees * 10, route_type: "0,1")
    bus_stops = api_task(position, opts, radius: @mile_in_degrees, route_type: 3)

    position
    |> gather_stops(
      Task.await(commuter_rail_stops),
      subway_stops |> Task.await() |> sort(position) |> no_more_than(1, opts.keys_fn),
      bus_stops |> Task.await() |> sort(position) |> no_more_than(2, opts.keys_fn)
    )
    |> Task.async_stream(&@stops_repo.get_parent(&1.id))
    |> Enum.map(fn {:ok, result} -> result end)
  end

  def api_task(position, %{api_fn: api_fn}, opts) do
    Task.async(Kernel, :apply, [api_fn, [position, opts]])
  end

  @spec api_around(Position.t(), keyword) :: [
          %{id: String.t(), latitude: float, longitude: float}
        ]
  def api_around(position, opts) do
    opts =
      opts
      |> Keyword.merge(
        latitude: Position.latitude(position),
        longitude: Position.longitude(position),
        include: "parent_station"
      )
      |> Keyword.put(:"fields[stop]", "latitude,longitude")
      |> Keyword.put(:"fields[parent_station]", "latitude,longitude")
      |> Keyword.put(:sort, "distance")

    opts
    |> Api.Stops.all()
    |> Map.get(:data)
    |> Enum.map(&item_to_position/1)
    |> Enum.uniq()
  end

  defp item_to_position(%JsonApi.Item{relationships: %{"parent_station" => [station]}}) do
    item_to_position(station)
  end

  defp item_to_position(%JsonApi.Item{id: id, attributes: %{"latitude" => latitude, "longitude" => longitude}}) do
    %{
      id: id,
      latitude: latitude,
      longitude: longitude
    }
  end

  def keys(%{id: id}) do
    Enum.flat_map(0..1, fn direction_id ->
      id
      |> @routes_repo.by_stop(direction_id: direction_id)
      |> Enum.map(&{&1.id, direction_id})
    end)
  end

  @doc """
  Given a list of commuter rail, subway, and bus stops, organize them
  according to the algorithm.
  """
  @spec gather_stops(Position.t(), [Position.t()], [Position.t()], [Position.t()]) :: [
          Position.t()
        ]
  def gather_stops(_, [], [], []) do
    []
  end

  def gather_stops(position, commuter_rail, subway, bus) do
    main_stops = gather_main_stops(position, commuter_rail, subway)
    bus = gather_non_duplicates(position, bus, main_stops)
    subway = gather_non_duplicates(position, subway, bus ++ main_stops)

    [main_stops, bus, subway]
    |> Enum.concat()
    |> sort(position)
  end

  defp gather_main_stops(position, commuter_rail, subway) do
    {first_cr, sorted_commuter_rail} = closest_and_rest(commuter_rail, position)
    {first_subway, sorted_subway} = closest_and_rest(subway, position)

    initial = Enum.uniq(first_cr ++ first_subway)
    rest = Enum.uniq(sorted_commuter_rail ++ sorted_subway)

    next_four =
      position
      |> gather_non_duplicates(rest, initial)
      |> Enum.take(4 - length(initial))

    initial ++ next_four
  end

  defp gather_non_duplicates(position, items, existing) do
    items
    |> Enum.reject(&(&1 in existing))
    |> closest(position, @total - length(existing))
  end

  # Returns the closest item (in a list) as well as the rest of the list.  In
  # the case of an empty initial list, returns a tuple of two empty lists.
  # The first list represents a kind of Maybe: [item] :: Just item and [] :: Nothing
  @spec closest_and_rest([Position.t()], Position.t()) :: {[Position.t()], [Position.t()]}
  defp closest_and_rest([], _) do
    {[], []}
  end

  defp closest_and_rest(items, position) do
    [first | rest] = sort(items, position)

    {[first], rest}
  end

  defp reduce_keys({:ok, {item, keys}}, {existing, all_keys}, max_count) do
    still_valid_keys = Enum.reject(keys, &(Map.get(all_keys, &1) == max_count))

    if still_valid_keys == [] do
      {existing, all_keys}
    else
      updated_keys =
        Enum.reduce(still_valid_keys, all_keys, fn key, keys ->
          Map.update(keys, key, 1, &(&1 + 1))
        end)

      {[item | existing], updated_keys}
    end
  end

  @doc """
  Filters an enumerable such that the keys (returned by `keys_fn`) do not
  appear more than `max_count` times.

  iex> Stops.Nearby.no_more_than([1, 2, 3, 4, 5], 2, fn i -> [rem(i, 2)] end)
  [1, 2, 3, 4]

  iex> Stops.Nearby.no_more_than([1, 2, 3, 4, 5], 2, fn i -> [rem(i, 2), div(i, 2)] end)
  [1, 2, 4, 5]

  iex> Stops.Nearby.no_more_than([1, 2, 3, 4, 5], 1, fn i -> [rem(i, 2)] end)
  [1, 2]
  """
  @spec no_more_than(Enum.t(), pos_integer, (any -> [any])) :: Enum.t()
  def no_more_than(enum, max_count, keys_fn) do
    {items, _} =
      enum
      |> Task.async_stream(fn item -> {item, keys_fn.(item)} end)
      |> Enum.reduce({[], %{}}, &reduce_keys(&1, &2, max_count))

    Enum.reverse(items)
  end
end
