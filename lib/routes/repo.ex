defmodule Routes.Repo do
  @moduledoc "Repo for fetching Route resources and their associated data from the V3 API."

  require Logger

  use Nebulex.Caching.Decorators

  import Routes.Parser

  alias JsonApi
  alias Routes.{Route, Shape}
  alias V3Api.{Shapes}

  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(1)

  @default_opts [include: "route_patterns"]

  @behaviour Routes.RepoApi

  @impl Routes.RepoApi
  def all do
    case cached_all(@default_opts) do
      {:ok, routes} -> routes
      {:error, _} -> []
    end
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp cached_all(opts) do
    result = handle_response(V3Api.Routes.all(opts))

    for {:ok, routes} <- [result], route <- routes do
      @cache.put({:get, route.id}, {:ok, route})
    end

    result
  end

  # Used to spoof any Massport route as the data doesn't exist in the API
  # But is in the GTFS data
  @impl Routes.RepoApi
  def get("Massport-" <> id) do
    %Route{
      description: "Massport Generated Route",
      id: "Massport-" <> id,
      long_name: "Massport-" <> id,
      name: "Massport-" <> id,
      type: "Massport-" <> id,
      custom_route?: true,
      color: "000000"
    }
  end

  def get(id) when is_binary(id) do
    opts = @default_opts

    case cached_get(id, opts) do
      {:ok, route} -> route
      {:error, _} -> nil
    end
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp cached_get(id, opts) do
    with %{data: [route]} <- V3Api.Routes.get(id, opts) do
      {:ok, parse_route(route)}
    end
  end

  @impl Routes.RepoApi
  def get_shapes(route_id, opts, filter_negative_priority? \\ true) do
    shapes = Keyword.put(opts, :route, route_id) |> cached_get_shapes()

    filter_shapes_by_priority(shapes, filter_negative_priority?)
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp cached_get_shapes(opts) do
    case Shapes.all(opts) do
      {:error, _} ->
        []

      %JsonApi{data: data} ->
        shapes = Enum.flat_map(data, &parse_shape/1)

        for shape <- shapes do
          @cache.put({:get_shape, shape.id}, [shape])
        end

        shapes
    end
  end

  @spec filter_shapes_by_priority([Shape.t()], boolean) :: [Shape.t()]
  defp filter_shapes_by_priority(shapes, true) do
    for shape <- shapes,
        shape.priority >= 0 do
      shape
    end
  end

  defp filter_shapes_by_priority(shapes, false) do
    shapes
  end

  @impl Routes.RepoApi
  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def get_shape(shape_id) do
    case Shapes.by_id(shape_id) do
      {:error, _} ->
        []

      %JsonApi{data: data} ->
        Enum.flat_map(data, &parse_shape/1)
    end
  end

  @impl Routes.RepoApi
  def by_type(types) when is_list(types) do
    types = Enum.sort(types)

    case by_type_cached(types) do
      {:ok, routes} -> routes
      {:error, _} -> []
    end
  end

  def by_type(type) do
    by_type([type])
  end

  @spec by_type_uncached([0..4]) :: {:ok, [Route.t()]} | {:error, any}
  defp by_type_uncached(types) do
    case all() do
      [] -> {:error, "no routes"}
      routes -> {:ok, Enum.filter(routes, fn route -> route.type in types end)}
    end
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp by_type_cached(types) do
    by_type_uncached(types)
  end

  @impl Routes.RepoApi
  def by_stop(stop_id, opts \\ []) do
    opts = Keyword.merge(@default_opts, opts)

    case cached_by_stop(stop_id, opts) do
      {:ok, routes} -> routes
      {:error, _} -> []
    end
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp cached_by_stop(stop_id, opts) do
    stop_id |> V3Api.Routes.by_stop(opts) |> handle_response
  end

  @impl Routes.RepoApi
  def by_stop_and_direction(stop_id, direction_id, opts \\ []) do
    opts = Keyword.merge(@default_opts, opts)

    case cached_by_stop_and_direction(stop_id, direction_id, opts) do
      {:ok, routes} -> routes
      {:error, _} -> []
    end
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp cached_by_stop_and_direction(stop_id, direction_id, opts) do
    stop_id |> V3Api.Routes.by_stop_and_direction(direction_id, opts) |> handle_response
  end

  @impl Routes.RepoApi
  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def by_stop_with_route_pattern(stop_id) do
    [stop: stop_id, include: "route_patterns"]
    |> V3Api.Routes.all()
    |> Map.get(:data, [])
    |> Enum.map(&parse_route_with_route_pattern/1)
  end

  @doc """
  Parses json into a list of routes, or an error if it happened.
  """
  @spec handle_response(JsonApi.t() | {:error, any}) :: {:ok, [Route.t()]} | {:error, any}
  def handle_response({:error, reason}) do
    {:error, reason}
  end

  def handle_response(%{data: data}) do
    {:ok,
     data
     |> Enum.flat_map(&fetch_connecting_routes_via_stop/1)
     |> Enum.reject(&Route.hidden?/1)
     |> Enum.map(&parse_route/1)
     |> Enum.uniq()
     |> Enum.sort_by(& &1.sort_order)}
  end

  @impl Routes.RepoApi
  def green_line do
    %Route{
      id: "Green",
      name: "Green Line",
      long_name: "Green Line",
      direction_names: %{0 => "Westbound", 1 => "Eastbound"},
      direction_destinations: %{0 => "All branches", 1 => "All branches"},
      type: 0,
      description: :rapid_transit,
      color: "00843D"
    }
  end

  @spec fetch_connecting_routes_via_stop(JsonApi.Item.t()) ::
          [JsonApi.Item.t()] | JsonApi.Item.t()
  defp fetch_connecting_routes_via_stop(
         %JsonApi.Item{
           relationships: %{
             "stop" => [%JsonApi.Item{relationships: %{"connecting_stops" => connecting_stops}}]
           }
         } = route
       ) do
    Enum.flat_map(connecting_stops, fn %JsonApi.Item{id: stop_id} ->
      case V3Api.Routes.by_stop(stop_id) do
        %JsonApi{data: data} -> data
        _ -> []
      end
    end) ++ [route]
  end

  defp fetch_connecting_routes_via_stop(route), do: [route]
end
