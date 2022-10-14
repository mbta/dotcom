defmodule V3Api.SentryExtraTest do
  use ExUnit.Case, async: true

  import V3Api.SentryExtra
  @process_dictionary_key :sentry_context

  import Plug.Conn, only: [send_resp: 3]

  setup _ do
    bypass = Bypass.open()
    {:ok, %{bypass: bypass, url: "http://localhost:#{bypass.port}"}}
  end

  describe "log_context/2" do
    test "one message is one entry in process dictionary" do
      expects = %{extra: %{"A-1" => "B"}}
      assert :ok == log_context("A", "B")
      assert expects == Process.get(@process_dictionary_key)
    end

    test "input can be an anonymous function" do
      expects = %{extra: %{"A-1" => "B"}}
      assert :ok == log_context("A", fn -> "B" end)
      assert expects == Process.get(@process_dictionary_key)
    end

    test "52 messages is 2 entries in the process dictionary" do
      expects = %{extra: %{"A-1" => "51", "A-2" => "52"}}
      for n <- 1..52, do: log_context("A", Integer.to_string(n))
      assert expects == Process.get(@process_dictionary_key)
    end
  end

  describe "check conditions through V3Api.get_json/3" do
    test "bad json response", %{bypass: bypass, url: url} do
      expects = "V3Api.get_json_response url=\"/bad_json\" params={} response={data: garbage}"

      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/bad_json"
        send_resp(conn, 200, ~s({data: garbage}))
      end)

      V3Api.get_json("/bad_json", [], base_url: url)
      assert expects == Process.get(@process_dictionary_key).extra["api-response-error-2"]
    end

    test "bad server response", %{bypass: bypass, url: url} do
      expects = "V3Api.get_json_response url=\"/bad_response\" params={} response="

      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/bad_response"
        send_resp(conn, 500, "")
      end)

      V3Api.get_json("/bad_response", [], base_url: url)
      assert expects == Process.get(@process_dictionary_key).extra["api-response-error-2"]
    end

    test "can't connect returns an error", %{bypass: bypass, url: url} do
      Bypass.down(bypass)
      V3Api.get_json("/cant_connect", [], base_url: url)
      assert Process.get(@process_dictionary_key).extra["api-response-1"] =~ "econnrefused"
    end
  end
end
