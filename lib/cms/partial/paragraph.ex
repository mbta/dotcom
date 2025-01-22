defmodule CMS.Partial.Paragraph do
  @moduledoc """

  This module represents the suite of paragraph types that we support on Drupal.
  To add a new Drupal paragraph type, say MyPara, that should show up on pages
  via Phoenix, make the following changes:

  * Pull the most recent content from the CMS. Locally, update the
    /cms/style-guide/paragraphs page, which demonstrates all our paragraphs,
    to include this new paragraph.
  * Load /cms/style-guide/paragraphs?_format=json from the CMS and update
    /cms/style-guide/paragraphs.json.
  * Create a new module, CMS.Partial.Paragraph.MyPara in lib/paragraph/my_para.ex.
  * Create a _my_para.html.eex partial (filename pattern must match module name)
  * Add that type to CMS.Partial.Paragraph.t here.
  * Update this module's from_api/1 function to dispatch to the MyPara.from_api
  * Update CMS.ParagraphTest to ensure it is parsed correctly
  * Update Dotcom.ContentViewTest to ensure it is rendered correctly
  * After the code is merged and deployed, update /cms/style-guide/paragraphs
    on the live CMS
  """

  alias CMS.Partial.Paragraph.Accordion
  alias CMS.Partial.Paragraph.AccordionSection
  alias CMS.Partial.Paragraph.AgendaSubTopic
  alias CMS.Partial.Paragraph.AgendaTopic
  alias CMS.Partial.Paragraph.Callout
  alias CMS.Partial.Paragraph.CodeEmbed
  alias CMS.Partial.Paragraph.Column
  alias CMS.Partial.Paragraph.ColumnMulti
  alias CMS.Partial.Paragraph.ColumnMultiHeader
  alias CMS.Partial.Paragraph.ContentList
  alias CMS.Partial.Paragraph.CustomHTML
  alias CMS.Partial.Paragraph.Description
  alias CMS.Partial.Paragraph.DescriptionList
  alias CMS.Partial.Paragraph.DescriptiveLink
  alias CMS.Partial.Paragraph.FareCard
  alias CMS.Partial.Paragraph.FilesGrid
  alias CMS.Partial.Paragraph.PeopleGrid
  alias CMS.Partial.Paragraph.PhotoGallery
  alias CMS.Partial.Paragraph.TitleCardSet
  alias CMS.Partial.Paragraph.TripPlanWidget
  alias CMS.Partial.Paragraph.Unknown

  @types [
    Accordion,
    AccordionSection,
    AgendaSubTopic,
    AgendaTopic,
    Callout,
    CodeEmbed,
    Column,
    ColumnMulti,
    ColumnMultiHeader,
    ContentList,
    CustomHTML,
    Description,
    DescriptionList,
    DescriptiveLink,
    FareCard,
    FilesGrid,
    PeopleGrid,
    PhotoGallery,
    TitleCardSet,
    TripPlanWidget,
    Unknown
  ]

  @type t ::
          Accordion.t()
          | AccordionSection.t()
          | AgendaSubTopic.t()
          | AgendaTopic.t()
          | Callout.t()
          | CodeEmbed.t()
          | Column.t()
          | ColumnMulti.t()
          | ColumnMultiHeader.t()
          | ContentList.t()
          | CustomHTML.t()
          | Description.t()
          | DescriptionList.t()
          | DescriptiveLink.t()
          | FareCard.t()
          | FilesGrid.t()
          | PeopleGrid.t()
          | PhotoGallery.t()
          | TitleCardSet.t()
          | TripPlanWidget.t()
          | Unknown.t()

  @type name ::
          Accordion
          | AccordionSection
          | AgendaSubTopic
          | AgendaTopic
          | Callout
          | CodeEmbed
          | Column
          | ColumnMulti
          | ColumnMultiHeader
          | ContentList
          | CustomHTML
          | Description
          | DescriptionList
          | DescriptiveLink
          | FareCard
          | FilesGrid
          | PeopleGrid
          | PhotoGallery
          | TitleCardSet
          | TripPlanWidget
          | Unknown

  @spec from_api(map, Keyword.t()) :: t
  def from_api(data, preview_opts \\ [])

  def from_api(%{"type" => [%{"target_id" => "entity_reference"}]} = para, _preview_opts) do
    Callout.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "multi_column_header"}]} = para, _preview_opts) do
    ColumnMultiHeader.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "multi_column"}]} = para, preview_opts) do
    ColumnMulti.from_api(para, preview_opts)
  end

  def from_api(%{"type" => [%{"target_id" => "agenda_topic"}]} = para, preview_opts) do
    AgendaTopic.from_api(para, preview_opts)
  end

  def from_api(%{"type" => [%{"target_id" => "agenda_sub_topic"}]} = para, _preview_opts) do
    AgendaSubTopic.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "column"}]} = para, preview_opts) do
    Column.from_api(para, preview_opts)
  end

  def from_api(%{"type" => [%{"target_id" => "content_list"}]} = para, preview_opts) do
    ContentList.from_api(para, preview_opts)
  end

  def from_api(%{"type" => [%{"target_id" => "custom_html"}]} = para, _preview_opts) do
    CustomHTML.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "code_embed"}]} = para, preview_opts) do
    CodeEmbed.from_api(para, preview_opts)
  end

  def from_api(%{"type" => [%{"target_id" => "definition"}]} = para, _preview_opts) do
    Description.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "description_list"}]} = para, preview_opts) do
    DescriptionList.from_api(para, preview_opts)
  end

  def from_api(%{"type" => [%{"target_id" => "fare_card"}]} = para, preview_opts) do
    FareCard.from_api(para, preview_opts)
  end

  def from_api(%{"type" => [%{"target_id" => "files_grid"}]} = para, _preview_opts) do
    FilesGrid.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "people_grid"}]} = para, _preview_opts) do
    PeopleGrid.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "photo_gallery"}]} = para, preview_opts) do
    PhotoGallery.from_api(para, preview_opts)
  end

  def from_api(%{"type" => [%{"target_id" => "tabs"}]} = para, preview_opts) do
    Accordion.from_api(para, preview_opts)
  end

  def from_api(%{"type" => [%{"target_id" => "tab"}]} = para, preview_opts) do
    AccordionSection.from_api(para, preview_opts)
  end

  def from_api(%{"type" => [%{"target_id" => "title_card"}]} = para, _preview_opts) do
    DescriptiveLink.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "title_card_set"}]} = para, _preview_opts) do
    TitleCardSet.from_api(para)
  end

  def from_api(%{"type" => [%{"target_id" => "trip_plan_widget"}]} = para, _preview_opts) do
    TripPlanWidget.from_api(para)
  end

  # "This ¶ type has a single paragraph reference within. Get the nested paragraph."
  def from_api(%{"type" => [%{"target_id" => "from_library"}]} = para, preview_opts) do
    parse_library_item(para, preview_opts)
  end

  # "For directly accessing a reusable paragraph (from paragraphs API endpoint)"
  def from_api(%{"paragraphs" => [para]}, preview_opts) do
    from_api(para, preview_opts)
  end

  def from_api(unknown_paragraph_type, _preview_opts) do
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

  # Pass through the nested paragraph and host ID
  @spec parse_library_item(map, map) :: t
  defp parse_library_item(data, preview_opts) do
    data
    |> Map.get("field_reusable_paragraph")
    |> List.first()
    |> Map.get("paragraphs")
    |> List.first()
    |> Map.put("parent_id", Map.get(data, "parent_id"))
    |> from_api(preview_opts)
  end
end
