defmodule Site.ContentRewriters.LiquidObjects.Route do
  @moduledoc """

  This module converts a string-based route name into its long_name string.

  """

  alias Routes.{Repo, Route}

  @type request_error :: {:error, {:empty | :unmatched, String.t()}}
  @type request_tuple :: {:ok, String.t()}

  @spec route_request(String.t()) :: {:ok, String.t()} | request_error
  def route_request(string) do
    string
    |> compose_args()
    |> request_route()
    |> process_results()
  end

  @spec compose_args(String.t()) :: request_tuple | request_error
  defp compose_args(""), do: {:error, {:empty, "no input"}}
  defp compose_args(route), do: {:ok, route}

  @spec request_route(request_tuple | request_error) :: Route.t() | request_error | nil
  defp request_route({:ok, route}), do: Repo.get(route)
  defp request_route(error), do: error

  @spec process_results(Route.t() | request_error | nil) :: {:ok, String.t()} | request_error
  defp process_results(nil), do: {:error, {:unmatched, "no route match"}}
  defp process_results(%Route{} = route), do: {:ok, route.long_name}
  defp process_results(error), do: error
end
