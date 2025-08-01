defmodule DotcomWeb.CMS.ParagraphViewTest do
  use Dotcom.ViewCase, async: true

  import CMS.Factory, only: [person_factory: 0]
  import DotcomWeb.CMS.ParagraphView

  alias CMS.Field.{File, Image, Link}

  alias CMS.Partial.Paragraph.{
    Accordion,
    AccordionSection,
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

  alias Phoenix.HTML

  describe "render_paragraph/2" do
    test "renders a CMS.Partial.Paragraph.CustomHTML", %{conn: conn} do
      paragraph = %CustomHTML{body: HTML.raw("<p>Hello</p>")}

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "<p>Hello</p>"
    end

    test "renders a CMS.Partial.Paragraph.CustomHTML with rewritten body", %{conn: conn} do
      html = "<div><span>Foo</span><table>Foo</table></div>"
      paragraph = %CustomHTML{body: HTML.raw(html)}

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-paragraph--custom-html"
      refute rendered =~ "c-paragraph--right-rail"
      assert rendered =~ "responsive-table"
    end

    test "renders a CMS.Partial.Paragraph.TitleCardSet", %{conn: conn} do
      paragraph = %TitleCardSet{
        descriptive_links: [
          %DescriptiveLink{
            title: "Card 1",
            body: HTML.raw("<strong>Body 1</strong>"),
            link: %Link{url: "/relative/link"}
          },
          %DescriptiveLink{
            title: "Card 2",
            body: HTML.raw("<strong>Body 2</strong>"),
            link: %Link{url: "https://www.example.com/another/link"}
          }
        ]
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ ~s(Card 1)

      assert rendered =~ "<strong>Body 1</strong>"
      assert rendered =~ ~s( href="/relative/link")

      assert rendered =~ ~s(Card 2)

      assert rendered =~ "<strong>Body 2</strong>"
      assert rendered =~ ~s( href="https://www.example.com/another/link")
    end

    test "renders a CMS.Partial.Paragraph.TitleCardSet with content rewritten", %{conn: conn} do
      paragraph = %TitleCardSet{
        descriptive_links: [
          %DescriptiveLink{
            title: ~s({{mbta-circle-icon "bus"}}),
            body: HTML.raw("<div><span>Foo</span><table>Foo</table></div>"),
            link: %Link{url: "/relative/link"}
          }
        ]
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "responsive-table"
      refute rendered =~ "mbta-circle-icon"
    end

    test "renders a CMS.Partial.Paragraph.DescriptiveLink (outside a Title Card Set)", %{
      conn: conn
    } do
      alone = %DescriptiveLink{
        title: "Card 1",
        body: HTML.raw("<strong>Body 1</strong>"),
        link: %Link{url: "/relative/link"},
        parent: "field_paragraphs"
      }

      rendered_alone =
        alone
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      rendered_in_mc =
        alone
        |> Map.put(:parent, "field_column")
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      rendered_unlinked =
        alone
        |> Map.put(:link, nil)
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered_alone =~ "c-paragraph--descriptive-link"
      assert rendered_alone =~ "c-descriptive-link"
      assert rendered_alone =~ "<strong>Body 1</strong>"
      assert rendered_alone =~ "c-media__element"
      assert rendered_alone =~ ~s(href="/relative/link")

      assert rendered_in_mc =~ "c-descriptive-link"
      assert rendered_in_mc =~ "<strong>Body 1</strong>"
      refute rendered_in_mc =~ "c-media__element"

      assert rendered_unlinked =~ ~s(href="")
    end

    test "renders a TitleCardSet when it doesn't have a link", %{conn: conn} do
      paragraph = %TitleCardSet{
        descriptive_links: [
          %DescriptiveLink{
            title: "Title Card",
            body: HTML.raw("This is a title card"),
            link: nil
          }
        ]
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-paragraph--title-card-set"
      assert rendered =~ "This is a title card"
    end

    test "renders a Paragraph.PeopleGrid", %{conn: conn} do
      person = person_factory()

      paragraph = %PeopleGrid{
        people: [person]
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-paragraph--people-grid"
      assert rendered =~ person.name
      assert rendered =~ person.position
    end

    test "renders a Paragraph.PhotoGallery", %{conn: conn} do
      images = [
        %Image{url: "/sites/default/files/styles/example/image1.jpg", alt: "image 1"},
        %Image{url: "/sites/default/files/styles/example/image2.jpg", alt: "image 2"},
        %Image{url: "/sites/default/files/styles/example/image3.jpg", alt: "image 3"}
      ]

      paragraph = %PhotoGallery{
        images: images
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-paragraph--photo-gallery"

      assert rendered =~
               ~s(<img alt="image 1" class="img-thumbnail" src="/sites/default/files/styles/example/image1.jpg")

      assert rendered =~
               ~s(<img alt="image 2" class="img-thumbnail" src="/sites/default/files/styles/example/image2.jpg")

      assert rendered =~
               ~s(<img alt="image 3" class="img-thumbnail" src="/sites/default/files/styles/example/image3.jpg")
    end

    test "renders a Paragraph.Callout", %{conn: conn} do
      callout = %Callout{
        title: "Visiting Boston?",
        body: HTML.raw("<p>We created a guide just for you!</p>"),
        image: %Image{
          url: "/sites/default/files/styles/whats_happening/public/image.png",
          alt: "Alternative text for image"
        },
        link: %Link{
          title: "Title for URL",
          url: "/cms-link"
        }
      }

      rendered =
        callout
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-paragraph--callout"
      assert rendered =~ "u-full-bleed"
      assert rendered =~ ~s(<h2>Visiting Boston?</h2>)
      assert rendered =~ ~s(<p>We created a guide just for you!</p>)
      assert rendered =~ callout.link.url
      assert rendered =~ "c-callout__column--image"

      imageless =
        callout
        |> struct(%{image: nil})
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      refute imageless =~ "c-callout__column--image"
    end

    test "renders a DescriptionList", %{conn: conn} do
      paragraph = %DescriptionList{
        descriptions: [
          %Description{
            details: HTML.raw("<h3>{{ fare:subway:day }}</h3>\n\n<p>Day pass.</p>\n")
          },
          %Description{
            details: HTML.raw("<h3>{{ fare:subway:week }}</h3>\n\n<p>Week pass.</p>\n")
          }
        ],
        header: %ColumnMultiHeader{
          text: HTML.raw("<p>Header copy.</p>\n")
        }
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-paragraph--description-list"
      assert rendered =~ "Header copy"
      assert rendered =~ "Day pass"
      assert rendered =~ "Week pass"
    end

    test "renders a ContentList", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          header: %ColumnMultiHeader{
            text: HTML.raw("<p>Header copy.</p>\n")
          },
          ingredients: %{type: [:project_update]},
          recipe: [
            type: [:project_update],
            date: "now",
            date_op: ">="
          ],
          cta: %{behavior: "default", text: nil, url: nil},
          display_fields: []
        })

      conn = Map.put(conn, :path_info, ["projects", "a-project"])

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-paragraph--content-list"
      assert rendered =~ "c-teaser-list--grid"
      assert rendered =~ "c-content-teaser--project-update"
      assert rendered =~ "Header copy"
      assert rendered =~ "c-call-to-action"
      assert rendered =~ "View all project updates"
    end

    test "does not render empty content lists", %{conn: conn} do
      paragraph = %ContentList{
        header: %ColumnMultiHeader{
          text: HTML.raw("<p>Header copy</p>\n")
        },
        teasers: []
      }

      assert [] = render_paragraph(paragraph, conn)
    end

    test "renders FareCard paragraphs", %{conn: conn} do
      paragraph = %ColumnMulti{
        columns: [
          %Column{
            paragraphs: [
              %FareCard{
                fare_token: "subway:charlie_card",
                show_media: true,
                note: %CustomHTML{
                  body: {:safe, "<p>{{ fare:subway:cash }} with CharlieTicket</p>\n"}
                },
                link: %Link{
                  title: "",
                  url: "/fares/subway"
                }
              }
            ]
          },
          %Column{
            paragraphs: [
              %FareCard{
                fare_token: "local_bus:cash",
                show_media: false,
                note: %CustomHTML{
                  body: {:safe, "<p>{{ fare:local_bus:charlie_card }} with a CharlieCard</p>\n"}
                },
                link: nil
              }
            ]
          }
        ]
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-paragraph--ungrouped c-paragraph--with-cards c-paragraph--with-fares"
      assert rendered =~ "u-linked-card"
      assert rendered =~ "fare-card--linked"

      assert rendered =~ "Subway"
      assert rendered =~ "One-Way"
      assert rendered =~ "$2.40"
      assert rendered =~ "with CharlieCard, CharlieTicket, contactless payment, or cash"
      assert rendered =~ "/fares/subway"

      assert rendered =~ "Local Bus"
      assert rendered =~ "$1.70 with a CharlieCard"
      refute rendered =~ "with a CharlieTicket or cash"
    end

    test "renders an unlinked FareCard", %{conn: conn} do
      paragraph = %ColumnMulti{
        columns: [
          %Column{
            paragraphs: [
              %FareCard{
                fare_token: "subway:charlie_card",
                show_media: true,
                note: %CustomHTML{
                  body: {:safe, "<p>{{ fare:subway:cash }} with CharlieTicket</p>\n"}
                },
                link: nil
              }
            ]
          }
        ]
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-paragraph--ungrouped c-paragraph--with-cards c-paragraph--with-fares"
      refute rendered =~ "u-linked-card"
      refute rendered =~ "fare-card--linked"
    end

    test "renders a grouped FareCard", %{conn: conn} do
      paragraph = %ColumnMulti{
        columns: [
          %Column{
            paragraphs: [
              %FareCard{
                fare_token: "local_bus:charlie_card",
                show_media: true,
                note: %CustomHTML{
                  body: {:safe, "<p>1 free transfer to Local Bus within 2 hours</p>\n"}
                },
                link: %Link{
                  title: "",
                  url: "/fares/bus-fares"
                }
              }
            ]
          },
          %Column{
            paragraphs: [
              %FareCard{
                fare_token: "local_bus:cash",
                show_media: false,
                note: %CustomHTML{
                  body: {:safe, "<p>a href='/schedules/bus'>Limited transfers</a></p>\n"}
                },
                link: nil
              }
            ]
          }
        ],
        display_options: "grouped"
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-paragraph--grouped c-paragraph--with-cards c-paragraph--with-fares"
      assert rendered =~ "u-linked-card"
      assert rendered =~ "fare-card--linked"
      assert rendered =~ "fare-card--grouped"

      assert rendered =~ "Local Bus"
      assert rendered =~ "One-Way"
      assert rendered =~ "$1.70"
      assert rendered =~ "with CharlieCard"
      assert rendered =~ "1 free transfer"
      refute rendered =~ "with CharlieTicket or Cash"
      assert rendered =~ "Limited transfers"
      assert rendered =~ "/fares/bus-fare"
    end

    test "renders an error message for a grouped FareCard with bad data", %{conn: conn} do
      # Missing a second fare card
      paragraph = %ColumnMulti{
        columns: [
          %Column{
            paragraphs: [
              %FareCard{
                fare_token: "local_bus:charlie_card",
                note: %CustomHTML{
                  body: {:safe, "<p>1 free transfer to Local Bus within 2 hours</p>\n"}
                }
              }
            ]
          }
        ],
        display_options: "grouped"
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "Bad grouped fare card data"
    end

    test "renders a set of Descriptive Links", %{conn: conn} do
      paragraph = %ColumnMulti{
        columns: [
          %Column{
            paragraphs: [
              %DescriptiveLink{title: "Link1"}
            ]
          },
          %Column{
            paragraphs: [
              %DescriptiveLink{title: "Link2"}
            ]
          }
        ]
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~
               "c-paragraph--column-multi c-paragraph--ungrouped c-paragraph--with-cards c-paragraph--with-links"

      assert rendered =~ "Link1"
      assert rendered =~ "Link2"
    end

    test "renders a Paragraph.FilesGrid without a title", %{conn: conn} do
      paragraph = %FilesGrid{
        title: nil,
        files: [%File{url: "/link", description: "link description"}]
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "link description"
    end

    test "renders a Paragraph.FilesGrid with a title", %{conn: conn} do
      paragraph = %FilesGrid{files: [%File{}], title: "Some files"}

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ paragraph.title
    end

    test "renders a CMS.Partial.Paragraph.ColumnMulti with nested paragraphs", %{conn: conn} do
      header = %ColumnMultiHeader{
        text: HTML.raw("<h4>This is a multi-column header</h4>")
      }

      cols = [
        %Column{
          paragraphs: [
            %CustomHTML{body: HTML.raw("<strong>Column 1</strong>")}
          ]
        },
        %Column{
          paragraphs: [
            %CustomHTML{body: HTML.raw("<strong>Column 2</strong>")}
          ]
        },
        %Column{
          paragraphs: [
            %CustomHTML{body: HTML.raw("<strong>Column 3</strong>")}
          ]
        },
        %Column{
          paragraphs: [
            %CustomHTML{body: HTML.raw("<strong>Column 4</strong>")}
          ]
        }
      ]

      rendered_quarters =
        %ColumnMulti{header: header, columns: cols}
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      rendered_thirds =
        %ColumnMulti{header: header, columns: Enum.take(cols, 3)}
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      rendered_halves =
        %ColumnMulti{header: header, columns: Enum.take(cols, 2)}
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      rendered_single =
        %ColumnMulti{header: header, columns: Enum.take(cols, 1)}
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered_quarters =~ "<h4>This is a multi-column header</h4>"
      assert rendered_quarters =~ "c-multi-column__column col-sm-6 col-md-3"
      assert rendered_quarters =~ "Column 1"
      assert rendered_quarters =~ "Column 2"
      assert rendered_quarters =~ "Column 3"
      assert rendered_quarters =~ "Column 4"

      assert rendered_thirds =~ "<h4>This is a multi-column header</h4>"

      assert rendered_thirds =~ "c-multi-column__column col-sm-6 col-md-4"
      assert rendered_thirds =~ "Column 1"
      assert rendered_thirds =~ "Column 3"

      assert rendered_halves =~ "<h4>This is a multi-column header</h4>"
      assert rendered_halves =~ "c-multi-column__column col-sm-6 col-md-6"
      assert rendered_halves =~ "Column 1"
      assert rendered_halves =~ "Column 2"

      assert rendered_single =~ "<h4>This is a multi-column header</h4>"
      assert rendered_single =~ "c-multi-column__column col-sm-6 col-md-6"
      assert rendered_single =~ "Column 1"
    end

    test "renders to the right rail", %{conn: conn} do
      rendered =
        %ColumnMulti{
          header: %ColumnMultiHeader{
            text: HTML.raw("<h4>This is a multi-column header</h4>")
          },
          columns: [
            %Column{
              paragraphs: [
                %CustomHTML{body: HTML.raw("<strong>Column 1</strong>")}
              ]
            }
          ],
          right_rail: true
        }
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-paragraph--right-rail"
      assert rendered =~ "<h4>This is a multi-column header</h4>"
      assert rendered =~ "Column 1"
    end

    test "renders a CMS.Partial.Paragraph.Accordion", %{conn: conn} do
      sections = [
        %AccordionSection{
          title: "{{ icon:subway-red }} Section 1",
          prefix: "cms-10",
          content: [
            %CustomHTML{
              body: HTML.raw("<strong>First section's content</strong>")
            }
          ]
        },
        %AccordionSection{
          title: "Section 2",
          prefix: "cms-11",
          content: [
            %CustomHTML{
              body: HTML.raw("<strong>Second section's content</strong>")
            }
          ]
        }
      ]

      document =
        %Accordion{sections: sections}
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()
        |> Floki.parse_document!()

      [{_, _, [icon_1 | [title_1]]}, {_, _, [title_2]}] =
        Floki.find(document, ".c-accordion-ui__title")

      [{_, _, [body_1]}, {_, _, [body_2]}] =
        Floki.find(document, ".c-accordion-ui__target > .c-accordion-ui__content")

      [
        {_,
         [
           _,
           {"data-target", href_1},
           _,
           {"aria-controls", aria_controls_1},
           _,
           {"data-parent", parent_1}
         ], _},
        {_,
         [
           _,
           {"data-target", href_2},
           _,
           {"aria-controls", aria_controls_2},
           _,
           {"data-parent", parent_2}
         ], _}
      ] = Floki.find(document, ".c-accordion-ui__trigger")

      assert {"span", [{"data-toggle", "tooltip"}, {"title", "Red Line"}],
              [{"span", [{"class", "notranslate c-svg__icon-red-line-default"}], _}]} = icon_1

      assert title_1 =~ ~r/\s*Section 1\s*/
      assert title_2 =~ ~r/\s*Section 2\s*/
      assert href_1 == "#cms-10-section"
      assert href_2 == "#cms-11-section"
      assert aria_controls_1 == "cms-10-section"
      assert aria_controls_2 == "cms-11-section"
      assert parent_1 == "#accordion"
      assert parent_1 == parent_2
      assert Floki.raw_html(body_1, encode: false) =~ "First section's content"
      assert Floki.raw_html(body_2, encode: false) =~ "Second section's content"
    end

    test "renders a CMS.Partial.Paragraph.TripPlanWidget with default content", %{conn: conn} do
      rendered =
        %TripPlanWidget{}
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "<h2>Plan a trip</h2>"
      refute rendered =~ "<p>"

      assert rendered =~
               "Get trip suggestions"
    end

    test "renders a CMS.Partial.Paragraph.TripPlanWidget with custom content", %{conn: conn} do
      rendered =
        %TripPlanWidget{
          right_rail: true,
          title: "Secret Trip Plan Tool",
          text: "Find the newest travel tips for your origin and destination.",
          button_text: "Go fast"
        }
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "<h2>Secret Trip Plan Tool</h2>"
      assert rendered =~ "<p>Find the newest travel tips for your origin and destination.</p>"
      assert rendered =~ "Go fast"
    end

    test "renders a Paragraph.Unknown", %{conn: conn} do
      paragraph = %Unknown{
        type: "unsupported_paragraph_type"
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ paragraph.type
    end

    test "renders a CMS.Partial.Paragraph.CodeEmbed and ensures input === output", %{conn: conn} do
      raw_input = """
      <script type=\"text/javascript\" src=\"https://mbta-customer-tech.formstack.com/forms/js.php/perq_employer_intake\">var test = true;</script>
      <noscript><a href=\"https://mbta-customer-tech.formstack.com/forms/perq_employer_intake\" title=\"Online Form\">Online Form - Perq: Employer Intake</a></noscript>
      """

      prepared_input = HTML.raw(raw_input)

      document =
        %CodeEmbed{body: prepared_input}
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()
        |> Floki.parse_document!()

      [{"script", [{"type", type}, {"src", src}], [inline_js]}] =
        Floki.find(document, "script")

      [{"noscript", [], no_script_children}] = Floki.find(document, "noscript")

      [{"a", [{"href", href}, {"title", title}], [text_node]}] = no_script_children

      assert type == "text/javascript"
      assert src == "https://mbta-customer-tech.formstack.com/forms/js.php/perq_employer_intake"
      assert inline_js == "var test = true;"
      assert href == "https://mbta-customer-tech.formstack.com/forms/perq_employer_intake"
      assert title == "Online Form"
      assert text_node == "Online Form - Perq: Employer Intake"
    end
  end

  describe "grid/1" do
    test "returns the size of our grid based on the number of columns" do
      column_multi_2 = %ColumnMulti{
        columns: [
          %Column{
            paragraphs: [
              %CustomHTML{body: HTML.raw("<strong>Column 1</strong>")}
            ]
          },
          %Column{
            paragraphs: [
              %CustomHTML{body: HTML.raw("<strong>Column 2</strong>")}
            ]
          }
        ]
      }

      assert grid(column_multi_2) == 6
    end

    test "limits to a max size of 6" do
      column_multi_1 = %ColumnMulti{
        columns: [
          paragraphs: [
            %CustomHTML{body: HTML.raw("<strong>Column 1</strong>")}
          ]
        ]
      }

      assert grid(column_multi_1) == 6
    end
  end

  describe "extend_width_if/3" do
    test "wraps content with media divs if the condition is true" do
      rendered =
        extend_width_if(true, :table, do: "foo")
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-media c-media--table"
      assert rendered =~ "c-media__content"
      assert rendered =~ "c-media__element"
      assert rendered =~ "foo"
    end

    test "wraps content with nothing if the condition is false" do
      assert extend_width_if(false, :table, do: "foo") == "foo"
    end
  end

  describe "list_cta?/3" do
    test "does not render CTA if there are no teaser results", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: [:event]},
          recipe: [promoted: 0],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      assert [] = render_paragraph(paragraph, conn)
    end

    test "does not render CTA if author has selected to hide the CTA", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: [:project_update]},
          recipe: [type: [:project_update]],
          cta: %{behavior: "hide", text: nil, url: nil}
        })

      conn = Map.put(conn, :path_info, ["projects", "a-project"])

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      refute rendered =~ "c-call-to-action"
    end

    test "does not render CTA for project updates list if not on a project", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: [:project_update]},
          recipe: [type: [:project_update]],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      conn = Map.put(conn, :path_info, ["not-projects", "not-a-project"])

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      refute rendered =~ "c-call-to-action"
    end

    test "renders CTA for project updates list on non-project if overridden", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: [:project_update]},
          recipe: [type: [:project_update]],
          cta: %{behavior: "default", text: "Custom CTA", url: "/project/manually-linked/updates"}
        })

      conn = Map.put(conn, :path_info, ["not-projects", "not-a-project"])

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "Custom CTA"
      assert rendered =~ "/project/manually-linked/updates"
    end

    test "does not render CTA for types that have no generic destination", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: [:diversion]},
          recipe: [type: [:diversion]],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      refute rendered =~ "c-call-to-action"
    end

    test "renders CTA for types without generic destination if overridden", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: [:diversion]},
          recipe: [type: [:diversion]],
          cta: %{behavior: "default", text: "Go here!", url: "/news"}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "Go here!"
      assert rendered =~ "/news"
    end
  end

  describe "setup_list_cta/2" do
    @tag :external
    test "renders automatic CTA for news content lists", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: [:news_entry]},
          recipe: [type: [:news_entry]],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "View all news"
      assert rendered =~ "/news"
    end

    test "renders automatic CTA for event content lists", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: [:event]},
          recipe: [type: [:event]],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "View all events"
      assert rendered =~ "/events"
    end

    @tag :external
    test "renders automatic CTA for project content lists", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: [:project]},
          recipe: [type: [:project]],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "View all projects"
      assert rendered =~ "/projects"
    end

    test "renders default CTA url but with overridden CTA text from author", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: [:event]},
          recipe: [type: [:event]],
          cta: %{behavior: "default", text: "More where that came from...", url: nil}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "More where that came from..."
      assert rendered =~ "/events"
    end

    test "renders default CTA text but with overridden CTA url from author", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: [:event]},
          recipe: [type: [:event]],
          cta: %{behavior: "default", text: nil, url: "/special-events"}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "View all events"
      assert rendered =~ "/special-events"
    end
  end
end
