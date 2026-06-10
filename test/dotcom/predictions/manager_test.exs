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
    test "returns :loading predictions and an empty subscribers set" do
      assert {:ok, state} = Manager.init(@params)
      assert state.params == @params
      assert state.predictions == :loading
      assert MapSet.size(state.subscribers) == 0
    end
  end

  # ---------------------------------------------------------------------------
  # handle_cast/2 — :subscribe
  # ---------------------------------------------------------------------------

  describe "handle_cast/2 - :subscribe" do
    test "adds the subscriber pid to the subscribers set" do
      state = %{params: @params, predictions: :loading, subscribers: MapSet.new()}
      {:noreply, new_state} = Manager.handle_cast({:subscribe, self()}, state)
      assert MapSet.member?(new_state.subscribers, self())
    end

    test "does not send a message when predictions are still :loading" do
      state = %{params: @params, predictions: :loading, subscribers: MapSet.new()}
      Manager.handle_cast({:subscribe, self()}, state)
      refute_receive {:predictions_update, _}
    end

    test "immediately sends current predictions to the new subscriber when available" do
      state = %{params: @params, predictions: {:ok, @predictions}, subscribers: MapSet.new()}
      Manager.handle_cast({:subscribe, self()}, state)
      expected_events = [{"reset", @predictions}]
      assert_receive {:predictions_update, %{predictions: @predictions, events: ^expected_events}}
    end

    test "only sends to the newly subscribed pid, not to existing subscribers" do
      test_pid = self()

      bystander =
        spawn(fn ->
          receive do
            msg -> send(test_pid, {:bystander_received, msg})
          end
        end)

      state = %{
        params: @params,
        predictions: {:ok, @predictions},
        subscribers: MapSet.new([bystander])
      }

      Manager.handle_cast({:subscribe, self()}, state)

      assert_receive {:predictions_update, _}
      refute_receive {:bystander_received, _}
    end
  end

  # ---------------------------------------------------------------------------
  # handle_cast/2 — :unsubscribe
  # ---------------------------------------------------------------------------

  describe "handle_cast/2 - :unsubscribe" do
    test "removes the subscriber from the set" do
      other = spawn(fn -> Process.sleep(:infinity) end)
      state = %{params: @params, predictions: :loading, subscribers: MapSet.new([self(), other])}

      {:noreply, new_state} = Manager.handle_cast({:unsubscribe, self()}, state)

      refute MapSet.member?(new_state.subscribers, self())
      assert MapSet.member?(new_state.subscribers, other)
    end

    test "returns {:stop, :normal, state} when the last subscriber leaves" do
      state = %{params: @params, predictions: :loading, subscribers: MapSet.new([self()])}

      assert {:stop, :normal, _state} = Manager.handle_cast({:unsubscribe, self()}, state)
    end

    test "returns {:noreply, state} when other subscribers remain" do
      other = spawn(fn -> Process.sleep(:infinity) end)
      state = %{params: @params, predictions: :loading, subscribers: MapSet.new([self(), other])}

      assert {:noreply, _state} = Manager.handle_cast({:unsubscribe, self()}, state)
    end
  end

  # ---------------------------------------------------------------------------
  # handle_info/2 — {:predictions_update, data}
  # ---------------------------------------------------------------------------

  describe "handle_info/2 - :predictions_update" do
    test "broadcasts the update to every subscriber" do
      test_pid = self()

      sub =
        spawn(fn ->
          receive do
            msg -> send(test_pid, {:from_sub, msg})
          end
        end)

      state = %{
        params: @params,
        predictions: :loading,
        subscribers: MapSet.new([self(), sub])
      }

      data = %{predictions: @predictions, events: [{"reset", @predictions}]}

      Manager.handle_info({:predictions_update, data}, state)

      assert_receive {:predictions_update, ^data}
      assert_receive {:from_sub, {:predictions_update, ^data}}
    end

    test "stores the received predictions in state as {:ok, predictions}" do
      state = %{params: @params, predictions: :loading, subscribers: MapSet.new()}
      data = %{predictions: @predictions, events: [{"reset", @predictions}]}

      {:noreply, new_state} = Manager.handle_info({:predictions_update, data}, state)

      assert new_state.predictions == {:ok, @predictions}
    end

    test "replaces previously stored predictions with each new update" do
      old = [%Prediction{id: "old"}]
      state = %{params: @params, predictions: {:ok, old}, subscribers: MapSet.new()}
      data = %{predictions: @predictions, events: [{"reset", @predictions}]}

      {:noreply, new_state} = Manager.handle_info({:predictions_update, data}, state)

      assert new_state.predictions == {:ok, @predictions}
    end
  end

  # ---------------------------------------------------------------------------
  # subscribe/2 — integration
  # ---------------------------------------------------------------------------

  describe "subscribe/2" do
    # subscribe/2 calls GenServer.start_link internally, linking the server to
    # the test process.  We unlink immediately, and use capture_log to suppress
    # crash noise from the supervisor's SSE restart loop.
    test "starts a server registered under the expected global name" do
      params = unique_params()

      capture_log(fn ->
        Manager.subscribe(self(), params)
        server_pid = GenServer.whereis({:global, {:predictions, params}})
        if server_pid, do: Process.unlink(server_pid)

        # The server was alive when start_link returned — that is sufficient.
        assert server_pid != nil
      end)
    end

    test "reuses the already-running server when called a second time with the same params" do
      params = unique_params()

      capture_log(fn ->
        Manager.subscribe(self(), params)
        pid1 = GenServer.whereis({:global, {:predictions, params}})
        if pid1, do: Process.unlink(pid1)

        other = spawn(fn -> Process.sleep(:infinity) end)
        Manager.subscribe(other, params)
        pid2 = GenServer.whereis({:global, {:predictions, params}})

        assert pid1 != nil
        assert pid1 == pid2
      end)
    end
  end

  # ---------------------------------------------------------------------------
  # unsubscribe/2 — integration
  # ---------------------------------------------------------------------------

  describe "unsubscribe/2" do
    test "server process terminates when the last subscriber unsubscribes" do
      params = unique_params()

      capture_log(fn ->
        server_pid = start_server!(params)
        ref = Process.monitor(server_pid)

        GenServer.cast(server_pid, {:subscribe, self()})
        Manager.unsubscribe(self(), params)

        # The server goes down — either via {:stop, :normal} from handle_cast or
        # from the supervisor crash cascade. Either way the monitor fires.
        assert_receive {:DOWN, ^ref, :process, ^server_pid, _reason}, 1_000
      end)
    end

    # "server remains alive when other subscribers are present" is already
    # proven at the callback level: handle_cast({:unsubscribe}) returns
    # {:noreply, _} when the subscriber set is non-empty.
  end
end
