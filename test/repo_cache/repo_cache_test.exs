defmodule RepoCacheTest.Repo do
  use RepoCache, ttl: :timer.seconds(1)

  def time(value) do
    cache(value, fn _ -> System.monotonic_time() end)
  end

  def always(value) do
    cache(value, fn v -> v end)
  end

  def agent_state(pid) do
    cache(pid, fn pid ->
      Agent.get(pid, fn state -> state end)
    end)
  end

  def slow_message(pid, value) do
    cache(pid, fn pid ->
      Process.sleep(100)
      send(pid, {:message, value})
      :ok
    end)
  end
end

defmodule RepoCacheTest do
  use ExUnit.Case, async: true
  alias RepoCacheTest.Repo

  setup_all do
    {:ok, _} = Repo.start_link()
    :ok
  end

  test "returns the cache result multiple times for the same key" do
    first = Repo.time(1)
    second = Repo.time(1)
    assert first == second
  end

  test "returns different values for different keys" do
    assert Repo.time(1) != Repo.time(2)
  end

  test "returns different values for the same key on different methods" do
    assert Repo.time(1) != Repo.always(1)
  end

  test "does not cache errors" do
    {:ok, pid} = Agent.start_link(fn -> {:error, :value} end)
    assert {:error, :value} == Repo.agent_state(pid)
    Agent.update(pid, fn _ -> :real end)
    assert :real == Repo.agent_state(pid)
  end

  test "can clear the cache with clear_cache" do
    {:ok, pid} = Agent.start_link(fn -> :value end)
    assert :value == Repo.agent_state(pid)
    Agent.update(pid, fn _ -> :real end)
    assert :value == Repo.agent_state(pid)
    Repo.clear_cache()
    assert :real == Repo.agent_state(pid)
  end

  test "many simultaneous requests don't all call the function" do
    parent = self()

    tasks =
      for i <- 0..10 do
        Task.async(fn ->
          Repo.slow_message(parent, i)
        end)
      end

    for {_task, result} <- Task.yield_many(tasks) do
      assert result == {:ok, :ok}, "one of the tasks failed: #{inspect(result)}"
    end

    # function was only called once
    assert_received {:message, _}

    for _i <- 1..10 do
      refute_received {:message, _}
    end
  end

  describe "child_spec/1" do
    test "returns a child_spec map" do
      assert %{id: _, start: {_, _, _}, type: _, restart: _, shutdown: _} = Repo.child_spec([])
    end
  end
end
