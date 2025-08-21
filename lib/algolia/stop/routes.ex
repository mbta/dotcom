defmodule Algolia.Stop.Routes do
  @type t :: [Algolia.Stop.Route.t()]

  def for_stop(routes) do
    routes
    |> Enum.map(&Routes.Route.icon_atom/1)
    |> Enum.uniq()
    |> Enum.map(&Algolia.Stop.Route.new(&1, routes))
  end

  def green_line_branches(routes) do
    routes
    |> Enum.map(& &1.id)
    |> Enum.filter(&(&1 =~ "Green-"))
  end
end
