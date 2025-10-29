defmodule DotcomWeb.SearchControllerTest do
  use DotcomWeb.ConnCase, async: false

  import Mox

  setup :verify_on_exit!

  describe "query" do
    test "sends a POST to Algolia and returns the results", %{conn: conn} do
      index = "drupal"

      params = %{
        "hitsPerPage" => 10,
        "facets" => ["projects"],
        "facetFilters" => [
          ["_content_type:project", "_content_type:project_update"]
        ]
      }

      result = []
      query = Faker.Lorem.word()

      expect(Dotcom.SearchService.Mock, :query, fn ^query, opts ->
        assert opts[:category] == index

        for {k, v} <- params do
          assert opts[String.to_atom(k)] == v
        end

        result
      end)

      response =
        conn
        |> post("/search/query", %{
          "algoliaIndexesWithParams" => [
            %{
              index => params
            }
          ],
          "algoliaQuery" => query
        })
        |> json_response(200)

      assert response == %{"results" => result}
    end

    test "returns [] if algolia returns a bad response", %{conn: conn} do
      index = "drupal"

      params = %{
        "hitsPerPage" => 10,
        "facets" => ["projects"],
        "facetFilters" => [
          ["_content_type:project", "_content_type:project_update"]
        ]
      }

      expect(Dotcom.SearchService.Mock, :query, fn _, _ ->
        {:error, :something}
      end)

      assert conn
             |> post("/search/query/", %{
               "algoliaIndexesWithParams" => [
                 %{
                   index => params
                 }
               ],
               "algoliaQuery" => ""
             })
             |> json_response(200) == %{"results" => []}
    end
  end
end
