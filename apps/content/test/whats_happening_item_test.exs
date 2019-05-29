defmodule Content.WhatsHappeningItemTest do
  use ExUnit.Case, async: true

  setup do
    api_items = Content.CMS.Static.whats_happening_response()
    %{api_items: api_items}
  end

  test "parses an api response into a Content.WhatsHappeningItem", %{api_items: [item | _]} do
    assert Map.get(item, "field_page_type") == [
             %{"data" => nil, "id" => 248, "name" => "Guides", "vocab" => "page_type"}
           ]

    assert %Content.WhatsHappeningItem{
             blurb: blurb,
             category: category,
             link: %Content.Field.Link{url: url},
             image: %Content.Field.Image{}
           } = Content.WhatsHappeningItem.from_api(item)

    assert blurb =~ "Visiting Boston? Find your way around with our new Visitor's Guide to the T."
    assert category == "Guides"
    assert url == "/guides/boston-visitor-guide"
  end

  test "it uses field_image media image values", %{api_items: [_, item | _]} do
    assert %Content.WhatsHappeningItem{
             image: %Content.Field.Image{
               alt: alt,
               url: url
             }
           } = Content.WhatsHappeningItem.from_api(item)

    assert alt == "A bus at night in downtown Boston, Photo by Osman Rana, via Unsplash."

    assert url =~
             "http://localhost:4002/sites/default/files/styles/whats_happening" <>
               "/public/projects/late-night-bus/night-bus-by-osman-rana-unsplash.jpg?itok=K3LGpv53"
  end

  test "strips out the internal: that drupal adds to relative links", %{api_items: [item | _]} do
    item = %{
      item
      | "field_wh_link" => [%{"uri" => "internal:/news/winter", "title" => "", "options" => []}]
    }

    assert %Content.WhatsHappeningItem{
             link: %Content.Field.Link{url: "/news/winter"}
           } = Content.WhatsHappeningItem.from_api(item)
  end
end
