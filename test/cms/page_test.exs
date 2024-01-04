defmodule PageTest do
  use ExUnit.Case, async: true

  alias CMS.{
    API.Static,
    Page,
    Page.Project,
    Partial.Paragraph.ContentList,
    Partial.Teaser
  }

  defp mock_fetch_content_lists(%{paragraphs: paragraphs} = _struct) when is_list(paragraphs) do
    paragraphs
    |> Enum.map(&Page.content_list_async/1)
    |> Util.async_with_timeout(nil, __MODULE__, 0, 1)
    |> Enum.filter(fn para -> !is_nil(para) end)
  end

  describe "from_api/1" do
    test "switches on the node type in the json response and returns the proper page struct" do
      assert %Page.Basic{} = Page.from_api(Static.basic_page_response())
      assert %Page.Event{} = Page.from_api(List.first(Static.events_response()))
      assert %Page.Landing{} = Page.from_api(Static.landing_page_response())
      assert %Page.NewsEntry{} = Page.from_api(List.first(Static.news_repo()))
      assert %Page.Person{} = Page.from_api(Static.person_response())
      assert %Page.Project{} = Page.from_api(List.first(Static.project_repo()))
      assert %Page.ProjectUpdate{} = Page.from_api(List.first(Static.project_update_repo()))
      assert %Page.Redirect{} = Page.from_api(Static.redirect_response())
    end

    test "fetches content list teasers for pages that have them" do
      response =
        Static.all_paragraphs_response()
        |> Page.from_api()

      assert %ContentList{teasers: teasers} = List.last(response.paragraphs)

      assert [%Teaser{} | _] = teasers
    end
  end

  test "add dummy timeout sections before fetching content_list" do
    paragraphs_with_lists =
      Static.all_paragraphs_response()
      |> Project.from_api()
      |> mock_fetch_content_lists()

    assert Enum.find(paragraphs_with_lists, &match?(%ContentList{teasers: _teasers}, &1)) == nil
  end
end
