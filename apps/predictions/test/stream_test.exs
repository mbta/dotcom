defmodule Predictions.StreamTest do
  use ExUnit.Case

  alias JsonApi.Item
  alias Predictions.{Prediction, Stream}
  alias Timex.Timezone

  @predictions_data %JsonApi{
    data: [
      %Item{
        id: "prediction1",
        attributes: %{
          "track" => "5",
          "status" => "On Time",
          "direction_id" => 0,
          "departure_time" => "2016-09-15T15:40:00-04:00",
          "arrival_time" => "2016-01-01T00:00:00-04:00",
          "stop_sequence" => 5
        },
        relationships: %{
          "route" => [
            %Item{
              id: "route_id",
              attributes: %{
                "long_name" => "Route",
                "direction_names" => ["East", "West"],
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
          ]
        }
      }
    ]
  }

  describe "start_link/1" do
    test "starts a GenServer that publishes predictions it receives from the API" do
      {:ok, mock_api} =
        GenStage.from_enumerable([
          %V3Api.Stream.Event{event: :reset, data: @predictions_data}
        ])

      test_pid = self()

      broadcast_fn = fn Predictions.PubSub, "predictions", {type, data} ->
        send(test_pid, {type, data})
        :ok
      end

      assert {:ok, _} =
               Stream.start_link(
                 name: :start_link_test,
                 broadcast_fn: broadcast_fn,
                 subscribe_to: mock_api
               )

      assert_receive {:reset, data}
      assert [%Prediction{id: "prediction1"}] = data
    end
  end

  describe "handle_events/3" do
    test "publishes :remove events as a list of Prediction structs" do
      {:ok, mock_api} =
        GenStage.from_enumerable([
          %V3Api.Stream.Event{event: :remove, data: @predictions_data}
        ])

      test_pid = self()

      broadcast_fn = fn Predictions.PubSub, "predictions", {type, data} ->
        send(test_pid, {:received_broadcast, {type, data}})
        :ok
      end

      assert {:ok, _} =
               Stream.start_link(
                 name: :remove_as_ids_test,
                 broadcast_fn: broadcast_fn,
                 subscribe_to: mock_api
               )

      assert_receive {:received_broadcast, {:remove, data}}
      assert [%Prediction{id: "prediction1"}] = data
    end
  end
end
