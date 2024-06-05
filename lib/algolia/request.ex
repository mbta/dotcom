defmodule Algolia.Query.Request do
  @moduledoc """
  Algolia's REST API expects this format for each request
  https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-preset-algolia/getAlgoliaResults/#param-queries-2

  This module has some helpers to create requests for our indexes with some
  specific default parameters.
  """
  @supported_indexes Algolia.Query.valid_indexes()
  @supported_index_keys Algolia.Query.valid_indexes() |> Keyword.keys() |> Enum.map(&to_string/1)

  defstruct indexName: "",
            query: "",
            params: %{
              "hitsPerPage" => 5,
              "clickAnalytics" => true,
              "facets" => ["*"],
              "facetFilters" => [[]]
            },
            attributesToHighlight: ""

  @type t :: %__MODULE__{
          indexName: String.t(),
          query: String.t(),
          params: map(),
          attributesToHighlight: String.t() | [String.t()]
        }
  @spec new(String.t(), String.t()) :: t()
  def new(index_name, query) when index_name in @supported_index_keys do
    algolia_index = Keyword.fetch!(@supported_indexes, String.to_atom(index_name))

    %__MODULE__{
      indexName: algolia_index,
      query: query,
      attributesToHighlight: highlight(index_name)
    }
    |> with_hit_size(index_name)
    |> with_facet_filters(index_name)
  end

  defp highlight("routes"), do: ["route.name", "route.long_name"]
  defp highlight("stops"), do: "stop.name"
  defp highlight("drupal"), do: "content_title"

  defp with_hit_size(request, indexName) do
    %__MODULE__{
      request
      | params: %{request.params | "hitsPerPage" => hit_size(indexName)}
    }
  end

  defp hit_size("routes"), do: 5
  defp hit_size("stops"), do: 2
  defp hit_size("drupal"), do: 2

  @spec with_facet_filters(t(), String.t()) :: t()
  defp with_facet_filters(request, "drupal") do
    %__MODULE__{
      request
      | params: %{
          request.params
          | "facetFilters" => [
              [
                "_content_type:page",
                "_content_type:search_result",
                "_content_type:diversion",
                "_content_type:landing_page",
                "_content_type:person",
                "_content_type:project",
                "_content_type:project_update"
              ]
            ]
        }
    }
  end

  defp with_facet_filters(request, _), do: request

  def encode(%__MODULE__{} = request) do
    request
    |> Map.from_struct()
    |> Map.update!(:params, &Algolia.Query.encode_params/1)
    |> Map.new(fn {k, v} -> {to_string(k), v} end)
    # The highlight tag values are needed for compatibility with Algolia's
    # autocomplete.js library v1+
    |> Map.put_new("highlightPreTag", "__aa-highlight__")
    |> Map.put_new("highlightPostTag", "__/aa-highlight__")
  end
end
