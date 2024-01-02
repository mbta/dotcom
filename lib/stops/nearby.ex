defmodule Stops.Nearby do
  @moduledoc "Functions for retrieving and organizing stops relative to a location."
  import Util.Distance
  alias Routes.Route
  alias Stops.Stop
  alias Util.{Distance, Position}

  @default_timeout 10_000
  @mile_in_degrees 0.02
  @total 12

  @type route_with_direction :: %{direction_id: 0 | 1 | nil, route: Route.t()}

  defmodule Options do
    @moduledoc "Defines shared options and defaults for this module's functions."
    defstruct api_fn: &Stops.Nearby.api_around/2,
              keys_fn: &Stops.Nearby.keys/1,
              fetch_fn: &Stops.Repo.get_parent/1,
              routes_fn: &Routes.Repo.by_stop_and_direction/2,
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
    opts =
      %Options{}
      |> Map.merge(Map.new(opts))

    commuter_rail_stops = api_task(position, opts, radius: @mile_in_degrees * 50, route_type: 2)
    subway_stops = api_task(position, opts, radius: @mile_in_degrees * 10, route_type: "0,1")
    bus_stops = api_task(position, opts, radius: @mile_in_degrees, route_type: 3)

    position
    |> gather_stops(
      Task.await(commuter_rail_stops),
      subway_stops |> Task.await() |> sort(position) |> no_more_than(1, opts.keys_fn),
      bus_stops |> Task.await() |> sort(position) |> no_more_than(2, opts.keys_fn)
    )
    |> Task.async_stream(&opts.fetch_fn.(&1.id))
    |> Enum.map(fn {:ok, result} -> result end)
  end

  @spec nearby_with_routes(Position.t(), float, keyword) :: [
          %{stop: Stop.t(), routes_with_direction: [route_with_direction]}
        ]
  def nearby_with_routes(position, radius, opts \\ []) do
    opts =
      %Options{}
      |> Map.merge(Map.new(opts))

    stops =
      position
      |> opts.api_fn.(radius: radius)
      |> Task.async_stream(&opts.fetch_fn.(&1.id))
      |> Enum.map(fn {:ok, result} -> result end)

    stops
    |> Enum.map(fn stop ->
      %{
        stop: stop,
        distance:
          Distance.haversine(position, %{longitude: stop.longitude, latitude: stop.latitude})
      }
    end)
    |> Enum.reject(&(&1.distance == 0))
    |> Enum.take(opts.limit || length(stops))
    |> Task.async_stream(fn %{stop: stop, distance: distance} ->
      case merge_routes(stop.id, opts.routes_fn) do
        {:ok, routes_with_direction} ->
          %{
            stop: stop,
            distance: distance,
            routes_with_direction: routes_with_direction
          }

        {:error, :timeout} ->
          %{
            stop: stop,
            distance: distance,
            routes_with_direction: []
          }
      end
    end)
    |> Enum.map(fn {:ok, result} -> result end)
  end

  def routes_for_stop_direction(routes_fn, stop_id, direction_id) do
    stop_id
    |> routes_fn.(direction_id)
    |> do_routes_for_stop_direction(direction_id)
  end

  def do_routes_for_stop_direction(routes, direction_id) when is_list(routes) do
    Enum.map(routes, &%{direction_id: direction_id, route: &1})
  end

  def do_routes_for_stop_direction(_, _), do: :error

  @spec merge_routes(String.t(), fun()) :: {:ok | :error, [route_with_direction] | :timeout}
  def merge_routes(stop_id, routes_fn) do
    # Find the routes for a stop in both directions.
    # Merge the routes such that if a route exists for a stop in both
    # directions, set the direction_id to nil

    direction_0_task = Task.async(__MODULE__, :routes_for_stop_direction, [routes_fn, stop_id, 0])
    direction_1_task = Task.async(__MODULE__, :routes_for_stop_direction, [routes_fn, stop_id, 1])

    result =
      Util.yield_or_default_many(
        %{
          direction_0_task => {:direction_0_routes, {:error, :timeout}},
          direction_1_task => {:direction_1_routes, {:error, :timeout}}
        },
        __MODULE__,
        @default_timeout
      )

    case result do
      %{direction_0_routes: direction_0_routes, direction_1_routes: direction_1_routes}
      when is_list(direction_0_routes) and is_list(direction_1_routes) ->
        routes =
          [direction_0_routes | direction_1_routes]
          |> List.flatten()
          |> Enum.reduce(%{}, fn %{route: route} = route_with_direction, merged_routes ->
            # credo:disable-for-lines:4 Credo.Check.Refactor.Nesting
            direction_id =
              if Map.has_key?(merged_routes, route.id),
                do: nil,
                else: route_with_direction.direction_id

            Map.put(merged_routes, route.id, %{route_with_direction | direction_id: direction_id})
          end)
          |> Map.values()

        {:ok, routes}

      _ ->
        {:error, :timeout}
    end
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
    |> V3Api.Stops.all()
    |> Map.get(:data)
    |> Enum.map(&item_to_position/1)
    |> Enum.uniq()
  end

  defp item_to_position(%JsonApi.Item{relationships: %{"parent_station" => [station]}}) do
    item_to_position(station)
  end

  defp item_to_position(%JsonApi.Item{
         id: id,
         attributes: %{"latitude" => latitude, "longitude" => longitude}
       }) do
    %{
      id: id,
      latitude: latitude,
      longitude: longitude
    }
  end

  def keys(%{id: id}) do
    0..1
    |> Enum.flat_map(fn direction_id ->
      id
      |> Routes.Repo.by_stop(direction_id: direction_id)
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

    initial = (first_cr ++ first_subway) |> Enum.uniq()
    rest = (sorted_commuter_rail ++ sorted_subway) |> Enum.uniq()

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
      |> Enum.reduce({[], %{}}, fn {:ok, {item, keys}}, {existing, all_keys} ->
        still_valid_keys = Enum.reject(keys, &(Map.get(all_keys, &1) == max_count))

        if still_valid_keys == [] do
          {existing, all_keys}
        else
          updated_keys =
            still_valid_keys
            |> Enum.reduce(all_keys, fn key, keys ->
              Map.update(keys, key, 1, &(&1 + 1))
            end)

          {[item | existing], updated_keys}
        end
      end)

    Enum.reverse(items)
  end
end
