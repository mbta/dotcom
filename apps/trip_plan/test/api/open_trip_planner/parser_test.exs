defmodule TripPlan.Api.OpenTripPlanner.ParserTest do
  use ExUnit.Case, async: true
  import TripPlan.Api.OpenTripPlanner.Parser
  alias TripPlan.{Itinerary, NamedPosition, PersonalDetail, PersonalDetail.Step, TransitDetail}

  @fixture File.read!("test/fixture/north_station_to_park_plaza.json")
  @parsed parse_json!(@fixture)

  describe "parse_json/1" do
    test "returns an error with invalid JSON" do
      assert {:error, _} = parse_json("")
    end

    test "returns a list of Itinerary structs" do
      for i <- @parsed do
        assert %Itinerary{} = i
      end

      assert [first, _, _] = @parsed
      assert first.start == Timex.to_datetime(~N[2017-05-19T13:50:59], "America/New_York")
      assert first.stop == Timex.to_datetime(~N[2017-05-19T14:03:19], "America/New_York")
    end

    test "allows null absoluteDirection" do
      pattern = "absoluteDirection\": \"SOUTH\""
      replacement = "absoluteDirection\": null"
      json = String.replace(@fixture, pattern, replacement)
      assert {:ok, _itinerary} = parse_json(json)
    end

    test "returns an error if JSON is invalid" do
      pattern = "absoluteDirection\": \"SOUTH\""
      replacement = "absoluteDirection\": \"UP\""
      json = String.replace(@fixture, pattern, replacement)
      assert {:error, :invalid_json} = parse_json(json)
    end

    test "an itinerary has legs" do
      first = List.first(@parsed)
      [subway_leg, walk_leg] = first.legs

      assert %TransitDetail{
               route_id: "Orange",
               trip_id: "33932853",
               intermediate_stop_ids: ~w(70024 70022 70020 70018)s
             } = subway_leg.mode

      assert "Orange Line" = subway_leg.name
      assert "Orange Line" = subway_leg.long_name
      assert "1" = subway_leg.type
      assert "http://www.mbta.com" = subway_leg.url
      assert "SUBWAY" = subway_leg.description

      assert %NamedPosition{stop_id: "70016"} = walk_leg.from
      assert %NamedPosition{name: "Destination"} = walk_leg.to
      assert is_binary(walk_leg.polyline)
      assert %DateTime{} = walk_leg.start
      assert %DateTime{} = walk_leg.stop
      assert %PersonalDetail{} = walk_leg.mode
    end

    test "positions can use stopId instead of stopCode" do
      stop_code_regex = ~r/"stopCode": "[^"]",/
      data = String.replace(@fixture, stop_code_regex, "")
      parsed = parse_json!(data)
      assert parsed == @parsed
    end

    test "walk legs have distance and step plans" do
      [_, walk_leg] = List.first(@parsed).legs
      assert walk_leg.mode.distance == 329.314

      assert walk_leg.mode.steps == [
               %Step{
                 distance: 138.02,
                 relative_direction: :depart,
                 absolute_direction: :south,
                 street_name: "Washington Street"
               },
               %Step{
                 distance: 111.909,
                 relative_direction: :right,
                 absolute_direction: :west,
                 street_name: "Oak Street West"
               },
               %Step{
                 distance: 79.385,
                 relative_direction: :continue,
                 absolute_direction: :west,
                 street_name: "Tremont Street"
               }
             ]
    end

    test "subway legs have trip information" do
      [subway_leg, _] = List.first(@parsed).legs
      assert subway_leg.mode.route_id == "Orange"
      assert subway_leg.mode.trip_id == "33932853"
      assert subway_leg.mode.intermediate_stop_ids == ~w(
        70024
        70022
        70020
        70018
      )
    end

    test "parses path_not_found error as location_not_accessible when accessiblity is checked" do
      decoded_json = %{
        "error" => %{"message" => "PATH_NOT_FOUND"},
        "requestParameters" => %{"wheelchair" => "true"}
      }

      {:ok, json} = Poison.encode(decoded_json)
      parsed_json = parse_json(json)
      assert parsed_json == {:error, :location_not_accessible}
    end

    test "parses path_not_found error as normally when accessibility is not checked" do
      decoded_json = %{"error" => %{"message" => "PATH_NOT_FOUND"}, "requestParameters" => %{}}
      {:ok, json} = Poison.encode(decoded_json)
      parsed_json = parse_json(json)
      assert parsed_json == {:error, :path_not_found}
    end
  end
end
