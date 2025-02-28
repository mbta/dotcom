defmodule DotcomWeb.PredictionsChannelTest do
  use DotcomWeb.ChannelCase, async: false

  import Mox
  import Dotcom.Utils.DateTime, only: [now: 0]

  alias DotcomWeb.{PredictionsChannel, UserSocket}
  alias Test.Support.Factories

  @predictions_pub_sub Application.compile_env!(:dotcom, :predictions_pub_sub)

  setup :set_mox_global
  setup :verify_on_exit!

  setup do
    channel = "predictions:stop:#{Faker.Lorem.word()}"
    socket = socket(UserSocket, "", %{})

    stub(MBTA.Api.Mock, :get_json, fn _, _ ->
      []
    end)

    # Ensure no streams are running so that we can test stream creation
    Predictions.StreamSupervisor
    |> DynamicSupervisor.which_children()
    |> Enum.each(&DynamicSupervisor.terminate_child(Predictions.StreamSupervisor, elem(&1, 1)))

    {:ok, %{channel: channel, socket: socket}}
  end

  describe "join/3" do
    test "filters skipped or cancelled predictions", context do
      # Setup
      canonical_prediction = Factories.Predictions.Prediction.build(:canonical_prediction)

      filtered_prediction =
        canonical_prediction
        |> Map.put(:schedule_relationship, :skipped)

      expect(@predictions_pub_sub, :subscribe, fn _ ->
        [canonical_prediction, filtered_prediction]
      end)

      # Exercise
      {:ok, %{predictions: predictions}, _} =
        PredictionsChannel.join(context.channel, nil, context.socket)

      # Verify
      assert predictions == [canonical_prediction]
    end

    test "filters predictions with no departure time", context do
      # Setup
      canonical_prediction = Factories.Predictions.Prediction.build(:canonical_prediction)

      filtered_prediction =
        canonical_prediction
        |> Map.put(:departure_time, nil)

      expect(@predictions_pub_sub, :subscribe, fn _ ->
        [canonical_prediction, filtered_prediction]
      end)

      # Exercise
      {:ok, %{predictions: predictions}, _} =
        PredictionsChannel.join(context.channel, nil, context.socket)

      # Verify
      assert predictions == [canonical_prediction]
    end

    test "doesn't filter skipped or cancelled non-subway predictions", context do
      # Setup
      canonical_prediction = Factories.Predictions.Prediction.build(:canonical_prediction)

      not_filtered_cancelled_prediction =
        Factories.Predictions.Prediction.build(:prediction,
          departure_time: nil,
          route: Factories.Routes.Route.build(:route, type: 3),
          schedule_relationship: :cancelled,
          trip: Factories.Schedules.Trip.build(:trip)
        )

      expect(@predictions_pub_sub, :subscribe, fn _ ->
        [canonical_prediction, not_filtered_cancelled_prediction]
      end)

      # Exercise
      {:ok, %{predictions: predictions}, _} =
        PredictionsChannel.join(context.channel, nil, context.socket)

      # Verify
      assert predictions == [canonical_prediction, not_filtered_cancelled_prediction]
    end
  end

  describe "handle_info/2" do
    test "pushes predictions to the channel", context do
      # Setup
      predictions = Factories.Predictions.Prediction.build_list(3, :canonical_prediction)

      expect(@predictions_pub_sub, :subscribe, fn _ ->
        predictions
      end)

      {:ok, _, socket} = subscribe_and_join(context.socket, PredictionsChannel, context.channel)

      # Exercise
      PredictionsChannel.handle_info({:new_predictions, predictions}, socket)

      # Verify
      assert_push("data", %{predictions: ^predictions})
    end

    test "filters out past predictions", context do
      # Setup
      now = now() |> DateTime.shift(second: 1)
      past = DateTime.shift(now, second: -15)
      future = DateTime.shift(now, second: 15)

      predictions =
        [past, now, future]
        |> Enum.map(
          &Factories.Predictions.Prediction.build(:canonical_prediction, %{departure_time: &1})
        )

      expect(@predictions_pub_sub, :subscribe, fn _ ->
        predictions
      end)

      {:ok, _, socket} = subscribe_and_join(context.socket, PredictionsChannel, context.channel)

      # Exercise
      PredictionsChannel.handle_info({:new_predictions, predictions}, socket)

      [_past_prediction | expected_predictions] = predictions

      # Verify
      assert_push("data", %{predictions: ^expected_predictions})
    end
  end

  describe "terminate/2" do
    test "casts a closed channel message", context do
      # Setup
      predictions = Factories.Predictions.Prediction.build_list(3, :canonical_prediction)

      expect(@predictions_pub_sub, :subscribe, fn _ ->
        predictions
      end)

      {:ok, _, socket} = subscribe_and_join(context.socket, PredictionsChannel, context.channel)

      # Exercise / Verify
      assert :ok = PredictionsChannel.terminate(nil, socket)
    end
  end
end
