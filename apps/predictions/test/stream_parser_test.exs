defmodule Predictions.StreamParserTest do
  use ExUnit.Case, async: true

  alias JsonApi.Item
  alias Predictions.{Prediction, StreamParser}
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop
  alias Timex.Timezone

  describe "parse/1" do
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
          "facilities" => [],
          "parent_station" => [],
          "route" => [
            %Item{
              id: "route_id",
              attributes: %{
                "long_name" => "Route",
                "short_name" => "Route",
                "type" => 5
              }
            },
            %Item{id: "wrong"}
          ],
          "stop" => [
            %Item{id: "place-pktrm", attributes: %{"name" => "Stop"}},
            %Item{id: "wrong"}
          ],
          "trip" => [
            %Item{
              id: "trip_id",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            },
            %Item{
              id: "wrong",
              attributes: %{
                "name" => "trip_name",
                "direction_id" => "0",
                "headsign" => "trip_headsign"
              }
            }
          ],
          "zone" => [
            %JsonApi.Item{
              attributes: nil,
              id: "LocalBus",
              relationships: nil,
              type: "zone"
            }
          ]
        },
        type: "stop"
      }

      expected = %Prediction{
        id: "TEST-ID",
        departing?: true,
        direction_id: 1,
        route: %Route{
          id: "route_id",
          type: 5
        },
        status: "On Time",
        stop: %Stop{
          id: "place-pktrm",
          name: "Stop"
        },
        stop_sequence: 0,
        time: ~N[2016-01-01T04:00:00] |> Timezone.convert("Etc/GMT+4"),
        trip: %Trip{
          id: "trip_id",
          name: "trip_name",
          direction_id: "0",
          headsign: "trip_headsign"
        }
      }

      assert StreamParser.parse(item) == expected
    end
  end
end
