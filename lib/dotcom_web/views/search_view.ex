defmodule DotcomWeb.SearchView do
  use DotcomWeb, :view

  defdelegate fa_icon_for_file_type(mime), to: Dotcom.FontAwesomeHelpers

  @spec render_filter_option(PhoenixHTMLHelpers.Form, atom, map) :: Phoenix.HTML.safe()
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

  @spec render_toggle_filter() :: [Phoenix.HTML.safe()]
  def render_toggle_filter do
    [
      content_tag(:span, fa("plus-circle"), class: "search-filter-expand"),
      content_tag(:span, fa("minus-circle"), class: "search-filter-collapse")
    ]
  end
end
