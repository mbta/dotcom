defmodule CMS.ParagraphTest do
  use ExUnit.Case, async: true

  require Dotcom.Assertions

  import CMS.Partial.Paragraph
  import Phoenix.HTML, only: [safe_to_string: 1]

  alias CMS.Api.Static
  alias CMS.Field.{File, Image, Link}

  alias CMS.Partial.Paragraph.{
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
  }

  alias CMS.Page.Person

  describe "from_api/1" do
    test "parses custom html" do
      api_data = api_paragraph("custom_html")

      assert %CustomHTML{
               body: body
             } = from_api(api_data)

      assert safe_to_string(body) =~ ~s(This page demonstrates all the "paragraphs" available)
    end

    test "parses a description list paragraph" do
      description_list_data = api_paragraph("description_list")

      assert %DescriptionList{
               header: header,
               descriptions: [
                 %Description{
                   term: term1,
                   details: details1
                 },
                 %Description{
                   term: term2,
                   details: details2
                 }
               ]
             } = from_api(description_list_data)

      assert %ColumnMultiHeader{} = header

      assert safe_to_string(header.text) =~
               "<p>1-day and 7-day passes purchased on CharlieTickets"

      assert safe_to_string(term1) =~ "<p>1-Day Pass</p>"
      assert safe_to_string(details1) =~ "Unlimited travel for 24 hours"
      assert safe_to_string(term2) =~ "<p>7-Day Pass</p>"
      assert safe_to_string(details2) =~ "Unlimited travel for 7 days"
    end

    test "parses a fare card paragraph" do
      api_data = api_paragraph_by_id(4192)

      assert %ColumnMulti{
               columns: [
                 %Column{
                   paragraphs: [
                     %FareCard{
                       fare_token: "subway:charlie_card",
                       show_media: true,
                       note: %CustomHTML{
                         body: {:safe, "<p>{{ fare:subway:cash }} with CharlieTicket</p>\n"}
                       }
                     }
                   ]
                 },
                 %Column{
                   paragraphs: [
                     %FareCard{
                       show_media: false,
                       fare_token: "local_bus:charlie_card",
                       note: %CustomHTML{
                         body: {:safe, "<p>{{ fare:local_bus:cash }} with CharlieTicket</p>\n"}
                       }
                     }
                   ]
                 }
               ]
             } = from_api(api_data)
    end

    test "parses a files grid paragraph" do
      api_data = api_paragraph("files_grid")

      assert %FilesGrid{
               title: nil,
               files: [%File{}, %File{}, %File{}, %File{}]
             } = from_api(api_data)
    end

    test "parses multi column paragraph" do
      multi_column = "multi_column" |> api_paragraph() |> from_api()

      assert %ColumnMulti{
               columns: [
                 %Column{
                   paragraphs: [
                     %CMS.Partial.Paragraph.CustomHTML{} = column1_paragraph1
                   ]
                 },
                 %Column{
                   paragraphs: [
                     %CMS.Partial.Paragraph.CustomHTML{} = column2_paragraph1
                   ]
                 }
               ],
               header: header
             } = multi_column

      assert %ColumnMultiHeader{} = header
      assert safe_to_string(header.text) =~ "<h4>This is a new paragraph type's sub field.</h4>"

      assert safe_to_string(column1_paragraph1.body) =~
               "<p>This is a Custom HTML paragraph inside the Column paragraph"

      assert safe_to_string(column2_paragraph1.body) =~
               "<h4>Multi-column vs. Title card set</h4>\n\n<p>We recommend"
    end

    test "parses a multi-column paragraph with display options" do
      api_data = api_paragraph_by_id(4472)

      assert %ColumnMulti{
               columns: [
                 %Column{paragraphs: [%FareCard{}]},
                 %Column{paragraphs: [%FareCard{}]}
               ],
               display_options: "grouped"
             } = from_api(api_data)
    end

    test "parses a multi-column paragraph for the right rail" do
      api_data = api_paragraph_by_id(5003)

      assert %ColumnMulti{
               columns: [
                 %Column{paragraphs: [%CustomHTML{}]},
                 %Column{paragraphs: [%CustomHTML{}]}
               ],
               right_rail: true
             } = from_api(api_data)
    end

    test "returns the correct struct when given a people grid paragraph" do
      api_data = api_paragraph("people_grid")

      assert %PeopleGrid{
               people: [
                 %Person{id: 2605},
                 %Person{id: 2610},
                 %Person{id: 2609}
               ]
             } = from_api(api_data)
    end

    test "returns the correct struct when given a photo gallery paragraph" do
      api_data = api_paragraph("photo_gallery")

      assert %PhotoGallery{
               header: nil,
               images: [
                 %Image{},
                 %Image{},
                 %Image{},
                 %Image{},
                 %Image{}
               ]
             } = from_api(api_data)
    end

    test "parses accordion interface paragraph" do
      api_data = api_paragraph("tabs")

      assert %Accordion{
               header: nil,
               display: "collapsible",
               sections: [
                 %AccordionSection{} = section1,
                 %AccordionSection{} = section2
               ]
             } = from_api(api_data)

      assert section1.title == "Accordion Label 1"
      assert section2.title == "Accordion Label 2"

      assert [%CustomHTML{}] = section1.content
      assert [%CustomHTML{}] = section2.content
    end

    test "parses title card (used in DescriptiveLink context)" do
      api_data = api_paragraph("title_card")

      assert %DescriptiveLink{
               body: body,
               link: link,
               title: title,
               parent: parent
             } = from_api(api_data)

      assert title == "Example Card 1"
      assert safe_to_string(body) =~ "<p>The body of the title card"
      assert link.url == "/cms/style-guide/paragraphs"
      assert parent == "field_paragraphs"
    end

    test "parses title card set" do
      api_data = api_paragraph("title_card_set")

      assert %TitleCardSet{
               descriptive_links: [
                 %DescriptiveLink{} = descriptive_link1,
                 %DescriptiveLink{}
               ]
             } = from_api(api_data)

      assert descriptive_link1.title == "Example Card 1"
      assert safe_to_string(descriptive_link1.body) =~ "<p>The body of the title card"
    end

    test "parses callout" do
      api_data = api_paragraph("entity_reference")

      assert %Callout{
               body: body,
               title: title,
               image: %Image{} = image,
               link: %Link{} = link
             } = from_api(api_data)

      assert title == "Visiting Boston?"
      assert safe_to_string(body) =~ "<p>We created a guide just for you!"

      assert image.url =~
               "/sites/default/files/styles/whats_happening/public/projects/parking-prices/beverly-garage.png?itok="

      assert link.url == "/summer-visitors-guide"
      assert link.title == "Check out our Visitor's Guide"
    end

    test "parses a reusable paragraph" do
      api_data = api_paragraph("from_library")

      assert %CustomHTML{body: body} = from_api(api_data)
      assert safe_to_string(body) =~ "<p>library item</p>"
    end

    test "parses a trip plan widget" do
      api_data = %{
        "type" => [%{"target_id" => "trip_plan_widget"}]
      }

      assert %TripPlanWidget{} = from_api(api_data)
    end

    test "parses a code embed paragraph" do
      code_embed_data = api_paragraph("code_embed")

      assert %CodeEmbed{
               header: header,
               body: {:safe, code}
             } = from_api(code_embed_data)

      # header is still scrubbed, but body is not
      assert %ColumnMultiHeader{} = header
      assert {:safe, "<h2>Perq Form</h2>\n"} == header.text

      assert code =~ "<script type=\"text/javascript\""
      assert code =~ "<noscript>"
    end

    test "parses an agenda topic paragraph" do
      assert [topic_1, _topic_2] = api_paragraph("agenda_topic")

      assert %AgendaTopic{
               title: title,
               video_bookmark: video_bookmark,
               description: description,
               sub_topics: [
                 %AgendaSubTopic{} = sub_topic_1,
                 %AgendaSubTopic{}
               ],
               files: files,
               links: links
             } = from_api(topic_1)

      assert title == "This is the first topic (with details)"
      assert video_bookmark == "00:10:01"

      assert safe_to_string(description) =~
               "<p>This is the description of the first topic. It has some <strong>HTML</strong> inside it."

      assert sub_topic_1.title == "Topic 1 - Sub-topic 1"

      assert safe_to_string(sub_topic_1.description) =~
               ~s(<p>This is a similar description, but of a sub-topic. It can also have <a href="https://www.google.com">HTML</a> in it.)

      file = List.first(files)
      assert file.description == ""
      assert file.type == "application/pdf"

      assert file.url =~
               "/sites/default/files/2021-10/2021-10-13-english-bus-network-redesign-public-meetings.pdf"

      assert %Link{
               title: "Google",
               url: "https://www.google.com"
             } = List.first(links)
    end

    test "parses an unknown paragraph type" do
      api_data = %{
        "type" => [%{"target_id" => "unsupported_paragraph_type"}]
      }

      assert %Unknown{
               type: "unsupported_paragraph_type"
             } = from_api(api_data)
    end
  end

  test "parses a content list paragraph" do
    content_list_data = api_paragraph("content_list")

    assert %ContentList{
             header: header,
             ingredients: ingredients,
             recipe: recipe
           } = from_api(content_list_data)

    assert %ColumnMultiHeader{} = header

    assert %{
             terms: [nil, nil],
             term_depth: 4,
             items_per_page: 5,
             type: [:project_update],
             type_op: nil,
             promoted: nil,
             sticky: "0",
             relationship: "related_to",
             except: nil,
             content_id: 3004,
             host_id: 2617,
             date_op: "<",
             date_min: nil,
             date_max: nil,
             sort_by: "field_updated_on_value",
             sort_order: :DESC
           } == ingredients

    Dotcom.Assertions.assert_equal_lists(recipe,
      date: [value: "now"],
      date_op: "<",
      items_per_page: 2,
      related_to: 3004,
      sort_by: "field_updated_on_value",
      sort_order: :DESC,
      sticky: "0",
      type: [:project_update]
    )
  end

  describe "right_rail?" do
    test "returns true if this paragraph has the right_rail property set to true" do
      paragraph = %{right_rail: true}

      assert right_rail?(paragraph)
    end

    test "returns false if this paragraph has the right_rail property set to false" do
      paragraph = %{right_rail: false}

      refute right_rail?(paragraph)
    end

    test "returns false if this paragraph has no right_rail property" do
      paragraph = %{}

      refute right_rail?(paragraph)
    end
  end

  describe "full_bleed?" do
    test "returns true if this paragraph meets criteria for being full-bleed" do
      callout = %Callout{}
      right_rail = %CustomHTML{right_rail: true}

      assert full_bleed?(callout)
      assert full_bleed?(right_rail)
    end

    test "returns false if this paragraph does not meet criteria for being full-bleed" do
      paragraph = %CustomHTML{}

      refute full_bleed?(paragraph)
    end
  end

  defp api_paragraph("agenda_topic") do
    Static.event_agenda_response()
    |> Map.get("field_agenda_topics")
  end

  defp api_paragraph(paragraph_type) do
    Static.all_paragraphs_response()
    |> Map.get("field_paragraphs")
    |> Enum.find(&match?(%{"type" => [%{"target_id" => ^paragraph_type}]}, &1))
  end

  defp api_paragraph_by_id(id) do
    Static.all_paragraphs_response()
    |> Map.get("field_paragraphs")
    |> Enum.find(&match?(%{"id" => [%{"value" => ^id}]}, &1))
  end
end
