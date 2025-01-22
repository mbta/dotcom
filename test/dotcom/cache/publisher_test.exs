defmodule Dotcom.Cache.PublisherTest do
  use ExUnit.Case, async: false

  import Mox

  defmodule Cache do
    @moduledoc false
    use Nebulex.Cache, otp_app: :dotcom, adapter: Dotcom.Cache.Publisher
  end

  setup :set_mox_global

  setup do
    expect(Dotcom.Redix.PubSub.Mock, :start_link, fn _ -> {:ok, 0} end)
    expect(Dotcom.Redix.PubSub.Mock, :subscribe, fn _, _, _ -> {:ok, 0} end)

    {:ok, pid} = Cache.start_link(stats: true, telemetry: true)

    on_exit(fn ->
      :ok = Process.sleep(100)

      if Process.alive?(pid), do: Cache.stop(pid)
    end)

    {:ok, cache: Cache}
  end

  setup :verify_on_exit!

  describe "delete" do
    test "publishes cache eviction messages to the Redis PubSub channel" do
      expect(Dotcom.Redis.Mock, :command, fn ["PUBLISH", _, _] -> :ok end)

      Cache.delete("foo")
    end
  end

  describe "stats" do
    test "increments the evictions counter" do
      assert Cache.stats().measurements.evictions == 0

      expect(Dotcom.Redis.Mock, :command, fn ["PUBLISH", _, _] -> :ok end)

      Cache.delete("foo")

      assert Cache.stats().measurements.evictions == 1
    end

    test "resets the evictions counter" do
      assert Cache.stats().measurements.evictions == 0

      expect(Dotcom.Redis.Mock, :command, fn ["PUBLISH", _, _] -> :ok end)

      Cache.delete("foo")

      assert Cache.stats().measurements.evictions == 1
      assert Cache.stats().measurements.evictions == 0
    end
  end
end
