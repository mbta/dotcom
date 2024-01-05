defmodule Dotcom.GreenLine.CacheSupervisorTest do
  use ExUnit.Case, async: false
  alias Dotcom.GreenLine.DateAgent

  import Dotcom.GreenLine.CacheSupervisor
  import Mock

  setup_all do
    # needed by DotcomWeb.ScheduleController.VehicleLocations plug
    _ = start_supervised({Phoenix.PubSub, name: Vehicles.PubSub})
    _ = start_supervised(Vehicles.Repo)
    # Start parent supervisor
    _ = start_supervised({Dotcom.GreenLine.Supervisor, []})
    :ok
  end

  setup_with_mocks([
    {Schedules.Repo, [:passthrough],
     [
       rating_dates: fn ->
         {Timex.shift(Util.service_date(), days: -2), Timex.shift(Util.service_date(), days: 2)}
       end,
       end_of_rating: fn -> Timex.shift(Util.service_date(), days: 2) end
     ]},
    {Stops.Repo, [:passthrough],
     [
       by_route: fn _, _ -> [%Stops.Stop{}] end,
       by_route: fn _, _, _ -> [%Stops.Stop{}] end
     ]}
  ]) do
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

    # this is failing in prod
    assert {:ok, pid} = start_child(date)
    assert pid == lookup(date)
  end
end
