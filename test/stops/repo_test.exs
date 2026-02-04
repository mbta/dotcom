defmodule Stops.RepoTest do
  use ExUnit.Case, async: true

  import Mox
  import Stops.Repo
  import Test.Support.Factories.MBTA.Api
  alias Stops.Stop
  alias Test.Support.Factories.Routes.Route

  @direction_id Faker.Util.pick([0, 1])
  @route_id Faker.Internet.slug()
  @stop_item build(:stop_item, %{id: "stop"})

  @parent_stop_item build(:stop_item, %{
                      id: "parent-stop",
                      relationships: %{
                        "child_stops" => [@stop_item]
                      }
                    })

  setup :verify_on_exit!

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    stub(Routes.Repo.Mock, :by_stop, fn _ ->
      []
    end)

    stub(MBTA.Api.Mock, :get_json, fn "/stops/" <> id, _ ->
      %JsonApi{
        data: [
          build(:stop_item, %{id: id})
        ]
      }
    end)

    %{cache: cache}
  end

  describe "get/1" do
    test "returns nil if the stop doesn't exist" do
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        {:error, ""}
      end)

      assert get("get test: stop doesn't exist") == nil
    end

    test "returns a stop" do
      id = Faker.Internet.slug()
      assert %Stop{id: ^id} = get(id)
    end
  end

  describe "get!/1" do
    test "raises a Stops.NotFoundError if the stop isn't found" do
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        {:error, ""}
      end)

      assert_raise Stops.NotFoundError, fn ->
        get!("get! test: stop doesn't exist")
      end
    end

    test "returns a stop" do
      id = Faker.Internet.slug()
      assert %Stop{id: ^id} = get!(id)
    end
  end

  describe "get_parent/1" do
    test "returns the parent stop for a child stop" do
      MBTA.Api.Mock
      |> expect(:get_json, fn _, _ ->
        %JsonApi{
          data: [
            build(:stop_item, %{
              relationships: %{
                "parent_station" => [@parent_stop_item]
              }
            })
          ]
        }
      end)
      |> expect(:get_json, fn "/stops/parent-stop", _ ->
        %JsonApi{
          data: [@parent_stop_item]
        }
      end)

      stop = get("has-parent")
      assert stop.child? == true
      assert stop.parent_id == "parent-stop"
      assert %Stop{id: "parent-stop"} = get_parent(stop)
      refute get_parent(nil)
    end

    test "returns the same stop for a parent stop" do
      parent_stop = %Stop{child?: false, parent_id: nil}
      assert get_parent(parent_stop) == parent_stop
    end

    test "takes ids" do
      id = Faker.Internet.slug()

      MBTA.Api.Mock
      |> expect(:get_json, fn path, _ ->
        assert path == "/stops/" <> id

        %JsonApi{
          data: [
            build(:stop_item, %{
              relationships: %{
                "parent_station" => [@parent_stop_item]
              }
            })
          ]
        }
      end)
      |> expect(:get_json, fn "/stops/parent-stop", _ ->
        %JsonApi{
          data: [@parent_stop_item]
        }
      end)

      assert %Stop{id: "parent-stop"} = get_parent(id)
    end
  end

  test "has_parent?/1 indicates presence of parent station" do
    assert has_parent?(%Stop{parent_id: "something"})
    refute has_parent?(%Stop{parent_id: nil})
    refute has_parent?(nil)
  end

  describe "by_route/3" do
    test "can return stops" do
      expect(MBTA.Api.Mock, :get_json, fn "/stops/", args ->
        assert args[:direction_id] == @direction_id
        assert args[:route] == @route_id

        %JsonApi{
          data: build_list(3, :stop_item)
        }
      end)

      assert [%Stop{} | _] = by_route(@route_id, @direction_id)
    end

    test "can take additional fields" do
      today = Timex.today()
      weekday = today |> Timex.shift(days: 7) |> Timex.beginning_of_week(:fri)
      saturday = weekday |> Timex.shift(days: 1)

      expect(MBTA.Api.Mock, :get_json, 2, fn "/stops/", args ->
        assert args[:direction_id] == @direction_id
        assert args[:route] == @route_id
        assert args[:date] in [weekday, saturday]

        %JsonApi{
          data: build_list(3, :stop_item)
        }
      end)

      assert by_route(@route_id, @direction_id, date: weekday) !=
               by_route(@route_id, @direction_id, date: saturday)
    end
  end

  describe "by_routes/3" do
    test "can return stops from multiple route IDs" do
      route_ids = Faker.Util.sample_uniq(4, fn -> Faker.App.name() end)
      direction_id = Faker.Util.pick([0, 1])
      num_test_stops_per_route = 3

      expect(MBTA.Api.Mock, :get_json, length(route_ids), fn "/stops/", args ->
        assert args[:direction_id] == direction_id
        assert args[:route] in route_ids

        %JsonApi{
          data: build_list(num_test_stops_per_route, :stop_item)
        }
      end)

      response = by_routes(route_ids, direction_id)
      assert length(response) == num_test_stops_per_route * length(route_ids)
    end
  end

  describe "by_route_type/2" do
    test "can request stops by route type" do
      route_type = Faker.Util.pick([0..4])

      expect(MBTA.Api.Mock, :get_json, fn "/stops/", args ->
        assert args[:route_type] == route_type

        %JsonApi{
          data: []
        }
      end)

      _ = by_route_type(route_type)
    end

    test "returns parent stops" do
      route_type = Faker.Util.pick([0..4])

      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{
          data: [
            build(:stop_item, %{
              relationships: %{
                "parent_station" => [@parent_stop_item]
              }
            })
          ]
        }
      end)
      |> expect(:get_json, fn path, _ ->
        "/stops/" <> id = path
        assert id == @parent_stop_item.id

        %JsonApi{
          data: [@parent_stop_item]
        }
      end)

      response = by_route_type(route_type)
      assert %Stop{} = Enum.find(response, &(&1.id == @parent_stop_item.id))
    end

    test "doesn't duplicate stops" do
      route_type = Faker.Util.pick([0..4])

      MBTA.Api.Mock
      |> expect(:get_json, fn _, _ ->
        %JsonApi{
          data: [
            build(:stop_item, %{
              id: "child-1",
              relationships: %{
                "parent_station" => [@parent_stop_item]
              }
            }),
            build(:stop_item, %{
              id: "child-2",
              relationships: %{
                "parent_station" => [@parent_stop_item]
              }
            })
          ]
        }
      end)
      |> expect(:get_json, fn path, _ ->
        "/stops/" <> id = path
        assert id == @parent_stop_item.id

        %JsonApi{
          data: [@parent_stop_item]
        }
      end)

      response = by_route_type(route_type)
      assert Enum.uniq(response) == response
      stop_id = @parent_stop_item.id
      # just the one parent stop
      assert [%Stop{id: ^stop_id}] = response
    end
  end

  describe "by_trip/2" do
    test "can return stops from a trip" do
      trip_id = Faker.Internet.slug()

      expect(MBTA.Api.Mock, :get_json, fn path, arg ->
        assert "/trips/" <> ^trip_id = path
        assert arg == [include: "stops"]

        %JsonApi{
          data: [
            build(:item, %{
              relationships: %{
                "stops" => [@stop_item]
              }
            })
          ]
        }
      end)

      assert response = by_trip(trip_id)
      stop_id = @stop_item.id
      assert [%Stop{id: ^stop_id} | _] = response
    end

    test "returns empty list if no trip matches" do
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        %JsonApi{
          data: []
        }
      end)

      assert [] = by_trip("made up trip id")
    end
  end

  describe "old_id_to_gtfs_id/1" do
    test "Returns nil when no id matches" do
      refute old_id_to_gtfs_id("made up stop id")
    end

    test "Returns gtfs id from old site id" do
      assert old_id_to_gtfs_id("66") == "place-forhl"
    end
  end

  describe "stop_features/1" do
    setup do
      stub(Routes.Repo.Mock, :by_stop, fn _ ->
        []
      end)

      :ok
    end

    test "Returns stop features for a given stop" do
      expect(Routes.Repo.Mock, :by_stop, fn _ ->
        [
          Route.build(:route, %{type: 2}),
          Route.build(:route, %{id: "Red"}),
          Route.build(:route, %{type: 3})
        ]
      end)

      features = stop_features(%Stop{id: @stop_item.id})
      assert :commuter_rail in features
      assert :red_line in features
      assert :bus in features
    end

    test "accessibility added if relevant" do
      features = stop_features(%Stop{accessibility: ["accessible"]})
      assert features == [:access]
    end

    test "adds parking features if relevant" do
      assert :parking_lot in stop_features(%Stop{parking_lots: [%Stop.ParkingLot{}]})
    end

    test "includes specific green_line branches if specified" do
      expect(Routes.Repo.Mock, :by_stop, 2, fn _ ->
        [
          Route.build(:route, %{id: "Red"}),
          Route.build(:route, %{id: "Green-B"}),
          Route.build(:route, %{id: "Green-C"}),
          Route.build(:route, %{id: "Green-D"}),
          Route.build(:route, %{id: "Green-E"})
        ]
      end)

      # when green line isn't expanded, keep it in GTFS order
      features = stop_features(%Stop{})
      assert features == [:red_line, :green_line_b, :green_line_c, :green_line_d, :green_line_e]

      # when green line is expanded, put the branches first
      features = stop_features(%Stop{}, expand_branches?: true)
      assert features == [:"Green-B", :"Green-C", :"Green-D", :"Green-E", :red_line]
    end
  end
end
