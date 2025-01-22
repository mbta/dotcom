defmodule Algolia.Stop.Routes do
  @moduledoc false
  alias Algolia.Stop.Route

  @type t :: [Route.t()]

  @spec for_stop([Routes.Route]) :: [__MODULE__.t()]
  def for_stop(routes) do
    routes
    |> Enum.map(&Routes.Route.icon_atom/1)
    |> Enum.uniq()
    |> Enum.map(&Route.new(&1, routes))
  end

  @spec green_line_branches([Routes.Route]) :: [__MODULE__.t()]
  def green_line_branches(routes) do
    routes
    |> Enum.map(& &1.id)
    |> Enum.filter(&(&1 =~ "Green-"))
  end
end
