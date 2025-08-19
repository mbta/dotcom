defmodule DotcomWeb.AlgoliaJSON do
  @moduledoc """
  Transforms route and stop data into data objects for search usage.
  """

  def index(%{stops: stops}) do
    to_data_objects(stops)
  end

  def index(%{routes: routes}) do
    to_data_objects(routes)
  end

  defp to_data_objects(list) do
    list
    |> Enum.map(
      &Task.async(fn ->
        to_data_object(&1)
      end)
    )
    |> Task.await_many(:infinity)
  end

  defp to_data_object(data) do
    data
    |> Algolia.Object.data()
    |> set_rank(data)
    |> Map.merge(%{
      objectID: Algolia.Object.object_id(data),
      url: Algolia.Object.url(data)
    })
  end

  @type rank :: 1 | 2 | 3 | 4 | 5

  defp set_rank(%{routes: []} = data, %Stops.Stop{}) do
    do_set_rank(4, data)
  end

  defp set_rank(%{routes: routes} = data, %Stops.Stop{}) do
    routes
    |> Enum.map(fn %Algolia.Stop.Route{type: type} -> rank_route_by_type(type) end)
    |> Enum.sort()
    |> List.first()
    |> do_set_rank(data)
  end

  defp set_rank(%{} = data, %Routes.Route{} = route) do
    route
    |> rank_route_by_type()
    |> do_set_rank(data)
  end

  defp set_rank(data, _) do
    do_set_rank(1, data)
  end

  defp do_set_rank(rank, %{} = data) when rank in 1..5 do
    Map.put(data, :rank, rank)
  end

  @spec rank_route_by_type(Routes.Route.t() | Routes.Route.type_int()) :: rank
  defp rank_route_by_type(%Routes.Route{} = route) do
    if Routes.Route.silver_line?(route) do
      1
    else
      rank_route_by_type(route.type)
    end
  end

  defp rank_route_by_type(0), do: 2
  defp rank_route_by_type(1), do: 2
  defp rank_route_by_type(2), do: 3
  defp rank_route_by_type(4), do: 4
  defp rank_route_by_type(3), do: 5
end
