defmodule CMS.Page do
  @moduledoc """
  Parses the api data to a struct, based on the api data's content type.
  """

  alias CMS.Partial.{
    Paragraph,
    Paragraph.ContentList
  }

  alias CMS.Page.{
    Basic,
    Diversions,
    Event,
    EventAgenda,
    Landing,
    NewsEntry,
    Person,
    Project,
    ProjectUpdate,
    Redirect
  }

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

  def content_list_async(%ContentList{} = content_list) do
    fn -> ContentList.fetch_teasers(content_list) end
  end

  def content_list_async(not_a_content_list) do
    fn -> not_a_content_list end
  end
end
