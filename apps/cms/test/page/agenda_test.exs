defmodule CMS.Page.AgendaTest do
  use ExUnit.Case, async: true

  alias CMS.API.Static
  alias CMS.Page.Agenda
  alias CMS.Partial.Paragraph.AgendaTopic

  setup do
    %{api_page: Static.agenda_response()}
  end

  describe "from_api/1" do
    test "it parses the api response", %{api_page: api_page} do
      assert %Agenda{
               id: id,
               title: title,
               topics: topics,
               collect_info: collect_info,
               event_reference: event_reference,
               formstack_url: formstack_url
             } = Agenda.from_api(api_page)

      # Test normal fields
      assert id == 5326
      assert title == "5326 Bus Network Redesign Public Meeting 06/08/2021"
      assert collect_info == true
      assert event_reference == 5321

      # Test paragraphs
      assert [%AgendaTopic{}, %AgendaTopic{}] = topics

      # Test link (not yet implemented)
      assert formstack_url == nil
    end
  end
end
