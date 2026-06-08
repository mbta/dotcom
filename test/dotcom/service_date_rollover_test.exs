defmodule Dotcom.ServiceDateRolloverTest do
  # async: false because multiple test processes subscribing to the same PubSub topic
  # can receive each other's broadcasts, causing non-deterministic failures.
  use ExUnit.Case, async: false
  use ExUnitProperties

  import Mox
  import Dotcom.ServiceDateRollover

  alias Dotcom.Utils.ServiceDateTime

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @timezone Application.compile_env!(:dotcom, :timezone)

  setup :verify_on_exit!
  # Global mode lets the GenServer process (a separate BEAM process) access the
  # stubs defined by the test process. Safe because async: false prevents concurrency.
  setup :set_mox_global

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "init/1" do
    test "initializes with empty state and continues to :schedule_next_run" do
      assert {:ok, %{}, {:continue, :schedule_next_run}} = Dotcom.ServiceDateRollover.init([])
    end
  end

  describe "ms_to_next_rollover/0" do
    test "returns a positive number of milliseconds" do
      assert ms_to_next_rollover() > 0
    end

    test "returns the correct number of milliseconds to the next service day rollover" do
      # Setup: compute the expected value using the same formula as the function under test
      now = @date_time_module.now()

      expected_rollover =
        ServiceDateTime.end_of_service_day(now)
        |> DateTime.shift(microsecond: {1, 4})

      expected_ms = DateTime.diff(expected_rollover, now, :millisecond)

      # Exercise / Verify
      assert ms_to_next_rollover() == expected_ms
    end

    test "returns fewer milliseconds when now is closer to the rollover" do
      first = ms_to_next_rollover()
      Process.sleep(10)
      second = ms_to_next_rollover()

      # Verify
      assert first > second
    end
  end

  describe "handle_info/2 :dispatch_change" do
    setup do
      {:ok, pid} = start_supervised({Dotcom.ServiceDateRollover, []}, id: :service_date_rollover)
      :ok = Phoenix.PubSub.subscribe(Dotcom.PubSub, topic_name())
      %{pid: pid}
    end

    test "broadcasts the current service date to PubSub subscribers", %{pid: pid} do
      # Setup
      expected_date = ServiceDateTime.service_date()

      # Exercise
      send(pid, :dispatch_change)

      # Verify
      assert_receive {:service_date_rollover, ^expected_date}
    end

    test "keeps the GenServer alive after dispatching", %{pid: pid} do
      # Exercise
      send(pid, :dispatch_change)
      assert_receive {:service_date_rollover, _}

      # Verify: GenServer rescheduled itself and is still running
      assert Process.alive?(pid)
    end
  end

  describe "GenServer startup" do
    test "starts successfully" do
      assert {:ok, pid} =
               start_supervised({Dotcom.ServiceDateRollover, []}, id: :service_date_rollover)

      assert Process.alive?(pid)
    end
  end

  # Moved to its own describe with a setup-level stub so the near-rollover value is
  # globally visible to the GenServer process. A stub set in a test body is only
  # accessible to the test process, causing the GenServer's mock call to fail.
  describe "GenServer startup near rollover" do
    setup do
      # ~50ms before the service day rollover so the scheduled timer fires quickly
      near_rollover = ~N[2024-06-16 02:59:59.950000] |> Timex.to_datetime(@timezone)
      stub(@date_time_module, :now, fn -> near_rollover end)
      :ok
    end

    test "automatically dispatches :service_date_rollover when the rollover time elapses" do
      :ok = Phoenix.PubSub.subscribe(Dotcom.PubSub, topic_name())
      {:ok, _pid} = start_supervised({Dotcom.ServiceDateRollover, []}, id: :service_date_rollover)

      assert_receive {:service_date_rollover, _date}, 200
    end

    test "subscribe/0 subscribes to the service date rollover topic" do
      :ok = Dotcom.ServiceDateRollover.subscribe()
      {:ok, _pid} = start_supervised({Dotcom.ServiceDateRollover, []}, id: :service_date_rollover)

      assert_receive {:service_date_rollover, _date}, 200
    end
  end
end
