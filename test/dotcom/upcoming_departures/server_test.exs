defmodule Dotcom.UpcomingDepartures.ServerTest do
  use ExUnit.Case

  import Mox

  alias Dotcom.UpcomingDepartures.Server
  alias Test.Support.Factories

  setup [:verify_on_exit!, :set_mox_global]

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    stub(Routes.Repo.Mock, :get, fn id -> Factories.Routes.Route.build(:route, id: id) end)
    stub(Stops.Repo.Mock, :get, fn id -> Factories.Stops.Stop.build(:stop, id: id) end)
    stub(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, fn _ -> :service_ended end)

    n = System.unique_integer([:positive])
    topic = "departures:route-#{n}:0:stop-#{n}"

    %{topic: topic}
  end

  describe "start_link/1" do
    test "starts the server process successfully", %{topic: topic} do
      {:ok, pid} = Server.start_link(topic)
      assert Process.alive?(pid)
    end

    test "registers the server globally under the topic name", %{topic: topic} do
      {:ok, pid} = Server.start_link(topic)
      assert GenServer.whereis({:global, topic}) == pid
    end

    test "returns {:error, {:already_started, pid}} when started twice with the same topic",
         %{topic: topic} do
      {:ok, pid} = Server.start_link(topic)
      assert {:error, {:already_started, ^pid}} = Server.start_link(topic)
    end
  end

  describe "init/1" do
    test "returns :ok tuple", %{topic: topic} do
      assert {:ok, _state} = Server.init(topic)
    end

    test "stores the topic in state", %{topic: topic} do
      {:ok, state} = Server.init(topic)
      assert state.topic == topic
    end

    test "stores a zero-arity departures_fn in state", %{topic: topic} do
      {:ok, state} = Server.init(topic)
      assert is_function(state.departures_fn, 0)
    end

    test "queues a :refresh message to trigger the initial broadcast", %{topic: topic} do
      _ = Server.init(topic)
      assert_receive :refresh
    end
  end

  describe "handle_info/2 - :refresh" do
    test "broadcasts upcoming departures to the PubSub topic", %{topic: topic} do
      Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)
      fake_departures = [:departure_a, :departure_b]
      state = %{departures_fn: fn -> fake_departures end, topic: topic}

      Server.handle_info(:refresh, state)

      assert_receive %Phoenix.Socket.Broadcast{
        event: "upcoming_departures",
        payload: ^fake_departures,
        topic: ^topic
      }
    end

    test "returns {:noreply, state} keeping state unchanged", %{topic: topic} do
      state = %{departures_fn: fn -> :no_service end, topic: topic}
      assert {:noreply, ^state} = Server.handle_info(:refresh, state)
    end

    test "broadcasts again each time :refresh is sent to the live process", %{topic: topic} do
      Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)
      {:ok, pid} = Server.start_link(topic)
      # Drain the automatic initial :refresh broadcast from init/1.
      assert_receive %Phoenix.Socket.Broadcast{
        event: "upcoming_departures",
        payload: _,
        topic: ^topic
      }

      send(pid, :refresh)

      assert_receive %Phoenix.Socket.Broadcast{
        event: "upcoming_departures",
        payload: _,
        topic: ^topic
      }
    end
  end

  describe "handle_cast/2 - :subscribe" do
    test "sends upcoming departures directly to the specified pid", %{topic: topic} do
      fake_result = :service_ended
      state = %{departures_fn: fn -> fake_result end, topic: topic}

      Server.handle_cast({:subscribe, self()}, state)

      assert_receive {:subscribed, ^fake_result}
    end

    test "returns {:noreply, state} with new subscriber pid in state", %{topic: topic} do
      state = %{departures_fn: fn -> :no_service end, topic: topic, subscribers: MapSet.new([])}
      {:noreply, new_state} = Server.handle_cast({:subscribe, self()}, state)
      assert MapSet.member?(new_state.subscribers, self())
    end

    test "does not publish to PubSub – only sends to the target pid", %{topic: topic} do
      Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)
      other_pid = spawn(fn -> Process.sleep(:infinity) end)
      state = %{departures_fn: fn -> [:trip] end, topic: topic}

      Server.handle_cast({:subscribe, other_pid}, state)

      # Test process is subscribed but should NOT receive this particular broadcast.
      refute_receive {:upcoming_departures, _}
    end

    test "does not crash a live server process", %{topic: topic} do
      Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)
      {:ok, pid} = Server.start_link(topic)

      assert_receive %Phoenix.Socket.Broadcast{
        event: "upcoming_departures",
        payload: _,
        topic: ^topic
      }

      GenServer.cast(pid, {:subscribe, self()})
      assert_receive {:subscribed, _}

      assert Process.alive?(pid)
    end
  end

  describe "terminate/2" do
    test "broadcasts :terminated to the PubSub topic", %{topic: topic} do
      Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)
      state = %{departures_fn: fn -> :no_service end, topic: topic}

      Server.terminate(:normal, state)

      assert_receive %Phoenix.Socket.Broadcast{
        event: "upcoming_departures",
        payload: :terminated,
        topic: ^topic
      }
    end

    test "broadcasts :terminated when the server process is stopped normally", %{topic: topic} do
      Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)
      {:ok, pid} = Server.start_link(topic)

      assert_receive %Phoenix.Socket.Broadcast{
        event: "upcoming_departures",
        payload: payload,
        topic: ^topic
      }

      assert payload != :terminated

      GenServer.stop(pid, :normal)

      assert_receive %Phoenix.Socket.Broadcast{
        event: "upcoming_departures",
        payload: :terminated,
        topic: ^topic
      }
    end

    test "broadcasts :terminated regardless of the stop reason", %{topic: topic} do
      Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)
      state = %{departures_fn: fn -> :no_service end, topic: topic}

      Server.terminate(:shutdown, state)

      assert_receive %Phoenix.Socket.Broadcast{
        event: "upcoming_departures",
        payload: :terminated,
        topic: ^topic
      }
    end
  end

  test "gets restarted if it crashes", %{topic: topic} do
    Phoenix.PubSub.subscribe(Dotcom.PubSub, topic)

    {:ok, pid} = start_supervised({Server, topic})
    assert ^pid = GenServer.whereis({:global, topic})
    Process.exit(pid, :kill)
    # need some time for it to restart
    Dotcom.Assertions.wait_until(fn ->
      new_pid = GenServer.whereis({:global, topic})
      assert new_pid
      assert new_pid !== pid
    end)

    refute_receive %Phoenix.Socket.Broadcast{
      event: "upcoming_departures",
      payload: :terminated,
      topic: ^topic
    }
  end
end
