defmodule TripPlan.Api.OpenTripPlannerTest do
  use ExUnit.Case, async: false

  import Mox
  import Plug.Conn, only: [send_resp: 3]
  import Test.Support.EnvHelpers

  alias TripPlan.Api.OpenTripPlanner
  alias TripPlan.NamedPosition

  setup :verify_on_exit!

  describe "plan/5" do
    test "calls plan/4 and drops pid arguments" do
      connection_opts = [user_id: 1, force_otp1: false, force_otp2: false]
      expected = {:error, {:bad_param, {:bad, :arg}}}

      expect(TripPlan.Api.OpenTripPlanner.Mock, :plan, fn _, _, _, _ -> expected end)

      actual = OpenTripPlanner.plan({1, 1}, {2, 2}, connection_opts, [bad: :arg], self())
      assert expected == actual
    end
  end

  describe "plan/4" do
    test "bad options returns an error" do
      connection_opts = [user_id: 1]
      expected = {:error, {:bad_param, {:bad, :arg}}}

      expect(TripPlan.Api.OpenTripPlanner.Mock, :plan, fn _, _, _, _ -> expected end)

      actual = OpenTripPlanner.Behaviour.plan({1, 1}, {2, 2}, connection_opts, bad: :arg)

      assert expected == actual
    end
  end
end
