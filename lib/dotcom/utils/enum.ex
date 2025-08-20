defmodule Dotcom.Utils.Enum do
  @moduledoc """
  Utility functions for working with Enumerables.
  """

  @doc """
  Takes a list of lists like `[["foo", "bar", "baz"]]` and converts it to a grouped map like:
  `%{"foo" => "bar" => ["baz]}`. The final value in the grouping is always a list.
  """
  def group_list(list) do
    list
    |> Enum.map(&list_to_list_of_lists/1)
    |> group()
  end

  @doc """
  Converts a list `["foo", "bar", "baz"]` into a list of lists: `["foo", ["bar", ["baz"]]]`.
  This is helpful for converting things like split paths into a hierarchy for grouping.
  """
  def list_to_list_of_lists([last | []]) do
    last
  end

  def list_to_list_of_lists([first | rest]) do
    [first, list_to_list_of_lists(rest)]
  end

  # Recursive group a list of lists.
  # Group by the head of the list.
  # Then, reduce the tail of the list.
  # If the is a list of lists, recurse.
  # Otherwise, we are at the end and we can process the tail.
  defp group(list) do
    list
    |> Enum.group_by(&List.first/1, fn l -> l |> Kernel.tl() |> List.flatten() end)
    |> Enum.reduce(%{}, fn {k, v}, acc ->
      if remaining_lists?(v) do
        Map.put(acc, k, group(v))
      else
        process_tail({k, v}, acc)
      end
    end)
  end

  # Process the tail of a list by building up a list of final values.
  defp process_tail({k, v}, acc) do
    current = Map.get(acc, k, [])
    new = List.flatten(v)

    if new === [] do
      acc
    else
      Map.put(acc, k, Enum.sort(current ++ new))
    end
  end

  # Does this list have any other lists inside of it?
  defp remaining_lists?(list) do
    list
    |> Enum.filter(&Kernel.is_list/1)
    |> Enum.map(&Kernel.length/1)
    |> Enum.reject(&Kernel.<(&1, 2))
    |> Kernel.length()
    |> Kernel.<(1)
    |> Kernel.not()
  end
end
