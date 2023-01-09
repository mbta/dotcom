defmodule Routes.Repo do
  @moduledoc "Repo for fetching Route resources and their associated data from the V3 API."

  @behaviour Routes.RepoApi

  require Logger
  use RepoCache, ttl: :timer.hours(1)

  import Routes.Parser

  alias JsonApi
  alias Routes.{Route, Shape}
  alias V3Api.{Shapes}

  @default_opts [include: "route_patterns"]

  @impl Routes.RepoApi
  def all do
    case cache(@default_opts, fn _ ->
           result = handle_response(V3Api.Routes.all(@default_opts))

           for {:ok, routes} <- [result],
               route <- routes do
             ConCache.put(__MODULE__, {:get, route.id}, {:ok, route})
           end

           result
         end) do
      {:ok, routes} -> routes
      {:error, _} -> []
    end
  end

  @impl Routes.RepoApi
  def get(id) when is_binary(id) do
    opts = @default_opts

    case cache({id, opts}, fn {id, opts} ->
           with %{data: [route]} <- V3Api.Routes.get(id, opts) do
             {:ok, parse_route(route)}
           end
         end) do
      {:ok, route} -> route
      {:error, _} -> nil
    end
  end

  @impl Routes.RepoApi
  def get_shapes(route_id, opts, filter_negative_priority? \\ true) do
    opts = Keyword.put(opts, :route, route_id)

    shapes =
      cache(Enum.sort(opts), fn _ ->
        case Shapes.all(opts) do
          {:error, _} ->
            []

          %JsonApi{data: data} ->
            shapes = Enum.flat_map(data, &parse_shape/1)

            for shape <- shapes do
              ConCache.put(__MODULE__, {:get_shape, shape.id}, [shape])
            end

            shapes
        end
      end)

    filter_shapes_by_priority(shapes, filter_negative_priority?)
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
  def get_shape(shape_id) do
    cache(shape_id, fn _ ->
      case Shapes.by_id(shape_id) do
        {:error, _} ->
          []

        %JsonApi{data: data} ->
          Enum.flat_map(data, &parse_shape/1)
      end
    end)
  end

  @impl Routes.RepoApi
  def by_type(types) when is_list(types) do
    types = Enum.sort(types)

    case cache(types, &by_type_uncached/1) do
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

  @impl Routes.RepoApi
  def by_stop(stop_id, opts \\ []) do
    opts = Keyword.merge(@default_opts, opts)

    case cache({stop_id, opts}, fn {stop_id, opts} ->
           stop_id |> V3Api.Routes.by_stop(opts) |> handle_response
         end) do
      {:ok, routes} -> routes
      {:error, _} -> []
    end
  end

  @impl Routes.RepoApi
  def by_stop_and_direction(stop_id, direction_id, opts \\ []) do
    opts = Keyword.merge(@default_opts, opts)

    case cache({stop_id, direction_id, opts}, fn {stop_id, direction_id, opts} ->
           stop_id
           |> V3Api.Routes.by_stop_and_direction(direction_id, opts)
           |> handle_response
         end) do
      {:ok, routes} -> routes
      {:error, _} -> []
    end
  end

  @impl Routes.RepoApi
  def by_stop_with_route_pattern(stop_id) do
    cache({stop_id, [include: "route_patterns"]}, fn {stop_id, _opts} ->
      [stop: stop_id, include: "route_patterns"]
      |> V3Api.Routes.all()
      |> Map.get(:data, [])
      |> Enum.map(&parse_route_with_route_pattern/1)
    end)
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
