defmodule Predictions.PredictionsPubSubTest do
  use ExUnit.Case

  alias Predictions.{Prediction, PredictionsPubSub}
  alias Routes.Route
  alias Stops.Stop

  @route_39 "39"
  @route_66 "66"
  @stop_id "place-where"
  @direction_id 1
  @prediction39 %Prediction{
    id: "prediction39",
    direction_id: @direction_id,
    route: %Route{id: @route_39},
    stop: %Stop{id: @stop_id}
  }
  @prediction66 %Prediction{
    id: "prediction66",
    direction_id: @direction_id,
    route: %Route{id: @route_66},
    stop: %Stop{id: @stop_id}
  }

  @channel_args "route=#{@route_39}:stop=#{@stop_id}:direction_id=#{@direction_id}"

  setup_all do
    start_supervised({Registry, keys: :duplicate, name: :prediction_subscriptions_registry})

    subscribe_fn = fn _, _ -> :ok end
    {:ok, pid} = PredictionsPubSub.start_link(name: :subscribe, subscribe_fn: subscribe_fn)

    {:ok, pid: pid}
  end

  describe "subscribe/2" do
    test "clients get existing predictions upon subscribing", %{pid: pid} do
      predictions = [@prediction39]
      replace_state(pid, predictions)
      assert PredictionsPubSub.subscribe(@channel_args, pid) == predictions
    end
  end

  describe "handle_info/2 - {:reset, predictions}" do
    setup %{pid: pid} do
      reset_table(pid)
      {:ok, pid: pid}
    end

    test "resets the predictions", %{pid: pid} do
      PredictionsPubSub.subscribe(@channel_args, pid)
      send(pid, {:reset, [@prediction39]})
      assert_receive {:new_predictions, [@prediction39]}
    end

    test "broadcasts new predictions lists to subscribers", %{pid: pid} do
      PredictionsPubSub.subscribe(@channel_args, pid)
      send(pid, {:reset, [@prediction66]})
      send(pid, {:reset, [@prediction39]})
      assert_receive {:new_predictions, [@prediction39]}
      # we're not subscribed to this
      refute_receive {:new_predictions, [@prediction66]}
    end
  end

  describe "handle_info/2 - {:add, predictions}" do
    setup %{pid: pid} do
      reset_table(pid)
      {:ok, pid: pid}
    end

    test "adds the new predictions by route ID", %{pid: pid} do
      PredictionsPubSub.subscribe(@channel_args, pid)
      send(pid, {:add, [@prediction39]})
      assert_receive {:new_predictions, [@prediction39]}
    end

    test "broadcasts new predictions lists to subscribers", %{pid: pid} do
      PredictionsPubSub.subscribe(@channel_args, pid)

      send(pid, {:add, [@prediction66]})
      send(pid, {:add, [@prediction39]})

      assert_receive {:new_predictions, [@prediction39]}
      refute_receive {:new_predictions, [@prediction66]}
    end
  end

  describe "handle_info/2 - :update and :remove" do
    setup %{pid: pid} do
      replace_state(pid, [@prediction39])
      {:ok, pid: pid}
    end

    test "updates the predictions", %{pid: pid} do
      modified_prediction = %{
        @prediction39
        | status: "Now boarding"
      }

      PredictionsPubSub.subscribe(@channel_args, pid)
      send(pid, {:update, [modified_prediction]})

      assert_receive {:new_predictions, [prediction]}

      assert prediction.status == "Now boarding"
    end

    test "broadcasts new predictions lists to subscribers", %{pid: pid} do
      PredictionsPubSub.subscribe(@channel_args, pid)

      send(pid, {:update, [@prediction66]})
      send(pid, {:update, [@prediction39]})

      assert_receive {:new_predictions, [@prediction39]}
      refute_receive {:new_predictions, [@prediction66]}
    end

    test "removes the given predictions and broadcasts new predictions lists to subscribers", %{
      pid: pid
    } do
      PredictionsPubSub.subscribe(@channel_args, pid)
      send(pid, {:remove, [@prediction39]})
      assert_receive {:new_predictions, []}
    end
  end

  defp reset_table(pid) do
    :sys.replace_state(pid, fn %{ets: table} = state ->
      :ets.delete_all_objects(table)
      state
    end)
  end

  defp replace_state(pid, predictions) do
    _ =
      :sys.replace_state(pid, fn %{ets: table} = state ->
        _ = :ets.insert(table, Enum.map(predictions, &PredictionsPubSub.to_record/1))
        state
      end)
  end
end
