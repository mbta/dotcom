defmodule Algolia.ApiTest do
  use ExUnit.Case

  @request ~s({"requests" : [{"indexName" : "index"}]})
  @success_response ~s({"message" : "success"})

  describe "post" do
    test "sends a post request to /1/indexes/$INDEX/$ACTION" do
      bypass = Bypass.open()

      Bypass.expect(bypass, "POST", "/1/indexes/*/queries", fn conn ->
        {:ok, body, conn} = Plug.Conn.read_body(conn)

        case Poison.decode(body) do
          {:ok, %{"requests" => [%{"indexName" => "index"}]}} ->
            Plug.Conn.send_resp(conn, 200, @success_response)

          _ ->
            Plug.Conn.send_resp(conn, 400, ~s({"error" : "bad request"}))
        end
      end)

      opts = %Algolia.Api{
        host: "http://localhost:#{bypass.port}",
        referrer: nil,
        index: "*",
        action: "queries",
        body: @request
      }

      assert {:ok, %HTTPoison.Response{status_code: 200, body: body}} = Algolia.Api.post(opts)
      assert body == @success_response
    end

    test "logs a warning if config keys are missing" do
      bypass = Bypass.open()

      opts = %Algolia.Api{
        host: "http://localhost:#{bypass.port}",
        referrer: nil,
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

    test "uses the referrer in the POST request header" do
      bypass = Bypass.open()

      referrer = "something.somewhere.com"

      Bypass.expect(bypass, "POST", "/1/indexes/*/queries", fn conn ->
        assert [referrer] = Plug.Conn.get_req_header(conn, "referrer")
        Plug.Conn.send_resp(conn, 200, "")
      end)

      %Algolia.Api{
        host: "http://localhost:#{bypass.port}",
        referrer: referrer,
        index: "*",
        action: "queries",
        body: @request
      }
      |> Algolia.Api.post()
    end
  end
end
