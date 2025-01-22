defmodule Routes.Group do
  @moduledoc """

  Groups a list of Route structures into a keyword dict based on their type: Commuter Rail, Bus, or Subway

  """
  alias Routes.Repo
  alias Routes.Route

  @type t :: {Routes.Route.route_type(), Routes.Route.t()}

  @spec group([Route.t()]) :: [Routes.Group.t()]
  def group(routes) do
    routes
    |> combine_green_line_into_single_route()
    |> group_items_by_route_type()
    |> Enum.sort_by(&sorter/1)
  end

  @spec combine_green_line_into_single_route([Route.t()]) :: [Route.t()]
  defp combine_green_line_into_single_route(routes) do
    Enum.filter(routes, fn
      %{id: "Green" <> _} -> false
      _ -> true
    end) ++ [Repo.green_line()]
  end

  defp group_items_by_route_type(routes) do
    Enum.group_by(routes, &Route.type_atom(&1))
  end

  def sorter({:subway, _}), do: 0
  def sorter({:bus, _}), do: 1
  def sorter({:commuter_rail, _}), do: 2
  def sorter({:ferry, _}), do: 3
end
