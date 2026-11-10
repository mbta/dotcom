defmodule Vehicles.NotificationsTest do
  use ExUnit.Case

  alias Test.Support.Factories.Vehicles.Vehicle, as: VehicleFactory
  alias Vehicles.{Notifications, Repo}

  setup do
    start_supervised!({Phoenix.PubSub, name: Vehicles.PubSub})
    start_supervised!({Repo, name: __MODULE__})

    vehicle =
      VehicleFactory.build(:vehicle,
        id: "vehicle-1",
        trip_id: "trip-1",
        route_id: "Red",
        direction_id: 0
      )

    %{vehicle: vehicle}
  end

  describe "subscriptions" do
    test "notifies trip and route/direction subscribers after insertion", %{vehicle: vehicle} do
      assert :ok = Notifications.subscribe({:trip, "trip-1"})
      assert :ok = Notifications.subscribe({:route, "Red", 0})

      change(:add, [vehicle])

      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      assert_received {:vehicles_changed, {:route, "Red", 0}}
      assert Repo.trip("trip-1", name: __MODULE__) == vehicle
      assert Repo.route("Red", name: __MODULE__, direction_id: 0) == [vehicle]
      refute_received {:vehicles_changed, _}
    end

    test "does not notify unrelated scopes", %{vehicle: vehicle} do
      Notifications.subscribe({:trip, "other-trip"})
      Notifications.subscribe({:route, "Blue", 0})
      Notifications.subscribe({:route, "Red", 1})

      change(:add, [vehicle])

      refute_received {:vehicles_changed, _}
    end

    test "unsubscribe stops notifications", %{vehicle: vehicle} do
      for scope <- [{:trip, "trip-1"}, {:route, "Red", 0}] do
        assert :ok = Notifications.subscribe(scope)
        assert :ok = Notifications.unsubscribe(scope)
      end

      change(:add, [vehicle])

      refute_received {:vehicles_changed, _}
    end

    test "rejects invalid subscription scopes" do
      for scope <- [{:trip, nil}, {:route, nil, 0}, {:route, "Red", nil}, {:route, "Red", 2}] do
        assert_raise FunctionClauseError, fn -> Notifications.subscribe(scope) end
        assert_raise FunctionClauseError, fn -> Notifications.unsubscribe(scope) end
      end
    end

    test "a subscriber can read the updated cache when notified", %{vehicle: vehicle} do
      parent = self()

      subscriber =
        Task.async(fn ->
          Notifications.subscribe({:trip, "trip-1"})
          send(parent, :subscribed)

          receive do
            {:vehicles_changed, {:trip, "trip-1"}} ->
              Repo.trip("trip-1", name: __MODULE__)
          end
        end)

      assert_receive :subscribed
      change(:add, [vehicle])
      assert Task.await(subscriber) == vehicle
    end
  end

  describe "updates" do
    test "notifies old and new scopes when a vehicle is reassigned", %{vehicle: vehicle} do
      change(:add, [vehicle])

      for scope <- [
            {:trip, "trip-1"},
            {:trip, "trip-2"},
            {:route, "Red", 0},
            {:route, "Blue", 1}
          ] do
        Notifications.subscribe(scope)
      end

      updated = %{vehicle | trip_id: "trip-2", route_id: "Blue", direction_id: 1}
      change(:update, [updated])

      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      assert_received {:vehicles_changed, {:trip, "trip-2"}}
      assert_received {:vehicles_changed, {:route, "Red", 0}}
      assert_received {:vehicles_changed, {:route, "Blue", 1}}
      assert Repo.trip("trip-1", name: __MODULE__) == nil
      assert Repo.route("Red", name: __MODULE__, direction_id: 0) == []
      assert Repo.trip("trip-2", name: __MODULE__) == updated
      refute_received {:vehicles_changed, _}
    end

    test "notifies each unchanged scope once when vehicle data changes", %{vehicle: vehicle} do
      change(:add, [vehicle])
      Notifications.subscribe({:trip, "trip-1"})
      Notifications.subscribe({:route, "Red", 0})

      change(:update, [%{vehicle | latitude: 42.36}])

      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      assert_received {:vehicles_changed, {:route, "Red", 0}}
      refute_received {:vehicles_changed, _}
    end

    test "a direction-only change notifies both directions and the trip once", %{vehicle: vehicle} do
      change(:add, [vehicle])
      Notifications.subscribe({:trip, "trip-1"})
      Notifications.subscribe({:route, "Red", 0})
      Notifications.subscribe({:route, "Red", 1})

      change(:update, [%{vehicle | direction_id: 1}])

      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      assert_received {:vehicles_changed, {:route, "Red", 0}}
      assert_received {:vehicles_changed, {:route, "Red", 1}}
      refute_received {:vehicles_changed, _}
    end

    test "does not notify for identical add or update events", %{vehicle: vehicle} do
      change(:add, [vehicle])
      Notifications.subscribe({:trip, "trip-1"})
      Notifications.subscribe({:route, "Red", 0})

      change(:add, [vehicle])
      change(:update, [vehicle])

      refute_received {:vehicles_changed, _}
    end

    test "an add can replace an existing vehicle and an update can insert one", %{
      vehicle: vehicle
    } do
      change(:update, [vehicle])
      Notifications.subscribe({:trip, "trip-1"})
      Notifications.subscribe({:trip, "trip-2"})

      change(:add, [%{vehicle | trip_id: "trip-2"}])

      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      assert_received {:vehicles_changed, {:trip, "trip-2"}}
      refute_received {:vehicles_changed, _}
    end

    test "missing trip or route/direction does not produce an invalid scope", %{vehicle: vehicle} do
      Notifications.subscribe({:trip, "trip-1"})
      Notifications.subscribe({:route, "Red", 0})

      change(:add, [%{vehicle | route_id: nil}])
      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      refute_received {:vehicles_changed, _}

      change(:update, [%{vehicle | trip_id: nil}])
      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      assert_received {:vehicles_changed, {:route, "Red", 0}}
      refute_received {:vehicles_changed, _}

      change(:update, [%{vehicle | trip_id: nil, direction_id: nil}])
      assert_received {:vehicles_changed, {:route, "Red", 0}}
      refute_received {:vehicles_changed, _}
    end
  end

  describe "removals" do
    test "uses the previous row to notify scopes after deletion", %{vehicle: vehicle} do
      change(:add, [vehicle])
      Notifications.subscribe({:trip, "trip-1"})
      Notifications.subscribe({:route, "Red", 0})

      change(:remove, [vehicle.id])

      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      assert_received {:vehicles_changed, {:route, "Red", 0}}
      assert Repo.trip("trip-1", name: __MODULE__) == nil
      assert Repo.route("Red", name: __MODULE__, direction_id: 0) == []
      refute_received {:vehicles_changed, _}
    end

    test "removing an unknown vehicle does not notify", %{vehicle: vehicle} do
      change(:add, [vehicle])
      Notifications.subscribe({:trip, "trip-1"})
      Notifications.subscribe({:route, "Red", 0})

      change(:remove, ["unknown"])

      refute_received {:vehicles_changed, _}
      assert Repo.trip("trip-1", name: __MODULE__) == vehicle
    end

    test "notifies even when another vehicle remains in the same scope", %{vehicle: vehicle} do
      other = %{vehicle | id: "vehicle-2"}
      change(:reset, [vehicle, other])
      Notifications.subscribe({:trip, "trip-1"})
      Notifications.subscribe({:route, "Red", 0})

      change(:remove, [vehicle.id])

      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      assert_received {:vehicles_changed, {:route, "Red", 0}}
      assert Repo.trip("trip-1", name: __MODULE__) == other
      refute_received {:vehicles_changed, _}
    end
  end

  describe "resets" do
    test "notifies added, changed, and emptied scopes", %{vehicle: vehicle} do
      change(:reset, [vehicle])
      Notifications.subscribe({:trip, "trip-1"})
      Notifications.subscribe({:trip, "trip-2"})
      Notifications.subscribe({:route, "Red", 0})
      Notifications.subscribe({:route, "Blue", 1})

      replacement = %{
        vehicle
        | id: "vehicle-2",
          trip_id: "trip-2",
          route_id: "Blue",
          direction_id: 1
      }

      change(:reset, [replacement])

      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      assert_received {:vehicles_changed, {:trip, "trip-2"}}
      assert_received {:vehicles_changed, {:route, "Red", 0}}
      assert_received {:vehicles_changed, {:route, "Blue", 1}}
      assert Repo.all(name: __MODULE__) == [replacement]
      refute_received {:vehicles_changed, _}
    end

    test "an empty reset notifies scopes that lost all vehicles only once", %{vehicle: vehicle} do
      change(:reset, [vehicle, %{vehicle | id: "vehicle-2"}])
      Notifications.subscribe({:trip, "trip-1"})
      Notifications.subscribe({:route, "Red", 0})

      change(:reset, [])

      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      assert_received {:vehicles_changed, {:route, "Red", 0}}
      assert Repo.all(name: __MODULE__) == []
      refute_received {:vehicles_changed, _}
    end

    test "unchanged rows do not notify, regardless of snapshot order", %{vehicle: vehicle} do
      other = %{vehicle | id: "vehicle-2"}
      change(:reset, [vehicle, other])
      Notifications.subscribe({:trip, "trip-1"})
      Notifications.subscribe({:route, "Red", 0})

      change(:reset, [other, vehicle])

      refute_received {:vehicles_changed, _}
    end

    test "a partial reset notifies changed rows but not unrelated unchanged scopes",
         %{vehicle: vehicle} do
      other = %{vehicle | id: "vehicle-2", trip_id: "trip-2", route_id: "Blue"}
      change(:reset, [vehicle, other])

      for scope <- [
            {:trip, "trip-1"},
            {:trip, "trip-2"},
            {:route, "Red", 0},
            {:route, "Blue", 0}
          ] do
        Notifications.subscribe(scope)
      end

      change(:reset, [%{vehicle | latitude: 42.36}, other])

      assert_received {:vehicles_changed, {:trip, "trip-1"}}
      assert_received {:vehicles_changed, {:route, "Red", 0}}
      refute_received {:vehicles_changed, _}
    end
  end

  defp change(event, data), do: Repo.sync_send(__MODULE__, {event, data})
end
