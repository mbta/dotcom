defmodule Predictions.StreamTest do
  use ExUnit.Case

  alias JsonApi.Item
  alias Predictions.{Prediction, Stream}

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

      assert_receive {:reset, data}, 5_000
      assert [%Prediction{id: "prediction1"}] = data
    end
  end

  describe "handle_events/3" do
    test "can log stream errors" do
      {:ok, mock_api} =
        GenStage.from_enumerable([
          %V3Api.Stream.Event{
            event: :remove,
            data:
              {:error,
               %JsonApi.Error{
                 code: :x,
                 detail: "bad_stream_result",
                 source: nil,
                 meta: %{}
               }}
          }
        ])

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert {:ok, _} =
                   Stream.start_link(
                     name: :error_logging_api_test,
                     broadcast_fn: :ok,
                     subscribe_to: mock_api
                   )

          refute_receive _
        end)

      assert log =~ "[error]"
      assert log =~ "module=Elixir.Predictions.Stream"
      assert log =~ "bad_stream_result"
    end

    test "can log broadcast errors" do
      {:ok, mock_api} =
        GenStage.from_enumerable([
          %V3Api.Stream.Event{event: :remove, data: @predictions_data}
        ])

      broadcast_fn = fn Predictions.PubSub, "predictions", _ ->
        {:error, "something went wrong"}
      end

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert {:ok, _} =
                   Stream.start_link(
                     name: :error_logging_test,
                     broadcast_fn: broadcast_fn,
                     subscribe_to: mock_api
                   )

          refute_receive _
        end)

      assert log =~ "[error]"
      assert log =~ "module=Elixir.Predictions.Stream"
      assert log =~ "something went wrong"
    end
  end
end
