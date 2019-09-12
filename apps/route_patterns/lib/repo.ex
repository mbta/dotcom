defmodule RoutePatterns.Repo do
  @moduledoc false
  use RepoCache, ttl: :timer.hours(1)

  alias RoutePatterns.RoutePattern
  alias V3Api.RoutePatterns, as: RoutePatternsApi

  def by_route_id(route_id, opts \\ []) do
    opts
    |> Keyword.get(:direction_id)
    |> case do
      nil -> [route: route_id]
      direction_id -> [route: route_id, direction_id: direction_id]
    end
    |> Keyword.put(:sort, "typicality,sort_order")
    |> cache(&api_all/1)
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
