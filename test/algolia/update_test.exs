defmodule Algolia.UpdateTest do
  use ExUnit.Case, async: false

  import Mox

  require Dotcom.Assertions

  setup :set_mox_global
  setup :verify_on_exit!

  @url "http://localhost:9999"

  describe "update/0" do
    test "sends a request to the Algolia api" do
      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        data = %{
          "hits" => [
            %{"objectID" => "foo"}
          ]
        }

        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(data)}}
      end)

      expect(HTTPoison.Mock, :post, 2, fn url, _, _, _ ->
        assert url == @url <> "/1/indexes/objects/batch"

        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      response = Algolia.Update.update("http://localhost:9999")
      assert %{Algolia.MockObjects => result} = response

      assert result == :ok
    end

    test "should call until cursor returns empty" do
      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        data = %{
          "hits" => [
            %{"objectID" => "foo"}
          ],
          "cursor" => "foo"
        }

        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(data)}}
      end)

      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        data = %{
          "hits" => [
            %{"objectID" => "bar"}
          ]
        }

        {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(data)}}
      end)

      expect(HTTPoison.Mock, :post, 2, fn url, _, _, _ ->
        assert url == @url <> "/1/indexes/objects/batch"

        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      response = Algolia.Update.update("http://localhost:9999")
      assert %{Algolia.MockObjects => result} = response

      assert result == :ok
    end
  end

  describe "to_data_object/1" do
    test "builds a Algolia data object" do
      mock = %Algolia.MockObject{id: "place-test"}
      object = Algolia.Update.to_data_object(mock)

      Dotcom.Assertions.assert_equal_lists(Map.keys(object), [:data, :objectID, :rank, :url])

      assert object.objectID == Algolia.Object.object_id(mock)
      assert object.url == Algolia.Object.url(mock)
    end
  end

  describe "&build_action_map/2" do
    test "builds a Algolia action object" do
      mock = %Algolia.MockObject{id: "place-test"}
      object = Algolia.Update.build_action_map(mock, "addObject")

      assert object.action == "addObject"
      assert object.body == mock
    end
  end
end
