defmodule CMS.Page.EventAgendaTest do
  use ExUnit.Case, async: true

  alias CMS.Api.Static
  alias CMS.Page.EventAgenda
  alias CMS.Partial.Paragraph.AgendaTopic

  setup do
    %{api_page: Static.event_agenda_response()}
  end

  describe "from_api/1" do
    test "it parses the api response", %{api_page: api_page} do
      assert %EventAgenda{
               id: id,
               title: title,
               topics: topics,
               collect_info: collect_info,
               event_reference: event_reference,
               formstack_url: formstack_url,
               published: published
             } = EventAgenda.from_api(api_page)

      # Test normal fields
      assert id == 5523

      assert title ==
               "5523 [test] Joint Meeting of the MassDOT Board and the Fiscal and Management Control Board 02/22/2021"

      assert collect_info == true
      assert event_reference == 5353

      # Test paragraphs
      assert [%AgendaTopic{}, %AgendaTopic{}] = topics

      # Test link (not yet implemented)
      assert formstack_url == nil

      # Test published value
      assert published == true
    end
  end
end
