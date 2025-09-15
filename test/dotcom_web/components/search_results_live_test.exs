defmodule DotcomWeb.Components.SearchResultsLiveTest do
  use DotcomWeb.ConnCase, async: true

  import LiveIsolatedComponent
  import Mox
  import Phoenix.LiveViewTest
  import Test.Support.SearchServiceFactory

  alias DotcomWeb.Components.SearchResultsLive
  alias DotcomWeb.Live.SearchPage

  setup :verify_on_exit!

  describe "SearchResultsLive (disconnected)" do
    test "triggers a search with assigned query" do
      assigns = create_assigns()

      expect(Dotcom.SearchService.Mock, :query, fn query, opts ->
        assert query == assigns[:query]
        assert opts[:category] == assigns[:category]

        {:ok, build_list(5, :hit)}
      end)

      assert render_component(SearchResultsLive, assigns)
    end

    test "renders message if no results found" do
      expect(Dotcom.SearchService.Mock, :query, fn _, _ -> {:ok, []} end)
      assert render_component(SearchResultsLive, create_assigns()) =~ "No more results"
    end

    test "renders more with results" do
      expect(Dotcom.SearchService.Mock, :query, fn _, _ ->
        {:ok, build_list(5, :hit)}
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
        {:ok, build_list(5, :hit)}
      end)

      {:ok, view, _} =
        live_isolated_component(SearchResultsLive, create_assigns())

      assert render_async(view)

      # Load more first click
      expect(Dotcom.SearchService.Mock, :query, fn _, opts ->
        assert opts[:page] == 1
        {:ok, build_list(5, :hit)}
      end)

      load_more(view)
      render_async(view)

      # Load more second click
      expect(Dotcom.SearchService.Mock, :query, fn _, opts ->
        assert opts[:page] == 2
        {:ok, build_list(5, :hit)}
      end)

      load_more(view)
      render_async(view)
    end

    test "describes no results" do
      stub(Dotcom.SearchService.Mock, :query, fn _, _ -> {:ok, []} end)

      {:ok, view, _} =
        live_isolated_component(SearchResultsLive, create_assigns())

      assert render_async(view) =~ "No more results"
    end

    test "handles errors" do
      stub(Dotcom.SearchService.Mock, :query, fn _, _ -> {:error, :something} end)

      {:ok, view, _} =
        live_isolated_component(SearchResultsLive, create_assigns())

      assert render_async(view)
    end
  end

  defp create_assigns do
    %{
      id: Faker.Internet.slug(),
      query: Faker.Cat.breed(),
      category: Faker.Util.pick(SearchPage.categories())
    }
  end

  defp load_more(view) do
    view
    |> element("a", "Load more")
    |> render_click()
  end
end
