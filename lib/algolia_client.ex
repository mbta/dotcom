defmodule AlgoliaClient do
  @moduledoc """
  A simplied interface for Algolia searches using the [`:algolia_ex`](https://hexdocs.pm/algolia_ex/readme.html) library.
  """

  require Logger

  @valid_indexes ~w(routes stops drupal)

  @doc """
  Search a single index for a given query using the [Algolia REST API](https://www.algolia.com/doc/rest-api/search/#tag/Search/operation/searchSingleIndex). Any additional search parameters, such as `facetFilters` or `hitsPerPage`, will be passed in via the third argument, `opts`.

  Instead of the entire response schema, only the list of hits are returned.
  """
  @spec search(String.t(), String.t(), Keyword.t()) :: {:ok, list()} | {:error, term()}
  def search(index, query, opts) do
    case search_algolia_index(index, query, opts) do
      {:ok, response} ->
        parse_response(response, index)

      {:error, error} ->
        _ = Logger.error("module=#{__MODULE__} error=#{inspect(error)}")
        {:error, error}
    end
  end

  # highlight tags are required for compatibility with Algolia's  autocomplete.js library v1+ for rendering matched text
  defp search_algolia_index(index, query, opts) do
    with {:ok, index} <- choose_index(index) do
      opts = Keyword.merge(default_opts(), opts)
      Algolia.search(Algolia.new(), index, query, opts)
    end
  end

  defp choose_index(index) when index in @valid_indexes do
    if prod?() do
      {:ok, index}
    else
      {:ok, index <> "_test"}
    end
  end

  defp choose_index(_), do: {:error, :invalid_index}

  defp default_opts do
    [
      analytics: prod?(),
      clickAnalytics: prod?(),
      hitsPerPage: 5,
      responseFields: ~w(hits index),
      highlightPreTag: "__aa-highlight__",
      highlightPostTag: "__/aa-highlight__"
    ]
  end

  defp prod?, do: Application.get_env(:dotcom, :is_prod_env?)

  # The response doesn't follow the documentation and omits the index name,
  # so we add it here when that happens. Also add queryID
  defp parse_response(%{status: 200, body: %{"hits" => hits} = body}, index) when is_list(hits) do
    {:ok,
     Enum.map(hits, fn hit ->
       hit
       |> Map.put("queryID", Map.get(body, "queryID"))
       |> Map.put("index", Map.get(body, "index", index))
     end)}
  end

  defp parse_response(%{body: %{"message" => message, "status" => status}}, _)
       when status in 400..599 do
    _ = Logger.error("module=#{__MODULE__} error=#{message}")
    {:error, :bad_response}
  end

  defp parse_response(_, _) do
    {:error, :bad_response}
  end

  def valid_indexes, do: @valid_indexes
end
