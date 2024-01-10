defmodule DotcomWeb.PaginationHelpers do
  @moduledoc """
  Pagination generation component that:
  - handles link generation passing various params back to the server
  - shows next / previous buttons
  - shows 1... or ...{last} when the user has many results and they have navigated towards the middle
  - shows 5 middle links on desktop
  - shows 3 middle links for mobile
  """
  use DotcomWeb, :view

  @type link_context_t :: %{form: String.t(), path: String.t(), params: map}

  @spec build_link(link_context_t) :: String.t()
  defp build_link(%{path: path, form: form, params: params}) do
    "#{path}?_utf8=✓#{query_params(form, Map.put(params, "[offset]", "OFFSET"))}"
  end

  @spec query_params(String.t(), map) :: String.t()
  defp query_params(form, params) do
    Enum.reduce(params, "", fn {key, value}, acc ->
      "#{acc}&#{URI.encode_query(%{(form <> key) => value})}"
    end)
  end

  @spec offset_link(String.t(), integer) :: String.t()
  defp offset_link(link, offset), do: String.replace(link, "OFFSET", to_string(offset - 1))
end
