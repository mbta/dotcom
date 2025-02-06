defmodule Dotcom.Utils.List do
  @moduledoc """
  Useful functions when working with lists
  """

  @doc """
  Accepts a list and two elements. Returns the first element that is found in the list.
  Returns nil if neither is found in the list.
  """
  @spec find_first([any], any, any) :: any
  def find_first([], _elem1, _elem2), do: nil
  def find_first([elem1 | _], elem1, _elem2), do: elem1
  def find_first([elem2 | _], _elem1, elem2), do: elem2
  def find_first([_first | rest], elem1, elem2), do: find_first(rest, elem1, elem2)
end
