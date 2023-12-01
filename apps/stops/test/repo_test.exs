defmodule Stops.RepoTest do
  @moduledoc """
  TODO: Mock API data in this whole file
  """
  use ExUnit.Case

  import Stops.Repo
  alias Stops.Stop

  describe "get/1" do
    test "returns nil if the stop doesn't exist" do
      assert get("get test: stop doesn't exist") == nil
    end

    test "returns a stop" do
      assert %Stop{} = get("place-pktrm")
    end
  end

  describe "get!/1" do
    test "raises a Stops.NotFoundError if the stop isn't found" do
      assert_raise Stops.NotFoundError, fn ->
        get!("get! test: stop doesn't exist")
      end
    end

    test "returns a stop" do
      assert %Stop{} = get!("place-pktrm")
    end
  end

  describe "get_parent/1" do
    test "returns the parent stop for a child stop" do
      north_station_cr = get("BNT-0000-01")
      assert north_station_cr.is_child? == true
      assert north_station_cr.parent_id == "place-north"
      assert %Stop{id: "place-north"} = get_parent(north_station_cr)
    end

    test "returns the same stop for a parent stop" do
      north_station = get("place-north")
      assert get_parent(north_station) == north_station
    end

    test "takes ids" do
      assert %Stop{id: "place-north"} = get_parent("BNT-0000-01")
      assert %Stop{id: "place-north"} = get_parent("place-north")
    end
  end

  describe "by_route/3" do
    test "returns a list of stops in order of their stop_sequence" do
      response = by_route("CR-Lowell", 1)

      assert response != []
      assert match?(%Stop{id: "place-NHRML-0254", name: "Lowell"}, List.first(response))
      assert match?(%Stop{id: "place-north", name: "North Station"}, List.last(response))
      assert response == Enum.uniq(response)
    end

    test "uses the parent station" do
      response = by_route("CR-Fitchburg", 1)
      assert Enum.all?(response, &(!has_parent?(&1)))
    end

    test "does not include a parent station multiple times" do
      # stops multiple times at Sullivan
      response = by_route("86", 1)

      assert response != []
      refute (response |> Enum.at(1)).id == "place-sull"
    end

    test "can take additional fields" do
      today = Timex.today()
      weekday = today |> Timex.shift(days: 7) |> Timex.beginning_of_week(:fri)
      saturday = weekday |> Timex.shift(days: 1)

      assert by_route("351", 1, date: weekday) !=
               by_route("351", 1, date: saturday)
    end

    test "caches per-stop as well" do
      ConCache.delete(Stops.Repo, {:by_route, {"Red", 1, []}})
      ConCache.put(Stops.Repo, {:stop, "place-brntn"}, {:ok, "to-be-overwritten"})
      assert get("place-brntn") == "to-be-overwritten"

      by_route("Red", 1, [])
      assert %Stops.Stop{} = get("place-brntn")
    end
  end

  describe "by_routes/3" do
    test "can return stops from multiple route IDs" do
      response = by_routes(["CR-Lowell", "CR-Haverhill"], 1)
      assert Enum.find(response, &(&1.id == "place-NHRML-0254"))
      assert Enum.find(response, &(&1.id == "place-WR-0329"))
      # North Station only appears once
      assert response |> Enum.filter(&(&1.id == "place-north")) |> length == 1
    end
  end

  describe "by_route_type/2" do
    test "can returns stops filtered by route type" do
      # commuter rail
      response = by_route_type(2)

      assert Enum.find(response, &(&1.id == "place-NHRML-0254"))

      # uses parent stop
      assert Enum.find(response, &(&1.id == "North Station")) == nil
      assert %Stop{} = Enum.find(response, &(&1.id == "place-north"))

      # doesn't duplicate stops
      assert Enum.uniq(response) == response

      # doesn't include non-CR stops
      refute Enum.find(response, &(&1.id == "place-boyls"))
    end
  end

  describe "by_trip/2" do
    test "can return stops from a trip" do
      assert response = by_trip("58653355")
      assert [%Stop{} | _] = response
    end

    test "returns empty list if no trip matches" do
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
    @south_station %Stop{id: "place-sstat"}
    @braintree %Stop{id: "place-brntn"}

    test "Returns stop features for a given stop" do
      features = stop_features(@braintree)
      assert :commuter_rail in features
      assert :red_line in features
      assert :bus in features
    end

    test "returns stop features in correct order" do
      assert stop_features(@braintree) == [:red_line, :bus, :commuter_rail]
    end

    test "accessibility added if relevant" do
      features = stop_features(%{@braintree | accessibility: ["accessible"]})
      assert features == [:red_line, :bus, :commuter_rail, :access]
    end

    test "adds parking features if relevant" do
      stop = %{@south_station | parking_lots: [%Stop.ParkingLot{}]}
      assert :parking_lot in stop_features(stop)
    end

    test "excluded features are not returned" do
      assert stop_features(@braintree, exclude: [:red_line]) == [:bus, :commuter_rail]
      assert stop_features(@braintree, exclude: [:red_line, :commuter_rail]) == [:bus]
    end

    test "South Station's features will include the Silver Line icon" do
      features = stop_features(@south_station)
      assert :silver_line in features
    end

    test "includes specific green_line branches if specified" do
      # when green line isn't expanded, keep it in GTFS order
      features = stop_features(%Stop{id: "place-pktrm"})
      assert features == [:red_line, :green_line_b, :green_line_c, :green_line_d, :green_line_e]
      # when green line is expanded, put the branches first
      features = stop_features(%Stop{id: "place-pktrm"}, expand_branches?: true)
      assert features == [:"Green-B", :"Green-C", :"Green-D", :"Green-E", :red_line]
    end
  end
end
