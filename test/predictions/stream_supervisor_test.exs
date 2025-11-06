defmodule Predictions.StreamSupervisorTest do
  use ExUnit.Case, async: false

  alias Predictions.StreamSupervisor

  setup_all do
    old_value = System.get_env("USE_SERVER_SENT_EVENTS")
    System.put_env("USE_SERVER_SENT_EVENTS", "true")

    on_exit(fn ->
      if old_value do
        System.put_env("USE_SERVER_SENT_EVENTS", old_value)
      else
        System.delete_env("USE_SERVER_SENT_EVENTS")
      end
    end)

    :ok
  end

  setup do
    Application.put_env(:dotcom, :mbta_api,
      base_url: "http://internet.com",
      headers: [
        {"x-api-key", "bar"}
      ]
    )
  end

  setup :close_active_workers

  defp close_active_workers(context) do
    StreamSupervisor
    |> DynamicSupervisor.which_children()
    |> Enum.each(&DynamicSupervisor.terminate_child(StreamSupervisor, elem(&1, 1)))

    context
  end

  describe "start_link/1" do
    test "StreamSupervisor is started along with registry" do
      assert {:error, {:already_started, _}} = StreamSupervisor.start_link([])

      assert {:error, {:already_started, _}} =
               Registry.start_link(keys: :unique, name: :prediction_streams_registry)
    end
  end

  describe "init/1" do
    test "StreamSupervisor runs DynamicSupervisor.init" do
      {:ok, %{strategy: :one_for_one}} = StreamSupervisor.init([])
    end
  end

  describe "ensure_stream_is_started/2" do
    test "starts a stream if not already started" do
      filter_key =
        {[route: "Purple", direction: 1], "filter[route]=Purple&filter[direction_id]=1"}

      assert {:ok, _pid} = StreamSupervisor.ensure_stream_is_started(filter_key, self())
    end

    test "returns existing stream from registry" do
      filter_key = {[route: "Pink", direction: 0], "filter[route]=Pink&filter[direction_id]=0"}
      {:ok, pid} = StreamSupervisor.ensure_stream_is_started(filter_key, self())
      assert {:ok, ^pid} = StreamSupervisor.ensure_stream_is_started(filter_key, self())
    end
  end

  describe "remove_subscriber/1" do
    test "closes a stream by associated pid" do
      filter_key = {[route: "Teal", direction: 1], "filter[route]=Teal&filter[direction_id]=1"}
      pid = self()
      {:ok, stream_pid} = StreamSupervisor.ensure_stream_is_started(filter_key, pid)

      assert Process.alive?(stream_pid)

      assert [{_, ^stream_pid, :supervisor, [Predictions.StreamSupervisor.Worker]}] =
               DynamicSupervisor.which_children(Predictions.StreamSupervisor)

      :ok = StreamSupervisor.remove_subscriber(pid)
      refute Process.alive?(stream_pid)
      assert [] = DynamicSupervisor.which_children(Predictions.StreamSupervisor)
    end
  end
end
