defmodule Predictions.StreamParserTest do
  use ExUnit.Case
  import Mock
  alias JsonApi.Item
  alias Predictions.{Prediction, StreamParser}
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop
  alias Timex.Timezone

  describe "parse/1" do
    setup_with_mocks([
      {Routes.Repo, [], [get: fn "route_id" -> %Route{id: "route_id"} end]},
      {Stops.Repo, [:passthrough],
       [get: fn "place-pktrm" -> %Stop{id: "place-pktrm", platform_code: "99"} end]},
      {Schedules.Repo, [], [trip: fn "trip_id" -> %Trip{id: "trip_id"} end]}
    ]) do
      :ok
    end

    test "parses a %JsonApi.Item{} into a Prediction record" do
      item = %Item{
        id: "TEST-ID",
        attributes: %{
          "arrival_time" => "2016-01-01T00:00:00-04:00",
          "bikes_allowed" => 1,
          "departure_time" => "2016-09-15T15:40:00-04:00",
          "direction_id" => 1,
          "headsign" => "Back Bay",
          "name" => "",
          "status" => "On Time"
        },
        relationships: %{
          "route" => [
            %Item{id: "route_id"},
            %Item{id: "wrong"}
          ],
          "stop" => [
            %Item{id: "place-pktrm"}
          ],
          "trip" => [
            %Item{id: "trip_id"},
            %Item{id: "wrong"}
          ],
          "vehicle" => [
            %Item{id: "vehicle_id"}
          ]
        },
        type: "prediction"
      }

      assert %Prediction{
               id: "TEST-ID",
               arrival_time: ~U[2016-01-01 04:00:00Z],
               departing?: true,
               departure_time: ~U[2016-09-15 19:40:00Z],
               direction_id: 1,
               route: route,
               status: "On Time",
               stop: stop,
               stop_sequence: 0,
               time: time,
               track: track,
               trip: trip,
               vehicle_id: vehicle_id
             } = StreamParser.parse(item)

      assert %Route{id: "route_id"} = route
      assert %Stop{id: "place-pktrm"} = stop
      assert %Trip{id: "trip_id"} = trip
      assert time == ~N[2016-09-15 19:40:00] |> Timezone.convert("Etc/GMT+4")
      assert track == stop.platform_code
      assert "vehicle_id" = vehicle_id
    end

    test "When no vehicle relationship parses vehicle_id as nil" do
      item = %Item{
        id: "TEST-ID",
        attributes: %{
          "arrival_time" => "2016-01-01T00:00:00-04:00",
          "bikes_allowed" => 1,
          "departure_time" => "2016-09-15T15:40:00-04:00",
          "direction_id" => 1,
          "headsign" => "Back Bay",
          "name" => "",
          "status" => "On Time"
        },
        relationships: %{
          "route" => [
            %Item{id: "route_id"},
            %Item{id: "wrong"}
          ],
          "stop" => [
            %Item{id: "place-pktrm"}
          ],
          "trip" => [
            %Item{id: "trip_id"},
            %Item{id: "wrong"}
          ],
          "vehicle" => []
        },
        type: "prediction"
      }

      assert %Prediction{vehicle_id: nil} = StreamParser.parse(item)
    end
  end
end
