defmodule DotcomWeb.SearchView do
  use DotcomWeb, :view

  import DotcomWeb.CMSView, only: [render_duration: 2]
  import Dotcom.ContentRewriter, only: [rewrite: 2]

  alias CMS.Search.Result

  alias CMS.SearchResult.{
    Event,
    File,
    LandingPage,
    Link,
    NewsEntry,
    Page,
    Person
  }

  defdelegate fa_icon_for_file_type(mime), to: Dotcom.FontAwesomeHelpers

  def render_filter_option(form, type, option) do
    id = "#{type}_#{option.value}"
    name = "search[#{type}][#{option.value}]"

    content_tag :li do
      label form, type, for: id, class: "facet-label" do
        [
          content_tag(
            :input,
            "",
            type: "checkbox",
            id: id,
            name: name,
            value: "true",
            checked: option.active?
          ),
          content_tag(:span, "#{option.label} (#{option.count})")
        ]
      end
    end
  end

  def render_toggle_filter do
    [
      content_tag(:span, fa("plus-circle"), class: "search-filter-expand"),
      content_tag(:span, fa("minus-circle"), class: "search-filter-collapse")
    ]
  end

  defp search_icon(%Event{}), do: fa("calendar")
  defp search_icon(%NewsEntry{}), do: fa("newspaper-o")
  defp search_icon(%Person{}), do: fa("user")
  defp search_icon(%LandingPage{}), do: fa("file-o")
  defp search_icon(%Page{}), do: fa("file-o")
  defp search_icon(%Link{}), do: fa("file-o")
  defp search_icon(%File{mimetype: mimetype}), do: fa_icon_for_file_type(mimetype)

  defp fragment(%NewsEntry{highlights: higlights}, conn), do: highlights(higlights, conn)
  defp fragment(%Person{highlights: higlights}, conn), do: highlights(higlights, conn)
  defp fragment(%Page{highlights: higlights}, conn), do: highlights(higlights, conn)
  defp fragment(%Link{description: description}, _conn), do: description
  defp fragment(%LandingPage{highlights: higlights}, conn), do: highlights(higlights, conn)

  defp fragment(%Event{start_time: start_time, location: location}, _conn) do
    [content_tag(:div, render_duration(start_time, nil)), content_tag(:div, "#{location}")]
  end

  defp fragment(_, _conn), do: ""

  defp highlights(html_strings, conn) do
    html_strings
    |> raw()
    |> rewrite(conn)
  end

  defp track_search_click(url, origin) do
    delimiter =
      case String.contains?(url, "?") do
        true -> "&"
        false -> "?"
      end

    "#{url}#{delimiter}from=#{origin}"
  end
end
