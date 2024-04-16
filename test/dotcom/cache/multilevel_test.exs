defmodule Dotcom.Cache.MultilevelTest do
  use ExUnit.Case, async: false

  alias Dotcom.Cache.Multilevel
  alias Dotcom.Redix.Mock

  import Mox

  setup :set_mox_global

  setup :verify_on_exit!

  @cache Application.compile_env!(:dotcom, :cache)

  describe "flush_keys" do
    test "deletes all keys that match the pattern" do
      @cache.put("foo|bar", "baz")
      @cache.put("foo|baz", "bar")
      @cache.put("bar|foo", "baz")

      pattern = "foo|*"

      # We start the link to get the cluster nodes
      expect(Mock, :start_link, fn _ -> {:ok, 0} end)
      # We get the cluster nodes
      expect(Mock, :command, fn _, ["CLUSTER", "SLOTS"] ->
        {:ok, [[0, 1, ["127.0.0.1", 6379]]]}
      end)

      # One node is returned so we start a link to it
      expect(Mock, :start_link, fn _ -> {:ok, 1} end)
      # The first scan returns one key and gives us a cursor to continue
      expect(Mock, :command, fn _, ["SCAN", "0", "MATCH", ^pattern, _, _] ->
        {:ok, ["1", ["foo|bar"]]}
      end)

      # The second scan returns one key and gives us a stop cursor "0"
      expect(Mock, :command, fn _, ["SCAN", "1", "MATCH", ^pattern, _, _] ->
        {:ok, ["0", ["foo|baz"]]}
      end)

      # We stop the connection to the node we got the list of nodes from as well as each node we operated on
      expect(Mock, :stop, 2, fn _ -> :ok end)

      assert Multilevel.flush_keys(pattern) == :ok

      assert @cache.get("foo|bar") == nil
      assert @cache.get("foo|baz") == nil
      assert @cache.get("bar|foo") == "baz"
    end
  end

  test "deletes a single key when not given an asterisk" do
    @cache.put("foo|bar", "baz")
    @cache.put("foo|baz", "bar")
    @cache.put("bar|foo", "baz")

    key = "foo|bar"

    assert Multilevel.flush_keys(key) == :ok

    assert @cache.get("foo|bar") == nil
    assert @cache.get("foo|baz") == "bar"
    assert @cache.get("bar|foo") == "baz"
  end
end
