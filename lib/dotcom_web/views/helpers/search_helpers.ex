defmodule DotcomWeb.SearchHelpers do
  import PhoenixHTMLHelpers.Tag, only: [content_tag: 3]
  import PhoenixHTMLHelpers.Form, only: [form_for: 4, search_input: 3]
  import DotcomWeb.Router.Helpers, only: [search_path: 2]

  @form_options [as: :search, method: :get]
  @placeholder "Search by keyword"

  @spec desktop_form(Plug.Conn.t(), map) :: Phoenix.HTML.safe()
  def desktop_form(conn, params) do
    form_for(conn, search_path(conn, :index), @form_options, fn _ ->
      [
        search_input(
          :search,
          :query,
          value: get_search_from_query(params),
          placeholder: @placeholder,
          autocomplete: "off",
          data: [input: "search"]
        ),
        content_tag :button,
          class: "search-button search-button-xl",
          aria: [label: "submit search"] do
          DotcomWeb.PageView.svg_icon(%Dotcom.Components.Icons.SvgIcon{
            icon: :search,
            show_tooltip?: false
          })
        end
      ]
    end)
  end

  @spec get_search_from_query(map) :: String.t()
  defp get_search_from_query(%{"search" => %{"query" => query}}), do: query
  defp get_search_from_query(_), do: ""
end
