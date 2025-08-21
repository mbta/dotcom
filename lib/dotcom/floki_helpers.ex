defmodule Dotcom.FlokiHelpers do
  @moduledoc """
  Helpers for working with Floki and the parsed HTML it returns.
  """

  @typep tree_or_binary :: Floki.html_tree() | binary
  @typep visitor :: (tree_or_binary -> tree_or_binary | nil)

  @doc """
  traverse/2 is the main way of manipulating the parse tree. It recursively
  traverses the tree, passing each node to the provided visit_fn visitor
  function.

  If the visitor function returns nil, traverse continues to descend through
  the tree. If the function returns a Floki.html_tree or string, traverse
  replaces the node with that result and stops recursively descending down
  that branch.

  The visit_fn must handle a (non-list) Floki.html_tree node and a binary string.
  """
  def traverse(str, visit_fn) when is_binary(str) do
    visit_fn.(str) || str
  end

  def traverse(html_list, visit_fn) when is_list(html_list) do
    Enum.map(html_list, fn html -> traverse(html, visit_fn) end)
  end

  def traverse({element, attrs, children} = html, visit_fn) do
    visit_fn.(html) || {element, attrs, traverse(children, visit_fn)}
  end

  def add_class(html_element, []), do: html_element

  def add_class({name, attrs, children}, new_class) do
    attrs =
      case Enum.split_with(attrs, &match?({"class", _}, &1)) do
        {[], others} ->
          [{"class", new_class} | others]

        {[{"class", existing_class}], others} ->
          [{"class", [existing_class, " ", new_class]} | others]
      end

    {name, attrs, children}
  end

  def remove_class({name, attrs, children}, old_class) do
    attrs =
      case Enum.split_with(attrs, &match?({"class", _}, &1)) do
        {[], others} ->
          others

        {[{"class", existing_class}], others} ->
          clean_class =
            existing_class
            |> IO.iodata_to_binary()
            |> String.split()
            |> Enum.reject(&(&1 == old_class))

          [{"class", Enum.join(clean_class, " ")} | others]
      end

    {name, attrs, children}
  end

  def remove_style_attrs({name, attrs, children}) do
    {name, Enum.reject(attrs, &remove_attr?(&1, name)), children}
  end

  defp remove_attr?({"height", _}, _), do: true
  defp remove_attr?({"width", _}, _), do: true
  defp remove_attr?({"style", _}, "iframe"), do: true
  defp remove_attr?(_, _), do: false
end
