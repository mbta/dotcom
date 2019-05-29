defmodule Content.Paragraph do
  @moduledoc """

  This module represents the suite of paragraph types that we support on Drupal.
  To add a new Drupal paragraph type, say MyPara, that should show up on pages
  via Phoenix, make the following changes:

  * Pull the most recent content from the CMS. Locally, update the
    /cms/style-guide/paragraphs page, which demonstrates all our paragraphs,
    to include this new paragraph.
  * Load /cms/style-guide/paragraphs?_format=json from the CMS and update
    /cms/style-guide/paragraphs.json.
  * Create a new module, Content.Paragraph.MyPara in lib/paragraph/my_para.ex.
  * Create a _my_para.html.eex partial (filename pattern must match module name)
  * Add that type to Content.Paragraph.t here.
  * Update this module's from_api/1 function to dispatch to the MyPara.from_api
  * Update Content.ParagraphTest to ensure it is parsed correctly
  * Update Site.ContentViewTest to ensure it is rendered correctly
  * After the code is merged and deployed, update /cms/style-guide/paragraphs
    on the live CMS
  """

  alias Content.Paragraph.{
    Accordion,
    Callout,
    ColumnMulti,
    ColumnMultiHeader,
    ContentList,
    CustomHTML,
    DescriptionList,
    DescriptiveLink,
    FareCard,
    FilesGrid,
    PeopleGrid,
    PhotoGallery,
    TitleCardSet,
    Unknown,
    UpcomingBoardMeetings
  }

  @types [
    Accordion,
    Callout,
    ColumnMulti,
    ContentList,
    CustomHTML,
    DescriptionList,
    DescriptiveLink,
    FareCard,
    FilesGrid,
    PeopleGrid,
    PhotoGallery,
    TitleCardSet,
    Unknown,
    UpcomingBoardMeetings
  ]

  @type t ::
          Accordion.t()
          | Callout.t()
          | ColumnMulti.t()
          | ColumnMultiHeader.t()
          | ContentList.t()
          | CustomHTML.t()
          | DescriptionList.t()
          | DescriptiveLink.t()
          | FareCard.t()
          | FilesGrid.t()
          | PeopleGrid.t()
          | PhotoGallery.t()
          | TitleCardSet.t()
          | Unknown.t()
          | UpcomingBoardMeetings.t()

  @type name ::
          Accordion
          | Callout
          | ColumnMulti
          | ContentList
          | CustomHTML
          | DescriptionList
          | DescriptiveLink
          | FareCard
          | FilesGrid
          | PeopleGrid
          | PhotoGallery
          | TitleCardSet
          | Unknown
          | UpcomingBoardMeetings

  @spec from_api(map) :: t
  def from_api(%{"type" => [%{"target_id" => "entity_reference"}]} = para) do
    Callout.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "multi_column"}]} = para) do
    ColumnMulti.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "content_list"}]} = para) do
    ContentList.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "custom_html"}]} = para) do
    CustomHTML.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "description_list"}]} = para) do
    DescriptionList.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "fare_card"}]} = para) do
    FareCard.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "files_grid"}]} = para) do
    FilesGrid.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "people_grid"}]} = para) do
    PeopleGrid.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "photo_gallery"}]} = para) do
    PhotoGallery.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "tabs"}]} = para) do
    Accordion.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "title_card"}]} = para) do
    DescriptiveLink.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "title_card_set"}]} = para) do
    TitleCardSet.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "upcoming_board_meetings"}]} = para) do
    UpcomingBoardMeetings.from_api(para)
  end

  @doc "This ¶ type has a single paragraph reference within. Get the nested paragraph."
  def from_api(%{"type" => [%{"target_id" => "from_library"}]} = para) do
    parse_library_item(para)
  end

  @doc "For directly accessing a reusable paragraph (from paragraphs API endpoint)"
  def from_api(%{"paragraphs" => [para]}) do
    from_api(para)
  end

  def from_api(unknown_paragraph_type) do
    Unknown.from_api(unknown_paragraph_type)
  end

  @spec right_rail?(t) :: boolean
  def right_rail?(%{right_rail: true}), do: true
  def right_rail?(_), do: false

  @spec full_bleed?(t) :: boolean
  def full_bleed?(%Callout{}), do: true
  def full_bleed?(%{right_rail: true}), do: true
  def full_bleed?(_), do: false

  @spec get_types() :: [name]
  def get_types, do: @types

  @spec parse_header(map) :: t
  def parse_header(%{} = data) do
    data
    |> Map.get("field_multi_column_header", [])
    |> Enum.map(&ColumnMultiHeader.from_api/1)
    # There is only ever 1 header element
    |> List.first()
  end

  # Pass through the nested paragraph and host ID
  @spec parse_library_item(map) :: t
  defp parse_library_item(data) do
    data
    |> Map.get("field_reusable_paragraph")
    |> List.first()
    |> Map.get("paragraphs")
    |> List.first()
    |> Map.put("parent_id", Map.get(data, "parent_id"))
    |> from_api()
  end
end
