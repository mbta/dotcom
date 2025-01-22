defmodule CMS.Partial.MenuLinksTest do
  use ExUnit.Case, async: true

  import CMS.Partial.MenuLinks

  alias CMS.Api.Static
  alias CMS.Field.Link
  alias CMS.Partial.MenuLinks

  setup do
    api_data =
      Static.basic_page_with_sidebar_response()
      |> Map.get("field_sidebar_menu")
      |> List.first()

    %{api_data: api_data}
  end

  describe "from_api/1" do
    test "parses the data into a MenuLinks struct", %{api_data: api_data} do
      assert %MenuLinks{
               title: "Destinations",
               blurb:
                 {:safe, "<p>Visiting Boston? Learn more about some of the popular spots you can get to on the T.</p>"},
               links: [
                 %Link{
                   url: "/destinations/logan-airport",
                   title: "Logan Airport"
                 },
                 %Link{},
                 %Link{},
                 %Link{
                   url: "/destinations/td-garden",
                   title: "TD Garden"
                 },
                 %Link{},
                 %Link{},
                 %Link{},
                 %Link{}
               ]
             } = from_api(api_data)
    end
  end
end
