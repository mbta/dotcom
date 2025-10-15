defmodule DotcomWeb.Live.SearchPageTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Router.Helpers, only: [live_path: 2, live_path: 3]
  import Mox
  import Phoenix.LiveViewTest
  import Test.Support.SearchServiceFactory

  alias DotcomWeb.Live.SearchPage

  setup :verify_on_exit!

  describe "SearchPage" do
    test "mount", %{conn: conn} do
      path = live_path(conn, SearchPage)
      assert {:ok, _, _} = live(conn, path)
    end

    test "mount with query param starts searching", %{conn: conn} do
      query = Faker.App.name()
      search_count = SearchPage.categories() |> Enum.count()

      expect(Dotcom.SearchService.Mock, :query, search_count * 2, fn ^query, _ ->
        {:ok, build(:result)}
      end)

      path = live_path(conn, SearchPage, %{"query" => query})
      assert {:ok, _, _} = live(conn, path)
    end

    test "toggle sections", %{conn: conn} do
      {:ok, view, _} = initial_load_with_query(conn)
      render(view)

      for category <- SearchPage.categories() do
        assert has_element?(view, "section > h2", SearchPage.category_label(category))
      end

      off_category = SearchPage.categories() |> Faker.Util.pick()

      # A little different - LV testing seems to include all checkboxes in the
      # change event, but browsers will omit the unchecked entries
      view
      |> element("form")
      |> render_change(%{
        "category" =>
          SearchPage.categories()
          |> Map.new(&{&1, "on"})
          |> Map.put(off_category, ""),
        "_target" => ["category", off_category]
      })

      refute has_element?(view, "section > h2", SearchPage.category_label(off_category))
    end

    test "change query", %{conn: conn} do
      {:ok, view, _} = initial_load_with_query(conn)

      new_query = Faker.Pizza.meat()
      count = SearchPage.categories() |> Enum.count()

      expect(Dotcom.SearchService.Mock, :query, count, fn ^new_query, _ ->
        {:ok, build(:result)}
      end)

      view
      |> element("form")
      |> render_change(%{query: new_query, _target: ["query"]})

      assert_patch(view, "/search?query=#{new_query}")

      view
      |> element("form")
      |> render_change(%{query: "", _target: ["query"]})

      assert_patch(view, "/search")
    end

    test "change query only searches visible sections", %{conn: conn} do
      {:ok, view, _} = initial_load_with_query(conn)
      render_async(view)

      # Hide all sections except one
      on_category = SearchPage.categories() |> Faker.Util.pick()

      view
      |> element("form")
      |> render_change(%{
        "category" =>
          SearchPage.categories()
          |> Map.new(&{&1, ""})
          |> Map.put(on_category, "on"),
        "_target" => ["category", on_category]
      })

      # Update the search query
      new_query = Faker.Pizza.meat()

      # It only runs one search instead of many
      expect(Dotcom.SearchService.Mock, :query, 1, fn ^new_query, opts ->
        assert opts[:category] == on_category
        {:ok, build_list(5, :hit)}
      end)

      view
      |> element("form")
      |> render_change(%{query: new_query, _target: ["query"]})
    end
  end

  defp initial_load_with_query(conn) do
    query = Faker.App.name()
    search_count = SearchPage.categories() |> Enum.count()

    expect(Dotcom.SearchService.Mock, :query, search_count * 2, fn _, _ ->
      {:ok, build_list(5, :hit)}
    end)

    path = live_path(conn, SearchPage, %{"query" => query})
    live(conn, path, on_error: :warn)
  end
end
