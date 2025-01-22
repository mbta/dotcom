defmodule DetailedStopGroupTest do
  use ExUnit.Case, async: false

  import DetailedStopGroup

  alias Routes.Route

  @moduletag :external

  @subway_stops_with_cr [
    "place-brntn",
    "place-jfk",
    "place-portr",
    "place-qnctr",
    "place-sstat",
    "place-bbsta",
    "place-forhl",
    "place-mlmnl",
    "place-north",
    "place-rugg",
    "place-ogmnl"
  ]

  describe "from_mode/1" do
    test "all routes are returned for given mode" do
      featured_stop_groups = from_mode(:commuter_rail)

      expected_route_names =
        Enum.sort([
          "Fairmount Line",
          "Fitchburg Line",
          "Foxboro Event Service",
          "Framingham/Worcester Line",
          "Franklin/Foxboro Line",
          "Greenbush Line",
          "Haverhill Line",
          "Kingston Line",
          "Lowell Line",
          "Middleborough/Lakeville Line",
          "Needham Line",
          "Newburyport/Rockport Line",
          "Providence/Stoughton Line"
        ])

      route_names =
        featured_stop_groups |> Enum.map(fn {route, _} -> route.name end) |> Enum.sort()

      route_names = route_names -- ["Foxboro (Special Events)"]
      assert expected_route_names == route_names
    end

    test "green stops are grouped" do
      featured_stop_groups = from_mode(:subway)
      route_names = Enum.map(featured_stop_groups, fn {route, _} -> route.name end)
      assert "Green Line" in route_names
      refute "Green-E" in route_names
    end

    test "order of lines is preserved" do
      featured_stop_groups = from_mode(:subway)
      actual = Enum.map(featured_stop_groups, fn {route, _} -> route.name end)
      expected = ["Red Line", "Mattapan Trolley", "Orange Line", "Green Line", "Blue Line"]
      assert expected == actual
    end

    test "The route icon for the current route is included in features" do
      {_orange_line, orange_stops} =
        :subway |> from_mode() |> Enum.find(&match?({%Route{name: "Orange Line"}, _}, &1))

      # count is greater than 1
      assert [_stop | _] = orange_stops

      for stop <- orange_stops do
        assert Route.icon_atom(%Route{id: "Orange"}) in stop.features
      end
    end

    test "multiple stations can be associated with multiple routes" do
      subway_stops = from_mode(:subway)
      assert "place-dwnxg" in get_stops("Orange Line", subway_stops)
      assert "place-dwnxg" in get_stops("Red Line", subway_stops)
      refute "place-dwnxg" in get_stops("Blue Line", subway_stops)
    end

    test "non commuter rail stops have no zone info" do
      featured_stop_groups = from_mode(:subway)

      for {_route, detailed_stops} <- featured_stop_groups do
        for detailed_stop <-
              detailed_stops,
            detailed_stop.stop.id not in @subway_stops_with_cr do
          refute detailed_stop.zone
        end
      end
    end

    test "subway stops serving commuter rails do have zone info" do
      featured_stop_groups = from_mode(:subway)

      for {_route, detailed_stops} <- featured_stop_groups do
        for detailed_stop <-
              detailed_stops,
            detailed_stop.stop.id in @subway_stops_with_cr do
          assert detailed_stop.zone, "#{detailed_stop.stop.id} has no zone?"
        end
      end
    end
  end

  defp get_stops(route_name, grouped_stops) do
    grouped_stops
    |> Map.new(fn {route, stops} -> {route.name, stops} end)
    |> Map.get(route_name)
    |> Enum.map(& &1.stop.id)
  end
end
