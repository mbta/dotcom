defmodule Routes.RepoTest do
  use ExUnit.Case, async: true

  import Mox
  import Routes.Repo
  import Test.Support.Factories.MBTA.Api
  alias Routes.Route

  @route_id Faker.App.name()
  @direction_id Faker.Util.pick([0, 1])

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    :ok
  end

  setup :verify_on_exit!

  describe "all/0" do
    test "parses the data into Route structs" do
      expect(MBTA.Api.Mock, :get_json, fn "/routes/", _ ->
        %JsonApi{data: build_list(4, :route_item)}
      end)

      assert [%Route{} | _] = all()
    end

    test "handles error" do
      expect(MBTA.Api.Mock, :get_json, fn "/routes/", _ ->
        {:error, :timeout}
      end)

      assert [] = all()
    end

    test "for bus, parses a short name instead of a long one" do
      short_name = Faker.App.name()
      long_name = Faker.Company.catch_phrase()

      expect(MBTA.Api.Mock, :get_json, fn "/routes/", _ ->
        %JsonApi{
          data: [
            build(:route_item, %{
              attributes: %{"type" => 3, "short_name" => short_name, "long_name" => long_name}
            })
          ]
        }
      end)

      [route] = all()

      assert route.name == short_name
    end

    test "parses a short_name if there's no long name" do
      short_name = Faker.App.name()

      expect(MBTA.Api.Mock, :get_json, fn "/routes/", _ ->
        %JsonApi{
          data: [
            build(:route_item, %{
              attributes: %{"type" => Faker.Util.pick([0, 1, 2, 4]), "short_name" => short_name}
            })
          ]
        }
      end)

      [route] = all()
      assert route.name == short_name
    end

    test "otherwise uses long name" do
      short_name = Faker.App.name()
      long_name = Faker.Company.catch_phrase()

      expect(MBTA.Api.Mock, :get_json, fn "/routes/", _ ->
        %JsonApi{
          data: [
            build(:route_item, %{
              attributes: %{
                "type" => Faker.Util.pick([0, 1, 2, 4]),
                "short_name" => short_name,
                "long_name" => long_name
              }
            })
          ]
        }
      end)

      [route] = all()
      assert route.name == long_name
    end

    test "filters out 'hidden' routes'" do
      # via Routes.Route.hidden?
      hidden_route_id = "441442"

      expect(MBTA.Api.Mock, :get_json, fn "/routes/", _ ->
        %JsonApi{
          data: [
            build(:route_item, %{
              id: hidden_route_id
            })
          ]
        }
      end)

      assert all() == []
    end
  end

  describe "by_type/1" do
    test "only returns routes of a given type" do
      expect(MBTA.Api.Mock, :get_json, fn "/routes/", _ ->
        # return routes from a variety of types
        data =
          Enum.flat_map(0..4, fn type ->
            build_list(4, :route_item, %{attributes: %{"type" => type}})
          end)

        %JsonApi{
          data: data
        }
      end)

      type = Faker.Util.pick(0..4)

      routes = by_type(type)
      assert routes != []
      assert Enum.all?(routes, fn route -> route.type == type end)
    end

    test "handles empty response" do
      expect(MBTA.Api.Mock, :get_json, fn "/routes/", _ ->
        %JsonApi{
          data: []
        }
      end)

      type = Faker.Util.pick(0..4)
      routes = by_type(type)
      assert routes == []
    end

    test "handles error" do
      expect(MBTA.Api.Mock, :get_json, fn "/routes/", _ ->
        {:error, %JsonApi.Error{}}
      end)

      type = Faker.Util.pick(0..4)
      routes = by_type(type)
      assert routes == []
    end
  end

  describe "get/1" do
    @route_id Faker.Internet.slug()

    test "returns a single route" do
      expect(MBTA.Api.Mock, :get_json, fn "/routes/#{@route_id}", _ ->
        %JsonApi{data: [build(:route_item)]}
      end)

      assert %Route{} = get(@route_id)
    end

    test "returns nil for an unknown route" do
      expect(MBTA.Api.Mock, :get_json, fn "/routes/#{@route_id}", _ ->
        {:error, %JsonApi.Error{code: "not_found"}}
      end)

      refute get(@route_id)
    end
  end

  test "frequent bus routes are tagged" do
    route_id = Faker.Internet.slug()
    frequent_route_id = Faker.Internet.slug()

    expect(MBTA.Api.Mock, :get_json, 2, fn "/routes/" <> id, _ ->
      if id == frequent_route_id do
        %JsonApi{data: [build(:route_item, %{attributes: %{"description" => "Frequent Bus"}})]}
      else
        %JsonApi{data: [build(:route_item)]}
      end
    end)

    assert %Route{description: :frequent_bus_route} = get(frequent_route_id)

    %Route{description: description} = get(route_id)
    refute description == :frequent_bus_route
  end

  describe "by_stop/1" do
    test "can specify type as param" do
      stop_id = Faker.Internet.slug()
      route_type = Faker.Util.pick([0, 1, 2, 3, 4])

      expect(MBTA.Api.Mock, :get_json, fn "/routes/", opts ->
        assert opts[:stop] == stop_id
        assert opts[:type] == route_type

        %JsonApi{data: [build(:route_item)]}
      end)

      assert by_stop(stop_id, type: route_type)
    end

    test "returns empty list if no routes of that type serve that stop" do
      stop_id = Faker.Internet.slug()
      route_type = Faker.Util.pick([0, 1, 2, 3, 4])

      expect(MBTA.Api.Mock, :get_json, fn "/routes/", opts ->
        assert opts[:stop] == stop_id
        assert opts[:type] == route_type

        %JsonApi{data: []}
      end)

      assert [] = by_stop(stop_id, type: route_type)
    end

    test "returns no routes on nonexistant station" do
      stop_id = Faker.Internet.slug()

      expect(MBTA.Api.Mock, :get_json, fn "/routes/", opts ->
        assert opts[:stop] == stop_id

        %JsonApi{data: []}
      end)

      assert [] = by_stop(stop_id)
    end

    test "handles error" do
      stop_id = Faker.Internet.slug()

      expect(MBTA.Api.Mock, :get_json, fn "/routes/", _ ->
        {:error, %JsonApi.Error{}}
      end)

      assert [] = by_stop(stop_id)
    end

    test "can include additional routes via stop connections" do
      stop_id = Faker.Internet.slug()
      connecting_stops = build_list(3, :stop_item)
      connecting_stop_ids = Enum.map(connecting_stops, & &1.id)

      MBTA.Api.Mock
      |> expect(:get_json, fn "/routes/", opts ->
        assert opts[:stop] == stop_id
        assert opts[:include] == "stop.connecting_stops"

        %JsonApi{
          data:
            build_list(1, :route_item, %{
              relationships: %{
                "stop" => [
                  build(:stop_item, %{
                    relationships: %{"connecting_stops" => connecting_stops}
                  })
                ]
              }
            })
        }
      end)
      |> expect(:get_json, length(connecting_stops), fn "/routes/", opts ->
        assert opts[:stop] in connecting_stop_ids
        %JsonApi{data: [build(:route_item)]}
      end)

      more_routes = by_stop(stop_id, include: "stop.connecting_stops")

      assert length(more_routes) == length(connecting_stops) + 1
    end
  end

  describe "handle_response/1" do
    test "parses routes" do
      response = %JsonApi{
        data: [
          %JsonApi.Item{
            attributes: %{
              "description" => "Local Bus",
              "direction_names" => ["Outbound", "Inbound"],
              "direction_destinations" => ["Start", "End"],
              "long_name" => "",
              "short_name" => "16",
              "sort_order" => 1600,
              "type" => 3
            },
            id: "16",
            relationships: %{},
            type: "route"
          },
          %JsonApi.Item{
            attributes: %{
              "description" => "Local Bus",
              "direction_names" => ["Outbound", "Inbound"],
              "direction_destinations" => ["Start", "End"],
              "long_name" => "",
              "short_name" => "36",
              "sort_order" => 3600,
              "type" => 3
            },
            id: "36",
            relationships: %{},
            type: "route"
          }
        ],
        links: %{}
      }

      assert {:ok, [%Route{id: "16"}, %Route{id: "36"}]} = handle_response(response)
    end

    test "removes hidden routes" do
      response = %JsonApi{
        data: [
          %JsonApi.Item{
            attributes: %{
              "description" => "Local Bus",
              "direction_names" => ["Outbound", "Inbound"],
              "direction_destinations" => ["Start", "End"],
              "long_name" => "",
              "short_name" => "36",
              "sort_order" => 3600,
              "type" => 3
            },
            id: "36",
            relationships: %{},
            type: "route"
          },
          %JsonApi.Item{
            attributes: %{
              "description" => "Limited Service",
              "direction_names" => ["Outbound", "Inbound"],
              "direction_destinations" => ["Start", "End"],
              "long_name" => "",
              "short_name" => "9701",
              "sort_order" => 970_100,
              "type" => 3
            },
            id: "9701",
            relationships: %{},
            type: "route"
          }
        ],
        links: %{}
      }

      assert {:ok, [%Route{id: "36"}]} = handle_response(response)
    end

    test "passes errors through" do
      error = {:error, %HTTPoison.Error{id: nil, reason: :timeout}}
      assert handle_response(error) == error
    end
  end

  describe "get_shapes/2" do
    test "gets shapes" do
      shape_items = build_list(5, :shape_item)

      expect(MBTA.Api.Mock, :get_json, fn "/shapes/", opts ->
        assert opts[:route] == @route_id
        assert opts[:direction_id] == @direction_id

        %JsonApi{
          data: shape_items
        }
      end)

      shapes = get_shapes(@route_id, direction_id: @direction_id)
      assert Enum.count(shapes) == length(shape_items)
      assert %Routes.Shape{} = List.first(shapes)
    end

    test "handles error" do
      expect(MBTA.Api.Mock, :get_json, fn "/shapes/", _ ->
        {:error, %JsonApi.Error{}}
      end)

      shapes = get_shapes(@route_id, direction_id: @direction_id)
      assert shapes == []
    end
  end

  describe "get_shape/1" do
    test "returns shape" do
      shape_id = Faker.Internet.slug()

      expect(MBTA.Api.Mock, :get_json, fn "/shapes/" <> id ->
        assert id == shape_id

        %JsonApi{
          data: [
            build(:shape_item, %{id: id})
          ]
        }
      end)

      shape =
        shape_id
        |> get_shape()
        |> List.first()

      assert %Routes.Shape{} = shape
    end

    test "handles error" do
      shape_id = Faker.Internet.slug()

      expect(MBTA.Api.Mock, :get_json, fn "/shapes/" <> id ->
        assert id == shape_id
        {:error, %JsonApi.Error{}}
      end)

      assert get_shape(shape_id) == []
    end
  end

  describe "green_line" do
    green_line = green_line()
    assert green_line.id == "Green"
    assert green_line.name == "Green Line"
  end
end
