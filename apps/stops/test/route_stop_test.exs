defmodule Stops.RouteStopTest do
  use ExUnit.Case, async: true

  import Stops.RouteStop
  alias Stops.RouteStop
  alias Stops.Stop
  alias Routes.{Route, Shape}
  @stop %Stop{name: "Braintree", id: "place-brntn"}
  @route %Routes.Route{id: "Red", type: 1}
  describe "build_route_stop/3" do
    test "creates a RouteStop object with all expected attributes" do
      result = build_route_stop(@stop, @route, first?: true, last?: true, branch: "Braintree")
      assert result.id == "place-brntn"
      assert result.name == "Braintree"
      assert result.station_info == @stop
      assert result.is_terminus?
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
      route_stop = build_route_stop(@stop, @route)
      fetched = fetch_zone(route_stop)
      refute fetched.zone == route_stop.zone
    end
  end

  describe "fetch_stop_features/1" do
    test "returns a RouteStop with the stop feature data" do
      route_stop = build_route_stop(@stop, @route)
      fetched = fetch_stop_features(route_stop)
      refute fetched.stop_features == route_stop.stop_features
    end
  end

  describe "fetch_connections/1" do
    test "builds a list of connecting routes at a stop" do
      route_stop = build_route_stop(@stop, @route)
      assert route_stop.connections == {:error, :not_fetched}
      fetched = fetch_connections(route_stop)
      assert [%Route{} | _] = fetched.connections
      assert Enum.find(fetched.connections, &(&1.id == fetched.route.id)) == nil
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
      route = %Route{id: "Red"}
      actual = list_from_shapes([ashmont_shape, braintree_shape], stops, route, 0)

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
      route = %Route{id: "Red"}
      actual = list_from_shapes([ashmont_shape, braintree_shape], stops, route, 1)

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

    test "handles the Foxboro pilot on the Franklin line (outbound)" do
      route = %Route{id: "CR-Franklin"}
      shapes = franklin_shapes(0)
      stops = make_stops(shapes |> Enum.flat_map(& &1.stop_ids) |> Enum.uniq())

      actual = list_from_shapes(shapes, stops, route, 0)

      assert_stop_ids(actual, [
        "place-sstat",
        "place-bbsta",
        "place-rugg",
        "place-NEC-2203",
        "place-DB-0095",
        "place-FB-0109",
        "place-FB-0118",
        "place-FS-0049",
        "place-FB-0125",
        "place-FB-0143",
        "place-FB-0148",
        "place-FB-0166",
        "place-FB-0191",
        "place-FB-0230",
        "place-FB-0275",
        "place-FB-0303"
      ])
    end

    test "handles the Foxboro pilot on the Franklin line (inbound)" do
      route = %Route{id: "CR-Franklin"}
      shapes = franklin_shapes(1)
      stops = make_stops(shapes |> Enum.flat_map(& &1.stop_ids) |> Enum.uniq())

      actual = list_from_shapes(shapes, stops, route, 1)

      assert_stop_ids(actual, [
        "place-FB-0303",
        "place-FB-0275",
        "place-FB-0230",
        "place-FB-0191",
        "place-FB-0177",
        "place-FS-0049",
        "place-FB-0166",
        "place-FB-0148",
        "place-FB-0143",
        "place-FB-0125",
        "place-FB-0118",
        "place-FB-0109",
        "place-DB-0095",
        "place-rugg",
        "place-bbsta",
        "place-sstat"
      ])
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

  describe "RouteStop implements Util.Position" do
    @route_stop %RouteStop{station_info: %Stop{latitude: 100.0, longitude: 50.0}}

    test "Position.Latitude" do
      assert Util.Position.latitude(@route_stop) == 100.0
      assert Util.Position.longitude(@route_stop) == 50.0
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

  defp franklin_shapes(0) do
    [
      %Shape{
        id: "9880006",
        name: "South Station - Forge Park/495 via Back Bay",
        stop_ids: [
          "place-sstat",
          "place-bbsta",
          "place-rugg",
          "place-NEC-2203",
          "place-DB-0095",
          "place-FB-0109",
          "place-FB-0118",
          "place-FB-0125",
          "place-FB-0143",
          "place-FB-0148",
          "place-FB-0166",
          "place-FB-0191",
          "place-FB-0230",
          "place-FB-0275",
          "place-FB-0303"
        ]
      },
      %Shape{
        id: "SouthStationToFoxboroViaBackBay",
        name: "South Station - Foxboro via Back Bay & Dedham",
        stop_ids: ["place-sstat", "place-bbsta", "place-FB-0118", "place-FS-0049"]
      },
      %Shape{
        id: "SouthStationToFoxboroViaFairmount",
        name: "South Station - Foxboro via Fairmount",
        stop_ids: [
          "place-sstat",
          "place-DB-2265",
          "place-DB-2258",
          "place-DB-2249",
          "place-DB-2240",
          "place-DB-2230",
          "place-DB-2222",
          "place-DB-2205",
          "place-DB-0095",
          "place-FB-0109",
          "place-FB-0118",
          "place-FB-0125",
          "place-FB-0143",
          "place-FB-0148",
          "place-FB-0166",
          "place-FS-0049"
        ]
      }
    ]
  end

  defp franklin_shapes(1) do
    [
      %Shape{
        id: "9880005",
        name: "Forge Park/495 - South Station via Back Bay",
        stop_ids: [
          "place-FB-0303",
          "place-FB-0275",
          "place-FB-0230",
          "place-FB-0191",
          "place-FB-0177",
          "place-FB-0166",
          "place-FB-0148",
          "place-FB-0143",
          "place-FB-0125",
          "place-FB-0118",
          "place-FB-0109",
          "place-DB-0095",
          "place-rugg",
          "place-bbsta",
          "place-sstat"
        ]
      },
      %Shape{
        id: "9880002",
        name: "Forge Park/495 - South Station via Fairmount",
        stop_ids: [
          "place-FB-0303",
          "place-FB-0275",
          "place-FB-0230",
          "place-FB-0191",
          "place-FB-0148",
          "place-FB-0143",
          "place-FB-0125",
          "place-FB-0118",
          "place-FB-0109",
          "place-DB-0095",
          "place-DB-2205",
          "place-DB-2222",
          "place-DB-2230",
          "place-DB-2240",
          "place-DB-2249",
          "place-DB-2258",
          "place-DB-2265",
          "place-sstat"
        ]
      },
      %Shape{
        id: "FoxboroToSouthStationViaFairmount",
        name: "Foxboro - South Station via Fairmount",
        stop_ids: [
          "place-FS-0049",
          "place-FB-0166",
          "place-FB-0148",
          "place-FB-0143",
          "place-FB-0125",
          "place-FB-0118",
          "place-FB-0109",
          "place-DB-0095",
          "place-DB-2205",
          "place-DB-2222",
          "place-DB-2230",
          "place-DB-2240",
          "place-DB-2249",
          "place-DB-2258",
          "place-DB-2265",
          "place-sstat"
        ]
      }
    ]
  end
end
