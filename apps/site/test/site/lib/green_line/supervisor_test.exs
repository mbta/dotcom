defmodule Site.GreenLine.CacheSupervisorTest do
  use ExUnit.Case
  alias Site.GreenLine.DateAgent

  import Site.GreenLine.CacheSupervisor

  setup_all do
    # Start parent supervisor
    {:ok, _pid} = Site.GreenLine.Supervisor.start_link([])
    :ok
  end

  test "CacheSupervisor is started along with registry" do
    assert {:error, {:already_started, _}} = start_link([])

    assert {:error, {:already_started, _}} =
             Registry.start_link(keys: :unique, name: :green_line_cache_registry)
  end

  test "can start a child and retrieve it" do
    date = Util.service_date()

    case lookup(date) do
      nil -> :ok
      pid -> DateAgent.stop(pid)
    end

    assert lookup(date) == nil

    assert {:ok, pid} = start_child(date)
    assert pid == lookup(date)
  end
end
