defmodule GreenLineTest do
  use ExUnit.Case, async: true

  import GreenLine

  describe "stops_on_routes/1" do
    test "returns ordered stops on the green line by direction ID" do
      {stops, _} = stops_on_routes(0)

      # As of June 2020, Lechmere has been closed so the commented line will make the test fail.
      # We are temporarily adding the fix but this will need to be undone later on.
      # assert %Stops.Stop{id: "place-lech", name: "Lechmere"} = List.first(stops)
      assert %Stops.Stop{id: "place-hsmnl", name: "Heath Street"} = List.first(stops)
      assert %Stops.Stop{id: "place-lake", name: "Boston College"} = List.last(stops)
    end

    test "returns a set of {stop_id, route_id} pairs" do
      {_, route_id_stop_map} = stops_on_routes(1)

      refute "place-lech" in route_id_stop_map["Green-B"]
      refute "place-lech" in route_id_stop_map["Green-C"]
      refute "place-lech" in route_id_stop_map["Green-D"]
      # As of June 2020, Lechmere has been closed so the commented line will make the test fail.
      # We are temporarily adding the fix but this will need to be undone later on.
      refute "place-lech" in route_id_stop_map["Green-E"]

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
            %Stops.Stop{id: "place-gover"},
            %Stops.Stop{id: "place-north"}
          ]

        "Green-D" ->
          [%Stops.Stop{id: "place-river"}, %Stops.Stop{id: "place-gover"}]

        "Green-E" ->
          [
            %Stops.Stop{id: "place-hsmnl"},
            %Stops.Stop{id: "place-gover"},
            %Stops.Stop{id: "place-north"},
            %Stops.Stop{id: "place-lech"}
          ]
      end
    end

    test "each line returns a set of the ids of associated stops" do
      {_, stop_map} = calculate_stops_on_routes(0, Timex.today(), &stops_fn/3)

      assert stop_map["Green-C"] == MapSet.new(["place-clmnl", "place-gover", "place-north"])
      assert stop_map["Green-D"] == MapSet.new(["place-river", "place-gover"])

      assert stop_map["Green-E"] ==
               MapSet.new(["place-hsmnl", "place-gover", "place-north", "place-lech"])
    end

    test "a list of stops without duplicates is returned" do
      {stops, _} = calculate_stops_on_routes(0, Timex.today(), &stops_fn/3)

      assert Enum.sort(stops) ==
               Enum.sort([
                 %Stops.Stop{id: "place-hsmnl"},
                 %Stops.Stop{id: "place-gover"},
                 %Stops.Stop{id: "place-north"},
                 %Stops.Stop{id: "place-lech"},
                 %Stops.Stop{id: "place-clmnl"},
                 %Stops.Stop{id: "place-river"}
               ])
    end

    test "if a line returns no stops, it is represented in the map by an empty set" do
      {_, stop_map} = calculate_stops_on_routes(0, Timex.today(), &stops_fn/3)

      assert stop_map["Green-B"] == MapSet.new()
    end
  end

  describe "all_stops/1" do
    test "can return an error" do
      gl = stops_on_routes(0, ~D[2017-01-01])
      assert {:error, _} = all_stops(gl)
    end
  end

  test "terminus?/2" do
    for stop_id <- ["place-lake", "place-pktrm"] do
      assert terminus?(stop_id, "Green-B")
    end

    for stop_id <- ["place-north", "place-clmnl"] do
      assert terminus?(stop_id, "Green-C")
    end

    for stop_id <- ["place-river", "place-gover"] do
      assert terminus?(stop_id, "Green-D")
    end

    for stop_id <- ["place-lech", "place-hsmnl"] do
      assert terminus?(stop_id, "Green-E")
    end
  end

  test "terminus?/3" do
    assert terminus?("place-lake", "Green-B", 0)
    refute terminus?("place-lake", "Green-B", 1)
    refute terminus?("place-lech", "Green-E", 0)
    assert terminus?("place-lech", "Green-E", 1)
  end

  describe "naive_headsign/2" do
    test "correct headsign for route and direction" do
      assert naive_headsign("Green-B", 0) == "Boston College"
      assert naive_headsign("Green-B", 1) == "Park Street"
      assert naive_headsign("Green-C", 0) == "Cleveland Circle"
      assert naive_headsign("Green-C", 1) == "North Station"
      assert naive_headsign("Green-D", 0) == "Riverside"
      assert naive_headsign("Green-D", 1) == "Government Center"
      assert naive_headsign("Green-E", 0) == "Heath Street"
      assert naive_headsign("Green-E", 1) == "Lechmere"
    end
  end

  describe "route_for_stops/1" do
    @stops_on_routes %{
      "Green-B" => ["shared_stop1", "shared_stop2", "b_stop1", "b_stop2"],
      "Green-C" => ["shared_stop1", "shared_stop2", "c_stop1", "c_stop2"]
    }

    test "Returns a map of stop ids associated with the green line routes that stop at that stop" do
      stop_map = routes_for_stops({nil, @stops_on_routes})
      assert "Green-C" in stop_map["shared_stop1"] and "Green-B" in stop_map["shared_stop1"]
      assert "Green-C" in stop_map["shared_stop2"] and "Green-B" in stop_map["shared_stop2"]
      assert stop_map["b_stop2"] == ["Green-B"]
      assert stop_map["c_stop1"] == ["Green-C"]
    end
  end

  describe "filter_lines/2" do
    test "returns error when there is an error" do
      assert filter_lines({:error, "error"}, "Green-B") == {:error, "error"}
    end

    test "returns the list of all stops on a branch in reverse order" do
      stops =
        "Green-B"
        |> Stops.Repo.by_route(0, [])
        |> filter_lines("Green-B")
        |> Enum.map(fn %Stops.Stop{id: id} -> id end)

      assert List.first(stops) == "place-pktrm"
      assert List.last(stops) == "place-lake"
    end
  end
end
