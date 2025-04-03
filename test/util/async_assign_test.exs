defmodule Util.AsyncAssignTest do
  use ExUnit.Case, async: true

  import Plug.Test
  import Util.AsyncAssign

  test "async_assign_default/4 and await_assign_all_default/2" do
    conn = conn(:get, "/")
    assert conn.assigns[:hello] == nil
    conn = async_assign_default(conn, :hello, fn -> :world end, :default)
    conn = await_assign_all_default(conn, __MODULE__)
    assert conn.assigns[:hello] == :world
  end

  test "async_assign_default/4 and await_assign_all_default/2 with default" do
    fun = fn ->
      :timer.sleep(100)
      :world
    end

    conn = conn(:get, "/")
    assert conn.assigns[:hello] == nil

    log =
      ExUnit.CaptureLog.capture_log(fn ->
        conn = async_assign_default(conn, :hello, fun, :default)
        conn = await_assign_all_default(conn, __MODULE__, 1)
        assert conn.assigns[:hello] == :default
      end)

    assert log =~ "module=#{__MODULE__}"
    assert log =~ "key=hello"
    assert log =~ "error=async_error"
    assert log =~ "Async task timed out"
  end
end
