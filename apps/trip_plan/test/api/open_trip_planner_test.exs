defmodule TripPlan.Api.OpenTripPlannerTest do
  use ExUnit.Case, async: false
  import TripPlan.Api.OpenTripPlanner

  import Plug.Conn, only: [send_resp: 3]

  setup _ do
    bypass = Bypass.open()
    {:ok, %{bypass: bypass, url: "http://localhost:#{bypass.port}"}}
  end

  describe "plan/5" do
    test "calls plan/4 and drops pid arguments" do
      connection_opts = [user_id: 1, force_otp1: false, force_otp2: false]

      expected = {:error, {:bad_param, {:bad, :arg}}}
      actual = plan({1, 1}, {2, 2}, connection_opts, [bad: :arg], self())
      assert expected == actual
    end
  end

  describe "plan/4" do
    test "bad options returns an error" do
      connection_opts = [user_id: 1, force_otp1: false, force_otp2: false]

      expected = {:error, {:bad_param, {:bad, :arg}}}
      actual = plan({1, 1}, {2, 2}, connection_opts, bad: :arg)
      assert expected == actual
    end
  end
end
