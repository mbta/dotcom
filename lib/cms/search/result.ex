defmodule CMS.Search.Result do
  @moduledoc """
  Represents a complete search result from the Drupal CMS.
  """

  alias CMS.SearchResult.{
    Event,
    File,
    LandingPage,
    Link,
    NewsEntry,
    Page,
    Person
  }

  defstruct count: 0,
            content_types: Keyword.new(),
            results: []

  @type result ::
          Event.t()
          | LandingPage.t()
          | NewsEntry.t()
          | Page.t()
          | Person.t()
          | File.t()
          | Link.t()

  @type t :: %__MODULE__{
          count: integer,
          content_types: Keyword.t(),
          results: [result]
        }

  def from_api(%{"response" => response, "facet_counts" => %{"facet_fields" => facet_fields}}) do
    %__MODULE__{
      count: response["numFound"],
      content_types: parse_content_type(facet_fields),
      results: Enum.flat_map(response["docs"], &parse_result/1)
    }
  end

  defp parse_result(%{"ss_type" => "event"} = result), do: [Event.build(result)]
  defp parse_result(%{"ss_type" => "landing_page"} = result), do: [LandingPage.build(result)]
  defp parse_result(%{"ss_type" => "news_entry"} = result), do: [NewsEntry.build(result)]
  defp parse_result(%{"ss_type" => "page"} = result), do: [Page.build(result)]
  defp parse_result(%{"ss_type" => "person"} = result), do: [Person.build(result)]
  defp parse_result(%{"ss_type" => "search_result"} = result), do: [Link.build(result)]

  defp parse_result(%{"ss_search_api_datasource" => "entity:file"} = result),
    do: [File.build(result)]

  defp parse_result(_), do: []

  defp parse_content_type(content_types) do
    content_types
    |> Map.get("content_type", [])
    |> do_parse_content_type(Keyword.new())
  end

  defp do_parse_content_type([], output), do: output

  defp do_parse_content_type([first, second | _rest] = input, output) do
    do_parse_content_type(Enum.drop(input, 2), [{first, second} | output])
  end
end
