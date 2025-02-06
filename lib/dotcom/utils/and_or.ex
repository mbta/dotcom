defmodule Dotcom.Utils.AndOr do
  @doc """

  Joins a list of strings with commas, with an "or" or "and" before the last item.

  """

  @spec join([String.t()], :and | :or) :: iolist
  def join([], _), do: ""
  def join([single], _), do: single

  def join(list, and_or) when and_or in [:and, :or] do
    do_join(list, and_or)
  end

  defp do_join([one, two], and_or) do
    [one, " #{and_or} ", two]
  end

  defp do_join([one, two, three], and_or) do
    [one, ", ", two, ", #{and_or} ", three]
  end

  defp do_join([first | rest], and_or) do
    [
      first,
      ", ",
      do_join(rest, and_or)
    ]
  end
end
