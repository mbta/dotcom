defmodule Algolia.ApiTest do
  use ExUnit.Case

  @failure_request ~s({"requests" : [{"indexName" : "failure"}]})
  @failure_response ~s({"error" : "bad request"})
  @success_request ~s({"requests" : [{"indexName" : "success"}]})
  @success_response ~s({"message" : "success"})

  describe "post" do
    test "sends a post request once to /1/indexes/$INDEX/$ACTION" do
      bypass = Bypass.open()

      Bypass.expect_once(bypass, "POST", "/1/indexes/*/queries", fn conn ->
        Plug.Conn.send_resp(conn, 200, @success_response)
      end)

      opts = %Algolia.Api{
        host: "http://localhost:#{bypass.port}",
        index: "*",
        action: "queries",
        body: @success_request
      }

      assert {:ok, %HTTPoison.Response{status_code: 200, body: body}} = Algolia.Api.post(opts)
      assert body == @success_response
      # Can be called again with result from cache instead of hitting the API endpoint
      assert {:ok, %HTTPoison.Response{status_code: 200, body: ^body}} = Algolia.Api.post(opts)
    end

    test "does not cache a failed response" do
      bypass = Bypass.open()

      opts = %Algolia.Api{
        host: "http://localhost:#{bypass.port}",
        index: "*",
        action: "queries"
      }

      Bypass.expect(bypass, "POST", "/1/indexes/*/queries", fn conn ->
        {:ok, body, conn} = Plug.Conn.read_body(conn)

        if body == @success_request do
          Plug.Conn.send_resp(conn, 200, @success_response)
        else
          Plug.Conn.send_resp(conn, 400, @failure_response)
        end
      end)

      assert {:error, %HTTPoison.Response{status_code: 400, body: body}} =
               Algolia.Api.post(Map.merge(opts, %{body: @failure_request}))

      assert body == @failure_response

      assert {:ok, %HTTPoison.Response{status_code: 200, body: body}} =
               Algolia.Api.post(Map.merge(opts, %{body: @success_request}))

      assert body == @success_response
    end

    test "logs a warning if config keys are missing" do
      bypass = Bypass.open()

      opts = %Algolia.Api{
        host: "http://localhost:#{bypass.port}",
        index: "*",
        action: "queries",
        body: @request
      }

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert Algolia.Api.post(opts, %Algolia.Config{}) == {:error, :bad_config}
        end)

      assert log =~ "missing Algolia config keys"
    end
  end
end
