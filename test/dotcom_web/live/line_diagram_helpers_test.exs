defmodule DotcomWeb.LineDiagramHelpersTest do
  use ExUnit.Case, async: true

  alias GTFSRouteBranching.Segment.{BranchStop, StickConnection}
  alias Test.Support.Factories
  import DotcomWeb.LineDiagramHelpers
  import Phoenix.LiveViewTest
  import Mox

  setup :verify_on_exit!

  describe "route_to_diagram_class/1" do
    test "returns 'green-line' for all Green Line variants" do
      for branch <- ["Green-B", "Green-C", "Green-D", "Green-E"] do
        route = Factories.Routes.Route.build(:route, %{id: branch})
        assert route_to_diagram_class(route) == "green-line"
      end
    end

    test "returns 'red-line' for Mattapan route" do
      route = Factories.Routes.Route.build(:route, %{id: "Mattapan"})
      assert route_to_diagram_class(route) == "red-line"
    end

    test "returns correct class based in icon_atom for non-Green non-Mattapan routes" do
      bus = Factories.Routes.Route.build(:route, %{id: "1", type: 3})
      commuter_rail = Factories.Routes.Route.build(:route, %{id: "CR-Providence", type: 2})
      ferry = Factories.Routes.Route.build(:route, %{id: "Boat-F10", type: 4})
      subway = Factories.Routes.Route.build(:route, %{id: "Red", type: 1})

      silver_line =
        Factories.Routes.Route.build(:route, %{
          id: Faker.Util.pick(Routes.Route.silver_line()),
          type: 1
        })

      assert route_to_diagram_class(bus) == "bus"
      assert route_to_diagram_class(commuter_rail) == "commuter-rail"
      assert route_to_diagram_class(ferry) == "ferry"
      assert route_to_diagram_class(subway) == "red-line"
      assert route_to_diagram_class(silver_line) == "silver-line"
    end
  end

  describe "get_segments/4" do
    setup do
      stops_by_id =
        Map.new(["stop_1", "stop_2", "stop_3"], fn stop_id ->
          {stop_id, Factories.Stops.Stop.build(:stop, %{id: stop_id})}
        end)

      %{stops_by_id: stops_by_id}
    end

    test "returns segments for valid patterns", %{stops_by_id: stops_by_id} do
      route = Factories.Routes.Route.build(:route, %{id: "1", type: 3})

      route_pattern =
        Factories.RoutePatterns.RoutePattern.build(:route_pattern, %{
          route_id: route.id,
          typicality: 1,
          direction_id: 0
        })

      mock_segments = [%{type: "test_segment"}]

      expect(
        GTFSRouteBranching.Mock,
        :calculate,
        fn _route, _direction_id, _canon_stop_ids, _system_data ->
          {nil, nil, mock_segments}
        end
      )

      segments = get_segments(route, 0, stops_by_id, [route_pattern])

      assert segments == mock_segments
    end

    test "normalizes Green Line route_ids", %{stops_by_id: stops_by_id} do
      green_route =
        Factories.Routes.Route.build(:route, %{id: "Green", type: 0})

      green_branch_pattern =
        Factories.RoutePatterns.RoutePattern.build(:route_pattern, %{
          route_id: "Green-B",
          typicality: 1,
          direction_id: 0
        })

      mock_segments = [%{type: "test_segment"}]

      expect(
        GTFSRouteBranching.Mock,
        :calculate,
        fn _route, _direction_id, _canon_stop_ids, system_data ->
          route_patterns = system_data.route_patterns

          for {_id, pattern} <- route_patterns do
            assert pattern.route_id == "Green",
                   "Expected route_id to be normalized to 'Green', got: #{pattern.route_id}"
          end

          {nil, nil, mock_segments}
        end
      )

      segments = get_segments(green_route, 0, stops_by_id, [green_branch_pattern])
      assert segments == mock_segments
    end
  end

  describe "stop_card_segment/1" do
    defp render_svg_component(segment_data) do
      assigns = %{segment_data: segment_data}

      render_component(&DotcomWeb.LineDiagramHelpers.stop_card_segment/1, assigns)
      |> Floki.parse_fragment!()
    end

    test "renders stop at different lanes" do
      for {lane, expected_x} <- [left: "20", center: "50", right: "80"] do
        segment_data = %BranchStop{
          stop_id: "test_stop",
          stop_lane: lane,
          connections: []
        }

        html = render_svg_component(segment_data)
        circle = Floki.find(html, "circle.line-diagram-svg__stop")

        assert Floki.attribute(circle, "cx") == [expected_x]
      end
    end

    test "renders connections with correct line attributes" do
      connections = [
        %StickConnection{
          from_stop: "from_stop",
          to_stop: "to_stop",
          from_lane: :left,
          from_vpos: :top,
          to_lane: :center,
          to_vpos: :center
        },
        %StickConnection{
          from_stop: "from_stop",
          to_stop: "to_stop",
          from_lane: :center,
          from_vpos: :center,
          to_lane: :right,
          to_vpos: :bottom
        }
      ]

      segment_data = %BranchStop{
        stop_id: "test_stop",
        stop_lane: :center,
        connections: connections
      }

      html = render_svg_component(segment_data)

      lines =
        Floki.find(html, "line.line-diagram-svg__line")
        |> Enum.filter(fn line -> Floki.attribute(line, "stroke") != [] end)

      # First connection: left top to center center
      first_line = Enum.at(lines, 0)
      assert Floki.attribute(first_line, "x1") == ["20"]
      assert Floki.attribute(first_line, "y1") == ["0"]
      assert Floki.attribute(first_line, "x2") == ["50"]
      assert Floki.attribute(first_line, "y2") == ["1em"]

      # Second connection: center center to right bottom
      second_line = Enum.at(lines, 1)
      assert Floki.attribute(second_line, "x1") == ["50"]
      assert Floki.attribute(second_line, "y1") == ["1em"]
      assert Floki.attribute(second_line, "x2") == ["80"]
      assert Floki.attribute(second_line, "y2") == ["100%"]
    end
  end

  describe "typicality atom conversion (private function behavior)" do
    setup do
      route = Factories.Routes.Route.build(:route, %{id: "1", type: 3})
      polyline = Polyline.encode([{-71.06, 42.35}, {-71.07, 42.36}])

      stop_ids = ["stop_1", "stop_2"]

      stops_by_id =
        Map.new(stop_ids, fn stop_id ->
          {stop_id, Factories.Stops.Stop.build(:stop, %{id: stop_id})}
        end)

      %{route: route, polyline: polyline, stops_by_id: stops_by_id, stop_ids: stop_ids}
    end

    test "converts integer typicality to atom", %{
      route: route,
      polyline: polyline,
      stops_by_id: stops_by_id,
      stop_ids: stop_ids
    } do
      pattern =
        Factories.RoutePatterns.RoutePattern.build(:route_pattern, %{
          route_id: route.id,
          representative_trip_polyline: polyline,
          typicality: 1,
          stop_ids: stop_ids,
          direction_id: 0
        })

      expect(
        GTFSRouteBranching.Mock,
        :calculate,
        fn _route, _direction_id, _canon_stop_ids, system_data ->
          route_patterns = system_data.route_patterns

          for {_id, normalized_pattern} <- route_patterns do
            assert normalized_pattern.typicality == :typical,
                   "Expected typicality to be converted to :typical atom, got: #{inspect(normalized_pattern.typicality)}"
          end

          {nil, nil, []}
        end
      )

      get_segments(route, 0, stops_by_id, [pattern])
    end

    test "handles all valid typicality values", %{
      route: route,
      polyline: polyline,
      stops_by_id: stops_by_id,
      stop_ids: stop_ids
    } do
      typicality_mapping = %{
        1 => :typical,
        2 => :deviation,
        3 => :atypical,
        4 => :diversion,
        5 => :canonical_only
      }

      for {input_typicality, expected_atom} <- typicality_mapping do
        expect(
          GTFSRouteBranching.Mock,
          :calculate,
          fn _route, _direction_id, _canon_stop_ids, system_data ->
            route_patterns = system_data.route_patterns

            for {_id, normalized_pattern} <- route_patterns do
              assert normalized_pattern.typicality == expected_atom,
                     "Expected typicality #{input_typicality} to convert to #{expected_atom}, got: #{inspect(normalized_pattern.typicality)}"
            end

            {nil, nil, []}
          end
        )

        pattern =
          Factories.RoutePatterns.RoutePattern.build(:route_pattern, %{
            route_id: route.id,
            representative_trip_polyline: polyline,
            typicality: input_typicality,
            stop_ids: stop_ids,
            direction_id: 0
          })

        get_segments(route, 0, stops_by_id, [pattern])
      end
    end
  end
end
