defmodule TripPlan.Api.OpenTripPlannerTest do
  use ExUnit.Case, async: false
  import TripPlan.Api.OpenTripPlanner
  alias TripPlan.NamedPosition

  import Plug.Conn, only: [send_resp: 3]
  import Test.Support.EnvHelpers

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

  test "does not normally add wiremock headers", %{bypass: bypass, url: url} do
    Bypass.expect(bypass, fn conn ->
      assert List.keyfind(conn.req_headers, "x-wm-proxy-url", 0) == nil
      send_resp(conn, 404, ~s({"body": {}}))
    end)

    connection_opts = [user_id: 1, force_otp1: false, force_otp2: false]
    from = %NamedPosition{name: "a", latitude: "42.13", longitude: "12.12313"}
    to = %NamedPosition{name: "b", latitude: "42.13", longitude: "12.12313"}
    plan(from, to, connection_opts, root_url: url)
  end

  test "adds headers when WIREMOCK_PROXY=true via config", %{bypass: bypass, url: url} do
    config = Application.get_env(:dotcom, OpenTripPlanner)
    reassign_env(:dotcom, OpenTripPlanner, Keyword.merge(config, wiremock_proxy: "true"))

    Bypass.expect(bypass, fn conn ->
      assert List.keyfind(conn.req_headers, "x-wm-proxy-url", 0) != nil
      send_resp(conn, 404, ~s({"body": {}}))
    end)

    connection_opts = [user_id: 1, force_otp1: false, force_otp2: false]
    from = %NamedPosition{name: "a", latitude: "42.13", longitude: "12.12313"}
    to = %NamedPosition{name: "b", latitude: "42.13", longitude: "12.12313"}
    plan(from, to, connection_opts, root_url: url)
  end
end
