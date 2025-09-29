defmodule DotcomWeb.SearchControllerTest do
  use DotcomWeb.ConnCase, async: false

  import Mox

  setup :verify_on_exit!

  @params %{"search" => %{"query" => "mbta"}}

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

  describe "index with params nojs" do
    test "search param", %{conn: conn} do
      conn = get(conn, search_path(conn, :index, @params))
      response = html_response(conn, 200)
      # check pagination
      assert response =~ "Showing results 1-10 of 2083"

      # check highlighting
      assert response =~ "solr-highlight-match"

      # check links from each type of document result
      assert response =~ "/people/monica-tibbits-nutt?from=search"
      assert response =~ "/news/2014-02-13/mbta-payroll?from=search"
      assert response =~ "/safety/transit-police/office-the-chief?from=search"
      assert response =~ "/sites/default/files/2017-01/C. Perkins.pdf?from=search"
      assert response =~ "/events/2006-10-05/board-meeting?from=search"
      assert response =~ "/fares?a=b&amp;from=search"
    end

    test "include offset", %{conn: conn} do
      params = %{@params | "search" => Map.put(@params["search"], "offset", "3")}
      conn = get(conn, search_path(conn, :index, params))
      response = html_response(conn, 200)
      assert response =~ "Showing results 31-40 of 2083"
    end

    test "include filter", %{conn: conn} do
      content_type = %{"event" => "true"}
      params = %{@params | "search" => Map.put(@params["search"], "content_type", content_type)}
      conn = get(conn, search_path(conn, :index, params))
      document = html_response(conn, 200) |> Floki.parse_document!()

      assert [{"input", attrs, _}] = Floki.find(document, "#content_type_event")
      attrs = Map.new(attrs)
      assert Map.get(attrs, "name") == "search[content_type][event]"
      assert Map.get(attrs, "type") == "checkbox"
      assert Map.get(attrs, "value") == "true"
      assert Map.get(attrs, "checked") == "checked"
    end

    test "no matches", %{conn: conn} do
      conn =
        get(conn, search_path(conn, :index, %{"search" => %{"query" => "empty", "nojs" => true}}))

      response = html_response(conn, 200)
      assert response =~ "There are no results matching"
    end

    test "empty search query", %{conn: conn} do
      conn = get(conn, search_path(conn, :index, %{"search" => %{"query" => "", "nojs" => true}}))
      response = html_response(conn, 200)
      assert response =~ "empty-search-page"
    end
  end
end
