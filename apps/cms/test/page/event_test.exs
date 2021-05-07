defmodule CMS.Page.EventTest do
  use ExUnit.Case, async: true

  import CMS.Page.Event
  import Phoenix.HTML, only: [safe_to_string: 1]

  alias CMS.API.Static
  alias CMS.Page.Event
  alias Phoenix.HTML

  setup do
    %{
      api_event_without_path_alias: Static.events_response() |> Enum.at(0),
      api_event_with_path_alias: Static.events_response() |> Enum.at(1)
    }
  end

  describe "from_api/1" do
    test "it parses the response without path alias", %{api_event_without_path_alias: api_event} do
      assert %Event{
               id: id,
               start_time: start_time,
               end_time: end_time,
               title: title,
               location: location,
               street_address: street_address,
               city: city,
               state: state,
               who: who,
               body: body,
               notes: notes,
               agenda: agenda,
               path_alias: path_alias,
               paragraphs: paragraphs,
               registration_link: registration_link,
               livestream_link: livestream_link
             } = from_api(api_event)

      assert id == 3268
      assert start_time == Timex.parse!("2018-04-02T16:00:00Z", "{ISO:Extended:Z}")
      assert end_time == nil
      assert title == "Fiscal & Management Control Board Meeting"
      assert location == "State Transportation Building, 2nd Floor, Transportation Board Room"
      assert street_address == "10 Park Plaza"
      assert city == "Boston"
      assert state == "MA"
      assert who == "Board Members"

      assert safe_to_string(body) =~
               "(FMCB) closely monitors the T’s finances, management, and operations.</p>"

      assert safe_to_string(notes) =~
               "<p>All FMCB meetings are accessible to participants with disabilities."

      assert safe_to_string(agenda) =~
               "<p><strong>Please note:</strong> No public comments to be taken"

      assert path_alias == nil
      assert registration_link == nil

      assert %CMS.Field.Link{
        title: "Join on Zoom",
        url: "https://us02web.zoom.us/j/85195827925"
      } = livestream_link
    end

    test "it handles paragraphs when present", %{api_event_without_path_alias: api_event} do
      assert %Event{
               paragraphs: paragraphs
             } = from_api(api_event)

      assert paragraphs == [
               %CMS.Partial.Paragraph.CustomHTML{
                 body: HTML.raw("<p>Here is a custom HTML para.</p>\n"),
                 right_rail: true
               }
             ]
    end

    test "it handles paragraphs when not present", %{api_event_with_path_alias: api_event} do
      assert %Event{
               paragraphs: paragraphs
             } = from_api(api_event)

      assert paragraphs == []
    end

    test "it parses the response with path alias", %{api_event_with_path_alias: api_event} do
      assert %Event{
               path_alias: path_alias
             } = from_api(api_event)

      assert path_alias == "/events/date/title"
    end
  end

  describe "past?/2" do
    @yesterday ~D[2018-01-01]
    @today ~D[2018-01-02]
    @tomorrow ~D[2018-01-03]

    test "event yesterday is in the past" do
      assert past?(%Event{start_time: @yesterday}, @today) == true
    end

    test "event tomorrow not in the past" do
      assert past?(%Event{start_time: @tomorrow}, @today) == false
    end

    test "event today is not in the past" do
      assert past?(%Event{start_time: @today}, @today) == false
    end
  end
end
