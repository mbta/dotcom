defmodule Dotcom.SearchService do
  @moduledoc """
  Find stuff! Currently searches Algolia for routes, stops, and other content.
  """

  use Nebulex.Caching.Decorators

  @callback query(String.t(), Keyword.t()) :: {:ok, list()} | {:error, term()}
  @behaviour __MODULE__

  @cache Application.compile_env!(:dotcom, :cache)

  def known_categories, do: ~w(routes stops documents events news pages projects)

  @impl __MODULE__
  def query(text, opts) do
    {category, opts} = Keyword.pop(opts, :category)
    query_for_category(category, text, opts)
  end

  # These correspond to the Algolia indexes directly
  @decorate cacheable(
              cache: @cache,
              on_error: :nothing,
              opts: [ttl: :timer.hours(12)]
            )
  defp query_for_category(category, query, opts) when category in ["stops", "routes"] do
    AlgoliaClient.search(category, query, opts)
  end

  # The other categories are associated with Drupal content! We need facetFilters to get the correct items.
  defp query_for_category(category, query, opts) do
    {facets, facet_filters} =
      case category do
        "documents" ->
          {["*"], [["search_api_datasource:entity:file"]]}

        "events" ->
          {["_content_type"], [["_content_type:event"]]}

        "news" ->
          {["_content_type"], [["_content_type:news_entry"]]}

        "pages" ->
          {["*"],
           [
             [
               "_content_type:page",
               "_content_type:diversion",
               "_content_type:search_result",
               "_content_type:landing_page",
               "_content_type:person"
             ]
           ]}

        "projects" ->
          {["*"], [["_content_type:project", "_content_type:project_update"]]}

        _ ->
          {["*"], [[]]}
      end

    [facets: facets, facetFilters: facet_filters]
    |> Keyword.merge(opts)
    |> then(&AlgoliaClient.search("drupal", query, &1))
  end
end
