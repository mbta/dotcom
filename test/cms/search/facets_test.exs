defmodule CMS.Search.FacetsTest do
  use ExUnit.Case, async: true

  import CMS.Search.Facets

  alias ExUnit.CaptureLog

  describe "build/3" do
    test "search results are filtered out" do
      facets =
        "type"
        |> build([{"search_result", 5}, {"page", 5}, {"event", 3}], ["page"])
        |> Map.get("type")

      assert Enum.count(facets) == 2
      refute Enum.any?(facets, &(&1.value == "search_result"))
    end
  end

  describe "facet_responses" do
    setup do
      {:ok, %{search_fn: &content_search/3}}
    end

    test "returns same response twice when no content types are given", %{search_fn: search_fn} do
      {response, facet_response} = facet_responses("query", 0, [], search_fn: search_fn)
      assert response == facet_response
    end

    test "returns response and facet response when content types are given", %{
      search_fn: search_fn
    } do
      {response, facet_response} = facet_responses("query", 0, ["page"], search_fn: search_fn)
      assert response == "Response for page"
      assert facet_response == "Base Response"
    end

    test "returns error if either response returns an error", %{search_fn: search_fn} do
      assert facet_responses("error", 0, ["page"], search_fn: search_fn) == :error
    end

    test "timeouts result in an error", %{search_fn: search_fn} do
      log =
        CaptureLog.capture_log(fn ->
          opts = [search_fn: search_fn, response_timeout: 0]
          assert facet_responses("timeout", 0, ["page"], opts) == :error
        end)

      assert log =~ "timed out"
    end
  end

  def content_search("error", _offset, _types) do
    :error
  end

  def content_search("timeout", _offset, _types) do
    :timer.sleep(2_000)
    {:ok, "Base Response"}
  end

  def content_search(_query, _offset, []) do
    {:ok, "Base Response"}
  end

  def content_search(_query, _offset, content_types) do
    {:ok, "Response for #{content_types}"}
  end
end
