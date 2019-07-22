defmodule SiteWeb.ContentViewTest do
  use Site.ViewCase, async: true

  import Content.Factory, only: [event_factory: 1, person_factory: 0]
  import SiteWeb.ContentView

  alias Content.GenericPage
  alias Content.CMS.Static
  alias Content.Field.{File, Image, Link}

  alias Content.Paragraph.{
    Accordion,
    AccordionSection,
    Callout,
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
    Unknown,
    UpcomingBoardMeetings
  }

  alias Phoenix.HTML

  describe "Basic Page" do
    setup do
      basic_page = GenericPage.from_api(Static.basic_page_with_sidebar_response())
      %{basic_page: basic_page}
    end

    test "renders a sidebar menu", %{basic_page: basic_page} do
      fake_conn = %{
        query_params: %{},
        request_path: basic_page.sidebar_menu.links |> List.first() |> Map.get(:url)
      }

      rendered =
        "page.html"
        |> render(page: basic_page, conn: fake_conn)
        |> HTML.safe_to_string()

      assert rendered =~ ~s(c-cms--with-sidebar)
      assert rendered =~ ~s(c-cms--sidebar-left)
      assert rendered =~ "Logan Airport"
      assert rendered =~ ~s(<ul class="c-cms__sidebar-links">)
      assert rendered =~ ~s(c-cms__sidebar)
      refute rendered =~ "c-cms__right-rail"
    end

    test "renders a page without a sidebar menu", %{basic_page: basic_page} do
      basic_page = %{basic_page | sidebar_menu: nil}
      fake_conn = %{request_path: "/"}

      rendered =
        "page.html"
        |> render(page: basic_page, conn: fake_conn)
        |> HTML.safe_to_string()

      assert rendered =~ ~s(c-cms--no-sidebar)
      assert rendered =~ "Fenway Park"
      refute rendered =~ ~s(<ul class="sidebar-menu">)
      refute rendered =~ "c-cms__right-rail"
    end

    test "renders a page with a right rail" do
      page_with_right_rail = %GenericPage{
        paragraphs: [
          %CustomHTML{body: HTML.raw("<p>Hello</p>"), right_rail: false},
          %CustomHTML{body: HTML.raw("<p>world</p>"), right_rail: true}
        ]
      }

      fake_conn = %{request_path: "/"}

      rendered =
        "page.html"
        |> render(page: page_with_right_rail, conn: fake_conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-cms--sidebar-right"
      assert rendered =~ "Hello"
      assert rendered =~ "world"
      assert rendered =~ "c-paragraph--right-rail"
    end
  end

  describe "Diversion" do
    setup do
      diversion = GenericPage.from_api(Static.diversion_response())
      %{diversion: diversion}
    end

    test "renders a diversion as a generic page", %{diversion: diversion} do
      fake_conn = %{request_path: "/", path_info: ["diversions", "diversion-2"]}

      rendered =
        "page.html"
        |> render(page: diversion, conn: fake_conn)
        |> HTML.safe_to_string()

      assert rendered =~ ~s(<h1 class=\"c-cms__title-text\">\nDiversion Test 2)
      assert rendered =~ "<p><strong>Start date: January 1, 2020</strong></p>"
    end
  end

  describe "render_paragraph/2" do
    test "renders a Content.Paragraph.CustomHTML", %{conn: conn} do
      paragraph = %CustomHTML{body: HTML.raw("<p>Hello</p>")}

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "<p>Hello</p>"
    end

    test "renders a Content.Paragraph.CustomHTML with rewritten body", %{conn: conn} do
      html = "<div><span>Foo</span><table>Foo</table></div>"
      paragraph = %CustomHTML{body: HTML.raw(html)}

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-paragraph--custom-html"
      refute rendered =~ "c-paragraph--right-rail"
      assert rendered =~ "responsive-table"
    end

    test "renders a Content.Paragraph.TitleCardSet", %{conn: conn} do
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
        |> HTML.safe_to_string()

      assert rendered =~
               ~s(<div class="c-title-card__title c-title-card--link__title">Card 1</div>)

      assert rendered =~ "<strong>Body 1</strong>"
      assert rendered =~ ~s( href="/relative/link")

      assert rendered =~
               ~s(<div class="c-title-card__title c-title-card--link__title">Card 2</div>)

      assert rendered =~ "<strong>Body 2</strong>"
      assert rendered =~ ~s( href="https://www.example.com/another/link")
    end

    test "renders a Content.Paragraph.TitleCardSet with content rewritten", %{conn: conn} do
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
        |> HTML.safe_to_string()

      assert rendered =~ "responsive-table"
      refute rendered =~ "mbta-circle-icon"
    end

    test "renders a Content.Paragraph.DescriptiveLink (outside a Title Card Set)", %{conn: conn} do
      alone = %DescriptiveLink{
        title: "Card 1",
        body: HTML.raw("<strong>Body 1</strong>"),
        link: %Link{url: "/relative/link"},
        parent: "field_paragraphs"
      }

      rendered_alone =
        alone
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      rendered_in_mc =
        alone
        |> Map.put(:parent, "field_column")
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      rendered_unlinked =
        alone
        |> Map.put(:link, nil)
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

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

    test "renders a Content.Paragraph.UpcomingBoardMeetings", %{conn: conn} do
      event = event_factory(0)

      paragraph = %UpcomingBoardMeetings{
        events: [event]
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      rendered_title =
        event.title
        |> HTML.html_escape()
        |> HTML.safe_to_string()

      assert rendered =~ "c-paragraph--upcoming-board-meetings"
      assert rendered =~ rendered_title
      assert rendered =~ "View all upcoming meetings"
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
        |> HTML.safe_to_string()

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
        |> HTML.safe_to_string()

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
        |> HTML.safe_to_string()

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
        |> HTML.safe_to_string()

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
        |> HTML.safe_to_string()

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
        |> HTML.safe_to_string()

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
          ingredients: %{type: :project_update},
          recipe: [
            type: :project_update,
            date: "now",
            date_op: ">="
          ],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      conn = Map.put(conn, :path_info, ["projects", "a-project"])

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-paragraph--content-list"
      assert rendered =~ "c-teaser-list--project-update"
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

    test "renders a FareCard", %{conn: conn} do
      paragraph = %ColumnMulti{
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
                fare_token: "local_bus:cash",
                show_media: false,
                note: %CustomHTML{
                  body: {:safe, "<p>{{ fare:local_bus:charlie_card }} with a CharlieCard</p>\n"}
                }
              }
            ]
          }
        ]
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-paragraph--ungrouped c-paragraph--with-cards c-paragraph--with-fares"
      assert rendered =~ "Subway"
      assert rendered =~ "One-Way"
      assert rendered =~ "$2.40"
      assert rendered =~ "with a CharlieCard"
      assert rendered =~ "$2.90 with CharlieTicket"
      assert rendered =~ "Local Bus"
      assert rendered =~ "$2.00"
      assert rendered =~ "$1.70 with a CharlieCard"
      refute rendered =~ "with a CharlieTicket or Cash"
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
        |> HTML.safe_to_string()

      assert rendered =~ "c-paragraph--grouped c-paragraph--with-cards c-paragraph--with-fares"
      assert rendered =~ "fare-card--grouped"
      assert rendered =~ "Local Bus"
      assert rendered =~ "One-Way"
      assert rendered =~ "$1.70"
      assert rendered =~ "with CharlieCard"
      assert rendered =~ "1 free transfer"
      assert rendered =~ "$2.00"
      refute rendered =~ "with CharlieTicket or Cash"
      assert rendered =~ "Limited transfers"
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
        |> HTML.safe_to_string()

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
        |> HTML.safe_to_string()

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
        |> HTML.safe_to_string()

      assert rendered =~ "link description"
    end

    test "renders a Paragraph.FilesGrid with a title", %{conn: conn} do
      paragraph = %FilesGrid{files: [%File{}], title: "Some files"}

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ paragraph.title
    end

    test "renders a Content.Paragraph.ColumnMulti with nested paragraphs", %{conn: conn} do
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
        |> HTML.safe_to_string()

      rendered_thirds =
        %ColumnMulti{header: header, columns: Enum.take(cols, 3)}
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      rendered_halves =
        %ColumnMulti{header: header, columns: Enum.take(cols, 2)}
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      rendered_single =
        %ColumnMulti{header: header, columns: Enum.take(cols, 1)}
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

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
        |> HTML.safe_to_string()

      assert rendered =~ "c-paragraph--right-rail"
      assert rendered =~ "<h4>This is a multi-column header</h4>"
      assert rendered =~ "Column 1"
    end

    test "renders a Content.Paragraph.Accordion", %{conn: conn} do
      sections = [
        %AccordionSection{
          title: "{{ icon:subway-red }} Section 1",
          prefix: "cms-10",
          content: %CustomHTML{
            body: HTML.raw("<strong>First section's content</strong>")
          }
        },
        %AccordionSection{
          title: "Section 2",
          prefix: "cms-11",
          content: %CustomHTML{
            body: HTML.raw("<strong>Second section's content</strong>")
          }
        }
      ]

      rendered_accordion =
        %Accordion{sections: sections}
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      [{_, _, [icon_1 | [title_1]]}, {_, _, [title_2]}] =
        Floki.find(rendered_accordion, ".c-accordion-ui__title")

      [{_, _, [body_1]}, {_, _, [body_2]}] =
        Floki.find(rendered_accordion, ".c-accordion-ui__target > .c-accordion-ui__content")

      [
        {_,
         [
           _,
           {"href", href_1},
           _,
           _,
           {"aria-controls", aria_controls_1},
           _,
           {"data-parent", parent_1}
         ], _},
        {_,
         [
           _,
           {"href", href_2},
           _,
           _,
           {"aria-controls", aria_controls_2},
           _,
           {"data-parent", parent_2}
         ], _}
      ] = Floki.find(rendered_accordion, ".c-accordion-ui__trigger")

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

    test "renders a Paragraph.Unknown", %{conn: conn} do
      paragraph = %Unknown{
        type: "unsupported_paragraph_type"
      }

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ paragraph.type
    end
  end

  describe "file_description/1" do
    test "returns URL decoded file name if description is nil" do
      file = %File{url: "/some/path/This%20File%20Is%20Great.pdf", description: nil}
      assert file_description(file) == "This File Is Great.pdf"
    end

    test "returns the URL decoded file name if description is an empty string" do
      file = %File{url: "/some/path/This%20File%20Is%20Great.pdf", description: ""}
      assert file_description(file) == "This File Is Great.pdf"
    end

    test "returns the description if present" do
      file = %File{url: "/some/path/This%20File%20Is%20Great.pdf", description: "Download Now"}
      assert file_description(file) == "Download Now"
    end
  end

  describe "render_duration/2" do
    test "with no end time, only renders start time" do
      actual = render_duration(~N[2016-11-15T10:00:00], nil)
      expected = "November 15, 2016 at 10 AM"
      assert expected == actual
    end

    test "with start/end on same day, only renders date once" do
      actual = render_duration(~N[2016-11-14T12:00:00], ~N[2016-11-14T14:30:00])
      expected = "November 14, 2016 at 12 PM - 2:30 PM"
      assert expected == actual
    end

    test "with start/end on different days, renders both dates" do
      actual = render_duration(~N[2016-11-14T12:00:00], ~N[2016-12-01T14:30:00])
      expected = "November 14, 2016 12 PM - December 1, 2016 2:30 PM"
      assert expected == actual
    end

    test "with DateTimes, shifts them to America/New_York" do
      actual =
        render_duration(
          Timex.to_datetime(~N[2016-11-05T05:00:00], "Etc/UTC"),
          Timex.to_datetime(~N[2016-11-06T06:00:00], "Etc/UTC")
        )

      # could also be November 6th, 1:00 AM (test daylight savings)
      expected = "November 5, 2016 1 AM - November 6, 2016 2 AM"
      assert expected == actual
    end
  end

  describe "sidebar_classes/1" do
    test "returns appropriate classes for a page with a sidebar" do
      sidebar_layout = {true, false}

      assert sidebar_classes(sidebar_layout) == "c-cms--with-sidebar c-cms--sidebar-left"
    end

    test "returns appropriate classes for a page without a sidebar" do
      sidebar_layout = {false, false}

      assert sidebar_classes(sidebar_layout) == "c-cms--no-sidebar"
    end

    test "returns appropriate classes for a page with a right rail" do
      sidebar_layout = {false, true}

      assert sidebar_classes(sidebar_layout) == "c-cms--with-sidebar c-cms--sidebar-right"
    end

    test "returns only left-sidebar classes for a page with a both left menu and right rail" do
      sidebar_layout = {true, true}

      assert sidebar_classes(sidebar_layout) == "c-cms--with-sidebar c-cms--sidebar-left"
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
      rendered = extend_width_if(true, :table, do: "foo") |> HTML.safe_to_string()

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
          ingredients: %{type: :event},
          recipe: [promoted: 0],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      refute rendered =~ "c-call-to-action"
    end

    test "does not render CTA if author has selected to hide the CTA", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: :project_update},
          recipe: [type: :project_update],
          cta: %{behavior: "hide", text: nil, url: nil}
        })

      conn = Map.put(conn, :path_info, ["projects", "a-project"])

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      refute rendered =~ "c-call-to-action"
    end

    test "does not render CTA for project updates list if not on a project", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: :project_update},
          recipe: [type: :project_update],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      conn = Map.put(conn, :path_info, ["not-projects", "not-a-project"])

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      refute rendered =~ "c-call-to-action"
    end

    test "renders CTA for project updates list on non-project if overridden", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: :project_update},
          recipe: [type: :project_update],
          cta: %{behavior: "default", text: "Custom CTA", url: "/project/manually-linked/updates"}
        })

      conn = Map.put(conn, :path_info, ["not-projects", "not-a-project"])

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "Custom CTA"
      assert rendered =~ "/project/manually-linked/updates"
    end

    test "does not render CTA for types that have no generic destination", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: :diversion},
          recipe: [type: :diversion],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      refute rendered =~ "c-call-to-action"
    end

    test "renders CTA for types without generic destination if overridden", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: :diversion},
          recipe: [type: :diversion],
          cta: %{behavior: "default", text: "Go here!", url: "/news"}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "Go here!"
      assert rendered =~ "/news"
    end
  end

  describe "setup_list_cta/2" do
    test "renders automatic CTA for news content lists", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: :news_entry},
          recipe: [type: :news_entry],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "View all news"
      assert rendered =~ "/news"
    end

    test "renders automatic CTA for event content lists", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: :event},
          recipe: [type: :event],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "View all events"
      assert rendered =~ "/events"
    end

    test "renders automatic CTA for project content lists", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: :project},
          recipe: [type: :project],
          cta: %{behavior: "default", text: nil, url: nil}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "View all projects"
      assert rendered =~ "/projects"
    end

    test "renders default CTA url but with overridden CTA text from author", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: :event},
          recipe: [type: :event],
          cta: %{behavior: "default", text: "More where that came from...", url: nil}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "More where that came from..."
      assert rendered =~ "/events"
    end

    test "renders default CTA text but with overridden CTA url from author", %{conn: conn} do
      paragraph =
        ContentList.fetch_teasers(%ContentList{
          ingredients: %{type: :event},
          recipe: [type: :event],
          cta: %{behavior: "default", text: nil, url: "/special-events"}
        })

      rendered =
        paragraph
        |> render_paragraph(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-call-to-action"
      assert rendered =~ "View all events"
      assert rendered =~ "/special-events"
    end
  end
end
