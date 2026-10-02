defmodule Dotcom.RoutesTest do
  use ExUnit.Case

  import Mox
  import Dotcom.Routes

  alias Test.Support.Factories

  setup :verify_on_exit!

  describe "subway_route_ids/0" do
    test "returns a list of route ids" do
      # Exercise/Verify
      assert Enum.all?(subway_route_ids(), &is_binary/1)
    end
  end

  describe "for_stop/1" do
    setup do
      stub(Stops.Repo.Mock, :get, fn _ ->
        Factories.Stops.Stop.build(:stop)
      end)

      :ok
    end

    test "retrieves routes for a stop_id based on that stop and its connecting stops" do
      [stop_id | connecting_stop_ids] =
        Faker.Util.sample_uniq(4, fn -> Test.Support.FactoryHelpers.build(:id) end)

      expect(Stops.Repo.Mock, :get, fn ^stop_id ->
        Factories.Stops.Stop.build(:stop, id: stop_id, connecting_stops: connecting_stop_ids)
      end)

      expect(Routes.Repo.Mock, :by_stop, fn stop_ids ->
        assert stop_ids == [stop_id | connecting_stop_ids] |> Enum.join(",")

        []
      end)

      assert for_stop(stop_id) |> is_list()
    end

    test "excludes unlisted routes" do
      stop_id = Test.Support.FactoryHelpers.build(:id)

      expect(Routes.Repo.Mock, :by_stop, fn _ ->
        Factories.Routes.Route.build_list(1, :route, listed?: false)
      end)

      assert for_stop(stop_id) == []
    end

    test "excludes rail replacement buses" do
      stop_id = Test.Support.FactoryHelpers.build(:id)

      expect(Routes.Repo.Mock, :by_stop, fn _ ->
        Factories.Routes.Route.build_list(1, :route, description: :rail_replacement_bus)
      end)

      assert for_stop(stop_id) == []
    end

    test "excludes connecting stops when include_connecting_stops?: false" do
      [stop_id | connecting_stop_ids] =
        Faker.Util.sample_uniq(4, fn -> Test.Support.FactoryHelpers.build(:id) end)

      expect(Stops.Repo.Mock, :get, fn ^stop_id ->
        Factories.Stops.Stop.build(:stop, id: stop_id, connecting_stops: connecting_stop_ids)
      end)

      expect(Routes.Repo.Mock, :by_stop, fn stop_ids ->
        assert stop_ids == stop_id

        []
      end)

      assert for_stop(stop_id, include_connecting_stops?: false) |> is_list()
    end
  end
end
