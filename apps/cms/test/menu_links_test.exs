defmodule Content.MenuLinksTest do
  use ExUnit.Case, async: true

  import Content.MenuLinks

  alias Content.CMS.Static

  setup do
    api_data =
      Static.basic_page_with_sidebar_response()
      |> Map.get("field_sidebar_menu")
      |> List.first()

    %{api_data: api_data}
  end

  describe "from_api/1" do
    test "parses the data into a MenuLinks struct", %{api_data: api_data} do
      assert %Content.MenuLinks{
               title: "Destinations",
               blurb:
                 {:safe,
                  "<p>Visiting Boston? Learn more about some of the popular spots you can get to on the T.</p>"},
               links: [
                 %Content.Field.Link{
                   url: "/destinations/logan-airport",
                   title: "Logan Airport"
                 },
                 %Content.Field.Link{},
                 %Content.Field.Link{},
                 %Content.Field.Link{
                   url: "/destinations/td-garden",
                   title: "TD Garden"
                 },
                 %Content.Field.Link{},
                 %Content.Field.Link{},
                 %Content.Field.Link{},
                 %Content.Field.Link{}
               ]
             } = from_api(api_data)
    end
  end
end
