defmodule SiteWeb.ContentView do
  @moduledoc """
  Handles rendering of partial content from the CMS.
  """
  use SiteWeb, :view

  import SiteWeb.TimeHelpers

  alias Content.Field.{File, Image, Link}
  alias Content.Paragraph
  alias Content.Paragraph.{Callout, ColumnMulti, FareCard}
  alias Site.ContentRewriter

  defdelegate fa_icon_for_file_type(mime), to: Site.FontAwesomeHelpers

  @doc "Map paragraph module names to their templates"
  for type <- Paragraph.get_types() do
    template_name =
      type
      |> struct_name_to_string()
      |> String.replace_prefix("", "_")
      |> String.replace_suffix("", ".html")

    def get_template(%{__struct__: unquote(type)}), do: unquote(template_name)
  end

  @doc "Universal wrapper around all paragraph types"
  @spec render_paragraph(Paragraph.t(), Plug.Conn.t()) :: Phoenix.HTML.safe()
  def render_paragraph(paragraph, conn) do
    render(
      "_paragraph.html",
      paragraph: paragraph,
      paragraph_classes: paragraph_classes(paragraph),
      paragraph_type: paragraph |> struct_name_to_string() |> String.replace("_", "-"),
      conn: conn
    )
  end

  @doc """
  Intelligently choose and render paragraph template based on type, except
  for certain types which either have no template or require special values.
  """
  @spec render_content(Paragraph.t(), Plug.Conn.t()) :: Phoenix.HTML.safe()
  def render_content(paragraph, conn)

  def render_content(%ColumnMulti{display_options: "grouped"} = paragraph, conn) do
    fare_cards =
      paragraph.columns
      |> nested_paragraphs()
      |> grouped_fare_card_data()

    group_fare = List.first(fare_cards)

    render(
      "_grouped_fare_card.html",
      fare_cards: fare_cards,
      element: fare_card_element(group_fare.link),
      conn: conn
    )
  end

  def render_content(%FareCard{} = paragraph, conn) do
    render(
      "_fare_card.html",
      fare_card: paragraph,
      element: fare_card_element(paragraph.link),
      conn: conn
    )
  end

  def render_content(paragraph, conn) do
    paragraph
    |> get_template()
    |> render(content: paragraph, conn: conn)
  end

  def file_description(%File{description: desc}) when not is_nil(desc) and desc != "" do
    desc
  end

  def file_description(%File{url: url}) do
    url |> Path.basename() |> URI.decode()
  end

  @doc "Nicely renders the duration of an event, given two DateTimes."
  @spec render_duration(NaiveDateTime.t() | DateTime.t(), NaiveDateTime.t() | DateTime.t() | nil) ::
          String.t()
  def render_duration(start_time, end_time)

  def render_duration(start_time, nil) do
    start_time
    |> maybe_shift_timezone
    |> do_render_duration(nil)
  end

  def render_duration(start_time, end_time) do
    start_time
    |> maybe_shift_timezone
    |> do_render_duration(maybe_shift_timezone(end_time))
  end

  @doc "Sets CMS content wrapper classes based on presence of sidebar elements {left, right}"
  @spec sidebar_classes({boolean, boolean}) :: String.t()
  def sidebar_classes({true, _}), do: "c-cms--with-sidebar c-cms--sidebar-left"
  def sidebar_classes({false, true}), do: "c-cms--with-sidebar c-cms--sidebar-right"
  def sidebar_classes({false, false}), do: "c-cms--no-sidebar"

  @spec grid(ColumnMulti.t()) :: integer
  def grid(%ColumnMulti{columns: columns}) do
    div(12, max(Enum.count(columns), 2))
  end

  @doc "If true, allows content to break out of grid like embedded_media components do"
  @spec extend_width_if(boolean, atom, Keyword.t()) :: Phoenix.HTML.safe()
  def extend_width_if(true, type, do: content) do
    extend_width(type, do: content)
  end

  def extend_width_if(false, _type, do: content) do
    content
  end

  @spec extend_width(atom, Keyword.t()) :: Phoenix.HTML.safe()
  def extend_width(type, do: content) do
    content_tag :div, class: "c-media c-media--#{type} c-media--extended" do
      content_tag :div, class: "c-media__content" do
        content_tag(:div, [class: "c-media__element"], do: content)
      end
    end
  end

  defp maybe_shift_timezone(%NaiveDateTime{} = time) do
    time
  end

  defp maybe_shift_timezone(%DateTime{} = time) do
    Util.to_local_time(time)
  end

  defp do_render_duration(start_time, nil) do
    "#{format_date(start_time)} at #{format_time(start_time)}"
  end

  defp do_render_duration(
         %{year: year, month: month, day: day} = start_time,
         %{year: year, month: month, day: day} = end_time
       ) do
    "#{format_date(start_time)} at #{format_time(start_time)} - #{format_time(end_time)}"
  end

  defp do_render_duration(start_time, end_time) do
    "#{format_date(start_time)} #{format_time(start_time)} - #{format_date(end_time)} #{
      format_time(end_time)
    }"
  end

  defp format_time(time) do
    Timex.format!(time, "{h12}:{m}{am}")
  end

  defp nested_paragraphs(columns), do: columns |> Enum.flat_map(& &1.paragraphs)

  defp grouped_fare_card_data(paragraphs) when is_list(paragraphs) do
    Enum.map(
      paragraphs,
      &struct(
        FareCard,
        fare_token: &1.fare_token,
        note: &1.note,
        link: &1.link,
        show_media: &1.show_media
      )
    )
  end

  defp grouped_fare_card_data(_) do
    nil
  end

  @spec fare_card_element(Link.t() | nil) :: map
  defp fare_card_element(%Link{url: url}), do: %{tag: :a, attrs: [href: url]}
  defp fare_card_element(nil), do: %{tag: :div, attrs: []}

  @spec paragraph_classes(Paragraph.t()) :: iodata()
  defp paragraph_classes(%Callout{image: %Image{}}), do: ["c-callout--with-image"]
  defp paragraph_classes(_), do: []
end
