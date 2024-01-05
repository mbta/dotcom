defmodule SiteWeb.PredictionsChannelTest do
  use SiteWeb.ChannelCase, async: false

  import Test.Support.EnvHelpers
  import Mock
  alias Phoenix.Socket
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias Stops.Stop
  alias SiteWeb.{PredictionsChannel, UserSocket}

  @route_39 "39"
  @stop_fh "place-forhl"
  @direction 1

  @prediction39 %Prediction{
    id: "prediction39",
    direction_id: @direction,
    route: %Route{id: @route_39, type: 3},
    stop: %Stop{id: @stop_fh},
    trip: %Trip{id: "trip_id"},
    time: Timex.shift(Util.now(), hours: 2)
  }

  @channel_name "predictions:stop:#{@stop_fh}"

  setup do
    socket = socket(UserSocket, "", %{})
    {:ok, socket: socket}
  end

  describe "join/3" do
    test "subscribes to predictions for a stop ID and returns the current list of predictions", %{
      socket: socket
    } do
      reassign_env(:dotcom, :predictions_subscribe_fn, fn _ ->
        [@prediction39]
      end)

      assert {:ok, %{predictions: [@prediction39]}, %Socket{}} =
               subscribe_and_join(
                 socket,
                 PredictionsChannel,
                 @channel_name
               )
    end

    test "can't join any topic", %{socket: socket} do
      assert {:error,
              %{
                message: "Cannot subscribe to predictions for route:Orange."
              }} =
               subscribe_and_join(
                 socket,
                 PredictionsChannel,
                 "predictions:route:Orange"
               )

      assert {:error,
              %{
                message: "Cannot subscribe to predictions for Red:1."
              }} =
               subscribe_and_join(
                 socket,
                 PredictionsChannel,
                 "predictions:Red:1"
               )

      assert {:error,
              %{
                message: "Cannot subscribe to predictions for trip:123456."
              }} =
               subscribe_and_join(
                 socket,
                 PredictionsChannel,
                 "predictions:trip:123456"
               )
    end
  end

  describe "handle_info/2" do
    test "pushes new data onto the socket", %{socket: socket} do
      {:ok, _, socket} =
        subscribe_and_join(
          socket,
          PredictionsChannel,
          @channel_name
        )

      assert {:noreply, _socket} =
               PredictionsChannel.handle_info(
                 {:new_predictions, [@prediction39]},
                 socket
               )

      assert_push("data", %{predictions: [@prediction39]})
    end

    test "doesn't push certain predictions", %{socket: socket} do
      {:ok, _, socket} =
        subscribe_and_join(
          socket,
          PredictionsChannel,
          @channel_name
        )

      predictions_from_stream = [
        @prediction39,
        # Prediction with no trip info - should be removed
        %Prediction{@prediction39 | trip: nil},
        # Prediction for skipped stop on subway - should be removed
        %Prediction{
          @prediction39
          | time: nil,
            schedule_relationship: :skipped,
            route: %Route{id: "Red", type: 1}
        },
        # Prediction with time in past - should be removed
        %Prediction{@prediction39 | time: Timex.shift(Util.now(), minutes: -1)},
        # Prediction for cancelled schedule in the future
        %Prediction{
          @prediction39
          | time: nil,
            schedule_relationship: :cancelled,
            stop_sequence: 3
        },
        # Prediction for cancelled schedule in the past - should be removed
        %Prediction{
          @prediction39
          | time: nil,
            schedule_relationship: :cancelled,
            stop_sequence: 4
        },
        # Prediction likely at terminal stop - should be removed
        %Prediction{
          @prediction39
          | stop_sequence: 6,
            arrival_time: @prediction39.time,
            departure_time: nil
        }
      ]

      trip_id = @prediction39.trip.id

      with_mock(Schedules.Repo, [:passthrough],
        schedule_for_trip: fn
          ^trip_id, [stop_sequence: 3] ->
            [%Schedule{time: Timex.shift(Util.now(), minutes: 5)}]

          ^trip_id, [stop_sequence: 4] ->
            [%Schedule{time: Timex.shift(Util.now(), minutes: -5)}]

          ^trip_id, [stop_sequence: 6] ->
            [%Schedule{last_stop?: true}]

          _, _ ->
            []
        end
      ) do
        {:noreply, _socket} =
          PredictionsChannel.handle_info(
            {:new_predictions, predictions_from_stream},
            socket
          )

        assert_push("data", %{predictions: [@prediction39, other_prediction]})

        assert %Prediction{
                 time: nil,
                 schedule_relationship: :cancelled,
                 stop_sequence: 3
               } = other_prediction
      end
    end
  end
end
