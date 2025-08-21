defmodule CSSHelpers do
  @moduledoc """
  Provides helpers for working with CSS

  Multiple pieces (DotcomWeb and Components) use css,
  so this module provides helper functions to share between them.
  """

  @doc "Formats arbitrary strings as CSS-friendly"
  def string_to_class(string) do
    string
    |> String.downcase()
    |> String.replace(~r/[ _]/, "-")
    |> String.replace(~r/[^a-zA-Z0-9-]/, "")
  end

  @doc "Returns a css class: a string with hyphens."
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
end
