defmodule Algolia.ApiTest do
  use ExUnit.Case, async: false

  import ExUnit.CaptureLog
  import Mox

  @failure_response Poison.encode!(%{"error" => "failure"})
  @request Poison.encode!(%{"requests" => [indexName: "*"]})
  @success_response Poison.encode!(%{"ok" => "success"})
  @url "http://localhost:9999"

  setup do
    cache = Application.get_env(:dotcom, :cache)

    cache.flush()

    :ok
  end

  setup :verify_on_exit!

  describe "action" do
    test "caches a successful response" do
      expect(HTTPoison.Mock, :post, fn _url, _body, _headers, _opts ->
        {:ok, %HTTPoison.Response{status_code: 200, body: @success_response}}
      end)

      opts = %Algolia.Api{
        host: @url,
        index: "*",
        action: "queries",
        body: @request
      }

      response = Algolia.Api.action(:post, opts)
      assert {:ok, %HTTPoison.Response{status_code: 200, body: body}} = response

      assert body == @success_response

      # Can be called again with result from cache instead of hitting the API endpoint
      response = Algolia.Api.action(:post, opts)
      assert {:ok, %HTTPoison.Response{status_code: 200, body: ^body}} = response
    end

    test "does not cache a failed response" do
      expect(HTTPoison.Mock, :post, fn _url, _body, _headers, _opts ->
        {:error, %HTTPoison.Response{status_code: 400, body: @failure_response}}
      end)

      failure_opts = %Algolia.Api{
        host: @url,
        index: "*",
        action: "queries",
        body: @request
      }

      response = Algolia.Api.action(:post, failure_opts)
      assert {:error, %HTTPoison.Response{status_code: 400, body: body}} = response

      assert body == @failure_response

      expect(HTTPoison.Mock, :post, fn _url, _body, _headers, _opts ->
        {:ok, %HTTPoison.Response{status_code: 200, body: @success_response}}
      end)

      success_opts = %Algolia.Api{
        host: @url,
        index: "*",
        action: "queries",
        body: @request
      }

      response = Algolia.Api.action(:post, success_opts)
      assert {:ok, %HTTPoison.Response{status_code: 200, body: body}} = response

      assert body == @success_response
    end

    test "adds the query params to the request url" do
      params = %{"foo" => "bar"}
      response_body = Poison.encode!(%{"hits" => [%{"objectID" => "foo"}]})

      expect(HTTPoison.Mock, :post, fn url, _body, _headers, _opts ->
        query_params = URI.decode_query(URI.parse(url).query)
        assert query_params == params

        {:ok, %HTTPoison.Response{status_code: 200, body: response_body}}
      end)

      opts = %Algolia.Api{
        host: @url,
        index: "foo",
        action: "",
        body: "",
        query_params: params
      }

      response = Algolia.Api.action(:post, opts)
      assert {:ok, %HTTPoison.Response{status_code: 200, body: body}} = response

      assert body == response_body
    end

    test "logs a warning if config keys are missing" do
      opts = %Algolia.Api{
        host: @url,
        index: "*",
        action: "queries",
        body: @request
      }

      log =
        capture_log(fn ->
          assert Algolia.Api.action(:post, opts, %Algolia.Config{}) == {:error, :bad_config}
        end)

      assert log =~ "missing Algolia config keys"
    end
  end
end
