defmodule Algolia.ObjectTest do
  use ExUnit.Case, async: true
  import Mox

  alias Test.Support.{Factories.Routes.Route, Factories.Stops.Stop}

  setup :verify_on_exit!

  describe "Algolia.Object.data" do
    test "for Stops.Stop" do
      stop = Stop.build(:stop)

      expect(Routes.Repo.Mock, :by_stop, fn stop_id ->
        assert stop_id == stop.id
        Route.build_list(5, :route)
      end)

      features = [:access, :parking_lot]

      expect(Stops.Repo.Mock, :stop_features, fn _ ->
        features
      end)

      data = Algolia.Object.data(stop)
      assert data._geoloc == %{lat: stop.latitude, lng: stop.longitude}
      assert data.stop == stop
      assert is_list(data.routes)
      assert data.features == features
      assert Algolia.Object.object_id(stop) == "stop-#{stop.id}"
    end

    test "for Routes.Route" do
      route = Route.build(:route, type: Faker.Util.pick([0, 1, 2, 4]))
      stops = Stop.build_list(5, :stop)

      expect(Stops.Repo.Mock, :by_route, fn route_id, _, _ ->
        assert route_id == route.id
        stops
      end)

      data = Algolia.Object.data(route)
      assert data.stop_names == Enum.map(stops, & &1.name)
      assert data.headsigns == route.direction_destinations
      assert Algolia.Object.object_id(route) == "route-#{route.id}"

      assert data.route == route

      refute Map.has_key?(data, :_geoloc)
    end

    test "for Routes.Route that is a bus route" do
      bus_route = Route.build(:route, type: 3)
      stops = Stop.build_list(5, :stop, station?: true)
      bus_stops = Stop.build_list(3, :stop, station?: false)

      expect(Stops.Repo.Mock, :by_route, fn route_id, _, _ ->
        assert route_id == bus_route.id
        stops ++ bus_stops
      end)

      data = Algolia.Object.data(bus_route)
      # Should not include bus stop
      assert data.stop_names == Enum.map(stops, & &1.name)
      assert data.headsigns == bus_route.direction_destinations

      assert data.route == bus_route

      refute Map.has_key?(data, :_geoloc)
    end
  end

  describe "Algolia.Object.url" do
    test "for Stops.Stop" do
      stop = Stop.build(:stop)
      assert Algolia.Object.url(stop) == "/stops/#{stop.id}"
    end

    test "for Routes.Route" do
      route = Route.build(:route)
      assert Algolia.Object.url(route) == "/schedules/#{route.id}"
    end
  end
end
