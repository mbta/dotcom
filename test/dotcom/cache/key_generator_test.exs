defmodule Dotcom.Cache.KeyGeneratorTest do
  use ExUnit.Case, async: true

  import Dotcom.Cache.KeyGenerator, only: [generate: 3]

  describe "generate" do
    test "generates a key with no args" do
      assert generate(__MODULE__, :generate, []) =~ "dotcom.cache.key_generator_test|generate|"
    end

    test "generates a key with one arg" do
      assert generate(__MODULE__, :generate, [1]) =~ "dotcom.cache.key_generator_test|generate|"
    end

    test "generates a key with multiple args" do
      assert generate(__MODULE__, :generate, [1, 2]) =~
               "dotcom.cache.key_generator_test|generate|"
    end

    # In the previous implementation, these values generated a collision, since
    # :erlang.phash2(["73869983", &MBTA.Api.Trips.by_id/2], 2 ** 32) ==
    # :erlang.phash2(["74122563", &MBTA.Api.Trips.by_id/2], 2 ** 32)
    test "does not generate collisions" do
      assert generate(__MODULE__, :generate, ["73869983", &MBTA.Api.Trips.by_id/2]) !=
               generate(__MODULE__, :generate, ["74122563", &MBTA.Api.Trips.by_id/2])
    end
  end
end
