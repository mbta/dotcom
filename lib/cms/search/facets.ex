defmodule CMS.Search.Facets do
  @moduledoc "Module for interacting with Search Facets"

  alias CMS.Repo
  alias CMS.Search.Facet
  alias CMS.Search.Result

  @default_opts [search_fn: &Repo.search/3, response_timeout: 5000]
  @typep search_fn :: (String.t(), integer, [String.t()] -> Result.t())
  @typep content_response :: {:ok, Result.t()} | :error

  @doc """
  Returns search performed with and without content_types.
  If no content_types provided, returns base search twice
  """
  def facet_responses(query, offset, content_types, user_opts \\ []) do
    opts = Keyword.merge(@default_opts, user_opts)

    case perform_search(query, offset, content_types, opts) do
      {{:ok, response}, {:ok, facet_response}} -> {response, facet_response}
      _ -> :error
    end
  end

  defp perform_search(query, offset, [], opts) do
    result = do_perform_search(query, offset, [], opts[:search_fn])
    {result, result}
  end

  defp perform_search(query, offset, content_types, opts) do
    search_fn = opts[:search_fn]

    [filtered_search_result, base_search_result] =
      Util.async_with_timeout(
        [
          fn -> do_perform_search(query, offset, content_types, search_fn) end,
          fn -> do_perform_search(query, offset, [], search_fn) end
        ],
        :error,
        __MODULE__,
        opts[:response_timeout]
      )

    {filtered_search_result, base_search_result}
  end

  defp do_perform_search(query, offset, content_types, search_fn) do
    case search_fn.(query, offset, content_types) do
      {:ok, _response} = result -> result
      _ -> :error
    end
  end

  def build(type, facet_data, user_selections) do
    facet =
      facet_data
      |> Enum.map(&Facet.build(&1, user_selections))
      |> Enum.filter(&(&1.label != :ignore))

    Map.put(%{}, type, facet)
  end
end
