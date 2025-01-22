defmodule Alerts.BusStopChangeSupervisorTest do
  use ExUnit.Case, async: true

  alias Alerts.BusStopChangeSupervisor

  setup do
    Application.put_env(:dotcom, :start_data_processes, true)

    on_exit(fn ->
      Application.put_env(:dotcom, :start_data_processes, false)
    end)

    {:ok, pid} = start_supervised({BusStopChangeSupervisor, name: :test})
    %{supervisor: pid}
  end

  describe "start_link/1" do
    test "started with children", %{supervisor: supervisor} do
      children_ids =
        supervisor
        |> Supervisor.which_children()
        |> Enum.map(&elem(&1, 0))

      assert Alerts.Cache.Fetcher in children_ids
    end
  end
end
