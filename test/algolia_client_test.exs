defmodule AlgoliaClientTest do
  use ExUnit.Case, async: true

  import Test.Support.SearchServiceFactory

  describe "search/3" do
    test "returns hits with queryID and index" do
      index = Faker.Lorem.word()
      query_id = Faker.Lorem.characters()

      Tesla.Mock.mock(fn
        %{method: :post} ->
          %Tesla.Env{
            status: 200,
            body: %{
              "index" => index,
              "hits" => build_list(3, :hit),
              "queryID" => query_id
            }
          }
      end)

      assert {:ok, hits} = random_search()
      assert [%{"index" => ^index, "queryID" => ^query_id} | _] = hits
    end

    test "returns error if index is wrong" do
      index = Faker.Lorem.word()
      query = Faker.Lorem.word()
      assert {:error, :invalid_index} = AlgoliaClient.search(index, query, [])
    end

    test "logs errors from Algolia REST API response" do
      error_code = Faker.Internet.StatusCode.client_error()
      error_message = Faker.Lorem.Shakespeare.hamlet()

      Tesla.Mock.mock(fn
        %{method: :post} ->
          %Tesla.Env{
            status: error_code,
            body: %{
              "message" => error_message,
              "status" => error_code
            }
          }
      end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert {:error, :bad_response} = random_search()
        end)

      assert log =~ "[error]"
      assert log =~ error_message
    end
  end

  defp random_search do
    index = Faker.Util.pick(AlgoliaClient.valid_indexes())
    query = Faker.Lorem.word()
    AlgoliaClient.search(index, query, [])
  end
end
