defmodule Routes.Repo do
  @moduledoc "Repo for fetching Route resources and their associated data from the V3 API."

  use Dotcom.Gettext.Sigils
  use Nebulex.Caching.Decorators

  require Logger

  import Routes.Parser

  alias Dotcom.Cache.KeyGenerator
  alias JsonApi
  alias MBTA.Api.Shapes
  alias Routes.Route

  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(1)

  @default_opts [include: "route_patterns"]

  @behaviour Routes.Repo.Behaviour

  @impl Routes.Repo.Behaviour
  def all do
    case cached_all(@default_opts) do
      {:ok, routes} -> routes
      {:error, _} -> []
    end
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp cached_all(opts) do
    result = handle_response(MBTA.Api.Routes.all(opts))

    for {:ok, routes} <- [result], route <- routes do
      key = KeyGenerator.generate(__MODULE__, :cached_get, [route.id, opts])

      @cache.put(key, {:ok, route})
    end

    result
  end

  @impl Routes.Repo.Behaviour
  def get("Green"), do: green_line()

  def get(id) when is_binary(id) do
    opts = @default_opts

    case cached_get(id, opts) do
      {:ok, route} -> route
      {:error, _} -> nil
    end
    |> update_destinations()
  end

  # Ferries F1 and F2H are functionally the same route for riders, but are treated separately
  # by the ferry operator.  This hack is one of a few that merges the two routes for
  # presentation on the website.  #2H is the one we're showing, F1 is being hidden.
  # This function updates F2H's inbound direction destination to include Rowes Wharf from F1

  defp update_destinations(%Route{id: "Boat-F2H"} = route) do
    %Route{
      route
      | direction_destinations:
          route.direction_destinations
          |> Map.put(1, "Long Wharf or Rowes Wharf")
    }
  end

  defp update_destinations(route), do: route

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp cached_get(id, opts) do
    with %{data: [route]} <- MBTA.Api.Routes.get(id, opts) do
      {:ok, parse_route(route)}
    end
  end

  @impl Routes.Repo.Behaviour
  def get_shapes(route_id, opts) do
    Keyword.put(opts, :route, route_id)
    |> cached_get_shapes()
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp cached_get_shapes(opts) do
    case Shapes.all(opts) do
      {:error, _} ->
        []

      %JsonApi{data: data} ->
        shapes = Enum.flat_map(data, &parse_shape/1)

        for shape <- shapes do
          key = KeyGenerator.generate(__MODULE__, :get_shape, shape.id)

          @cache.put(key, [shape])
        end

        shapes
    end
  end

  @impl Routes.Repo.Behaviour
  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def get_shape(shape_id) do
    case Shapes.by_id(shape_id) do
      {:error, _} ->
        []

      %JsonApi{data: data} ->
        Enum.flat_map(data, &parse_shape/1)
    end
  end

  @impl Routes.Repo.Behaviour
  def by_type(types) when is_list(types) do
    all()
    |> Enum.filter(fn route -> route.type in types end)
  end

  def by_type(type) do
    by_type([type])
  end

  @impl Routes.Repo.Behaviour
  def by_stop(stop_id, opts \\ []) do
    opts = Keyword.merge(@default_opts, opts)

    case cached_by_stop(stop_id, opts) do
      {:ok, routes} -> routes
      {:error, _} -> []
    end
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp cached_by_stop(stop_id, opts) do
    stop_id |> MBTA.Api.Routes.by_stop(opts) |> handle_response
  end

  @doc """
  Parses json into a list of routes, or an error if it happened.
  """
  @spec handle_response(JsonApi.t() | {:error, any}) :: {:ok, [Route.t()]} | {:error, any}
  def handle_response({:error, reason}) do
    {:error, reason}
  end

  def handle_response(%{data: data}) do
    connecting_routes =
      data
      |> Stream.flat_map(&Map.get(&1.relationships, "stop", []))
      |> Stream.flat_map(&Map.get(&1.relationships, "connecting_stops", []))
      |> Stream.map(& &1.id)
      |> Stream.uniq()
      |> Stream.flat_map(fn stop_id ->
        case cached_by_stop(stop_id, []) do
          {:ok, routes} -> routes
          {:error, _} -> []
        end
      end)

    {:ok,
     data
     |> Stream.reject(&Route.hidden?/1)
     |> Stream.map(&parse_route/1)
     |> Stream.concat(connecting_routes)
     |> Stream.uniq()
     |> Enum.sort_by(& &1.sort_order)}
  end

  @impl Routes.Repo.Behaviour
  def green_line do
    %Route{
      id: "Green",
      name: "Green Line",
      long_name: "Green Line",
      direction_names: %{0 => ~t"Westbound", 1 => ~t"Eastbound"},
      direction_destinations: %{0 => "All branches", 1 => "All branches"},
      type: 0,
      description: :rapid_transit,
      color: "00843D"
    }
  end
end
