defmodule Util.AndOr do
  @doc """

  Joins a list of strings with commas, with an "or" or "and" before the last item.

  """

  use Dotcom.Gettext.Sigils

  def join([], _), do: ""
  def join([single], _), do: single

  def join(list, :and) do
    do_join(list, ~t"and")
  end

  def join(list, :or) do
    do_join(list, ~t"or")
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
