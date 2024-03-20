defmodule Algolia.ObjectTest do
  use ExUnit.Case, async: true

  setup do
    {:ok, Application.get_env(:dotcom, :algolia_repos)}
  end

  describe "Algolia.Object.data" do
    @tag :external
    test "for Stops.Stop", %{stops: repo} do
      stop = repo.get("place-commuter-rail")
      data = Algolia.Object.data(stop)
      assert data._geoloc == %{lat: stop.latitude, lng: stop.longitude}
      assert data.stop == stop
      assert is_list(data.routes)
      assert data.features == [:access, :parking_lot]
      assert Algolia.Object.object_id(stop) == "stop-place-commuter-rail"
    end

    test "for Routes.Route", %{routes: repo} do
      route = repo.get("CR-Commuterrail")
      data = Algolia.Object.data(route)
      assert data.stop_names == ["Green Line Stop", "Subway Station", "Commuter Rail Stop"]
      assert data.headsigns == ["Start", "End"]
      assert Algolia.Object.object_id(route) == "route-CR-Commuterrail"

      assert data.route == route

      refute Map.has_key?(data, :_geoloc)
    end

    test "for Routes.Route that is a bus route", %{routes: repo} do
      route = repo.get("1000")
      data = Algolia.Object.data(route)
      # Should not include bus stop
      assert data.stop_names == ["Green Line Stop", "Commuter Rail Stop"]
      assert data.headsigns == ["Start", "End"]

      assert data.route == route

      refute Map.has_key?(data, :_geoloc)
    end
  end

  describe "Algolia.Object.url" do
    test "for Stops.Stop", %{stops: repo} do
      assert "place-commuter-rail"
             |> repo.get()
             |> Algolia.Object.url() == "/stops/place-commuter-rail"
    end

    test "for Routes.Route", %{routes: repo} do
      assert "CR-Commuterrail"
             |> repo.get()
             |> Algolia.Object.url() == "/schedules/CR-Commuterrail"
    end
  end
end
