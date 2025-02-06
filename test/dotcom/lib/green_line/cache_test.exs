defmodule Dotcom.GreenLine.CacheTest do
  use ExUnit.Case
  @moduletag :external

  import Dotcom.GreenLine.Cache

  alias Dotcom.GreenLine.CacheSupervisor
  alias Dotcom.GreenLine.Supervisor

  setup_all do
    System.put_env("WARM_CACHES", "true")
    # start parent supervisor
    _ = start_supervised({Supervisor, []})

    on_exit(fn ->
      System.put_env("WARM_CACHES", "false")
    end)
  end

  test "it calls the reset function for every date in the range" do
    test_pid = self()
    start_date_fn = fn -> ~D[1985-03-31] end
    end_date_fn = fn -> ~D[1985-04-03] end
    reset_fn = fn date -> send(test_pid, {:done, date}) end

    start_link(
      start_date_fn: start_date_fn,
      end_date_fn: end_date_fn,
      reset_fn: reset_fn,
      name: :test1
    )

    msgs =
      receive_dates([
        nil,
        ~D[1985-03-31],
        ~D[1985-04-01],
        ~D[1985-04-02],
        ~D[1985-04-03],
        ~D[1985-04-04]
      ])

    assert msgs == [:ok, :ok, :ok, :ok, :ok, :nothing]
  end

  test "it does not run forever if the end_date_fn returns nil" do
    test_pid = self()
    start_date_fn = fn -> ~D[1985-03-31] end
    end_date_fn = fn -> nil end
    reset_fn = fn date -> send(test_pid, {:done, date}) end

    start_link(
      start_date_fn: start_date_fn,
      end_date_fn: end_date_fn,
      reset_fn: reset_fn,
      name: :test1
    )

    msgs = receive_dates([nil, ~D[1985-03-31], ~D[1985-04-01]])

    assert msgs == [:ok, :ok, :nothing]
  end

  describe "next_update_after/1" do
    test "calculates proper wait time" do
      start =
        "America/New_York"
        |> Timex.now()
        |> Timex.beginning_of_day()
        |> Timex.shift(hours: 20)

      # 8pm -> 7am = 11 hrs = 39,600,000 ms

      assert next_update_after(start) == 39_600_000
    end

    test "handles beginning of daylight saving time" do
      # 2am EST -> 3am EDT
      time = ~N[2018-03-11T07:00:00]
      assert %DateTime{hour: 3} = Timex.Timezone.convert(time, "America/New_York")

      # 3am -> 7am the next day = 28 hrs
      assert time
             |> Dotcom.Utils.DateTime.to_local_time()
             |> next_update_after() == 1000 * 60 * 60 * 28
    end

    test "handles end of daylight saving time" do
      # 2am EDT -> 1am EST
      time = ~N[2018-11-04T06:00:00]
      assert %Timex.AmbiguousDateTime{} = Timex.Timezone.convert(time, "America/New_York")

      # 1am -> 7am the next day = 30 hrs
      assert time
             |> Dotcom.Utils.DateTime.to_local_time()
             |> next_update_after() == 1000 * 60 * 60 * 30
    end
  end

  test "it stops the previous day's agent" do
    yesterday = ~D[1987-03-31]
    start_supervised({CacheSupervisor, yesterday})

    test_pid = self()
    start_date_fn = fn -> ~D[1987-04-01] end
    end_date_fn = fn -> ~D[1987-04-02] end
    reset_fn = fn date -> send(test_pid, {:done, date}) end

    start_link(
      start_date_fn: start_date_fn,
      end_date_fn: end_date_fn,
      reset_fn: reset_fn,
      name: :test3
    )

    msgs = receive_dates([nil, ~D[1987-04-01], ~D[1987-04-02]])
    assert msgs == [:ok, :ok, :ok]
    assert nil == CacheSupervisor.lookup(yesterday)
  end

  test "reset_cache/1 sends a message if it fails" do
    invalid_date = ~D[1900-01-01]
    reset_cache(invalid_date, 50)

    msg =
      receive do
        {:reset_again, ^invalid_date} -> :ok
      after
        100 -> :no_msg
      end

    assert msg == :ok
  end

  defp receive_dates(dates) do
    for date <- dates do
      receive do
        {:done, ^date} -> :ok
      after
        100 -> :nothing
      end
    end
  end
end
