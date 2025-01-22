defmodule Vehicles.RepoTest do
  use ExUnit.Case

  alias Vehicles.Repo
  alias Vehicles.Vehicle

  @vehicles [
    %Vehicle{id: "86-0", route_id: "86", direction_id: 0, trip_id: "trip-1"},
    %Vehicle{id: "86-1", route_id: "86", direction_id: 1, trip_id: "trip-2"},
    %Vehicle{id: "CR-Lowell-0", route_id: "CR-Lowell", direction_id: 0, trip_id: "trip-3"},
    %Vehicle{id: "CR_Lowell-1", route_id: "CR-Lowell", direction_id: 1, trip_id: "trip-4"},
    %Vehicle{
      id: "overloaded-1",
      route_id: "CR-Fitchburg",
      direction_id: 0,
      trip_id: "overloaded"
    },
    %Vehicle{id: "overloaded-2", route_id: "CR-Fitchburg", direction_id: 0, trip_id: "overloaded"}
  ]

  setup do
    _ = start_supervised({Vehicles.Repo, [pubsub_fn: &pubsub_fn/2]})
    :ok = Repo.sync_send(Vehicles.Repo, {:reset, @vehicles})
    {:ok, name: Vehicles.Repo}
  end

  def pubsub_fn(_, "vehicles"), do: :ok

  describe "route/1" do
    test "given a route ID, finds vehicle statuses for that route", %{name: name} do
      assert Enum.sort(Enum.filter(@vehicles, &(&1.route_id == "86"))) ==
               Enum.sort(Repo.route("86", name: name))
    end

    test "if there are no vehicles on the route, returns the empty list", %{name: name} do
      assert Repo.route("bogus", name: name) == []
    end

    test "optionally takes a direction_id parameter", %{name: name} do
      all_lowell = Enum.filter(@vehicles, &(&1.route_id == "CR-Lowell"))
      expected = Enum.filter(all_lowell, &(&1.direction_id == 1))
      refute Enum.empty?(expected)
      refute expected == all_lowell
      assert Repo.route("CR-Lowell", direction_id: 1, name: name) == expected
    end

    test "includes vehicle bearing" do
      vehicles = Repo.route("CR-Lowell", direction_id: 1)

      for vehicle <- vehicles do
        assert vehicle.bearing > 0
      end
    end
  end

  describe "trip/1" do
    test "if there is no vehicle status for a trip, returns nil", %{name: name} do
      assert Repo.trip("bogus", name: name) == nil
    end

    test "returns the status for a single trip if it is available", %{name: name} do
      trip_id = "trip-2"
      expected = Enum.find(@vehicles, &(&1.trip_id == trip_id))
      assert %Vehicle{} = expected

      assert Repo.trip(trip_id, name: name) == expected
    end

    test "only returns a single vehicle for overloaded trips", %{name: name} do
      %Vehicle{id: "overloaded-1"} = Repo.trip("overloaded", name: name)
    end
  end

  describe "all/0" do
    test "returns all vehicles", %{name: name} do
      all = Repo.all(name: name)

      for vehicle <- @vehicles do
        assert vehicle in all
      end
    end
  end

  describe "stream events" do
    test "adds vehicles to repo", %{name: name} do
      Repo.sync_send(name, {:add, [%Vehicle{id: "CR-Middleborough"}]})
      all = Repo.all(name: name)
      assert %Vehicle{} = Enum.find(all, &(&1.id == "CR-Middleborough"))
    end

    test "updates vehicles in repo", %{name: name} do
      old = Enum.find(@vehicles, &(&1.id == "86-0"))
      Repo.sync_send(name, {:update, [%Vehicle{id: "86-0"}]})

      updated =
        [name: name]
        |> Repo.all()
        |> Enum.find(&(&1.id == "86-0"))

      refute updated == old
      assert updated == %Vehicle{id: "86-0"}
    end

    test "removes vehicles from repo", %{name: name} do
      assert %Vehicle{} = [name: name] |> Repo.all() |> Enum.find(&(&1.id == "86-0"))
      Repo.sync_send(name, {:remove, ["86-0"]})
      assert [name: name] |> Repo.all() |> Enum.find(&(&1.id == "86-0")) == nil
    end
  end
end
