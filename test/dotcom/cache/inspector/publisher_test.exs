defmodule Dotcom.Cache.Inspector.PublisherTest do
  use ExUnit.Case, async: true

  import Dotcom.Cache.Inspector.Publisher, only: [handle_call: 3]

  describe "handle_call/3" do
    test "when no values are returned, we indicate the value is gone" do
      # EXERCISE
      {:reply, reply, _} = handle_call(:get, nil, {nil, []})

      # VERIFY
      assert reply === {:gone, [""]}
    end
  end

  test "when all of the values are the same, one representative value is returned" do
    # SETUP
    value = "foo"
    values = [value, value, value]

    # EXERCISE
    {:reply, reply, _} = handle_call(:get, nil, {nil, values})

    # VERIFY
    assert reply === {:ok, [value]}
  end

  test "when values are different, we get one of each value" do
    # SETUP
    [one, two] = Faker.Util.sample_uniq(2, fn -> Faker.Color.fancy_name() end)

    values = [
      one,
      one,
      two
    ]

    # EXERCISE
    {:reply, {:conflict, diff}, _} = handle_call(:get, nil, {nil, values})

    # VERIFY
    assert Kernel.length(diff) === 2
    assert Enum.member?(diff, one) && Enum.member?(diff, two)
  end
end
