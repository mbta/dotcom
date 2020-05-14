defmodule Services.Repo do
  @moduledoc """
  Retrieves services for a route.
  """

  use RepoCache, ttl: :timer.hours(1)
  alias Services.Service
  alias V3Api.Services, as: ServicesApi

  def by_route_id(route_id, params \\ [])

  def by_route_id([route_id] = route, params) when is_list(route) do
    by_route_id(route_id, params)
  end

  def by_route_id("Green", params) do
    GreenLine.branch_ids()
    |> Enum.join(",")
    |> by_route_id(params)
  end

  def by_route_id(route_id, params) when is_binary(route_id) do
    cache({route_id, params}, fn _ ->
      params
      |> Keyword.put(:route, route_id)
      |> ServicesApi.all()
      |> handle_response()
    end)
  end

  defp handle_response(%JsonApi{data: data}) do
    Enum.map(data, &Service.new/1)
  end
end
