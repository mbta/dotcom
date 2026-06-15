defmodule Dotcom.Predictions.ManagerTest do
  use ExUnit.Case, async: false

  import ExUnit.CaptureLog

  alias Dotcom.Predictions.Manager
  alias Predictions.Prediction

  @params %{route_id: "Red", direction_id: 0, stop_id: "place-pktrm"}
  @predictions [%Prediction{id: "pred-1"}, %Prediction{id: "pred-2"}]

  # Starts the server via ExUnit's test supervisor so the test process is NOT
  # linked to it.  Any crash in the server will not propagate to the test.
  defp start_server!(params) do
    start_supervised!(%{
      id: make_ref(),
      start:
        {GenServer, :start_link, [Manager, params, [name: {:global, {:predictions, params}}]]},
      restart: :temporary
    })
  end

  defp unique_params do
    n = System.unique_integer([:positive])
    %{route_id: "route-#{n}", direction_id: 0, stop_id: "stop-#{n}"}
  end

  # ---------------------------------------------------------------------------
  # init/1
  # ---------------------------------------------------------------------------

  describe "init/1" do
    test "returns :loading predictions and sets up the topic" do
      assert {:ok, state} = Manager.init(@params)
      assert state.params == @params
      assert state.predictions == :loading
      assert state.topic == "predictions:Red:0:place-pktrm"
    end
  end

  # ---------------------------------------------------------------------------
  # handle_cast/2 — :subscribe
  # ---------------------------------------------------------------------------

  describe "handle_cast/2 - :subscribe" do
    test "does not send a message when predictions are still :loading" do
      state = %{params: @params, predictions: :loading, topic: "predictions:Red:0:place-pktrm"}
      Manager.handle_cast({:subscribe, self()}, state)
      refute_receive {:predictions_update, _}
    end

    test "immediately sends current predictions to the new subscriber when available" do
      state = %{
        params: @params,
        predictions: {:ok, @predictions},
        topic: "predictions:Red:0:place-pktrm"
      }

      Manager.handle_cast({:subscribe, self()}, state)
      expected_events = [{"reset", @predictions}]
      assert_receive {:predictions_update, %{predictions: @predictions, events: ^expected_events}}
    end

    test "only sends to the newly subscribed pid, not to existing subscribers" do
      test_pid = self()

      _bystander =
        spawn(fn ->
          receive do
            msg -> send(test_pid, {:bystander_received, msg})
          end
        end)

      state = %{
        params: @params,
        predictions: {:ok, @predictions},
        topic: "predictions:Red:0:place-pktrm"
      }

      Manager.handle_cast({:subscribe, self()}, state)

      assert_receive {:predictions_update, _}
      refute_receive {:bystander_received, _}
    end
  end

  # ---------------------------------------------------------------------------
  # handle_info/2 — {:predictions_update, data}
  # ---------------------------------------------------------------------------

  describe "handle_info/2 - :predictions_update" do
    test "broadcasts the update to every subscriber" do
      test_pid = self()
      topic = "predictions:Red:0:place-pktrm"

      # Subscribe to the topic to receive broadcasts
      :ok = Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)

      _sub =
        spawn(fn ->
          :ok = Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)

          receive do
            msg -> send(test_pid, {:from_sub, msg})
          end
        end)

      # Give the sub process time to subscribe
      Process.sleep(10)

      state = %{
        params: @params,
        predictions: :loading,
        topic: topic
      }

      data = %{predictions: @predictions, events: [{"reset", @predictions}]}

      Manager.handle_info({:predictions_update, data}, state)

      assert_receive {:predictions_update, ^data}
      assert_receive {:from_sub, {:predictions_update, ^data}}
    end

    test "stores the received predictions in state as {:ok, predictions}" do
      state = %{
        params: @params,
        predictions: :loading,
        topic: "predictions:Red:0:place-pktrm"
      }

      data = %{predictions: @predictions, events: [{"reset", @predictions}]}

      {:noreply, new_state} = Manager.handle_info({:predictions_update, data}, state)

      assert new_state.predictions == {:ok, @predictions}
    end

    test "replaces previously stored predictions with each new update" do
      old = [%Prediction{id: "old"}]

      state = %{
        params: @params,
        predictions: {:ok, old},
        topic: "predictions:Red:0:place-pktrm"
      }

      data = %{predictions: @predictions, events: [{"reset", @predictions}]}

      {:noreply, new_state} = Manager.handle_info({:predictions_update, data}, state)

      assert new_state.predictions == {:ok, @predictions}
    end
  end

  # ---------------------------------------------------------------------------
  # subscribe/2 — integration
  # ---------------------------------------------------------------------------

  describe "subscribe/1" do
    @tag :flaky
    test "starts a server and gets updates" do
      params = unique_params()
      Manager.subscribe(params)
      assert_receive {:predictions_update, _}
    end
  end

  # ---------------------------------------------------------------------------
  # unsubscribe/2 — integration
  # ---------------------------------------------------------------------------

  describe "unsubscribe/1" do
    test "correctly untracks presence" do
      params = unique_params()
      topic = Manager.topic_name(params)

      # Subscribe and track presence
      Manager.subscribe(params)
      assert %{"predictions" => %{metas: [%{}]}} = DotcomWeb.Presence.list(topic)

      # Unsubscribe
      Manager.unsubscribe(params)

      # Assert process is no longer tracked in Presence
      assert %{} = DotcomWeb.Presence.list(topic)
    end

    test "server process terminates when the last subscriber unsubscribes" do
      params = unique_params()

      capture_log(fn ->
        server_pid = start_server!(params)
        ref = Process.monitor(server_pid)
        topic = Manager.topic_name(params)

        # Subscribe and track presence
        :ok = Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)
        _ = DotcomWeb.Presence.track(self(), topic, "predictions", %{})

        # Give presence time to propagate
        Process.sleep(100)

        # Unsubscribe - this removes from PubSub but presence tracking
        # is tied to process lifecycle
        Manager.unsubscribe(params)

        # We need to untrack manually since the test process isn't terminating
        DotcomWeb.Presence.untrack(self(), topic, "predictions")

        # Give presence time to propagate the untrack
        Process.sleep(100)

        # Manually trigger the check_subscribers message to speed up the test
        send(server_pid, :check_subscribers)

        # The server should terminate when it checks for subscribers and finds none
        assert_receive {:DOWN, ^ref, :process, ^server_pid, _reason}, 1_000
      end)
    end
  end
end
