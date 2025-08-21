defmodule Dotcom.ContentRewriters.LiquidObjects.Route do
  @moduledoc """

  This module converts a string-based route name into its long_name string.

  """

  alias Routes.Route

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @type request_error :: {:error, {:empty | :unmatched, String.t()}}
  @type request_tuple :: {:ok, String.t()}

  def route_request(string) do
    string
    |> compose_args()
    |> request_route()
    |> process_results()
  end

  defp compose_args(""), do: {:error, {:empty, "no input"}}
  defp compose_args(route), do: {:ok, route}

  defp request_route({:ok, route}), do: @routes_repo.get(route)
  defp request_route(error), do: error

  defp process_results(nil), do: {:error, {:unmatched, "no route match"}}
  defp process_results(%Route{} = route), do: {:ok, route.long_name}
  defp process_results(error), do: error
end
