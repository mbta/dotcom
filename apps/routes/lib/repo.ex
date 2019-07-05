defmodule Routes.Repo do
  require Logger
  use RepoCache, ttl: :timer.hours(1)

  import Routes.Parser

  alias JsonApi
  alias Routes.{Route, Shape}
  alias V3Api.{Routes, Shapes}

  @doc """

  Returns a list of all the routes

  """
  @spec all() :: [Route.t()]
  def all do
    case cache([], fn _ ->
           result = handle_response(Routes.all())

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

  @doc """

  Returns a single route by ID

  """
  @spec get(String.t()) :: Route.t() | nil
  def get(id) when is_binary(id) do
    case cache(id, fn id ->
           with %{data: [route]} <- Routes.get(id) do
             {:ok, parse_route(route)}
           end
         end) do
      {:ok, route} -> route
      {:error, _} -> nil
    end
  end

  @spec get_shapes(String.t(), Keyword.t(), boolean) :: [Shape.t()]
  def get_shapes(route_id, opts, filter_negative_priority? \\ true) do
    opts = Keyword.put(opts, :route, route_id)

    shapes =
      cache(opts, fn _ ->
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

  @spec get_shape(String.t()) :: [Shape.t()]
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

  @doc """

  Given a route_type (or list of route types), returns the list of routes matching that type.

  """
  @spec by_type([0..4] | 0..4) :: [Route.t()]
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

  @doc """

  Given a stop ID, returns the list of routes which stop there.

  """
  @spec by_stop(String.t(), Keyword.t()) :: [Route.t()]
  def by_stop(stop_id, opts \\ []) do
    case cache({stop_id, opts}, fn {stop_id, opts} ->
           stop_id |> Routes.by_stop(opts) |> handle_response
         end) do
      {:ok, routes} -> routes
      {:error, _} -> []
    end
  end

  @doc """

  Given a stop ID and direction ID, returns the list of routes which stop there in that direction.

  """
  @spec by_stop_and_direction(String.t(), 0 | 1, Keyword.t()) :: [Route.t()]
  def by_stop_and_direction(stop_id, direction_id, opts \\ []) do
    case cache({stop_id, direction_id, opts}, fn {stop_id, direction_id, opts} ->
           stop_id
           |> Routes.by_stop_and_direction(direction_id, opts)
           |> handle_response
         end) do
      {:ok, routes} -> routes
      {:error, _} -> []
    end
  end

  @spec handle_response(JsonApi.t() | {:error, any}) :: {:ok, [Route.t()]} | {:error, any}
  def handle_response({:error, reason}) do
    {:error, reason}
  end

  def handle_response(%{data: data}) do
    {:ok,
     data
     |> Enum.reject(&route_hidden?/1)
     |> Enum.map(&parse_route/1)}
  end

  @doc """
  Determines if the given route-data is hidden
  """
  @spec route_hidden?(%{id: String.t()}) :: boolean
  def route_hidden?(%{id: "746"}), do: true
  def route_hidden?(%{id: "2427"}), do: true
  def route_hidden?(%{id: "3233"}), do: true
  def route_hidden?(%{id: "3738"}), do: true
  def route_hidden?(%{id: "4050"}), do: true
  def route_hidden?(%{id: "627"}), do: true
  def route_hidden?(%{id: "725"}), do: true
  def route_hidden?(%{id: "8993"}), do: true
  def route_hidden?(%{id: "116117"}), do: true
  def route_hidden?(%{id: "214216"}), do: true
  def route_hidden?(%{id: "441442"}), do: true
  def route_hidden?(%{id: "9701"}), do: true
  def route_hidden?(%{id: "9702"}), do: true
  def route_hidden?(%{id: "9703"}), do: true
  def route_hidden?(%{id: "Logan-" <> _}), do: true
  def route_hidden?(%{id: "CapeFlyer"}), do: true
  def route_hidden?(%{id: "Boat-F3"}), do: true
  def route_hidden?(_), do: false

  @doc """
  The Green Line.
  """
  @spec green_line :: Route.t()
  def green_line do
    %Route{
      id: "Green",
      name: "Green Line",
      long_name: "Green Line",
      direction_names: %{0 => "West", 1 => "East"},
      direction_destinations: %{
        0 => "Boston College / Cleveland Circle / Riverside / Heath Street",
        1 => "Park Street / Government Center / North Station / Lechmere"
      },
      type: 0,
      description: :rapid_transit
    }
  end
end
