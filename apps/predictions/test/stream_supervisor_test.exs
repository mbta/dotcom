defmodule Predictions.StreamSupervisorTest do
  use ExUnit.Case

  alias Predictions.StreamSupervisor

  describe "start_link/1" do
    test "StreamSupervisor is started along with registry" do
      assert {:error, {:already_started, _}} = StreamSupervisor.start_link([])

      assert {:error, {:already_started, _}} =
               Registry.start_link(keys: :unique, name: :prediction_streams_registry)
    end
  end

  describe "ensure_stream_is_started/1" do
    test "starts a stream if not already started" do
      assert {:ok, _pid} = StreamSupervisor.ensure_stream_is_started(1)
    end
  end
end
