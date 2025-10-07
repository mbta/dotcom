defmodule Dotcom.SearchServiceTest do
  use ExUnit.Case, async: true

  import Dotcom.SearchService
  import Test.Support.SearchServiceFactory

  describe "query/2" do
    test "makes requests" do
      category = Faker.Util.pick(known_categories())
      query = Faker.Lorem.word()

      Tesla.Mock.mock(fn
        %{method: :post, body: body, url: url, headers: headers} ->
          assert url =~ "algolia.net"
          assert [{"X-Algolia-API-Key", _} | _] = headers
          assert %{"query" => ^query} = Jason.decode!(body)

          %Tesla.Env{
            status: 200,
            body: %{"hits" => build_list(3, :hit), "nbHits" => 3, "nbPages" => 1, "page" => 1}
          }
      end)

      assert {:ok, _} = query(query, category: category)
    end

    test "adds facetFilters for certain categories" do
      category = Faker.Util.pick(known_categories() -- ~w(routes stops))

      Tesla.Mock.mock(fn
        %{method: :post, body: body} ->
          assert %{"facetFilters" => _} = Jason.decode!(body)

          %Tesla.Env{
            status: 200,
            body: %{"nbHits" => 3, "nbPages" => 1, "page" => 1, "hits" => build_list(3, :hit)}
          }
      end)

      assert {:ok, _} = query(Faker.Lorem.word(), category: category)
    end

    test "adds custom params" do
      key = Faker.Lorem.word()
      value = Faker.App.name()

      Tesla.Mock.mock(fn
        %{method: :post, body: body} ->
          decoded_body = Jason.decode!(body)
          assert Map.get(decoded_body, key) == value

          %Tesla.Env{
            status: 200,
            body: %{"nbHits" => 0, "nbPages" => 1, "page" => 1, "hits" => []}
          }
      end)

      assert {:ok, _} = query(Faker.Lorem.word(), Keyword.new([{String.to_atom(key), value}]))
    end
  end
end
