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

  @doc """
  Retries a function until it succeeds without an assertion error, or the timeout is reached
  """
  def wait_until(fun), do: wait_until(1_000, fun)

  def wait_until(0, fun), do: fun.()

  def wait_until(timeout, fun) do
    try do
      fun.()
    rescue
      ExUnit.AssertionError ->
        :timer.sleep(10)
        wait_until(max(0, timeout - 10), fun)
    end
  end
end
