defmodule Alerts.BusStopChangeSupervisorTest do
  use ExUnit.Case, async: true

  import Alerts.BusStopChangeSupervisor

  setup_all do
    Application.put_env(:elixir, :start_data_processes, true)

    :ok = Application.stop(:alerts)

    on_exit(fn ->
      Application.put_env(:elixir, :start_data_processes, false)
    end)
  end

  describe "start_link/1" do
    test "starts with children" do
      {:ok, supervisor} = start_link([])

      children_ids =
        supervisor
        |> Supervisor.which_children()
        |> Enum.map(&elem(&1, 0))

      assert Alerts.Cache.Fetcher in children_ids
      assert Alerts.Cache.BusStopChangeS3 in children_ids
    end
  end
end
