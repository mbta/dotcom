defmodule Routes.ParserTest do
  use ExUnit.Case, async: true

  import Routes.Parser
  alias Routes.Shape
  alias JsonApi.Item

  describe "parse_route/1" do
    test "does not pick an empty name for bus routes" do
      item = %Item{
        id: "746",
        attributes: %{
          "type" => 3,
          "short_name" => "",
          "long_name" => "Silver Line Waterfront",
          "direction_names" => ["zero", "one"],
          "direction_destinations" => ["Destination 1", "Destination 2"]
        }
      }

      parsed = parse_route(item)
      assert parsed.name == "Silver Line Waterfront"
    end

    test "parses gtfs description into description" do
      item = %Item{
        id: "id",
        attributes: %{
          "type" => 3,
          "short_name" => "short",
          "long_name" => "long",
          "description" => "Key Bus",
          "direction_names" => ["zero", "one"],
          "direction_destinations" => ["Destination 1", "Destination 2"]
        }
      }

      parsed = parse_route(item)
      assert parsed.description == :key_bus_route
    end

    test "parses unknown gtfs description into :unknown" do
      item = %Item{
        id: "id",
        attributes: %{
          "type" => 3,
          "short_name" => "short",
          "long_name" => "long",
          "description" => "Monorail",
          "direction_names" => ["zero", "one"],
          "direction_destinations" => ["Destination 1", "Destination 2"]
        }
      }

      parsed = parse_route(item)
      assert parsed.description == :unknown
    end

    test "prefers the short name for bus routes" do
      item = %Item{
        id: "id",
        attributes: %{
          "type" => 3,
          "short_name" => "short",
          "long_name" => "long",
          "direction_names" => ["zero", "one"],
          "direction_destinations" => ["Destination 1", "Destination 2"]
        }
      }

      parsed = parse_route(item)
      assert parsed.name == "short"
      assert parsed.long_name == "long"
    end

    test "prefers the long name for other routes" do
      item = %Item{
        id: "id",
        attributes: %{
          "type" => 2,
          "short_name" => "short",
          "long_name" => "long",
          "direction_names" => ["zero", "one"],
          "direction_destinations" => ["Destination 1", "Destination 2"]
        }
      }

      parsed = parse_route(item)
      assert parsed.name == "long"
    end

    test "does not pick an empty name for other routes" do
      item = %Item{
        id: "id",
        attributes: %{
          "type" => 2,
          "short_name" => "short",
          "long_name" => "",
          "direction_names" => ["zero", "one"],
          "direction_destinations" => ["Destination 1", "Destination 2"]
        }
      }

      parsed = parse_route(item)
      assert parsed.name == "short"
    end

    test "parses direction attributes" do
      item = %Item{
        id: "id",
        attributes: %{
          "type" => 2,
          "short_name" => "short",
          "long_name" => "",
          "direction_names" => ["zero", "one"],
          "direction_destinations" => ["Destination 1", "Destination 2"]
        }
      }

      parsed = parse_route(item)
      assert parsed.direction_names == %{0 => "zero", 1 => "one"}
      assert parsed.direction_destinations == %{0 => "Destination 1", 1 => "Destination 2"}
    end

    test "nulls direction attributes when there are no route patterns in that direction" do
      item = %Item{
        id: "id",
        attributes: %{
          "type" => 2,
          "short_name" => "short",
          "long_name" => "",
          "direction_names" => ["zero", "one"],
          "direction_destinations" => ["Destination 1", "Destination 2"]
        },
        relationships: %{
          "route_patterns" => [
            %Item{
              id: "id",
              attributes: %{
                "direction_id" => 1,
                "name" => "rp",
                "time_desc" => "td",
                "typicality" => 1,
                "sort_order" => 12_132_123
              },
              relationships: %{
                "representative_trip" => [%Item{id: "id"}],
                "route" => [%Item{id: "id"}]
              }
            }
          ]
        }
      }

      parsed = parse_route(item)
      assert parsed.direction_names == %{0 => nil, 1 => "one"}
      assert parsed.direction_destinations == %{0 => nil, 1 => "Destination 2"}
    end
  end

  describe "parse_shape/1" do
    test "parses a shape" do
      item = %Item{
        id: "shape_id",
        attributes: %{
          "name" => "name",
          "direction_id" => 1,
          "polyline" => "polyline",
          "priority" => -1
        },
        relationships: %{"stops" => [%Item{id: "1"}, %Item{id: "2"}]}
      }

      assert parse_shape(item) == [
               %Shape{
                 id: "shape_id",
                 name: "name",
                 stop_ids: ["1", "2"],
                 direction_id: 1,
                 polyline: "polyline",
                 priority: -1
               }
             ]
    end

    test "handles a response with no stops" do
      item = %Item{
        id: "shape_id",
        attributes: %{
          "name" => "name",
          "direction_id" => 1,
          "polyline" => "polyline",
          "priority" => -1
        },
        relationships: %{}
      }

      assert parse_shape(item) == [
               %Shape{
                 id: "shape_id",
                 name: "name",
                 stop_ids: [],
                 direction_id: 1,
                 polyline: "polyline",
                 priority: -1
               }
             ]
    end
  end
end
