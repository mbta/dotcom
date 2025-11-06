defmodule Predictions.StreamTest do
  use ExUnit.Case, async: false

  alias JsonApi.Item
  alias Predictions.Stream

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
    @tag :external
    test "starts a GenServer that can recieve stream events and call a broadcast function" do
      {:ok, mock_api} =
        GenStage.from_enumerable([
          %MBTA.Api.Stream.Event{event: :reset, data: @predictions_data}
        ])

      {:ok, stream_pid} =
        Stream.start_link(
          name: :start_link_test,
          subscribe_to: mock_api,
          clear_keys: [route: "route_id", direction: 0]
        )

      :erlang.trace(stream_pid, true, [:receive])

      assert_receive {:trace, ^stream_pid, :receive,
                      {:"$gen_consumer", _, [%MBTA.Api.Stream.Event{} | _]}}
    end
  end

  describe "handle_events/3" do
    test "can log stream errors" do
      {:ok, mock_api} =
        GenStage.from_enumerable([
          %MBTA.Api.Stream.Event{
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
                     subscribe_to: mock_api,
                     clear_keys: []
                   )

          refute_receive _
        end)

      assert log =~ "[error]"
      assert log =~ "module=Elixir.Predictions.Stream"
      assert log =~ "bad_stream_result"
    end

    test "can log errors" do
      {:ok, mock_api} =
        GenStage.from_enumerable([
          %MBTA.Api.Stream.Event{event: :unknown, data: :bad}
        ])

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert {:ok, _} =
                   Stream.start_link(
                     name: :error_logging_test,
                     subscribe_to: mock_api,
                     clear_keys: []
                   )

          refute_receive _
        end)

      assert log =~ "[error]"
      assert log =~ "module=Elixir.Predictions.Stream"
      assert log =~ "something went wrong"
    end
  end
end
