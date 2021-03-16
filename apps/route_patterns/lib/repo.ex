defmodule RoutePatterns.Repo do
  @moduledoc false
  use RepoCache, ttl: :timer.hours(1)

  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias V3Api.RoutePatterns, as: RoutePatternsApi

  @doc """
  Returns a single route pattern by ID
  """
  @spec get(RoutePattern.id_t()) :: RoutePattern.t() | nil
  @spec get(RoutePattern.id_t(), keyword()) :: RoutePattern.t() | nil
  def get(id, opts \\ []) when is_binary(id) do
    case cache({id, opts}, fn {id, opts} ->
           with %{data: [route_pattern]} <- RoutePatternsApi.get(id, opts) do
             {:ok, RoutePattern.new(route_pattern)}
           end
         end) do
      {:ok, route_pattern} -> route_pattern
      {:error, _} -> nil
    end
  end

  @spec by_route_id(Route.id_t()) :: RoutePattern.t()
  @spec by_route_id(Route.id_t(), keyword()) :: RoutePattern.t()
  def by_route_id(route_id, opts \\ [])

  def by_route_id("Green", opts) do
    ~w(Green-B Green-C Green-D Green-E)s
    |> Enum.join(",")
    |> by_route_id(opts)
  end

  def by_route_id(route_id, opts) do
    opts
    |> Keyword.get(:direction_id)
    |> case do
      nil -> [route: route_id]
      direction_id -> [route: route_id, direction_id: direction_id]
    end
    |> Keyword.put(:sort, "typicality,sort_order")
    |> Keyword.put(:include, "representative_trip.shape")
    |> api_all
  end

  defp api_all(opts) do
    opts
    |> RoutePatternsApi.all()
    |> parse_api_response()
  end

  defp parse_api_response({:error, error}) do
    {:error, error}
  end

  defp parse_api_response(%JsonApi{data: data}) do
    Enum.map(data, &RoutePattern.new/1)
  end
end
