defmodule CMS.HelpersTest do
  use ExUnit.Case, async: true

  import CMS.Helpers

  alias CMS.Field.Image
  alias CMS.Field.Link
  alias CMS.Helpers
  alias CMS.Partial.Paragraph.CustomHTML
  alias CMS.Partial.Paragraph.DescriptiveLink
  alias CMS.Partial.Paragraph.TitleCardSet
  alias Phoenix.HTML

  doctest CMS.Helpers

  describe "parse_page_types/1" do
    test "it parses the page type" do
      # Setup
      page_type = Faker.Cat.breed()

      data = %{
        "field_page_type" => [
          %{
            "name" => page_type
          }
        ]
      }

      # Exercise / Verify
      assert [^page_type] = parse_page_types(data)
    end
  end

  describe "parse_related_transit/1" do
    test "it parses the related transit data" do
      # Setup
      related_transit = Faker.Cat.breed()

      data = %{
        "field_related_transit" => [
          %{
            "name" => related_transit
          }
        ]
      }

      # Exercise / Verify
      assert [^related_transit] = parse_related_transit(data)
    end
  end

  describe "handle_html/1" do
    test "removes unsafe html tags from safe content" do
      html = "<h1>hello!<script>code</script></h1>"
      assert handle_html(html) == {:safe, "<h1>hello!code</h1>"}
    end

    test "allows valid HTML5 tags" do
      html = "<p>Content</p>"
      assert handle_html(html) == {:safe, "<p>Content</p>"}
    end

    test "rewrites static file links" do
      {:ok, endpoint} = Application.get_env(:dotcom, :util_endpoint)
      html = "<img src=\"/sites/default/files/converted.jpg\">"

      assert handle_html(html) ==
               {:safe, "<img src=\"#{endpoint.url()}/sites/default/files/converted.jpg\" />"}
    end

    test "allows an empty string" do
      assert handle_html("") == {:safe, ""}
    end

    test "allows nil" do
      assert handle_html(nil) == {:safe, ""}
    end
  end

  describe "parse_body/1" do
    test "it parses the body when present" do
      data = %{
        "body" => [
          %{
            "value" => "<h1>body <script>value</script></h1>\n",
            "format" => "full_html",
            "processed" => "<h1>body <script>processed</script></h1>\n",
            "summary" => ""
          }
        ]
      }

      assert parse_body(data) == {:safe, "<h1>body processed</h1>\n"}
    end

    test "returns nil if no body element present" do
      data = %{"something" => "else"}
      assert parse_body(data) == {:safe, ""}
    end
  end

  describe "parse_path_alias/1" do
    test "it parses a path alias when present" do
      data = %{
        "path" => [
          %{
            "alias" => "/pretty/url/alias"
          }
        ]
      }

      assert "/pretty/url/alias" == parse_path_alias(data)
    end

    test "returns nil if no path alias present" do
      data = %{"something" => "else"}
      assert nil == parse_path_alias(data)
    end
  end

  describe "parse_image/2" do
    test "parses the image data" do
      data = %{
        "field_my_image" => [
          %{
            "alt" => "Picture of a barn",
            "url" => "http://cms/files/barn.jpg"
          }
        ]
      }

      assert parse_image(data, "field_my_image") == %Image{
               alt: "Picture of a barn",
               url: Util.site_path(:static_url, ["/files/barn.jpg"])
             }
    end

    test "when the specified field is not present" do
      assert parse_image(%{}, "missing_field") == nil
    end
  end

  describe "parse_images/2" do
    test "parses image data with multiple images" do
      data = %{
        "field_with_images" => [
          %{
            "alt" => "Picture of a barn",
            "url" => "/files/barn.jpg"
          },
          %{
            "alt" => "Picture of a horse",
            "url" => "/files/horse.jpg"
          }
        ]
      }

      expected_result = [
        %Image{
          alt: "Picture of a barn",
          url: Util.site_path(:static_url, ["/files/barn.jpg"])
        },
        %Image{
          alt: "Picture of a horse",
          url: Util.site_path(:static_url, ["/files/horse.jpg"])
        }
      ]

      assert parse_images(data, "field_with_images") == expected_result
    end

    test "when the specified field is not present" do
      assert parse_images(%{}, "missing_field") == []
    end
  end

  describe "parse_date/2" do
    test "parses a date string to a date" do
      map = %{"posted_on" => [%{"value" => "2017-01-01"}]}

      assert parse_date(map, "posted_on") == ~D[2017-01-01]
    end

    test "when the date string cannot be converted to a date" do
      map = %{"posted_on" => [%{"value" => ""}]}
      assert parse_date(map, "posted_on") == nil
    end

    test "when the field is missing" do
      assert parse_date(%{}, "posted_on") == nil
    end
  end

  describe "parse_link/2" do
    test "it parses a link field into a Link" do
      data = %{
        "field_my_link" => [
          %{
            "title" => "This is the link text",
            "uri" => "internal:/this/is/the/link/url"
          }
        ]
      }

      assert %Link{
               title: "This is the link text",
               url: "/this/is/the/link/url"
             } = parse_link(data, "field_my_link")
    end

    test "it returns nil if unexpected format" do
      data = %{
        "field_my_link" => %{
          hmmm: "what is this?"
        }
      }

      assert parse_link(data, "field_my_link") == nil
    end
  end

  describe "parse_links/2" do
    test "it parses a field with multiple links into Links" do
      data = %{
        "field_my_links" => [
          %{
            "title" => "This is the first link text",
            "uri" => "internal:/this/is/the/link/url"
          },
          %{
            "title" => "This is the second link text",
            "uri" => "https://www.google.com"
          }
        ]
      }

      assert [
               %Link{
                 title: "This is the first link text",
                 url: "/this/is/the/link/url"
               },
               %Link{
                 title: "This is the second link text",
                 url: "https://www.google.com"
               }
             ] = parse_links(data, "field_my_links")

      data2 = %{
        "field_my_links2" => [
          %{
            "title" => "This is the first link text",
            "uri" => "internal:/this/is/the/link/url"
          }
        ]
      }

      assert [
               %Link{
                 title: "This is the first link text",
                 url: "/this/is/the/link/url"
               }
             ] = parse_links(data2, "field_my_links2")
    end
  end

  describe "parse_paragraphs/1" do
    test "it parses different kinds of paragraphs" do
      api_data = %{
        "field_paragraphs" => [
          %{
            "type" => [%{"target_id" => "custom_html"}],
            "status" => [%{"value" => true}],
            "field_custom_html_body" => [%{"value" => "some HTML"}]
          },
          %{
            "type" => [%{"target_id" => "title_card_set"}],
            "status" => [%{"value" => true}],
            "field_title_cards" => [
              %{
                "type" => [%{"target_id" => "title_card"}],
                "parent_field_name" => [%{"value" => "field_title_cards"}],
                "field_title_card_body" => [%{"value" => "body"}],
                "field_title_card_link" => [%{"uri" => "internal:/foo/bar"}],
                "field_title_card_title" => [%{"value" => "title"}]
              }
            ]
          }
        ]
      }

      parsed = parse_paragraphs(api_data)

      assert parsed == [
               %CustomHTML{
                 body: HTML.raw("some HTML"),
                 right_rail: nil
               },
               %TitleCardSet{
                 descriptive_links: [
                   %DescriptiveLink{
                     body: HTML.raw("body"),
                     title: "title",
                     parent: "field_title_cards",
                     link: %Link{
                       url: "/foo/bar"
                     }
                   }
                 ]
               }
             ]
    end

    test "it skips normal paragraphs that are unpublished" do
      map_data = %{
        "field_paragraphs" => [
          %{
            "type" => [%{"target_id" => "custom_html"}],
            "status" => [%{"value" => true}],
            "field_custom_html_body" => [%{"value" => "I am published"}]
          },
          %{
            "type" => [%{"target_id" => "custom_html"}],
            "status" => [%{"value" => false}],
            "field_custom_html_body" => [%{"value" => "I am NOT published"}]
          },
          %{
            "type" => [%{"target_id" => "title_card_set"}],
            "status" => [%{"value" => true}],
            "field_title_cards" => [
              %{
                "type" => [%{"target_id" => "title_card"}],
                "field_title_card_body" => [%{"value" => "I am published"}]
              }
            ]
          },
          %{
            "type" => [%{"target_id" => "title_card_set"}],
            "status" => [%{"value" => false}],
            "field_title_cards" => [
              %{
                "type" => [%{"target_id" => "title_card"}],
                "field_title_card_body" => [%{"value" => "I am NOT published"}]
              }
            ]
          }
        ]
      }

      parsed_map = parse_paragraphs(map_data)

      assert parsed_map == [
               %CustomHTML{
                 body: HTML.raw("I am published"),
                 right_rail: nil
               },
               %TitleCardSet{
                 descriptive_links: [
                   %DescriptiveLink{
                     body: HTML.raw("I am published"),
                     title: nil,
                     link: nil,
                     parent: nil
                   }
                 ]
               }
             ]
    end

    test "it skips reusable paragraphs that are unpublished" do
      map_data = %{
        "field_paragraphs" => [
          %{
            "type" => [%{"target_id" => "from_library"}],
            "status" => [%{"value" => true}],
            "field_reusable_paragraph" => [
              %{
                "paragraphs" => [
                  %{
                    "status" => [%{"value" => false}],
                    "type" => [%{"target_id" => "custom_html"}],
                    "field_custom_html_body" => [%{"value" => "I am not published"}]
                  }
                ]
              }
            ]
          },
          %{
            "type" => [%{"target_id" => "from_library"}],
            "status" => [%{"value" => false}],
            "field_reusable_paragraph" => [
              %{
                "paragraphs" => [
                  %{
                    "status" => [%{"value" => true}],
                    "type" => [%{"target_id" => "custom_html"}],
                    "field_custom_html_body" => [
                      %{"value" => "I am published, but my instance is not"}
                    ]
                  }
                ]
              }
            ]
          },
          %{
            "type" => [%{"target_id" => "from_library"}],
            "status" => [%{"value" => true}],
            "field_reusable_paragraph" => [
              %{
                "paragraphs" => [
                  %{
                    "status" => [%{"value" => true}],
                    "type" => [%{"target_id" => "custom_html"}],
                    "field_custom_html_body" => [%{"value" => "I and my instance are published"}]
                  }
                ]
              }
            ]
          }
        ]
      }

      parsed_map = parse_paragraphs(map_data)

      assert parsed_map == [
               %CustomHTML{
                 body: HTML.raw("I and my instance are published"),
                 right_rail: nil
               }
             ]
    end

    test "it shows unpublished paragraphs when the page is in preview mode" do
      map_data = %{
        "field_paragraphs" => [
          %{
            "status" => [%{"value" => true}],
            "type" => [%{"target_id" => "custom_html"}],
            "field_custom_html_body" => [%{"value" => "Unpublished Custom HTML paragraph"}]
          }
        ]
      }

      preview_opts = [preview: true, paragraphs: true]
      parsed_map = parse_paragraphs(map_data, preview_opts)

      assert parsed_map == [
               %CustomHTML{
                 body: HTML.raw("Unpublished Custom HTML paragraph"),
                 right_rail: nil
               }
             ]
    end

    test "it skips missing paragraphs" do
      map_data = %{
        "field_paragraphs" => [nil]
      }

      parsed_map = parse_paragraphs(map_data, [])

      assert parsed_map == []
    end

    test "it skips reusable paragraphs whose source paragraph no longer exists" do
      map_data = %{
        "field_paragraphs" => [
          %{
            "type" => [%{"target_id" => "from_library"}],
            "status" => [%{"value" => true}],
            "field_reusable_paragraph" => [nil]
          }
        ]
      }

      parsed_map = parse_paragraphs(map_data)

      assert parsed_map == []
    end

    test "it handles absence of paragraphs json data" do
      map_data = %{
        "status" => [%{"value" => true}]
      }

      parsed_map = parse_paragraphs(map_data)

      assert parsed_map == []
    end
  end

  describe "rewrite_url/1" do
    test "rewrites when the URL has query params" do
      assert %URI{} =
               uri =
               "http://test-mbta.pantheonsite.io/foo/bar?baz=quux"
               |> Helpers.rewrite_url()
               |> URI.parse()

      assert uri.scheme == "http"
      assert uri.host == "localhost"
      assert uri.path == "/foo/bar"
      assert uri.query == "baz=quux"
    end

    test "rewrites when the URL has no query params" do
      assert %URI{} =
               uri =
               "http://test-mbta.pantheonsite.io/foo/bar"
               |> Helpers.rewrite_url()
               |> URI.parse()

      assert uri.scheme == "http"
      assert uri.host == "localhost"
      assert uri.path == "/foo/bar"
      assert uri.query == nil
    end

    test "rewrites the URL for https" do
      assert %URI{} =
               uri =
               "https://example.com/foo/bar"
               |> Helpers.rewrite_url()
               |> URI.parse()

      assert uri.scheme == "http"
      assert uri.host == "localhost"
      assert uri.path == "/foo/bar"
      assert uri.query == nil
    end
  end

  describe "int_or_string_to_int/1" do
    test "converts appropriately or leaves alone" do
      assert int_or_string_to_int(5) == 5
      assert int_or_string_to_int("5") == 5
    end

    test "handles invalid string" do
      assert int_or_string_to_int("foo") == nil
    end

    test "handles nil" do
      assert int_or_string_to_int(nil) == nil
    end
  end

  describe "content/1" do
    test "given a populated string" do
      assert content("some content") == "some content"
    end

    test "given an empty string" do
      assert content("") == nil
    end

    test "given a empty string with whitespace" do
      assert content(" ") == nil
    end

    test "given a populated string, marked as safe" do
      assert content({:safe, "content"}) == {:safe, "content"}
    end

    test "given an empty string, marked as safe" do
      assert content({:safe, ""}) == nil
    end

    test "given an empty string with whitespace, marked as safe" do
      assert content({:safe, " "}) == nil
    end

    test "given nil" do
      assert content(nil) == nil
    end
  end

  describe "routes/1" do
    test "content w/o any transit tags results in empty list" do
      tags = []

      assert [] = routes(tags)
    end

    test "handles valid route tags" do
      tags = [
        %{
          "data" => %{
            "gtfs_id" => "CR-Providence",
            "gtfs_group" => "line",
            "gtfs_ancestry" => %{
              "mode" => ["commuter_rail"]
            }
          }
        },
        %{
          "data" => %{
            "gtfs_id" => "Green-B",
            "gtfs_group" => "branch",
            "gtfs_ancestry" => %{
              "mode" => ["subway"]
            }
          }
        }
      ]

      assert [
               %{id: "CR-Providence", mode: "commuter_rail", group: "line"},
               %{id: "Green-B", mode: "subway", group: "branch"}
             ] = routes(tags)
    end

    test "handles route tags without mode ancestry" do
      tags = [
        %{
          "data" => %{
            "gtfs_id" => "supplemental_bus",
            "gtfs_group" => "custom",
            "gtfs_ancestry" => %{
              "mode" => nil,
              "custom" => ["misc"]
            }
          }
        }
      ]

      assert [%{id: "supplemental_bus", mode: nil, group: "custom"}] = routes(tags)
    end
  end

  describe "preview_opts/1" do
    test "parses conn.query_params map for CMS preview flags" do
      query_params = %{"preview" => nil, "foo" => "bar"}
      assert [page: true, paragraphs: false] = preview_opts(query_params)
    end
  end
end
