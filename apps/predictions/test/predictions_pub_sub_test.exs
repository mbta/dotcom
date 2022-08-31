defmodule Predictions.PredictionsPubSubTest do
  use ExUnit.Case

  alias Predictions.{Prediction, PredictionsPubSub}
  alias Routes.Route

  @route_39 "39"
  @route_66 "66"
  @prediction39 %Prediction{id: "prediction39", route: %Route{id: @route_39}}
  @prediction66 %Prediction{id: "prediction66", route: %Route{id: @route_66}}

  describe "start_link/1" do
    test "starts the server" do
      subscribe_fn = fn _, _ -> :ok end

      assert {:ok, _pid} =
               PredictionsPubSub.start_link(name: :start_link, subscribe_fn: subscribe_fn)
    end
  end

  describe "subscribe/2" do
    setup do
      start_supervised({Registry, keys: :duplicate, name: :prediction_subscriptions_registry})

      subscribe_fn = fn _, _ -> :ok end
      {:ok, pid} = PredictionsPubSub.start_link(name: :subscribe, subscribe_fn: subscribe_fn)

      {:ok, pid: pid}
    end

    test "clients get existing predictions upon subscribing", %{pid: pid} do
      predictions = [@prediction39]

      :sys.replace_state(pid, fn state ->
        Map.put(state, :predictions_by_route_id, %{@route_39 => predictions})
      end)

      assert PredictionsPubSub.subscribe(@route_39, pid) == predictions
    end
  end

  describe "handle_info/2 - {:reset, predictions}" do
    setup do
      start_supervised({Registry, keys: :duplicate, name: :prediction_subscriptions_registry})

      subscribe_fn = fn _, _ -> :ok end
      {:ok, pid} = PredictionsPubSub.start_link(name: :subscribe, subscribe_fn: subscribe_fn)

      :sys.replace_state(pid, fn state ->
        Map.put(state, :predictions_by_route_id, %{@route_39 => [1, 2, 3]})
      end)

      {:ok, pid: pid}
    end

    test "resets the predictions", %{pid: pid} do
      send(pid, {:reset, [@prediction39]})

      assert pid |> :sys.get_state() |> Map.get(:predictions_by_route_id) |> Map.get(@route_39) ==
               [
                 @prediction39
               ]
    end

    test "broadcasts new predictions lists to subscribers", %{pid: pid} do
      PredictionsPubSub.subscribe(@route_39, pid)

      send(pid, {:reset, [@prediction66]})
      send(pid, {:reset, [@prediction39]})

      assert_receive {:new_predictions, [@prediction39]}
      refute_receive {:new_predictions, [@prediction66]}
    end
  end

  describe "handle_info/2 - {:add, predictions}" do
    setup do
      start_supervised({Registry, keys: :duplicate, name: :prediction_subscriptions_registry})

      subscribe_fn = fn _, _ -> :ok end
      {:ok, pid} = PredictionsPubSub.start_link(name: :subscribe, subscribe_fn: subscribe_fn)

      :sys.replace_state(pid, fn state ->
        Map.put(state, :predictions_by_route_id, %{})
      end)

      {:ok, pid: pid}
    end

    test "adds the new predictions by route ID", %{pid: pid} do
      send(pid, {:add, [@prediction39]})

      assert pid |> :sys.get_state() |> Map.get(:predictions_by_route_id) ==
               %{@route_39 => [@prediction39]}
    end

    test "broadcasts new predictions lists to subscribers", %{pid: pid} do
      PredictionsPubSub.subscribe(@route_39, pid)

      send(pid, {:add, [@prediction66]})
      send(pid, {:add, [@prediction39]})

      assert_receive {:new_predictions, [@prediction39]}
      refute_receive {:new_predictions, [@prediction66]}
    end
  end

  describe "handle_info/2 - {:update, predictions}" do
    setup do
      start_supervised({Registry, keys: :duplicate, name: :prediction_subscriptions_registry})

      subscribe_fn = fn _, _ -> :ok end
      {:ok, pid} = PredictionsPubSub.start_link(name: :subscribe, subscribe_fn: subscribe_fn)

      :sys.replace_state(pid, fn state ->
        Map.put(state, :predictions_by_route_id, %{@route_39 => [@prediction39]})
      end)

      {:ok, pid: pid}
    end

    test "updates the predictions", %{pid: pid} do
      send(pid, {:update, [@prediction39]})

      assert pid |> :sys.get_state() |> Map.get(:predictions_by_route_id) ==
               %{@route_39 => [@prediction39]}
    end

    test "broadcasts new predictions lists to subscribers", %{pid: pid} do
      PredictionsPubSub.subscribe(@route_39, pid)

      send(pid, {:update, [@prediction66]})
      send(pid, {:update, [@prediction39]})

      assert_receive {:new_predictions, [@prediction39]}
      refute_receive {:new_predictions, [@prediction66]}
    end
  end

  describe "handle_info/2 - {:remove, prediction_ids}" do
    setup do
      start_supervised({Registry, keys: :duplicate, name: :prediction_subscriptions_registry})

      subscribe_fn = fn _, _ -> :ok end
      {:ok, pid} = PredictionsPubSub.start_link(name: :subscribe, subscribe_fn: subscribe_fn)

      :sys.replace_state(pid, fn state ->
        Map.put(state, :predictions_by_route_id, %{@route_39 => [@prediction39]})
      end)

      {:ok, pid: pid}
    end

    test "removes the given predictions", %{pid: pid} do
      send(pid, {:remove, [@prediction39]})

      assert pid |> :sys.get_state() |> Map.get(:predictions_by_route_id) == %{@route_39 => []}
    end

    test "broadcasts new predictions lists to subscribers", %{pid: pid} do
      PredictionsPubSub.subscribe(@route_39, pid)

      send(pid, {:remove, [@prediction39]})

      assert_receive {:new_predictions, []}
    end
  end
end
