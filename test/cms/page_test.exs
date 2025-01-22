defmodule PageTest do
  use ExUnit.Case, async: true

  alias CMS.Api.Static
  alias CMS.Page
  alias CMS.Partial.Paragraph.ContentList
  alias CMS.Partial.Teaser

  describe "from_api/1" do
    test "switches on the node type in the json response and returns the proper page struct" do
      assert %Page.Basic{} = Page.from_api(Static.basic_page_response())

      diversions_data = Map.put(Static.basic_page_response(), "field_page_type", [%{"name" => "Diversions"}])

      assert %Page.Diversions{} = Page.from_api(diversions_data)

      assert %Page.Event{} = Page.from_api(List.first(Static.events_response()))
      assert %Page.Landing{} = Page.from_api(Static.landing_page_response())
      assert %Page.NewsEntry{} = Page.from_api(List.first(Static.news_repo()))
      assert %Page.Person{} = Page.from_api(Static.person_response())
      assert %Page.Project{} = Page.from_api(List.first(Static.project_repo()))
      assert %Page.ProjectUpdate{} = Page.from_api(List.first(Static.project_update_repo()))
      assert %Page.Redirect{} = Page.from_api(Static.redirect_response())
    end

    test "fetches content list teasers for pages that have them" do
      response = Page.from_api(Static.all_paragraphs_response())

      assert %ContentList{teasers: teasers} = List.last(response.paragraphs)

      assert [%Teaser{} | _] = teasers
    end
  end
end
