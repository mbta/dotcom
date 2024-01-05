defmodule Dotcom.GreenLine.DateAgentTest do
  use ExUnit.Case, async: false

  import Dotcom.GreenLine.DateAgent

  test "Can stop an agent" do
    {:ok, pid} = start_link(nil, :green_line_date_agent_test_stop)
    :ok = stop(pid)
    assert !Process.alive?(pid)
  end

  test "Starting an agent calls its calculate_state function, and the values can be retrieved" do
    date = ~D[2016-01-02]
    {:ok, pid} = start_link(date, :green_line_date_agent_test_state_calc, fn _ -> {1, 2} end)
    assert stops_on_routes(pid, 0) == 1
    assert stops_on_routes(pid, 1) == 2

    reset(pid, date, fn _ -> {3, 4} end)
    assert stops_on_routes(pid, 0) == 3
    assert stops_on_routes(pid, 1) == 4
  end

  test "If the calculate_state function returns an error, so does start_link" do
    calc_fn = fn _ -> {:error, :foo} end

    assert {:error, :foo} == start_link(nil, :green_line_date_agent_test_state_calc, calc_fn)
  end

  test "If reset errors, does not clear cache" do
    date = ~D[2016-01-03]
    bad_calc_fn = fn _ -> {:error, :foo} end

    {:ok, pid} = start_link(date, :green_line_date_agent_test_state_calc, fn _ -> {1, 2} end)
    assert {:error, :foo} == reset(pid, date, bad_calc_fn)
    assert stops_on_routes(pid, 0) == 1
  end
end
