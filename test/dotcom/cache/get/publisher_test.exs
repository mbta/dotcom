defmodule Dotcom.Cache.Get.PublisherTest do
  use ExUnit.Case, async: true

  import Dotcom.Cache.Get.Publisher, only: [handle_call: 3]

  describe "handle_call/3" do
    test "when no values are returned, we indicate the value is gone" do
      # EXERCISE
      {:reply, reply, _} = handle_call(:get, nil, {nil, []})

      # VERIFY
      assert reply === {:gone, ""}
    end
  end

  test "when all of the values are the same, one representative value is returned" do
    # SETUP
    value = Faker.Color.fancy_name()
    values = [1..3] |> Enum.map(fn _ -> value end)

    # EXERCISE
    {:reply, reply, _} = handle_call(:get, nil, {nil, values})

    # VERIFY
    assert reply === {:ok, value}
  end

  test "when values are different, we get all different values" do
    # SETUP
    values = [1..3] |> Enum.map(fn _ -> Faker.Color.fancy_name() end)

    # EXERCISE
    {:reply, {:ok, diff}, _} = handle_call(:get, nil, {nil, values})

    # VERIFY
    Enum.each(values, fn value ->
      diff =~ value
    end)
  end
end
