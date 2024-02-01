defmodule TripPlan.Api.OpenTripPlanner.ParserTest do
  use ExUnit.Case, async: true
  import TripPlan.Api.OpenTripPlanner.Parser
  alias TripPlan.{Itinerary, NamedPosition, PersonalDetail, PersonalDetail.Step, TransitDetail}

  @fixture File.read!("test/trip_plan/fixture/north_station_to_park_plaza.json")
           |> Poison.decode!()
  @parsed parse_ql(@fixture)

  describe "parse_ql/1" do
    test "returns an error with invalid JSON" do
      assert {:error, :invalid} = parse_ql("")
    end

    test "returns a list of Itinerary structs" do
      {:ok, parsed} = @parsed

      for i <- parsed do
        assert %Itinerary{} = i
      end

      assert [first, _, _, _, _] = parsed

      is_equal_time? = fn t1, t2 ->
        DateTime.compare(t1, t2) == :eq
      end

      assert is_equal_time?.(
               first.start,
               Timex.to_datetime(~N[2024-02-01T13:46:00.000-05:00], "America/New_York")
             )

      assert is_equal_time?.(
               first.stop,
               Timex.to_datetime(~N[2024-02-01T14:16:40], "America/New_York")
             )
    end

    test "an itinerary has legs" do
      {:ok, parsed} = @parsed
      first = List.last(parsed)
      [subway_leg, walk_leg] = first.legs

      assert %TransitDetail{
               route_id: "Orange",
               trip_id: "60455420",
               intermediate_stop_ids: ~w(70024 70022 70020)s
             } = subway_leg.mode

      assert "Orange Line" = subway_leg.long_name
      assert "1" = subway_leg.type
      assert "http://www.mbta.com" = subway_leg.url
      assert "SUBWAY" = subway_leg.description

      assert %NamedPosition{stop_id: "70018"} = walk_leg.from
      assert %NamedPosition{name: "Park Plaza"} = walk_leg.to
      assert is_binary(walk_leg.polyline)
      assert %DateTime{} = walk_leg.start
      assert %DateTime{} = walk_leg.stop
      assert %PersonalDetail{} = walk_leg.mode
    end

    test "walk legs have distance and step plans" do
      {:ok, parsed} = @parsed
      [_, walk_leg] = List.last(parsed).legs
      assert walk_leg.mode.distance == 663.55

      assert [
               %Step{
                 absolute_direction: :south,
                 distance: 37.8,
                 relative_direction: :follow_signs,
                 street_name: "Washington Street, Essex Street, Silver Line - SL4/SL5"
               },
               %Step{
                 absolute_direction: :south,
                 distance: 0,
                 relative_direction: :continue,
                 street_name: "pathway"
               },
               %Step{
                 absolute_direction: :southwest,
                 distance: 31.24,
                 relative_direction: :follow_signs,
                 street_name: "Elevator"
               }
               | _
             ] = walk_leg.mode.steps
    end

    test "subway legs have trip information" do
      {:ok, parsed} = @parsed
      [subway_leg, _] = List.last(parsed).legs
      assert subway_leg.mode.route_id == "Orange"
      assert subway_leg.mode.trip_id == "60455420"
      assert subway_leg.mode.intermediate_stop_ids == ~w(
        70024
        70022
        70020
      )
    end
  end
end
