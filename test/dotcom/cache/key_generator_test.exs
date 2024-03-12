defmodule Dotcom.Cache.KeyGeneratorTest do
  use ExUnit.Case, async: true

  import Dotcom.Cache.KeyGenerator, only: [generate: 3]

  describe "generate" do
    test "generates a key with no args" do
      assert generate(__MODULE__, :generate, []) == "dotcom.cache.key_generator_test|generate"
    end

    test "generates a key with one arg" do
      assert generate(__MODULE__, :generate, [1]) =~ "dotcom.cache.key_generator_test|generate|"
    end

    test "generates a key with multiple args" do
      assert generate(__MODULE__, :generate, [1, 2]) =~
               "dotcom.cache.key_generator_test|generate|"
    end
  end
end
