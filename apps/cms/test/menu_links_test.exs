defmodule CMS.MenuLinksTest do
  use ExUnit.Case, async: true

  import CMS.MenuLinks

  alias CMS.API.Static

  setup do
    api_data =
      Static.basic_page_with_sidebar_response()
      |> Map.get("field_sidebar_menu")
      |> List.first()

    %{api_data: api_data}
  end

  describe "from_api/1" do
    test "parses the data into a MenuLinks struct", %{api_data: api_data} do
      assert %CMS.MenuLinks{
               title: "Destinations",
               blurb:
                 {:safe,
                  "<p>Visiting Boston? Learn more about some of the popular spots you can get to on the T.</p>"},
               links: [
                 %CMS.Field.Link{
                   url: "/destinations/logan-airport",
                   title: "Logan Airport"
                 },
                 %CMS.Field.Link{},
                 %CMS.Field.Link{},
                 %CMS.Field.Link{
                   url: "/destinations/td-garden",
                   title: "TD Garden"
                 },
                 %CMS.Field.Link{},
                 %CMS.Field.Link{},
                 %CMS.Field.Link{},
                 %CMS.Field.Link{}
               ]
             } = from_api(api_data)
    end
  end
end
