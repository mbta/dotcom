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
    values = [value, value, value]

    # EXERCISE
    {:reply, reply, _} = handle_call(:get, nil, {nil, values})

    # VERIFY
    assert reply === {:ok, value}
  end

  test "when values are different, we get one of each value" do
    # SETUP
    value = Faker.Color.fancy_name()

    values = [
      value,
      value,
      Faker.Color.fancy_name()
    ]

    # EXERCISE
    {:reply, {:conflict, diff}, _} = handle_call(:get, nil, {nil, values})

    # VERIFY
    assert Regex.scan(~r/---/, diff) |> Kernel.length() === 1

    Enum.each(values, fn value ->
      assert diff =~ value
    end)
  end
end
