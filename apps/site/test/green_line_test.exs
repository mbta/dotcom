defmodule GreenLineTest do
  use ExUnit.Case, async: true
  use ExVCRHelpers

  import GreenLine

  describe "stops_on_routes/1" do
    test_vcr "returns ordered stops on the green line by direction ID" do
      {stops, _} = stops_on_routes(0)
      earlier_stop = Enum.find_index(stops, &(&1.id == "place-gover"))
      later_stop = Enum.find_index(stops, &(&1.id == "place-lake"))
      assert earlier_stop < later_stop
    end

    test_vcr "returns a set of {stop_id, route_id} pairs" do
      {_, route_id_stop_map} = stops_on_routes(1)

      refute "place-unsqu" in route_id_stop_map["Green-B"]
      refute "place-unsqu" in route_id_stop_map["Green-C"]
      assert "place-unsqu" in route_id_stop_map["Green-D"]
      refute "place-unsqu" in route_id_stop_map["Green-E"]

      refute "place-lech" in route_id_stop_map["Green-B"]
      refute "place-lech" in route_id_stop_map["Green-C"]
      assert "place-lech" in route_id_stop_map["Green-D"]
      assert "place-lech" in route_id_stop_map["Green-E"]

      assert "place-coecl" in route_id_stop_map["Green-B"]
      assert "place-coecl" in route_id_stop_map["Green-C"]
      assert "place-coecl" in route_id_stop_map["Green-D"]
      assert "place-coecl" in route_id_stop_map["Green-E"]

      assert "place-kencl" in route_id_stop_map["Green-B"]
      assert "place-kencl" in route_id_stop_map["Green-C"]
      assert "place-kencl" in route_id_stop_map["Green-D"]
      refute "place-kencl" in route_id_stop_map["Green-E"]
    end
  end

  describe "calculate_stops_on_routes/1" do
    def stops_fn(route, _, _) do
      case route do
        "Green-B" ->
          []

        "Green-C" ->
          [
            %Stops.Stop{id: "place-clmnl"},
            %Stops.Stop{id: "place-coecl"},
            %Stops.Stop{id: "place-kencl"},
            %Stops.Stop{id: "place-gover"}
          ]

        "Green-D" ->
          [
            %Stops.Stop{id: "place-river"},
            %Stops.Stop{id: "place-coecl"},
            %Stops.Stop{id: "place-kencl"},
            %Stops.Stop{id: "place-gover"},
            %Stops.Stop{id: "place-north"},
            %Stops.Stop{id: "place-lech"},
            %Stops.Stop{id: "place-unsqu"}
          ]

        "Green-E" ->
          [
            %Stops.Stop{id: "place-hsmnl"},
            %Stops.Stop{id: "place-gover"},
            %Stops.Stop{id: "place-north"},
            %Stops.Stop{id: "place-lech"},
            %Stops.Stop{id: "place-mdftf"}
          ]
      end
    end

    test_vcr "each line returns a set of the ids of associated stops" do
      {_, stop_map} = calculate_stops_on_routes(0, Timex.today(), &stops_fn/3)

      assert stop_map["Green-C"] ==
               MapSet.new(["place-clmnl", "place-coecl", "place-gover", "place-kencl"])

      assert stop_map["Green-D"] ==
               MapSet.new([
                 "place-north",
                 "place-coecl",
                 "place-gover",
                 "place-kencl",
                 "place-lech",
                 "place-unsqu",
                 "place-river"
               ])

      assert stop_map["Green-E"] ==
               MapSet.new([
                 "place-hsmnl",
                 "place-gover",
                 "place-lech",
                 "place-mdftf",
                 "place-north"
               ])
    end

    test_vcr "a list of stops without duplicates is returned" do
      {stops, _} = calculate_stops_on_routes(0, Timex.today(), &stops_fn/3)

      assert Enum.sort(stops) ==
               Enum.sort([
                 %Stops.Stop{id: "place-hsmnl"},
                 %Stops.Stop{id: "place-gover"},
                 %Stops.Stop{id: "place-north"},
                 %Stops.Stop{id: "place-coecl"},
                 %Stops.Stop{id: "place-kencl"},
                 %Stops.Stop{id: "place-mdftf"},
                 %Stops.Stop{id: "place-lech"},
                 %Stops.Stop{id: "place-unsqu"},
                 %Stops.Stop{id: "place-clmnl"},
                 %Stops.Stop{id: "place-river"}
               ])
    end

    test_vcr "if a line returns no stops, it is represented in the map by an empty set" do
      {_, stop_map} = calculate_stops_on_routes(0, Timex.today(), &stops_fn/3)

      assert stop_map["Green-B"] == MapSet.new()
    end
  end

  describe "all_stops/1" do
    test_vcr "can return an error" do
      gl = stops_on_routes(0, ~D[2017-01-01])
      assert {:error, _} = all_stops(gl)
    end
  end

  test_vcr "terminus?/2" do
    for stop_id <- ["place-lake", "place-gover"] do
      assert terminus?(stop_id, "Green-B")
    end

    for stop_id <- ["place-gover", "place-clmnl"] do
      assert terminus?(stop_id, "Green-C")
    end

    for stop_id <- ["place-river", "place-unsqu"] do
      assert terminus?(stop_id, "Green-D")
    end

    for stop_id <- ["place-mdftf", "place-hsmnl"] do
      assert terminus?(stop_id, "Green-E")
    end
  end

  test_vcr "terminus?/3" do
    assert terminus?("place-lake", "Green-B", 0)
    refute terminus?("place-lake", "Green-B", 1)
    refute terminus?("place-mdftf", "Green-E", 0)
    assert terminus?("place-mdftf", "Green-E", 1)
  end

  describe "naive_headsign/2" do
    test_vcr "correct headsign for route and direction" do
      assert naive_headsign("Green-B", 0) == "Boston College"
      assert naive_headsign("Green-B", 1) == "Government Center"
      assert naive_headsign("Green-C", 0) == "Cleveland Circle"
      assert naive_headsign("Green-C", 1) == "Government Center"
      assert naive_headsign("Green-D", 0) == "Riverside"
      assert naive_headsign("Green-D", 1) == "Union Square"
      assert naive_headsign("Green-E", 0) == "Heath Street"
      assert naive_headsign("Green-E", 1) == "Medford/Tufts"
    end
  end

  describe "route_for_stops/1" do
    @stops_on_routes %{
      "Green-B" => ["shared_stop1", "shared_stop2", "b_stop1", "b_stop2"],
      "Green-C" => ["shared_stop1", "shared_stop2", "c_stop1", "c_stop2"]
    }

    test_vcr "Returns a map of stop ids associated with the green line routes that stop at that stop" do
      stop_map = routes_for_stops({nil, @stops_on_routes})
      assert "Green-C" in stop_map["shared_stop1"] and "Green-B" in stop_map["shared_stop1"]
      assert "Green-C" in stop_map["shared_stop2"] and "Green-B" in stop_map["shared_stop2"]
      assert stop_map["b_stop2"] == ["Green-B"]
      assert stop_map["c_stop1"] == ["Green-C"]
    end
  end

  describe "filter_lines/2" do
    test_vcr "returns error when there is an error" do
      assert filter_lines({:error, "error"}, "Green-B") == {:error, "error"}
    end

    test_vcr "returns the list of all stops on a branch in reverse order" do
      stops =
        "Green-B"
        |> Stops.Repo.by_route(0, [])
        |> filter_lines("Green-B")
        |> Enum.map(fn %Stops.Stop{id: id} -> id end)

      assert List.first(stops) == "place-gover"
      assert List.last(stops) == "place-lake"
    end
  end
end
