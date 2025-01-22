defmodule Stops.RouteStopTest do
  use ExUnit.Case, async: false

  import Mock
  import Stops.RouteStop

  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias Routes.Shape
  alias Stops.RouteStop
  alias Stops.Stop

  @moduletag :external
  @stop %Stop{name: "Braintree", id: "place-brntn"}
  @green_route %Route{id: "Green", type: 0}
  @green_b_route %Route{id: "Green-B", type: 1}
  @orange_route %Route{id: "Orange", type: 1}
  @red_route %Route{id: "Red", type: 1}
  @newburyport_route %Route{id: "CR-Newburyport", type: 0}

  describe "list_from_route_patterns/2" do
    test "Orange line (1 branch), direction 0" do
      route_pattern = %RoutePattern{
        direction_id: 0,
        id: "Orange-3-0",
        name: "Oak Grove - Forest Hills",
        representative_trip_id: "44080481",
        route_id: "Orange",
        typicality: 1
      }

      stops = make_stops(~w(place-ogmnl place-dwnxg place-forhl)s)

      route_pattern_with_stops = [{route_pattern, stops}]

      actual = list_from_route_patterns(route_pattern_with_stops, @orange_route, 0)

      assert_stop_ids(actual, ~w(place-ogmnl place-dwnxg place-forhl)s)

      assert_branch_names(actual, [
        "Oak Grove - Forest Hills",
        "Oak Grove - Forest Hills",
        "Oak Grove - Forest Hills"
      ])
    end

    test "Orange line (1 branch), direction 1" do
      route_pattern = %RoutePattern{
        direction_id: 1,
        id: "Orange-3-1",
        name: "Forest Hills - Oak Grove",
        representative_trip_id: "44080614",
        route_id: "Orange",
        typicality: 1
      }

      stops = make_stops(~w(place-forhl place-dwnxg place-ogmnl)s)

      route_pattern_with_stops = [{route_pattern, stops}]

      actual = list_from_route_patterns(route_pattern_with_stops, @orange_route, 1)

      assert_stop_ids(actual, ~w(place-forhl place-dwnxg place-ogmnl)s)

      assert_branch_names(actual, [
        "Forest Hills - Oak Grove",
        "Forest Hills - Oak Grove",
        "Forest Hills - Oak Grove"
      ])
    end

    test "Red line (2 branches), direction 0" do
      ashmont_route_pattern = %RoutePattern{
        direction_id: 0,
        id: "Red-1-0",
        name: "Alewife - Ashmont",
        representative_trip_id: "44079437",
        route_id: "Red",
        typicality: 1
      }

      braintree_route_pattern = %RoutePattern{
        direction_id: 0,
        id: "Red-3-0",
        name: "Alewife - Braintree",
        representative_trip_id: "44079593",
        route_id: "Red",
        typicality: 1
      }

      ashmont_stops = make_stops(~w(place-alfcl place-pktrm place-asmnl)s)
      braintree_stops = make_stops(~w(place-alfcl place-pktrm place-brntn)s)

      route_patterns_with_stops = [
        {ashmont_route_pattern, ashmont_stops},
        {braintree_route_pattern, braintree_stops}
      ]

      actual = list_from_route_patterns(route_patterns_with_stops, @red_route, 0)

      assert_stop_ids(actual, ~w(place-alfcl place-pktrm place-brntn place-asmnl)s)
      assert_branch_names(actual, [nil, nil, "Alewife - Braintree", "Alewife - Ashmont"])
    end

    test "Red line (2 branches), direction 1" do
      ashmont_route_pattern = %RoutePattern{
        direction_id: 1,
        id: "Red-1-1",
        name: "Ashmont - Alewife",
        representative_trip_id: "44079438",
        route_id: "Red",
        typicality: 1
      }

      braintree_route_pattern = %RoutePattern{
        direction_id: 1,
        id: "Red-3-1",
        name: "Braintree - Alewife",
        representative_trip_id: "44079573",
        route_id: "Red",
        typicality: 1
      }

      ashmont_stops = make_stops(~w(place-asmnl place-pktrm place-alfcl)s)
      braintree_stops = make_stops(~w(place-brntn place-pktrm place-alfcl)s)

      route_patterns_with_stops = [
        {ashmont_route_pattern, ashmont_stops},
        {braintree_route_pattern, braintree_stops}
      ]

      actual = list_from_route_patterns(route_patterns_with_stops, @red_route, 1)

      assert_stop_ids(actual, ~w(place-asmnl place-brntn place-pktrm place-alfcl))
      assert_branch_names(actual, ["Ashmont - Alewife", "Braintree - Alewife", nil, nil])
    end

    test "Green (4 branches), direction 0" do
      b_route_pattern = %RoutePattern{
        direction_id: 0,
        id: "Green-B-3-0",
        name: "Park Street - Boston College",
        representative_trip_id: "45809685",
        route_id: "Green-B",
        typicality: 1
      }

      b_stops = make_stops(~w(place-pktrm place-coecl place-kencl place-bland place-lake)s)

      c_route_pattern = %RoutePattern{
        direction_id: 0,
        id: "Green-C-1-0",
        name: "North Station - Cleveland Circle",
        representative_trip_id: "45809669",
        route_id: "Green-C",
        typicality: 1
      }

      c_stops =
        make_stops(~w(place-north place-gover place-pktrm place-coecl place-kencl place-smary place-clmnl)s)

      d_route_pattern = %RoutePattern{
        direction_id: 0,
        id: "Green-D-2-0",
        name: "Union Square - Riverside",
        representative_trip_id: "45809766",
        route_id: "Green-D",
        typicality: 1
      }

      d_stops =
        make_stops(
          ~w(place-unsqu place-lech place-north place-gover place-pktrm place-coecl place-kencl place-fenwy place-river)s
        )

      e_route_pattern = %RoutePattern{
        direction_id: 0,
        id: "Green-E-1-0",
        name: "Medford/Tufts - Heath Street",
        representative_trip_id: "45809752",
        route_id: "Green-E",
        typicality: 1
      }

      e_stops =
        make_stops(~w(place-mdftf place-lech place-north place-gover place-pktrm place-coecl place-prmnl place-hsmnl)s)

      route_patterns_with_stops = [
        {b_route_pattern, b_stops},
        {c_route_pattern, c_stops},
        {d_route_pattern, d_stops},
        {e_route_pattern, e_stops}
      ]

      actual = list_from_route_patterns(route_patterns_with_stops, @green_route, 0, true)

      assert_stop_ids(
        actual,
        ~w(place-mdftf place-lech place-north place-gover place-pktrm place-coecl place-prmnl place-hsmnl place-kencl place-fenwy place-river place-kencl place-smary place-clmnl place-kencl place-bland place-lake)s
      )

      assert_branch_names(actual, [
        nil,
        nil,
        nil,
        nil,
        nil,
        nil,
        "Green-E",
        "Green-E",
        "Green-D",
        "Green-D",
        "Green-D",
        "Green-C",
        "Green-C",
        "Green-C",
        "Green-B",
        "Green-B",
        "Green-B"
      ])

      assert Enum.map(actual, & &1.terminus?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 true,
                 false,
                 false,
                 true,
                 false,
                 false,
                 true,
                 false,
                 false,
                 true
               ]

      assert Enum.map(actual, & &1.is_beginning?) ==
               [
                 true,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false,
                 false
               ]
    end

    test "CR-Newburyport, direction 0" do
      newburyport_route_pattern = %RoutePattern{
        direction_id: 0,
        id: "CR-Newburyport-801f0591-0",
        name: "North Station - Newburyport",
        representative_trip_id: "CR-Weekday-Summer-20-159",
        route_id: "CR-Newburyport",
        time_desc: nil,
        typicality: 1
      }

      rockport_route_pattern = %RoutePattern{
        direction_id: 0,
        id: "CR-Newburyport-0d0a9699-0",
        name: "North Station - Rockport",
        representative_trip_id: "CR-Weekday-Summer-20-105",
        route_id: "CR-Newburyport",
        time_desc: nil,
        typicality: 1
      }

      shuttle_route_pattern = %RoutePattern{
        direction_id: 0,
        id: "Shuttle-RockportWestGloucester-0-0",
        name: "West Gloucester - Rockport",
        representative_trip_id: "CR-Weekday-Summer-20-103-RockportWestGloucester1",
        route_id: "Shuttle-RockportWestGloucester",
        time_desc: nil,
        typicality: 1
      }

      newburyport_stops =
        make_stops(
          ~w(place-north place-chels place-ER-0099 place-ER-0115 place-ER-0128 place-ER-0168 place-ER-0183 place-ER-0208 place-ER-0227 place-ER-0276 place-ER-0312 place-ER-0362)s
        )

      rockport_stops =
        make_stops(
          ~w(place-north place-chels place-ER-0099 place-ER-0115 place-ER-0128 place-ER-0168 place-ER-0183 place-GB-0198 place-GB-0222 place-GB-0229 place-GB-0254 place-GB-0296)s
        )

      shuttle_stops = make_stops(~w(place-GB-0296 place-GB-0316 place-GB-0353)s)

      route_patterns_with_stops = [
        {newburyport_route_pattern, newburyport_stops},
        {rockport_route_pattern, rockport_stops},
        {shuttle_route_pattern, shuttle_stops}
      ]

      actual = list_from_route_patterns(route_patterns_with_stops, @newburyport_route, 0)

      assert_stop_ids(
        actual,
        ~w(place-north place-chels place-ER-0099 place-ER-0115 place-ER-0128 place-ER-0168 place-ER-0183 place-GB-0198 place-GB-0222 place-GB-0229 place-GB-0254 place-GB-0296 place-GB-0316 place-GB-0353 place-ER-0208 place-ER-0227 place-ER-0276 place-ER-0312 place-ER-0362)s
      )

      assert_branch_names(actual, [
        nil,
        nil,
        nil,
        nil,
        nil,
        nil,
        nil,
        "North Station - Rockport",
        "North Station - Rockport",
        "North Station - Rockport",
        "North Station - Rockport",
        "North Station - Rockport",
        "North Station - Rockport",
        "North Station - Rockport",
        "North Station - Newburyport",
        "North Station - Newburyport",
        "North Station - Newburyport",
        "North Station - Newburyport",
        "North Station - Newburyport"
      ])
    end

    test "CR-Newburyport, direction 1" do
      newburyport_route_pattern = %RoutePattern{
        direction_id: 1,
        id: "CR-Newburyport-0746071c-1",
        name: "Newburyport - North Station",
        representative_trip_id: "CR-Weekday-Summer-20-164",
        route_id: "CR-Newburyport",
        time_desc: nil,
        typicality: 1
      }

      rockport_route_pattern = %RoutePattern{
        direction_id: 1,
        id: "CR-Newburyport-cba33080-1",
        name: "Rockport - North Station",
        representative_trip_id: "CR-Weekday-Summer-20-108",
        route_id: "CR-Newburyport",
        time_desc: nil,
        typicality: 1
      }

      newburyport_stops =
        make_stops(
          ~w(place-ER-0362 place-ER-0312 place-ER-0276 place-ER-0227 place-ER-0208 place-ER-0183 place-ER-0168 place-ER-0128 place-ER-0115 place-ER-0099 place-chels place-north)s
        )

      rockport_stops =
        make_stops(
          ~w(place-GB-0353 place-GB-0316 place-GB-0296 place-GB-0254 place-GB-0229 place-GB-0222 place-GB-0198 place-ER-0183 place-ER-0168 place-ER-0128 place-ER-0115 place-ER-0099 place-chels place-north)s
        )

      route_patterns_with_stops = [
        {newburyport_route_pattern, newburyport_stops},
        {rockport_route_pattern, rockport_stops}
      ]

      actual = list_from_route_patterns(route_patterns_with_stops, @newburyport_route, 1)

      assert_stop_ids(
        actual,
        ~w(place-ER-0362 place-ER-0312 place-ER-0276 place-ER-0227 place-ER-0208 place-GB-0353 place-GB-0316 place-GB-0296 place-GB-0254 place-GB-0229 place-GB-0222 place-GB-0198 place-ER-0183 place-ER-0168 place-ER-0128 place-ER-0115 place-ER-0099 place-chels place-north)s
      )

      assert_branch_names(actual, [
        "Newburyport - North Station",
        "Newburyport - North Station",
        "Newburyport - North Station",
        "Newburyport - North Station",
        "Newburyport - North Station",
        "Rockport - North Station",
        "Rockport - North Station",
        "Rockport - North Station",
        "Rockport - North Station",
        "Rockport - North Station",
        "Rockport - North Station",
        "Rockport - North Station",
        nil,
        nil,
        nil,
        nil,
        nil,
        nil,
        nil
      ])
    end

    test "Hingham/Hull Ferry, direction 0" do
      route_patterns_with_stops = [
        {%RoutePatterns.RoutePattern{
           direction_id: 0,
           id: "Boat-F1-1-0",
           name: "Rowes Wharf - Hingham",
           representative_trip_id: "Boat-F1-0650-Rowes-WeekdayLimited",
           route_id: "Boat-F1",
           time_desc: "Weekdays only",
           typicality: 1
         }, make_stops(~w(Boat-Rowes Boat-Hingham)s)}
      ]

      route = %Route{id: "Boat-F1", type: 4}

      actual = list_from_route_patterns(route_patterns_with_stops, route, 1)

      assert_stop_ids(actual, ~w(Boat-Rowes Boat-Hingham))
      assert_branch_names(actual, ["Rowes Wharf - Hingham", "Rowes Wharf - Hingham"])
    end

    test "handles an empty list of route patterns" do
      assert list_from_route_patterns([], @red_route, 0) == []
    end

    test "optionally uses the route ID for the branch name" do
      route_pattern_0 = %RoutePattern{
        direction_id: 0,
        id: "Green-B-3-0",
        name: "Park Street - Boston College",
        representative_trip_id: "45809685",
        route_id: "Green-B",
        typicality: 1
      }

      stops_0 = make_stops(~w(place-pktrm place-bucen place-lake)s)

      route_pattern_with_stops_0 = [{route_pattern_0, stops_0}]

      route_pattern_1 = %RoutePattern{
        direction_id: 0,
        id: "Green-B-3-1",
        name: "Boston College - Park Street",
        representative_trip_id: "45809684",
        route_id: "Green-B",
        typicality: 1
      }

      stops_1 = make_stops(~w(place-lake place-bucen place-pktrm)s)

      route_pattern_with_stops_1 = [{route_pattern_1, stops_1}]

      assert_branch_names(
        list_from_route_patterns(route_pattern_with_stops_0, @green_b_route, 0, true),
        [
          "Green-B",
          "Green-B",
          "Green-B"
        ]
      )

      assert_branch_names(
        list_from_route_patterns(route_pattern_with_stops_1, @green_b_route, 1, true),
        [
          "Green-B",
          "Green-B",
          "Green-B"
        ]
      )
    end
  end

  describe "list_from_shapes/4" do
    test "handles Red line when Ashmont/Braintree are first" do
      ashmont_shape = %Shape{
        id: "ashmont",
        name: "Ashmont",
        stop_ids: ~w(place-alfcl place-pktrm place-asmnl)s
      }

      braintree_shape = %Shape{
        id: "braintree",
        name: "Braintree",
        stop_ids: ~w(place-alfcl place-pktrm place-brntn)s
      }

      stops = make_stops(~w(place-brntn place-asmnl place-pktrm place-alfcl)s)
      actual = list_from_shapes([ashmont_shape, braintree_shape], stops, @red_route, 0)

      assert_stop_ids(actual, ~w(place-alfcl place-pktrm place-brntn place-asmnl)s)
      assert_branch_names(actual, [nil, nil, "Braintree", "Ashmont"])
    end

    test "handles Red line when Ashmont/Braintree are last" do
      ashmont_shape = %Shape{
        id: "ashmont",
        name: "Ashmont",
        stop_ids: ~w(place-asmnl place-pktrm place-alfcl)s
      }

      braintree_shape = %Shape{
        id: "braintree",
        name: "Braintree",
        stop_ids: ~w(place-brntn place-pktrm place-alfcl)s
      }

      stops = make_stops(~w(place-asmnl place-brntn place-pktrm place-alfcl)s)
      actual = list_from_shapes([ashmont_shape, braintree_shape], stops, @red_route, 1)

      assert_stop_ids(actual, ~w(place-asmnl place-brntn place-pktrm place-alfcl))
      assert_branch_names(actual, ["Ashmont", "Braintree", nil, nil])
    end

    test "handles Kingston where the Plymouth branch doesn't have JFK (outbound)" do
      kingston = %Shape{
        id: "kingston",
        name: "Kingston",
        stop_ids: ~w(place-sstat place-jfk place-brntn Kingston)s
      }

      plymouth = %Shape{
        id: "plymouth",
        name: "Plymouth",
        stop_ids: ~w(place-sstat place-brntn Plymouth)s
      }

      stops = make_stops(~w(place-sstat place-jfk place-brntn place-KB-0351 place-PB-0356)s)
      route = %Route{id: "CR-Kingston"}
      actual = list_from_shapes([kingston, plymouth], stops, route, 0)

      assert_stop_ids(actual, ~w(place-sstat place-jfk place-brntn place-PB-0356 place-KB-0351))
      assert_branch_names(actual, [nil, nil, nil, "Plymouth", "Kingston"])
    end

    test "handles Kingston where the Plymouth branch doesn't have JFK (inbound)" do
      kingston = %Shape{
        id: "kingston",
        name: "Kingston",
        stop_ids: ~w(Kingston place-brntn place-jfk place-sstat)s
      }

      plymouth = %Shape{
        id: "plymouth",
        name: "Plymouth",
        stop_ids: ~w(Plymouth place-brntn place-sstat)s
      }

      stops = make_stops(~w(place-sstat place-jfk place-brntn place-KB-0351 place-PB-0356)s)
      route = %Route{id: "CR-Kingston"}
      actual = list_from_shapes([kingston, plymouth], stops, route, 1)

      assert_stop_ids(actual, ~w(place-KB-0351 place-PB-0356 place-brntn place-jfk place-sstat)s)
      assert_branch_names(actual, ["Kingston", "Plymouth", nil, nil, nil])
    end

    test "handles ferry routes with multiple shapes by returning the stops as-is" do
      primary = %Shape{id: "primary"}
      other = %Shape{id: "secondary"}
      stops = make_stops(~w(Boat-Long Boat-Logan Boat-Hull Boat-Rowes Boat-Hingham))
      route = %Route{id: "boat", type: 4}
      actual = list_from_shapes([primary, other], stops, route, 1)

      assert_stop_ids(
        actual,
        ~w(Boat-Long Boat-Logan Boat-Hull Boat-Rowes Boat-Hingham)
      )
    end
  end

  describe "build_route_stop/3" do
    test "creates a RouteStop object with all expected attributes" do
      result = build_route_stop(@stop, @red_route, first?: true, last?: true, branch: "Braintree")
      assert result.id == "place-brntn"
      assert result.name == "Braintree"
      assert result.station_info == @stop
      assert result.terminus?
      assert result.is_beginning?
      assert result.branch == "Braintree"
      assert result.zone == {:error, :not_fetched}
      # ~w(bus commuter_rail)a
      assert result.stop_features == {:error, :not_fetched}
      assert result.connections == {:error, :not_fetched}
    end
  end

  describe "fetch_zone/1" do
    test "returns a RouteStop with the zone data" do
      route_stop = build_route_stop(@stop, @red_route)
      fetched = fetch_zone(route_stop)
      assert fetched.zone
      refute fetched.zone == route_stop.zone
    end

    test "returns a RouteStop when no zone data" do
      route_stop = build_route_stop(%Stop{name: "Alewife", id: "place-alfcl"}, @red_route)
      fetched = fetch_zone(route_stop)
      refute fetched.zone
    end
  end

  describe "fetch_stop_features/1" do
    test "returns a RouteStop with the stop feature data" do
      route_stop = build_route_stop(@stop, @red_route)
      fetched = fetch_stop_features(route_stop)
      refute fetched.stop_features == route_stop.stop_features
    end
  end

  describe "fetch_connections/1" do
    test "builds a list of connecting routes at a stop" do
      route_stop = build_route_stop(@stop, @red_route)
      assert route_stop.connections == {:error, :not_fetched}
      stop_id = @stop.id

      with_mock(Routes.Repo,
        by_stop: fn ^stop_id, [include: "stop.connecting_stops"] ->
          [
            %Route{id: @red_route.id},
            %Route{id: "one", type: 2},
            %Route{id: "another", type: 3},
            %Route{id: "shuttle", description: :rail_replacement_bus, type: 3}
          ]
        end
      ) do
        fetched = fetch_connections(route_stop)
        assert [%Route{}, %Route{}] = fetched.connections
        assert Enum.find(fetched.connections, &(&1.id == fetched.route.id)) == nil
        assert Enum.find(fetched.connections, &(&1.description == :rail_replacement_bus)) == nil
      end
    end
  end

  describe "RouteStop implements Util.Position" do
    @red_route_stop %RouteStop{station_info: %Stop{latitude: 100.0, longitude: 50.0}}

    test "Position.Latitude" do
      assert Util.Position.latitude(@red_route_stop) == 100.0
      assert Util.Position.longitude(@red_route_stop) == 50.0
    end
  end

  defp make_stops(stop_ids) do
    for id <- stop_ids do
      %Stop{id: id, name: id}
    end
  end

  def assert_stop_ids(actual, stop_ids) do
    assert Enum.map(actual, & &1.id) == stop_ids
  end

  def assert_branch_names(actual, branch_names) do
    assert Enum.map(actual, & &1.branch) == branch_names
  end
end
