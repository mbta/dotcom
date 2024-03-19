defmodule Stops.Repo do
  @moduledoc """
  Matches the Ecto API, but fetches Stops from the Stop Info API instead.
  """
  use RepoCache, ttl: :timer.hours(1)
  alias Stops.{Api, Stop}
  alias Routes.Route

  @type stop_feature ::
          Route.route_type()
          | Route.subway_lines_type()
          | :access
          | :parking_lot
          | :"Green-B"
          | :"Green-C"
          | :"Green-D"
          | :"Green-E"
  @type stops_response :: [Stop.t()] | {:error, any}
  @type stop_by_route :: (Route.id_t(), 0 | 1, Keyword.t() -> stops_response)

  for {old_id, gtfs_id} <-
        "priv/stops/stop_id_to_gtfs.csv"
        |> File.stream!()
        |> CSV.decode!(headers: true)
        |> Enum.map(&{&1 |> Map.get("atisId") |> String.split(","), Map.get(&1, "stopID")})
        |> Enum.flat_map(fn {ids, gtfs_id} -> Enum.map(ids, &{&1, gtfs_id}) end) do
    def old_id_to_gtfs_id(unquote(old_id)) do
      unquote(gtfs_id)
    end
  end

  def old_id_to_gtfs_id(_) do
    nil
  end

  @spec get(Stop.id_t()) :: Stop.t() | nil
  def get(id) when is_binary(id) do
    case stop(id) do
      {:ok, s} -> s
      _ -> nil
    end
  end

  @spec get!(Stop.id_t()) :: Stop.t()
  def get!(id) do
    case stop(id) do
      {:ok, %Stop{} = s} -> s
      _ -> raise Stops.NotFoundError, message: "Could not find stop #{id}"
    end
  end

  @spec has_parent?(Stop.t() | Stop.id_t() | nil) :: boolean
  def has_parent?(nil), do: false
  def has_parent?(%Stop{parent_id: nil}), do: false
  def has_parent?(%Stop{parent_id: _}), do: true

  @spec get_parent(Stop.t() | Stop.id_t() | nil) :: Stop.t() | nil
  def get_parent(nil), do: nil

  def get_parent(%Stop{parent_id: nil} = stop) do
    stop
  end

  def get_parent(%Stop{parent_id: parent_id}) when is_binary(parent_id) do
    case stop(parent_id) do
      {:ok, %Stop{} = stop} -> stop
      _ -> nil
    end
  end

  def get_parent(id) when is_binary(id) do
    id
    |> get()
    |> get_parent()
  end

  @spec stop(Stop.id_t()) :: {:ok, Stop.t() | nil} | {:error, any}
  defp stop(id) do
    # the `cache` macro uses the function name as part of the key, and :stop
    # makes more sense for this than :get, since other functions in this
    # module will be working with those cache rows as well.
    cache(id, &Api.by_gtfs_id/1)
  end

  @spec by_route(Route.id_t(), 0 | 1, Keyword.t()) :: stops_response
  def by_route(route_id, direction_id, opts \\ []) do
    cache({route_id, direction_id, opts}, fn args ->
      with stops when is_list(stops) <- Api.by_route(args) do
        for stop <- stops do
          # Put the stop in the cache under {:stop, id} key as well so it will
          # also be cached for Stops.Repo.get/1 calls
          ConCache.put(__MODULE__, {:stop, stop.id}, {:ok, stop})
          stop
        end
      end
    end)
  end

  @spec by_routes([Route.id_t()], 0 | 1, Keyword.t()) :: stops_response
  def by_routes(route_ids, direction_id, opts \\ []) when is_list(route_ids) do
    # once the V3 API supports multiple route_ids in this field, we can do it
    # as a single lookup -ps
    route_ids
    |> Task.async_stream(&by_route(&1, direction_id, opts))
    |> Enum.flat_map(fn
      {:ok, stops} -> stops
      _ -> []
    end)
    |> Enum.uniq()
  end

  @spec by_route_type(Route.route_type(), Keyword.t()) :: stops_response
  def by_route_type(route_type, opts \\ []) do
    cache(
      {route_type, opts},
      fn stop ->
        stop
        |> Stops.Api.by_route_type()
        |> Enum.map(&get_parent/1)
        |> Enum.uniq_by(& &1.id)
      end
    )
  end

  @spec by_trip(Trip.id_t()) :: [Stop.t()]
  def by_trip(trip_id) do
    cache(trip_id, &Api.by_trip/1)
  end

  def stop_exists_on_route?(stop_id, route, direction_id) do
    route
    |> by_route(direction_id)
    |> Enum.any?(&(&1.id == stop_id))
  end

  @doc """
  Returns a list of the features associated with the given stop
  """
  @spec stop_features(Stop.t(), Keyword.t()) :: [stop_feature]
  def stop_features(%Stop{} = stop, opts \\ []) do
    excluded = Keyword.get(opts, :exclude, [])

    [
      route_features(stop.id, opts),
      parking_features(stop.parking_lots),
      accessibility_features(stop.accessibility)
    ]
    |> Enum.concat()
    |> Enum.reject(&(&1 in excluded))
    |> Enum.sort_by(&sort_feature_icons/1)
  end

  defp parking_features([]), do: []
  defp parking_features(_parking_lots), do: [:parking_lot]

  @spec route_features(String.t(), Keyword.t()) :: [stop_feature]
  defp route_features(stop_id, opts) do
    icon_fn =
      if Keyword.get(opts, :expand_branches?) do
        &branch_feature/1
      else
        &Route.icon_atom/1
      end

    opts
    |> Keyword.get(:connections)
    |> get_stop_connections(stop_id)
    |> Enum.map(icon_fn)
    |> Enum.uniq()
  end

  @spec get_stop_connections([Route.t()] | {:error, :not_fetched} | nil, Stop.id_t()) ::
          [Route.t()]
  defp get_stop_connections(connections, _stop_id) when is_list(connections) do
    connections
  end

  defp get_stop_connections(_, stop_id) do
    Routes.Repo.by_stop(stop_id)
  end

  def branch_feature(%Route{id: "Green-B"}), do: :"Green-B"
  def branch_feature(%Route{id: "Green-C"}), do: :"Green-C"
  def branch_feature(%Route{id: "Green-D"}), do: :"Green-D"
  def branch_feature(%Route{id: "Green-E"}), do: :"Green-E"
  def branch_feature(route), do: Route.icon_atom(route)

  @spec accessibility_features([String.t()]) :: [:access]
  defp accessibility_features(["accessible" | _]), do: [:access]
  defp accessibility_features(_), do: []

  @spec sort_feature_icons(atom) :: integer
  defp sort_feature_icons(:"Green-B"), do: 0
  defp sort_feature_icons(:"Green-C"), do: 1
  defp sort_feature_icons(:"Green-D"), do: 2
  defp sort_feature_icons(:"Green-E"), do: 3
  defp sort_feature_icons(:bus), do: 5
  defp sort_feature_icons(:commuter_rail), do: 6
  defp sort_feature_icons(:access), do: 7
  defp sort_feature_icons(:parking_lot), do: 8
  defp sort_feature_icons(_), do: 4
end

defmodule Stops.NotFoundError do
  @moduledoc "Raised when we don't find a stop with the given GTFS ID"
  defexception [:message]
end
