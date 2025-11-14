defmodule CSSHelpers do
  @moduledoc """
  Provides helpers for working with CSS

  Multiple pieces (DotcomWeb and Components) use css,
  so this module provides helper functions to share between them.
  """

  alias Routes.Route

  @doc "Formats arbitrary strings as CSS-friendly"
  @spec string_to_class(String.t()) :: String.t()
  def string_to_class(string) do
    string
    |> String.downcase()
    |> String.replace(~r/[ _]/, "-")
    |> String.replace(~r/[^a-zA-Z0-9-]/, "")
  end

  @doc "Returns a css class: a string with hyphens."
  @spec atom_to_class([atom()] | atom()) :: String.t()
  def atom_to_class(atom) when is_atom(atom) do
    atom
    |> Atom.to_string()
    |> String.replace("_", "-")
  end

  def atom_to_class([atom]) do
    atom
    |> Atom.to_string()
    |> String.replace("_", "-")
  end

  @spec route_to_class(Route.t()) :: String.t()
  def route_to_class(%Route{type: 3} = route) do
    if Route.silver_line?(route) do
      "mbta-route-silver-line"
    else
      "mbta-route-bus"
    end
  end

  def route_to_class(%Route{type: 2}), do: "mbta-route-commuter-rail"
  def route_to_class(%Route{type: 4}), do: "mbta-route-ferry"
  def route_to_class(%Route{id: "Mattapan"}), do: "mbta-route-red-line"
  def route_to_class(%Route{id: "Green" <> _}), do: "mbta-route-green-line"

  def route_to_class(route) do
    if Route.type_atom(route) == :subway do
      "mbta-route-#{String.downcase(route.id)}-line"
    end
  end
end
