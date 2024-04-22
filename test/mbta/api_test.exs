defmodule MBTA.ApiTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.Api

  setup :set_mox_global
  setup :verify_on_exit!

  describe "get_json/1" do
    test "normal responses return a JsonApi struct" do
      expect(Req.Mock, :new, fn _ ->
        %Req.Request{}
      end)

      expect(Req.Mock, :get, fn _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: ~s({"data": []})}}
      end)

      response = Api.get_json("/normal_response")

      assert %JsonApi{} = response

      refute response.data == %{}
    end

    test "missing endpoints return an error" do
      expect(Req.Mock, :new, fn _ ->
        %Req.Request{}
      end)

      expect(Req.Mock, :get, fn _, _ ->
        {:ok, %Req.Response{status: 404, body: ~s({"errors":[{"code": "not_found"}]})}}
      end)

      response = Api.get_json("/missing")

      assert {:error, [%JsonApi.Error{code: "not_found"}]} = response
    end

    test "can't connect returns an error" do
      expect(Req.Mock, :new, fn _ ->
        %Req.Request{}
      end)

      expect(Req.Mock, :get, fn _, _ ->
        {:error, %{reason: :econnrefused}}
      end)

      response = Api.get_json("/cant_connect")

      assert {:error, %{reason: _}} = response
    end
  end
end
