defmodule Dotcom.Utils.Enum do
  @doc """

  Takes an Enumerable and returns a list with the first and last items tagged
  with a boolean true.

  iex> with_first_last([1, 2, 3])
  [{1, true}, {2, false}, {3, true}]
  """
  @spec with_first_last(Enum.t()) :: [{any, boolean}]
  def with_first_last([]) do
    []
  end

  def with_first_last([only]) do
    [{only, true}]
  end

  def with_first_last([first | rest]) do
    [{first, true} | do_with_first_last(rest, [])]
  end

  defp do_with_first_last([last], acc) do
    Enum.reverse(acc, [{last, true}])
  end

  defp do_with_first_last([item | rest], acc) do
    do_with_first_last(rest, [{item, false} | acc])
  end
end
