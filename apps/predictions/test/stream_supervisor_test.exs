defmodule Predictions.StreamSupervisorTest do
  use ExUnit.Case
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

  describe "ensure_stream_is_started/1" do
    test "starts a stream if not already started" do
      prediction_key = "route=Purple:stop=awesome-station:direction=1"
      assert {:ok, _pid} = StreamSupervisor.ensure_stream_is_started(prediction_key)
    end

    test "returns existing stream from registry" do
      prediction_key = "route=Pink:stop=place:direction=0"
      {:ok, pid} = StreamSupervisor.ensure_stream_is_started(prediction_key)
      assert {:ok, ^pid} = StreamSupervisor.ensure_stream_is_started(prediction_key)
    end
  end
end
