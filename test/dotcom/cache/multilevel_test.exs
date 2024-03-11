defmodule Dotcom.Cache.MultilevelTest do
  use ExUnit.Case, async: false

  import Mox

  setup :set_mox_global

  setup :verify_on_exit!

  @cache Application.compile_env!(:dotcom, :cache)

  describe "flush_keys" do
    test "deletes all keys from Redis" do
      @cache.put("foo|bar", "baz")
      @cache.put("foo|baz", "bar")

      expect(Redix.Mock, :start_link, fn _ -> {:ok, 0} end)
      expect(Redix.Mock, :command, fn _, _ -> {:ok, [:stop, ["foo|bar", "foo|baz"]]} end)
      expect(Redix.Mock, :stop, fn _ -> :ok end)

      assert Dotcom.Cache.Multilevel.flush_keys("foo|*") == :ok

      assert @cache.get("foo|bar") == nil
      assert @cache.get("foo|baz") == nil
    end
  end
end
