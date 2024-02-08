defmodule Dotcom.Assertions do
  @moduledoc """
  Custom assertions for use in ExUnit tests.
  """

  @doc """
  Assert that two lists are equal, regardless of order.
  Works with lists and keyword lists.
  """
  defmacro assert_equal_lists(list1, list2) do
    quote do
      assert Enum.sort(unquote(list1)) == Enum.sort(unquote(list2))
    end
  end
end
