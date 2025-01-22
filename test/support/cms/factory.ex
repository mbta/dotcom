defmodule CMS.Factory do
  @moduledoc false

  alias CMS.Api.Static
  alias CMS.Page.Event
  alias CMS.Page.NewsEntry
  alias CMS.Page.Person
  alias CMS.Page.Project
  alias CMS.Page.ProjectUpdate
  alias CMS.Partial.Teaser

  @spec event_factory(integer, map) :: Event.t()
  def event_factory(index, opts \\ []) when is_integer(index) do
    Static.events_response()
    |> Enum.at(index)
    |> Event.from_api()
    |> Map.merge(Map.new(opts))
  end

  @spec news_entry_factory(integer, map) :: NewsEntry.t()
  def news_entry_factory(index, opts \\ []) when is_integer(index) do
    Static.news_repo()
    |> Enum.at(index)
    |> NewsEntry.from_api()
    |> Map.merge(Map.new(opts))
  end

  @spec project_factory(integer, map) :: Project.t()
  def project_factory(index, opts \\ []) when is_integer(index) do
    Static.project_repo()
    |> Enum.at(index)
    |> Project.from_api()
    |> Map.merge(Map.new(opts))
  end

  @spec project_update_factory(integer, map) :: ProjectUpdate.t()
  def project_update_factory(index, opts \\ []) when is_integer(index) do
    Static.project_update_repo()
    |> Enum.at(index)
    |> ProjectUpdate.from_api()
    |> Map.merge(Map.new(opts))
  end

  @spec person_factory(map) :: Person.t()
  def person_factory(opts \\ []) do
    Static.person_response()
    |> Person.from_api()
    |> Map.merge(Map.new(opts))
  end

  @spec teaser_factory(atom, integer, map) :: Teaser.t()
  def teaser_factory(content_type, index, opts \\ []) when is_integer(index) do
    content_type
    |> get_teasers()
    |> Enum.at(index)
    |> Teaser.from_api()
    |> Map.merge(Map.new(opts))
  end

  @spec get_teasers(atom) :: [Map.t()]
  defp get_teasers(:news), do: Static.teaser_news_entry_response()
  defp get_teasers(:projects), do: Static.teaser_project_response()
  defp get_teasers(:project_updates), do: Static.teaser_project_update_response()
end
