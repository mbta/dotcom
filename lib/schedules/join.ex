defmodule Join do
  @moduledoc """

  Given two lists of items and a function on those items, returns pairs of
  items where the function returns the same value for both items.  Currently,
  assumes that the function returns a unique value for an item in a given
  list.


  iex> Join.join([1, 2], [4, 5], fn i -> rem i, 2 end)
  [{2, 4}, {1, 5}]

  """

  def join(s, r, key_fn) when length(s) <= length(r) do
    do_join(s, r, key_fn, fn a, b -> {a, b} end)
  end

  def join(s, r, key_fn) do
    # join them with the smaller one first, then flip the pairs
    do_join(r, s, key_fn, fn a, b -> {b, a} end)
  end

  def do_join(s, r, key_fn, tuple_fn) do
    s_map =
      Map.new(s, fn item ->
        {key_fn.(item), item}
      end)

    for item <- r,
        key = key_fn.(item),
        Map.has_key?(s_map, key) do
      tuple_fn.(Map.get(s_map, key), item)
    end
  end
end
