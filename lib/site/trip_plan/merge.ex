defmodule Site.TripPlan.Merge do
  @moduledoc false

  @doc """
  Merges a list of accessible itineraries with unknown ones, preferring the
  unknown itineraries but including at least two from each list.

  See `merge/4` for more documentation about how we pull from the two lists.
  """
  @spec merge_itineraries(itinerary_list, itinerary_list) :: itinerary_list
        when itinerary_list: [TripPlan.Itinerary.t()]
  def merge_itineraries(accessible, unknown) do
    merge(
      accessible,
      unknown,
      &TripPlan.Itinerary.same_itinerary?/2,
      needed_accessible: 2,
      needed_unknown: 2
    )
  end

  @doc """
  Merges two sets of lists, requiring items from the accessible list but
  preferring items from the unknown list. Takes as an argument a function
  which returns true if two items from the lists are equal.

  The reason for the preference is that we assume that a better itinerary
  would be in the unknown list as well as the accessible one. If it only
  appears in the accessible list, it's worse than the itineraries in the
  unknown list.

  ## Examples

  We'll return values from the accessible list as long as they're equal to items
  in the unknown list (the function is comparing the atoms):

      iex> merge([a: true, b: true, d: true], [a: false, b: false, c: false],
      ...> fn {accessible, _}, {unknown, _} -> accessible == unknown end)
      [a: true, b: true, c: false]

  If the top items are not equal, we'll still return at least one item from
  the accessible list:

      iex> merge([d: true, e: true, f: true], [a: false, b: false, c: false],
      ...> fn {a, _}, {u, _} -> a == u end)
      [a: false, b: false, d: true]

  If given a different total number of items, or items needed from the accessible
  list, we'll use those values instead of the defaults of 1 item from the
  accessible list and 3 total:

      iex> merge([d: true, e: true, f: true], [a: false, b: false, c: false],
      ...> fn {a, _}, {u, _} -> a == u end,
      ...> needed_accessible: 2, total: 4)
      [a: false, b: false, d: true, e: true]

  We can also ask for more of each list than the total: in that case we'll
  get more items:

      iex> merge([d: true, e: true, f: true], [a: false, b: false, c: false],
      ...> fn {a, _}, {u, _} -> a == u end,
      ...> needed_accessible: 2, needed_unknown: 2)
      [a: false, b: false, d: true, e: true]

  ...but we won't if we can get all we need with the total:

      iex> merge([a: true, b: true, d: true], [a: false, b: false, c: false],
      ...> fn {accessible, _}, {unknown, _} -> accessible == unknown end,
      ...> needed_accessible: 2, needed_unknown: 2)
      [a: true, b: true, c: false]
  """
  @spec merge([a], [a], (a, a -> boolean), Keyword.t()) :: [a]
        when a: term
  def merge(accessible, unknown, equal_fn, opts \\ []) do
    needed_accessible = Keyword.get(opts, :needed_accessible, 1)
    needed_unknown = Keyword.get(opts, :needed_unknown, 1)
    total = Keyword.get(opts, :total, 3)

    state = %{
      equal_fn: equal_fn,
      accessible: needed_accessible,
      unknown: needed_unknown,
      total: total
    }

    do_merge(accessible, unknown, state)
  end

  defp do_merge(_, _, %{total: total}) when total <= 0 do
    []
  end

  defp do_merge(accessible, [], %{total: total}) do
    Enum.take(accessible, total)
  end

  defp do_merge([], unknown, %{total: total}) do
    Enum.take(unknown, total)
  end

  defp do_merge(accessible, unknown, %{
         accessible: acc,
         unknown: unk,
         total: total,
         equal_fn: equal_fn
       })
       when total == acc or total == unk do
    # if we need all the rest, take them, but not less than 0 items
    unk = max(unk, 0)
    acc = max(acc, 0)
    unknown = Enum.take(unknown, unk)
    accessible = Enum.take(accessible, acc)

    merge(
      accessible,
      unknown,
      equal_fn,
      total: unk + acc,
      needed_accessible: 0,
      needed_unknown: 0
    )
  end

  defp do_merge([a | a_rest] = a_all, [u | u_rest], state) do
    %{
      equal_fn: equal_fn,
      accessible: acc,
      unknown: unk,
      total: total
    } = state

    # we have a trip from the accessible list, so we take both heads if they're equal
    if equal_fn.(a, u) do
      state = Map.merge(state, %{accessible: acc - 1, unknown: unk - 1, total: total - 1})
      [a | do_merge(a_rest, u_rest, state)]
    else
      # we take one from unknown, and still need the same from the accessible list
      state = Map.merge(state, %{unknown: unk - 1, total: total - 1})
      [u | do_merge(a_all, u_rest, state)]
    end
  end
end
