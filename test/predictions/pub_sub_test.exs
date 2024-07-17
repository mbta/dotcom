defmodule Predictions.PubSubTest do
  use ExUnit.Case, async: false

  import Mox

  alias Predictions.{PubSub, StreamSupervisor, StreamTopic}
  alias Test.Support.Factories.RoutePatterns.RoutePattern
  alias Test.Support.Factories.Predictions.Prediction

  @predictions_store Application.compile_env!(:dotcom, :predictions_store)
  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]

  setup_all do
    System.put_env("USE_SERVER_SENT_EVENTS", "true")

    on_exit(fn ->
      System.put_env("USE_SERVER_SENT_EVENTS", "false")
    end)

    :ok
  end

  setup :set_mox_global
  setup :verify_on_exit!

  setup do
    stop = Faker.Lorem.word()
    channel = "stop:#{stop}"

    stub(@route_patterns_repo, :by_stop_id, fn ^stop ->
      [RoutePattern.build(:route_pattern)]
    end)

    stub(@predictions_store, :fetch, fn [stop: ^stop] ->
      {:reply, [], :foo}
    end)

    # Ensure no streams are running so that we can test stream creation
    Predictions.StreamSupervisor
    |> DynamicSupervisor.which_children()
    |> Enum.each(&DynamicSupervisor.terminate_child(Predictions.StreamSupervisor, elem(&1, 1)))

    {:ok, %{channel: channel, stop: stop}}
  end

  describe "subscribe/2" do
    test "returns predictions", context do
      # Setup
      setup_predictions = Prediction.build_list(3, :prediction)

      expect(@route_patterns_repo, :by_stop_id, fn stop ->
        assert stop == context.stop

        [RoutePattern.build(:route_pattern)]
      end)

      expect(@predictions_store, :fetch, fn [stop: stop] ->
        assert stop == context.stop

        {:reply, setup_predictions, :foo}
      end)

      # Exercise
      {:reply, verify_predictions, :foo} = PubSub.subscribe(context.channel)

      # Verify
      assert verify_predictions == setup_predictions
    end

    test "adds a subscriber to the registry", context do
      # Exercise
      assert Registry.count(:prediction_subscriptions_registry) == 0

      PubSub.subscribe(context.channel)

      # Verify
      assert Registry.count(:prediction_subscriptions_registry) == 1
    end

    test "starts a stream when none exists", context do
      # Exercise
      assert Supervisor.count_children(StreamSupervisor)[:active] == 0

      PubSub.subscribe(context.channel)

      # Verify
      Process.sleep(1000)

      assert Supervisor.count_children(StreamSupervisor)[:active] == 1
    end
  end

  describe "handle_cast/2" do
    test "removes a subscriber", context do
      # Setup
      ets_table = :ets.new(:callers_by_pid, [:bag])
      pid = Process.whereis(PubSub)
      state = %{callers_by_pid: ets_table}

      # Exercise
      topic = StreamTopic.new(context.channel)

      PubSub.handle_call({:subscribe, topic}, {pid, nil}, state)

      assert :ets.lookup(ets_table, pid) != []

      PubSub.handle_cast({:closed_channel, pid}, state)

      # Verify
      assert :ets.lookup(ets_table, pid) == []

      assert Registry.count(:prediction_subscriptions_registry) == 0
    end

    test "stops the stream when no other subscribers exist", context do
      # Setup
      ets_table = :ets.new(:callers_by_pid, [:bag])
      pid = Process.whereis(PubSub)
      state = %{callers_by_pid: ets_table}

      topic = StreamTopic.new(context.channel)
      StreamTopic.start_streams(topic)
      PubSub.handle_call({:subscribe, topic}, {pid, nil}, state)

      Process.sleep(1000)

      assert Supervisor.count_children(StreamSupervisor)[:active] == 1

      # Exercise
      PubSub.handle_cast({:closed_channel, pid}, state)

      # Verify
      Process.sleep(1000)

      assert Supervisor.count_children(StreamSupervisor)[:active] == 0
    end
  end

  describe "handle_info/2" do
    test "broadcasts to registered subscribers", context do
      # Setup
      pid = Process.whereis(PubSub)

      state = %{
        callers_by_pid: :ets.new(:callers_by_pid, [:bag]),
        last_dispatched: :ets.new(:last_dispatched, [:set])
      }

      topic = StreamTopic.new(context.channel)
      keys = StreamTopic.registration_keys(topic)
      Registry.register(:prediction_subscriptions_registry, pid, List.first(keys))

      :erlang.trace(pid, true, [:receive])

      # Exercise
      PubSub.handle_info(:broadcast, state)

      # Verify
      assert_receive {:trace, ^pid, :receive, {:dispatch, _, _, {:reply, [], :foo}}}
    end

    test "dispatches to pids", context do
      # Setup
      pid = Process.whereis(PubSub)

      state = %{
        last_dispatched: :ets.new(:last_dispatched, [:set])
      }

      topic = StreamTopic.new(context.channel)
      keys = StreamTopic.registration_keys(topic)
      Registry.register(:prediction_subscriptions_registry, pid, List.first(keys))

      # Exercise
      PubSub.handle_info({:dispatch, [self()], keys, []}, state)

      # Verify
      assert_receive {:new_predictions, {:reply, [], :foo}}
    end

    test "broadcasts on a timer" do
      # Exercise
      PubSub.handle_info(:timed_broadcast, %{})

      # Verify
      assert_receive :broadcast
    end
  end
end
