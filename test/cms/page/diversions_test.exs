defmodule CMS.Page.DiversionsTest do
  use ExUnit.Case, async: true

  import CMS.APITestHelpers, only: [update_api_response: 3]

  alias CMS.Api.Static
  alias CMS.Page.Diversions
  alias CMS.Partial.MenuLinks
  alias Phoenix.HTML

  setup do
    %{
      api_page: Map.put(Static.basic_page_response(), "field_page_type", [%{"name" => "Diversions"}])
    }
  end

  describe "from_api/1" do
    test "it parses the api response", %{api_page: api_page} do
      assert %Diversions{
               id: id,
               body: body,
               title: title
             } = Diversions.from_api(api_page)

      assert id == 3195
      assert HTML.safe_to_string(body) =~ "<p>The MBTA permits musical performances"
      assert title == "Arts on the T"
    end

    test "it strips out script tags", %{api_page: api_page} do
      api_page = update_api_response(api_page, "body", "<script>alert()</script> <p>Hi</p>")

      assert %Diversions{body: body} = Diversions.from_api(api_page)
      assert HTML.safe_to_string(body) == "alert() <p>Hi</p>"
    end

    test "it parses a sidebar menu" do
      api_page = Static.basic_page_with_sidebar_response()

      assert %Diversions{
               sidebar_menu: %MenuLinks{
                 blurb:
                   {:safe, "<p>Visiting Boston? Learn more about some of the popular spots you can get to on the T.</p>"}
               }
             } = Diversions.from_api(api_page)
    end
  end
end
