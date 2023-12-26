defmodule RepoCache.LogTest do
  @moduledoc false
  use ExUnit.Case, async: true
  import ExUnit.CaptureLog
  import RepoCache.Log

  defmodule Repo do
    use RepoCache, ttl: :timer.seconds(1)

    def always(value) do
      cache(value, & &1)
    end
  end

  alias __MODULE__.Repo

  def log(state) do
    old_level = Logger.level()

    on_exit(fn ->
      Logger.configure(level: old_level)
    end)

    Logger.configure(level: :info)
    {:ok, _} = start_link([])
    reset_table(all())
    {:ok, state}
  end

  def repo(state) do
    case Repo.start_link() do
      {:ok, _} ->
        :ok

      {:error, {:already_started, _}} ->
        # previous test is still spinning down, try again
        repo(state)
    end

    Repo.always(5)
    reset_table(all())
    {:ok, state}
  end

  describe "init/1" do
    test "creates a table" do
      assert {:ok, _} = init([])
      assert all() == []
    end
  end

  describe "handle_info/2" do
    setup [:log, :repo]

    test ":output_log logs data" do
      state = []

      log =
        capture_log(fn ->
          assert {:noreply, ^state, :hibernate} = handle_info(:output_log, state)
        end)

      refute log == ""
    end

    test ":output_log resets the count after the log" do
      state = []

      _ =
        capture_log(fn ->
          handle_info(:output_log, state)
        end)

      log =
        capture_log(fn ->
          handle_info(:output_log, state)
        end)

      assert log =~ "total=0"
    end

    test "other message logs an error but does nothing" do
      log =
        capture_log([level: :error], fn ->
          assert handle_info(:unknown, :state) == {:noreply, :state}
        end)

      refute log == ""
    end
  end

  describe "reset_table/1" do
    setup [:log, :repo]

    test "brings the counts down to 0" do
      Repo.always(5)
      reset_table(all())

      updated = all()

      refute Enum.empty?(updated)

      for {key, hit, miss} <- updated do
        assert hit === 0, "hits were not reset for #{inspect(key)}"
        assert miss === 0, "misses were not reset for #{inspect(key)}"
      end
    end
  end

  describe "output_cache_hit_rates/1" do
    setup [:log, :repo]

    test "defaults to a hit/miss/total/rate of 0" do
      line =
        capture_log(fn ->
          output_cache_hit_rates(all())
        end)

      assert line =~ "hit=0"
      assert line =~ "miss=0"
      assert line =~ "total=0"
      assert line =~ "hit_rate=0.0"
    end

    test "logs hit/miss count and ratio" do
      # hit
      Repo.always(5)
      # miss
      Repo.always(6)

      line =
        capture_log(fn ->
          output_cache_hit_rates(all())
        end)

      assert line =~ "hit=1"
      assert line =~ "miss=1"
      assert line =~ "total=2"
      assert line =~ "hit_rate=0.5"
    end
  end

  describe "memory usage log" do
    setup [:log, :repo]

    test "logs the number of items in the cache as well as the memory usage" do
      line =
        capture_log(fn ->
          output_sizes(all())
        end)

      assert line =~ "size=1"
      assert line =~ "memory="
    end
  end
end
