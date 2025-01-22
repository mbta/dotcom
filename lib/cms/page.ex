defmodule CMS.Page do
  @moduledoc """
  Parses the api data to a struct, based on the api data's content type.
  """

  alias CMS.Page.Basic
  alias CMS.Page.Diversions
  alias CMS.Page.Event
  alias CMS.Page.EventAgenda
  alias CMS.Page.Landing
  alias CMS.Page.NewsEntry
  alias CMS.Page.Person
  alias CMS.Page.Project
  alias CMS.Page.ProjectUpdate
  alias CMS.Page.Redirect
  alias CMS.Partial.Paragraph
  alias CMS.Partial.Paragraph.ContentList

  @type t ::
          Basic.t()
          | Event.t()
          | EventAgenda.t()
          | Landing.t()
          | NewsEntry.t()
          | Person.t()
          | Project.t()
          | ProjectUpdate.t()
          | Redirect.t()

  @doc """
  Expects parsed json from drupal CMS. Should be one item (not array of items)
  """
  @spec from_api(map, Keyword.t()) :: t
  def from_api(data, preview_opts \\ []) do
    data
    |> parse(preview_opts)
    |> fetch_content_lists()
  end

  defp parse(%{"type" => [%{"target_id" => "event"}]} = api_data, _preview_opts) do
    Event.from_api(api_data)
  end

  defp parse(%{"type" => [%{"target_id" => "agenda"}]} = api_data, preview_opts) do
    EventAgenda.from_api(api_data, preview_opts)
  end

  defp parse(%{"type" => [%{"target_id" => "landing_page"}]} = api_data, preview_opts) do
    Landing.from_api(api_data, preview_opts)
  end

  defp parse(%{"type" => [%{"target_id" => "news_entry"}]} = api_data, _preview_opts) do
    NewsEntry.from_api(api_data)
  end

  defp parse(%{"type" => [%{"target_id" => "person"}]} = api_data, _preview_opts) do
    Person.from_api(api_data)
  end

  defp parse(%{"type" => [%{"target_id" => "project"}]} = api_data, preview_opts) do
    Project.from_api(api_data, preview_opts)
  end

  defp parse(%{"type" => [%{"target_id" => "project_update"}]} = api_data, preview_opts) do
    ProjectUpdate.from_api(api_data, preview_opts)
  end

  defp parse(%{"type" => [%{"target_id" => "redirect"}]} = api_data, _preview_opts) do
    Redirect.from_api(api_data)
  end

  defp parse(%{"field_page_type" => [%{"name" => "Diversions"}]} = api_data, preview_opts) do
    Diversions.from_api(api_data, preview_opts)
  end

  # For all other node/content types from the CMS, use a common struct/template
  defp parse(%{"type" => [%{"target_type" => "node_type"}]} = api_data, preview_opts) do
    Basic.from_api(api_data, preview_opts)
  end

  @spec fetch_content_lists(t) :: t
  defp fetch_content_lists(%{paragraphs: paragraphs} = struct) when is_list(paragraphs) do
    paragraphs_with_lists =
      paragraphs
      |> Enum.map(&content_list_async/1)
      |> Util.async_with_timeout(nil, __MODULE__, 5000, 1)
      |> Enum.filter(fn para -> !is_nil(para) end)

    %{struct | paragraphs: paragraphs_with_lists}
  end

  defp fetch_content_lists(struct) do
    struct
  end

  @spec content_list_async(Paragraph.t()) :: (-> Paragraph.t())
  def content_list_async(%ContentList{} = content_list) do
    fn -> ContentList.fetch_teasers(content_list) end
  end

  def content_list_async(not_a_content_list) do
    fn -> not_a_content_list end
  end
end
