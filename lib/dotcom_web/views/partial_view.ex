defmodule DotcomWeb.PartialView do
  @moduledoc """
  Handles rendering of partial components and CMS content.
  """

  use DotcomWeb, :view

  import DotcomWeb.CMS.ParagraphView, only: [render_paragraph: 2]
  import DotcomWeb.CMS.TeaserView, only: [transit_svg: 1, transit_tag: 1, handle_fields: 2]
  import DotcomWeb.CMSView, only: [file_description: 1]

  alias CMS.Partial.Teaser
  alias CMS.Repo
  alias DotcomWeb.CMS.TeaserView
  alias DotcomWeb.PartialView.SvgIconWithCircle
  alias Phoenix.HTML.Safe
  alias Plug.Conn
  alias Routes.Route

  defdelegate fa_icon_for_file_type(mime), to: Dotcom.FontAwesomeHelpers

  @spec clear_selector_link(map()) :: Safe.t()
  def clear_selector_link(%{clearable?: true, selected: selected} = assigns) when not is_nil(selected) do
    link to: update_url(assigns.conn, [{assigns.query_key, nil}]) do
      [
        "(clear",
        content_tag(:span, [" ", assigns.placeholder_text], class: "sr-only"),
        ")"
      ]
    end
  end

  def clear_selector_link(_assigns) do
    ""
  end

  @doc """
  Abstraction layer for displaying a list of teasers outside of the CMS app.
  List type is determined by the first teaser's :type value. Avoid creating
  a single list with multiple, mixed content types.
  """
  @spec render_teasers([Teaser.t()], Conn.t(), Keyword.t()) :: Phoenix.HTML.safe()
  def render_teasers(teasers, conn, opts \\ [])

  def render_teasers([], _, _), do: {:safe, []}

  def render_teasers(nil, _, _), do: {:safe, []}

  def render_teasers(teasers, conn, opts) do
    display_fields =
      teasers
      |> List.first()
      |> Map.get(:type)
      |> handle_fields(opts[:fields])

    TeaserView.render(
      "_teaser_list.html",
      teasers: teasers,
      fields: display_fields,
      list_class: Keyword.get(opts, :list_class, ""),
      conn: conn
    )
  end

  @doc """
  Renders homepage news entries. Takes two options:
    size: :large | :small
    class: class to apply to the link
  """
  @spec news_entry(Teaser.t(), Keyword.t()) :: Safe.t()
  def news_entry(entry, opts \\ []) do
    size = Keyword.get(opts, :size, :small)
    color = transit_tag(entry)
    svg = transit_svg(entry)
    opts = [{:color, color} | opts]

    link(
      [
        SvgIconWithCircle.svg_icon_with_circle(%SvgIconWithCircle{icon: svg}),
        content_tag(
          :div,
          [raw(entry.title), news_date(entry, size)],
          class: "c-news-entry__title c-news-entry__title--#{size}"
        )
      ],
      to: news_path(entry, DotcomWeb.Endpoint),
      class: news_entry_class(opts),
      id: "#{entry.id}"
    )
  end

  @spec news_path(Teaser.t(), module | Conn.t()) :: String.t()
  defp news_path(%Teaser{path: url}, conn), do: cms_static_page_path(conn, url)

  @spec news_date(Teaser.t(), :large | :small) :: Safe.t()
  defp news_date(%Teaser{date: date}, size), do: do_news_date(date, size)

  @spec do_news_date(Date.t(), :large | :small) :: Safe.t()
  defp do_news_date(date, size) do
    content_tag(
      :div,
      [
        content_tag(
          :span,
          Timex.format!(date, "{Mshort}"),
          class: "c-news-entry__month c-news-entry__month--#{size}"
        ),
        content_tag(
          :span,
          Timex.format!(date, "{0D}"),
          class: "c-news-entry__day--#{size}"
        )
      ],
      class: "c-news-entry__date c-news-entry__date--#{size} u-small-caps"
    )
  end

  @spec news_entry_class(Keyword.t()) :: String.t()
  defp news_entry_class(opts) do
    size = Keyword.get(opts, :size, :small)
    class = Keyword.get(opts, :class, "")
    color = Keyword.get(opts, :color)

    Enum.join(
      [
        "c-news-entry",
        "c-news-entry--#{size}",
        "c-news-entry--#{color}",
        class
      ],
      " "
    )
  end

  @doc """
  Renders a specific CMS paragraph, provided an alias to it and the conn.
  """
  @spec paragraph(String.t(), Conn.t()) :: Safe.t()
  def paragraph(path, conn) do
    path
    |> Repo.get_paragraph(conn.query_params)
    |> render_paragraph(conn)
  end

  @doc """
  Renders the All/Current/Planned filters for an alerts list.
  The third argument is for the link generated for each item;
  the first element in the tuple is the path helper method
  that should be used
  """
  @spec alert_time_filters(atom, Keyword.t()) :: Safe.t()
  def alert_time_filters(current_timeframe, path_opts) do
    [
      content_tag(:h3, "Filter by type"),
      content_tag(
        :div,
        Enum.map([nil, :current, :upcoming], &time_filter(&1, current_timeframe, path_opts)),
        class: "m-alerts__time-filters"
      )
    ]
  end

  @spec time_filter(atom, atom, Keyword.t()) :: Safe.t()
  defp time_filter(filter, current_timeframe, path_opts) do
    path_method = Keyword.fetch!(path_opts, :method)

    # item can be an atom (representing a mode) or a Route
    item = path_opts |> Keyword.fetch!(:item) |> get_item_value()

    path_params =
      path_opts
      |> Keyword.get(:params, [])
      |> time_filter_params(filter)

    path =
      apply(DotcomWeb.Router.Helpers, path_method, [DotcomWeb.Endpoint, :show, item, path_params])

    filter
    |> time_filter_text()
    |> link(
      class: time_filter_class(filter, current_timeframe),
      to: path
    )
  end

  @spec get_item_value(Route.t() | atom) :: Route.id_t() | atom
  defp get_item_value(route_or_mode) when is_atom(route_or_mode), do: route_or_mode
  defp get_item_value(route_or_mode), do: route_or_mode.id

  @spec time_filter_text(atom) :: String.t()
  defp time_filter_text(nil), do: "All Alerts"
  defp time_filter_text(:current), do: "Current Alerts"
  defp time_filter_text(:upcoming), do: "Planned Service Alerts"

  @spec time_filter_params(Keyword.t(), atom) :: Keyword.t()
  defp time_filter_params(params, nil), do: params

  defp time_filter_params(params, timeframe) when timeframe in [:current, :upcoming],
    do: Keyword.put(params, :alerts_timeframe, timeframe)

  @spec time_filter_class(atom, atom) :: String.t()
  defp time_filter_class(filter, current_timeframe) do
    Enum.join(["m-alerts__time-filter" | time_filter_selected_class(filter, current_timeframe)], " ")
  end

  @spec time_filter_selected_class(atom, atom) :: [String.t()]
  defp time_filter_selected_class(filter, filter) do
    ["m-alerts__time-filter--selected"]
  end

  defp time_filter_selected_class(_, _) do
    []
  end
end
