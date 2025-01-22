defmodule JoinTest do
  use ExUnit.Case, async: true

  import Join

  doctest Join

  @a %{a: 1, b: 2, c: 3}
  @b %{b: 2, c: 4}
  @c %{a: 1, c: 3}

  test ".join returns the pairs of items which match on a key" do
    assert join([@a, @b], [@c], fn i -> i[:a] end) == [{@a, @c}]
    assert join([@a], [@b, @c], fn i -> i[:a] end) == [{@a, @c}]
    assert join([@a], [@b, @c], fn i -> i[:b] end) == [{@a, @b}]
  end
end
