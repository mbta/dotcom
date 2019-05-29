defmodule TripPlan.Api.OpenTripPlannerTest do
  use ExUnit.Case, async: false
  import TripPlan.Api.OpenTripPlanner
  alias TripPlan.NamedPosition

  import Plug.Conn, only: [send_resp: 3]

  setup _ do
    bypass = Bypass.open()
    {:ok, %{bypass: bypass, url: "http://localhost:#{bypass.port}"}}
  end

  describe "plan/4" do
    test "calls plan/3 and drops pid arguments" do
      expected = {:error, {:bad_param, {:bad, :arg}}}
      actual = plan({1, 1}, {2, 2}, [bad: :arg], self())
      assert expected == actual
    end
  end

  describe "plan/3" do
    test "bad options returns an error" do
      expected = {:error, {:bad_param, {:bad, :arg}}}
      actual = plan({1, 1}, {2, 2}, bad: :arg)
      assert expected == actual
    end

    test "does not normally add wiremock headers", %{bypass: bypass, url: url} do
      Bypass.expect(bypass, fn conn ->
        assert List.keyfind(conn.req_headers, "x-wm-proxy-url", 0) == nil
        send_resp(conn, 404, ~s({"body": {}}))
      end)

      from = %NamedPosition{name: "a", latitude: "42.13", longitude: "12.12313"}
      to = %NamedPosition{name: "b", latitude: "42.13", longitude: "12.12313"}
      plan(from, to, root_url: url)
    end

    test "adds headers when WIREMOCK_PROXY=true", %{bypass: bypass, url: url} do
      System.put_env("WIREMOCK_PROXY", "true")

      Bypass.expect(bypass, fn conn ->
        assert List.keyfind(conn.req_headers, "x-wm-proxy-url", 0) != nil
        send_resp(conn, 404, ~s({"body": {}}))
      end)

      from = %NamedPosition{name: "a", latitude: "42.13", longitude: "12.12313"}
      to = %NamedPosition{name: "b", latitude: "42.13", longitude: "12.12313"}
      plan(from, to, root_url: url)
      System.delete_env("WIREMOCK_PROXY")
    end
  end
end
