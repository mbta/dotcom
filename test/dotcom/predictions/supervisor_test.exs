defmodule Dotcom.Predictions.SupervisorTest do
  use ExUnit.Case, async: false

  import ExUnit.CaptureLog

  alias Dotcom.Predictions.Supervisor, as: PredictionsSupervisor
  alias Dotcom.Predictions.EventBroadcaster

  # async: false because tests modify Application env.

  @base_url "http://api.example.com"
  @headers [{"x-api-key", "test-key"}]

  setup do
    Application.put_env(:dotcom, :mbta_api, base_url: @base_url, headers: @headers)

    on_exit(fn ->
      Application.delete_env(:dotcom, :mbta_api)
    end)

    n = System.unique_integer([:positive])
    params = %{route_id: "route-#{n}", direction_id: 0, stop_id: "stop-#{n}"}

    %{params: params}
  end

  # ---------------------------------------------------------------------------
  # init/1 — called directly so no child processes are actually started
  # ---------------------------------------------------------------------------

  describe "init/1" do
    test "returns {:ok, _} with :one_for_all supervision strategy", %{params: params} do
      args = %{params: params, publish_to: self()}

      assert {:ok, {flags, _children}} = PredictionsSupervisor.init(args)
      assert flags.strategy == :one_for_all
    end

    test "includes ServerSentEventStage and Consumer as children", %{params: params} do
      args = %{params: params, publish_to: self()}

      {:ok, {_flags, children}} = PredictionsSupervisor.init(args)

      child_ids = Enum.map(children, fn %{id: id} -> id end)
      assert ServerSentEventStage in child_ids
      assert EventBroadcaster in child_ids
    end

    test "builds SSE URL from base_url and encoded params", %{params: params} do
      args = %{params: params, publish_to: self()}

      {:ok, {_flags, children}} = PredictionsSupervisor.init(args)

      %{start: {ServerSentEventStage, :start_link, [sses_opts]}} =
        Enum.find(children, fn %{id: id} -> id == ServerSentEventStage end)

      url = Keyword.get(sses_opts, :url)
      assert String.starts_with?(url, @base_url <> "/predictions?")
      # URI.encode_query encodes [ and ] as %5B / %5D
      assert url =~ "filter%5Broute%5D=#{params.route_id}"
      assert url =~ "filter%5Bstop%5D=#{params.stop_id}"
      assert url =~ "filter%5Bdirection_id%5D=#{params.direction_id}"
    end

    test "passes the configured API headers to the SSE stage", %{params: params} do
      args = %{params: params, publish_to: self()}

      {:ok, {_flags, children}} = PredictionsSupervisor.init(args)

      %{start: {ServerSentEventStage, :start_link, [sses_opts]}} =
        Enum.find(children, fn %{id: id} -> id == ServerSentEventStage end)

      assert Keyword.get(sses_opts, :headers) == @headers
    end

    test "EventBroadcaster child is configured to receive from the SSE stage and publish to publish_to",
         %{params: params} do
      publish_to = self()
      args = %{params: params, publish_to: publish_to}

      {:ok, {_flags, children}} = PredictionsSupervisor.init(args)

      %{start: {EventBroadcaster, :start_link, [consumer_opts]}} =
        Enum.find(children, fn %{id: id} -> id == EventBroadcaster end)

      assert Keyword.get(consumer_opts, :publish_to) == publish_to
    end
  end

  # ---------------------------------------------------------------------------
  # start_link/1 and stop/1 — lifecycle
  # ---------------------------------------------------------------------------

  describe "start_link/1 and stop/1" do
    test "supervisor is registered under the expected global name", %{params: params} do
      # Suppress logs from the SSE stage's immediate connection failure.
      capture_log(fn ->
        {:ok, pid} = PredictionsSupervisor.start_link(%{params: params, publish_to: self()})

        # Unlink so the test isn't killed if the supervisor crashes before we stop it.
        Process.unlink(pid)

        assert Process.alive?(pid)
        assert :global.whereis_name({:predictions_supervisor, params}) == pid

        Supervisor.stop(pid)

        :timer.sleep(10)
        assert :global.whereis_name({:predictions_supervisor, params}) == :undefined
      end)
    end

    test "stop/1 terminates the supervisor process", %{params: params} do
      capture_log(fn ->
        {:ok, pid} = PredictionsSupervisor.start_link(%{params: params, publish_to: self()})
        Process.unlink(pid)
        ref = Process.monitor(pid)

        PredictionsSupervisor.stop(%{params: params})

        assert_receive {:DOWN, ^ref, :process, ^pid, _reason}, 1_000
      end)
    end
  end
end
