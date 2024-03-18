defmodule MBTA.ApiTest do
  use ExUnit.Case, async: false

  alias MBTA.Api

  import Mox

  setup :set_mox_global
  setup :verify_on_exit!

  describe "get_json/1" do
    test "normal responses return a JsonApi struct" do
      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: ~s({"data": []})}}
      end)

      response = Api.get_json("/normal_response")

      assert %JsonApi{} = response

      refute response.data == %{}
    end

    test "encodes the URL" do
      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: ~s({"data": []})}}
      end)

      response = Api.get_json("/normal response")

      assert %JsonApi{} = response

      refute response.data == %{}
    end

    test "does not add headers normally" do
      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: ~s({"data": []})}}
      end)

      Api.get_json("/normal_response")
    end

    test "missing endpoints return an error" do
      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 404, body: ~s({"errors":[{"code": "not_found"}]})}}
      end)

      response = Api.get_json("/missing")

      assert {:error, [%JsonApi.Error{code: "not_found"}]} = response
    end

    test "can't connect returns an error" do
      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        {:error, %HTTPoison.Error{id: nil, reason: :econnrefused}}
      end)

      response = Api.get_json("/cant_connect")

      assert {:error, %{reason: _}} = response
    end

    test "passes an API key if present" do
      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: ~s({"data": []})}}
      end)

      Api.get_json("/with_api_key", [other: "value"], api_key: "test_key")
    end

    test "does not pass an API key if not set" do
      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: ~s({"data": []})}}
      end)

      Api.get_json("/without_api_key", [], api_key: nil)
    end
  end

  describe "body/1" do
    test "returns a normal body if there's no content-encoding" do
      response = %HTTPoison.Response{headers: [], body: "body"}

      assert Api.body(response) == {:ok, "body"}
    end

    test "decodes a gzip encoded body" do
      body = "body"
      encoded_body = :zlib.gzip(body)
      header = {"Content-Encoding", "gzip"}
      response = %HTTPoison.Response{headers: [header], body: encoded_body}
      assert {:ok, ^body} = Api.body(response)
    end

    test "returns an error if the gzip body is invalid" do
      encoded_body = "bad gzip"
      header = {"Content-Encoding", "gzip"}
      response = %HTTPoison.Response{headers: [header], body: encoded_body}

      assert {:error, :data_error} = Api.body(response)
    end

    test "returns an error if we have an error instead of a response" do
      error = %HTTPoison.Error{}

      assert ^error = Api.body(error)
    end
  end
end
