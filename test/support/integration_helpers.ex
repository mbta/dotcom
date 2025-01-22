defmodule DotcomWeb.IntegrationHelpers do
  @moduledoc false
  import Wallaby.Browser
  import Wallaby.Query

  def search_results_section(count) do
    css(".c-search-results__section", count: count)
  end

  def search_hits(count) do
    css(".c-search-result__hit", count: count)
  end

  def toggle_facet_section(session, name) do
    click(session, css("#expansion-container-#{name}"))
  end

  def click_facet_checkbox(session, facet) do
    click(session, css("#checkbox-container-#{facet}"))
  end

  def facet_checkbox(facet) do
    css("#checkbox-item-#{facet}", visible: false)
  end

  def click_clear_search(session) do
    session
    |> click(css("#search-global__reset"))
    |> refute_has(css("#search-global__reset"))
  end
end
