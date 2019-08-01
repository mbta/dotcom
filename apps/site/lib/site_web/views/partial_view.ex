defmodule SiteWeb.PartialView do
  use SiteWeb, :view

  alias CMS.{Field.Image, Partial.Teaser, Repo}
  alias Plug.Conn
  alias Routes.Route
  alias SiteWeb.PartialView.SvgIconWithCircle

  import SiteWeb.CMSView, only: [file_description: 1]
  import SiteWeb.CMSHelpers, only: [cms_route_to_class: 1]
  import SiteWeb.CMS.ParagraphView, only: [render_paragraph: 2]

  defdelegate fa_icon_for_file_type(mime), to: Site.FontAwesomeHelpers

  @spec clear_selector_link(map()) :: Phoenix.HTML.Safe.t()
  def clear_selector_link(%{clearable?: true, selected: selected} = assigns)
      when not is_nil(selected) do
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
  Returns the suffix to be shown in the stop selector.
  """
  @spec stop_selector_suffix(Conn.t(), Stops.Stop.id_t(), String.t() | nil) :: iodata
  def stop_selector_suffix(conn, stop_id, text \\ "")

  def stop_selector_suffix(%Conn{assigns: %{route: %Route{type: 2}}} = conn, stop_id, text) do
    if zone = conn.assigns.zone_map[stop_id] do
      ["Zone ", zone]
    else
      text || ""
    end
  end

  def stop_selector_suffix(
        %Conn{assigns: %{route: %Route{id: "Green"}, stops_on_routes: stops}},
        stop_id,
        text
      ) do
    GreenLine.branch_ids()
    |> Enum.flat_map(&(stop_id |> GreenLine.stop_on_route?(&1, stops) |> green_branch_name(&1)))
    |> Enum.intersperse(",")
    |> green_line_stop_selector_suffix(text)
  end

  def stop_selector_suffix(_conn, _stop_id, text) do
    text || ""
  end

  @spec green_line_stop_selector_suffix(iodata, String.t() | nil) :: String.t() | iodata
  defp green_line_stop_selector_suffix([], nil), do: ""
  defp green_line_stop_selector_suffix([], <<text::binary>>), do: text
  defp green_line_stop_selector_suffix(iodata, _), do: iodata

  @spec green_branch_name(boolean, Route.id_t()) :: [String.t() | nil]
  defp green_branch_name(stop_on_green_line?, route_id)
  defp green_branch_name(true, route_id), do: [display_branch_name(route_id)]
  defp green_branch_name(false, _), do: []

  @doc """
  Pulls out the branch name of a Green Line route ID.
  """
  @spec display_branch_name(Route.id_t()) :: String.t() | nil
  def display_branch_name(<<"Green-", branch::binary>>), do: branch
  def display_branch_name(_), do: nil

  @doc """
  Renders a CMS content teaser, typically shown on a page's sidebar.
  Guides only show their image; other content types display the
  content's title.
  """
  @spec teaser(Teaser.t()) :: Phoenix.HTML.Safe.t()
  def teaser(%Teaser{} = teaser, opts \\ []) do
    link(
      teaser_link_content(teaser),
      to: teaser.path,
      class: teaser_class(opts)
    )
  end

  @spec teaser_class(Keyword.t()) :: String.t()
  defp teaser_class(opts) do
    Enum.join(
      [
        Keyword.get(opts, :class, ""),
        "c-content-teaser"
      ],
      " "
    )
  end

  @spec teaser_link_content(Teaser.t()) :: Phoenix.HTML.Safe.t() | [Phoenix.HTML.Safe.t()]
  defp teaser_link_content(%Teaser{} = teaser) do
    [
      render_teaser_image(teaser),
      teaser_text(teaser)
    ]
  end

  def render_teaser_image(%Teaser{image: nil}) do
    []
  end

  def render_teaser_image(%Teaser{image: %Image{}} = teaser) do
    [
      img_tag(teaser.image.url, alt: teaser.image.alt, class: teaser_image_class(teaser))
    ]
  end

  @spec teaser_image_class(Teaser.t()) :: String.t()
  defp teaser_image_class(%Teaser{topic: nil}) do
    "c-content-teaser__image"
  end

  defp teaser_image_class(%Teaser{topic: topic}) do
    Enum.join(
      [
        "c-content-teaser__image",
        "c-content-teaser__image--" <> CSSHelpers.string_to_class(topic)
      ],
      " "
    )
  end

  @spec teaser_text(Teaser.t()) :: [Phoenix.HTML.Safe.t()]
  defp teaser_text(%Teaser{topic: "Guides"} = teaser) do
    [
      content_tag(:span, [teaser.title], class: "sr-only")
    ]
  end

  defp teaser_text(%Teaser{topic: nil} = teaser) do
    [
      content_tag(:h3, [teaser.title], class: "h3 c-content-teaser__title"),
      content_tag(:div, [teaser.text], class: "c-content-teaser__text")
    ]
  end

  defp teaser_text(teaser) do
    [
      content_tag(:div, [teaser.topic], class: "c-content-teaser__topic u-small-caps"),
      content_tag(:h3, [teaser.title], class: "h3 c-content-teaser__title"),
      content_tag(:div, [teaser.text], class: "c-content-teaser__text")
    ]
  end

  @doc """
  Renders a news entry. Take two options:
    size: :large | :small
    class: class to apply to the link
  """
  @spec news_entry(Teaser.t(), Keyword.t()) :: Phoenix.HTML.Safe.t()
  def news_entry(entry, opts \\ []) do
    size = Keyword.get(opts, :size, :small)
    color = news_color(entry)
    opts = [{:color, color} | opts]

    link(
      [
        news_date(entry, size),
        content_tag(
          :div,
          raw(entry.title),
          class: "c-news-entry__title c-news-entry__title--#{size}"
        )
      ],
      to: news_path(entry, SiteWeb.Endpoint),
      class: news_entry_class(opts),
      id: entry.id
    )
  end

  @spec news_color(Teaser.t()) :: String.t()
  defp news_color(%Teaser{routes: []}), do: "unknown"
  defp news_color(%Teaser{routes: [route | _]}), do: cms_route_to_class(route)

  @spec news_path(Teaser.t(), module | Conn.t()) :: String.t()
  defp news_path(%Teaser{path: url}, conn), do: cms_static_page_path(conn, url)

  @spec news_date(Teaser.t(), :large | :small) :: Phoenix.HTML.Safe.t()
  defp news_date(%Teaser{date: date}, size), do: do_news_date(date, size)

  @spec do_news_date(Date.t(), :large | :small) :: Phoenix.HTML.Safe.t()
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

  @spec paragraph(integer(), Conn.t()) :: Phoenix.HTML.Safe.t()
  def paragraph(id, %Conn{} = conn) do
    id
    |> Repo.get_paragraph()
    |> render_paragraph(conn)
  end

  @doc """
  Renders the All/Current/Planned filters for an alerts list.
  The third argument is for the link generated for each item;
  the first element in the tuple is the path helper method
  that should be used
  """
  @spec alert_time_filters(atom, Keyword.t()) :: Phoenix.HTML.Safe.t()
  def alert_time_filters(current_timeframe, path_opts) do
    [
      content_tag(:h3, "Filter by type", class: "h3"),
      content_tag(
        :div,
        Enum.map([nil, :current, :upcoming], &time_filter(&1, current_timeframe, path_opts)),
        class: "m-alerts__time-filters"
      )
    ]
  end

  @spec time_filter(atom, atom, Keyword.t()) :: Phoenix.HTML.Safe.t()
  defp time_filter(filter, current_timeframe, path_opts) do
    path_method = Keyword.fetch!(path_opts, :method)

    item = Keyword.fetch!(path_opts, :item)

    path_params =
      path_opts
      |> Keyword.get(:params, [])
      |> time_filter_params(filter)

    path =
      apply(SiteWeb.Router.Helpers, path_method, [SiteWeb.Endpoint, :show, item, path_params])

    filter
    |> time_filter_text()
    |> link(
      class: time_filter_class(filter, current_timeframe),
      to: path
    )
  end

  @spec time_filter_text(atom) :: String.t()
  defp time_filter_text(nil), do: "All Alerts"
  defp time_filter_text(:current), do: "Current Alerts"
  defp time_filter_text(:upcoming), do: "Planned Service Alerts"

  @spec time_filter_params(Keyword.t(), atom) :: Keyword.t()
  defp time_filter_params(params, nil), do: params

  defp time_filter_params(params, timeframe)
       when timeframe in [:current, :upcoming],
       do: Keyword.put(params, :alerts_timeframe, timeframe)

  @spec time_filter_class(atom, atom) :: [String.t()]
  defp time_filter_class(filter, current_timeframe) do
    ["m-alerts__time-filter" | time_filter_selected_class(filter, current_timeframe)]
  end

  @spec time_filter_selected_class(atom, atom) :: [String.t()]
  defp time_filter_selected_class(filter, filter) do
    [" ", "m-alerts__time-filter--selected"]
  end

  defp time_filter_selected_class(_, _) do
    []
  end
end
