defmodule JoinBench do
  use Benchfella

  import Join

  @a %{a: 1, b: 2, c: 3}
  @b %{b: 2, c: 4}
  @c %{a: 1, c: 3}

  bench "smaller first" do
    join([@a], [@b, @c], fn i -> i[:a] end)
  end

  bench "smaller second" do
    join([@b, @c], [@a], fn i -> i[:a] end)
  end
end
