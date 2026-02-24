defmodule DotcomWeb.CMS.ParagraphView do
  @moduledoc """
  Handles rendering of partial content from the CMS.
  """

  use DotcomWeb, :view

  alias CMS.API
  alias CMS.Field.{Image, Link}
  alias CMS.Partial.{Paragraph, Teaser}
  alias Dotcom.ContentRewriter
  alias DotcomWeb.CMS.TeaserView

  alias Paragraph.{
    Accordion,
    Callout,
    ColumnMulti,
    ContentList,
    DescriptionList,
    DescriptiveLink,
    FareCard
  }

  alias Plug.Conn

  @doc "Map paragraph module names to their templates"
  def get_template(%{__struct__: type}) do
    type
    |> struct_name_to_string()
    |> String.replace_prefix("", "_")
    |> String.replace_suffix("", ".html")
  end

  @doc "Universal wrapper around all paragraph types"
  @spec render_paragraph(Paragraph.t(), Conn.t()) :: Phoenix.HTML.safe()
  # Don't render if there is an error locating the partial
  def render_paragraph({:error, _error}, _), do: []
  # Don't render Content List if list has no items
  def render_paragraph(%ContentList{teasers: []}, _), do: []
  # Don't render Accordion if all tabs are unpublished
  def render_paragraph(%Accordion{sections: []}, _), do: []
  # Don't render Multi Column if all column content is unpublished
  def render_paragraph(%ColumnMulti{header: nil, columns: []}, _), do: []
  # Don't render Description List if all descriptions are unpublished
  def render_paragraph(%DescriptionList{header: nil, descriptions: []}, _), do: []

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
  @spec render_paragraph_content(Paragraph.t(), Conn.t()) :: Phoenix.HTML.safe()
  def render_paragraph_content(paragraph, conn)

  def render_paragraph_content(%ContentList{} = paragraph, conn) do
    first_type = paragraph.recipe |> Keyword.get(:type, [:generic]) |> List.first()
    display_fields = TeaserView.handle_fields(first_type, paragraph.display_fields)
    layout_class = (:image in display_fields && "c-teaser-list--grid") || ""

    render(
      "_content_list.html",
      content: paragraph,
      list_class: layout_class,
      fields: display_fields,
      type: first_type,
      conn: conn
    )
  end

  def render_paragraph_content(%ColumnMulti{display_options: "grouped"} = paragraph, conn) do
    fare_cards =
      paragraph.columns
      |> nested_paragraphs()
      |> grouped_fare_card_data()

    render(
      "_grouped_fare_card.html",
      fare_cards: fare_cards,
      conn: conn
    )
  end

  def render_paragraph_content(%FareCard{} = paragraph, conn) do
    render(
      "_fare_card.html",
      fare_card: paragraph,
      conn: conn
    )
  end

  def render_paragraph_content(paragraph, conn) do
    paragraph
    |> get_template()
    |> render(content: paragraph, conn: conn)
  end

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

  @spec list_cta?(API.type(), map(), [Teaser.t()], [String.t()]) :: boolean()
  # No results
  def list_cta?(_type, _cta, [], _path) do
    false
  end

  # Is not requested (hide)
  def list_cta?(_type, %{behavior: "hide"}, _teasers, _path) do
    false
  end

  # Is a list of project updates, AND is sitting on a valid project page
  def list_cta?(:project_update, _cta, _teasers, ["projects", _]) do
    true
  end

  # Is requested (auto/overridden) BUT has no default (generic destination) AND user has not provided a link
  def list_cta?(type, %{url: url, text: text}, _teasers, _path)
      when type in [:project_update, :diversion, :page] and (is_nil(url) or is_nil(text)) do
    false
  end

  # Either has required link values or has a readily available default link path
  def list_cta?(_type, _cta, _teasers, _path) do
    true
  end

  @spec setup_list_cta(ContentList.t(), [String.t()]) :: Link.t()
  def setup_list_cta(list, conn_path) do
    current_path =
      ["" | conn_path]
      |> Enum.join("/")

    case list.cta do
      %{text: nil, url: nil} ->
        default_list_cta(list.ingredients.type, current_path)

      link_parts ->
        custom_list_cta(list.ingredients.type, link_parts, current_path)
    end
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

  @spec paragraph_classes(Paragraph.t()) :: iodata()
  defp paragraph_classes(%Callout{image: %Image{}}), do: ["c-callout--with-image"]
  defp paragraph_classes(_), do: []

  # Automatically map each list to a destination page based on content type
  @spec default_list_cta([API.type()], String.t()) :: Link.t()
  defp default_list_cta([:project_update], current_path) do
    %Link{
      title: ~t"View all project updates",
      url: "#{current_path}/updates"
    }
  end

  defp default_list_cta([:event], _current_path) do
    %Link{
      title: ~t"View all events",
      url: "/events"
    }
  end

  defp default_list_cta([:news_entry], _current_path) do
    %Link{
      title: ~t"View all news",
      url: "/news"
    }
  end

  defp default_list_cta([:project], _current_path) do
    %Link{
      title: ~t"View all projects",
      url: "/projects"
    }
  end

  # Override one or both of the url/text values for the list CTA
  @spec custom_list_cta([API.type()], map, String.t()) :: Link.t()
  defp custom_list_cta(type, %{text: nil, url: url}, current_path) do
    type
    |> default_list_cta(current_path)
    |> Map.put(:url, url)
  end

  defp custom_list_cta(type, %{text: text, url: nil}, current_path) do
    type
    |> default_list_cta(current_path)
    |> Map.put(:title, text)
  end

  defp custom_list_cta(_type, %{text: text, url: url}, _current_path) do
    %Link{
      title: text,
      url: url
    }
  end
end
