defmodule DotcomWeb.Components.SearchResultsLiveTest do
  use DotcomWeb.ConnCase, async: true

  import LiveIsolatedComponent
  import Mox
  import Phoenix.LiveViewTest
  import Test.Support.SearchServiceFactory

  alias DotcomWeb.Components.SearchResultsLive
  alias DotcomWeb.SearchPageLive

  setup :verify_on_exit!

  describe "SearchResultsLive (disconnected)" do
    test "triggers a search with assigned query" do
      assigns = create_assigns()

      expect(Dotcom.SearchService.Mock, :query, fn query, opts ->
        assert query == assigns[:query]
        assert opts[:category] == assigns[:category]

        {:ok, build(:result)}
      end)

      assert render_component(SearchResultsLive, assigns)
    end

    test "renders more with results" do
      expect(Dotcom.SearchService.Mock, :query, fn _, _ ->
        {:ok, build(:result)}
      end)

      list_items =
        render_component(SearchResultsLive, create_assigns())
        |> Floki.parse_document!()
        |> Floki.find("ul > li")

      assert Enum.count(list_items) > 0
    end
  end

  describe "SearchResultsLive (connected)" do
    test "triggers more searching" do
      # fired twice, once on initial mount and second on connect
      expect(Dotcom.SearchService.Mock, :query, 2, fn _, _ ->
        {:ok, %{hits: build_list(5, :hit), page: 0, total_pages: 8, total_hits: 40}}
      end)

      {:ok, view, _} =
        live_isolated_component(SearchResultsLive, create_assigns())

      assert render(view)

      # Load more first click
      expect(Dotcom.SearchService.Mock, :query, fn _, opts ->
        assert opts[:page] == 1
        {:ok, %{hits: build_list(5, :hit), page: 1, total_pages: 8, total_hits: 40}}
      end)

      load_more(view)
      render(view)

      # Load more second click
      expect(Dotcom.SearchService.Mock, :query, fn _, opts ->
        assert opts[:page] == 2
        {:ok, %{hits: build_list(5, :hit), page: 2, total_pages: 8, total_hits: 40}}
      end)

      load_more(view)
      render(view)
    end

    test "describes no results" do
      stub(Dotcom.SearchService.Mock, :query, fn _, _ ->
        {:ok, %{hits: [], page: 1, total_pages: 1, total_hits: 0}}
      end)

      {:ok, view, _} =
        live_isolated_component(SearchResultsLive, create_assigns())

      assert render(view) =~ "0 results"
    end

    test "handles errors" do
      stub(Dotcom.SearchService.Mock, :query, fn _, _ -> {:error, :something} end)

      {:ok, view, _} =
        live_isolated_component(SearchResultsLive, create_assigns())

      assert render(view)
    end
  end

  defp create_assigns do
    %{
      id: Faker.Internet.slug(),
      query: Faker.Cat.breed(),
      category: Faker.Util.pick(SearchPageLive.categories())
    }
  end

  defp load_more(view) do
    view
    |> element("a", "Load more")
    |> render_click()
  end
end
