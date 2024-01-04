defmodule V3ApiTest do
  use ExUnit.Case, async: true

  import Plug.Conn, only: [fetch_query_params: 1, send_resp: 3]
  import Test.Support.EnvHelpers

  setup _ do
    bypass = Bypass.open()
    {:ok, %{bypass: bypass, url: "http://localhost:#{bypass.port}"}}
  end

  describe "get_json/1" do
    test "normal responses return a JsonApi struct", %{bypass: bypass, url: url} do
      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/normal_response"
        send_resp(conn, 200, ~s({"data": []}))
      end)

      response = V3Api.get_json("/normal_response", [], base_url: url)
      assert %JsonApi{} = response
      refute response.data == %{}
    end

    test "encodes the URL", %{bypass: bypass, url: url} do
      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/normal%20response"
        send_resp(conn, 200, ~s({"data": []}))
      end)

      response = V3Api.get_json("/normal response", [], base_url: url)
      assert %JsonApi{} = response
      refute response.data == %{}
    end

    test "does not add headers normally", %{bypass: bypass, url: url} do
      Bypass.expect(bypass, fn conn ->
        assert List.keyfind(conn.req_headers, "x-wm-proxy-url", 0) == nil
        send_resp(conn, 200, ~s({"data": []}))
      end)

      V3Api.get_json("/normal_response", [], base_url: url)
    end

    test "adds headers when WIREMOCK_PROXY=true", %{bypass: bypass, url: url} do
      reassign_env(:site, :v3_api_wiremock_proxy, "true")

      Bypass.expect(bypass, fn conn ->
        assert List.keyfind(conn.req_headers, "x-wm-proxy-url", 0) != nil
        send_resp(conn, 200, ~s({"data": []}))
      end)

      V3Api.get_json("/normal_response", [], base_url: url)
    end

    test "missing endpoints return an error", %{bypass: bypass, url: url} do
      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/missing"
        send_resp(conn, 404, ~s({"errors":[{"code": "not_found"}]}))
      end)

      response = V3Api.get_json("/missing", [], base_url: url)
      assert {:error, [%JsonApi.Error{code: "not_found"}]} = response
    end

    test "can't connect returns an error", %{bypass: bypass, url: url} do
      Bypass.down(bypass)

      response = V3Api.get_json("/cant_connect", [], base_url: url)
      assert {:error, %{reason: _}} = response
    end

    test "passes an API key if present", %{bypass: bypass, url: url} do
      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/with_api_key"
        conn = fetch_query_params(conn)

        # make sure the key is in headers
        assert Enum.member?(conn.req_headers, {"x-api-key", "test_key"})

        # make sure the key is not in params and other param values are there
        assert conn.query_params["api_key"] == nil
        assert conn.query_params["other"] == "value"
        send_resp(conn, 200, "")
      end)

      # make sure we keep other params
      V3Api.get_json("/with_api_key", [other: "value"], base_url: url, api_key: "test_key")
    end

    test "does not pass an API key if not set", %{bypass: bypass, url: url} do
      Bypass.expect(bypass, fn conn ->
        assert conn.request_path == "/without_api_key"
        refute fetch_query_params(conn).query_params["api_key"]
        send_resp(conn, 200, "")
      end)

      V3Api.get_json("/without_api_key", [], base_url: url, api_key: nil)
    end
  end

  describe "body/1" do
    test "returns a normal body if there's no content-encoding" do
      response = %HTTPoison.Response{headers: [], body: "body"}
      assert V3Api.body(response) == {:ok, "body"}
    end

    test "decodes a gzip encoded body" do
      body = "body"
      encoded_body = :zlib.gzip(body)
      header = {"Content-Encoding", "gzip"}
      response = %HTTPoison.Response{headers: [header], body: encoded_body}
      assert {:ok, ^body} = V3Api.body(response)
    end

    test "returns an error if the gzip body is invalid" do
      encoded_body = "bad gzip"
      header = {"Content-Encoding", "gzip"}
      response = %HTTPoison.Response{headers: [header], body: encoded_body}
      assert {:error, :data_error} = V3Api.body(response)
    end

    test "returns an error if we have an error instead of a response" do
      error = %HTTPoison.Error{}
      assert ^error = V3Api.body(error)
    end
  end
end
