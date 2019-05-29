defmodule SiteWeb.ScheduleController.ClosedStopsTest do
  use ExUnit.Case, async: true
  import SiteWeb.ScheduleController.ClosedStops

  @moduletag :external
  @stop %Stops.Stop{id: "stop-id", name: "stop-name"}
  @route_stop %Stops.RouteStop{id: "stop-id", name: "stop-name"}

  describe "wollaston_stop/1" do
    test "Builds proper struct for for Stops.Stop" do
      result = wollaston_stop(@stop)

      assert result.name == "Wollaston"
      assert result.id == "place-wstn"
      assert result.closed_stop_info.reason == "closed for renovation"
      assert result.closed_stop_info.info_link == "/wollaston-learn-more"
    end

    test "Builds proper struct for for Stops.RouteStop" do
      result = wollaston_stop(@route_stop)

      assert result.name == "Wollaston"
      assert result.id == "place-wstn"
      assert result.closed_stop_info.reason == "closed for renovation"
      assert result.closed_stop_info.info_link == "/wollaston-learn-more"
    end
  end

  describe "add_wollaston/4" do
    test "Does not insert Wollaston if insertion stop does not exist" do
      stops = [%Stops.Stop{id: "id1", name: "name1"}, %Stops.Stop{id: "id2"}]
      new_stops = add_wollaston(stops, 0, & &1, fn _elem, stop -> stop end)

      assert new_stops == stops
    end

    test "Inserts Wollaston stop properly for direction_id = 0" do
      stops = [
        %Stops.Stop{id: "place-nqncy", name: "Quincy Center"},
        %Stops.Stop{id: "place-qnctr"}
      ]

      new_stops = add_wollaston(stops, 0, & &1, fn _elem, stop -> stop end)

      assert length(new_stops) == 3
      assert Enum.at(new_stops, 1).id == "place-wstn"
    end

    test "Inserts Wollaston stop properly for direction_id = 1" do
      stops = [
        %Stops.Stop{id: "place-qnctr", name: "Quincy Center"},
        %Stops.Stop{id: "place-nqncy"}
      ]

      new_stops = add_wollaston(stops, 1, & &1, fn _elem, stop -> stop end)

      assert length(new_stops) == 3
      assert Enum.at(new_stops, 1).id == "place-wstn"
    end
  end
end
