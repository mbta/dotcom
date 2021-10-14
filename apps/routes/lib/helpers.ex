defmodule Routes.Helpers do
  @moduledoc """
    Helper functions that aid with preparing Routes data
  """

  import CMS.Helpers, only: [int_or_string_to_int: 1]

  alias Routes.Route

  @spec duplicate_blended_route([Route.t()]) :: [Route.t()]
  def duplicate_blended_route(routes) do
    Enum.reduce(routes, routes, &do_duplicate_blended_route/2)
  end

  @spec do_duplicate_blended_route(Route.t(), [Route.t()]) :: [Route.t()]
  defp do_duplicate_blended_route(current_route, routes) do
    if Route.combined_route?(current_route) do
      [_head | route_names] = String.split(current_route.name, "/")

      route_names
      |> Enum.reduce(routes, fn name, updated_routes ->
        index =
          Enum.find_index(updated_routes, fn x ->
            !is_nil(int_or_string_to_int(x.name)) and
              int_or_string_to_int(x.name) > int_or_string_to_int(name)
          end)

        List.insert_at(updated_routes, index, current_route)
      end)
    else
      routes
    end
  end
end
